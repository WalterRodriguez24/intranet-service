import { createTextGuide } from "@/application/guide/server/use-case";
import { createRouter } from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";

import multer from "multer";
import { uploadFile } from "@/shared/server/file-storage";
import { Attachment } from "@/domain/guide/server";

const inMemoryStorage = multer.memoryStorage();
const uploadStrategy = multer({ storage: inMemoryStorage }) as any;

type GuideRequest = {
  files: Express.Multer.File[];
} & NextApiRequest;

const router = createRouter<GuideRequest, NextApiResponse>();

export const config = {
  api: {
    bodyParser: false,
  },
};

router.use(uploadStrategy.array("files", 10)).post(async (req, res) => {
  const reqFiles = req.files || [];
  const { title, content, services } = req.body;

  const userId = 1;
  try {
    const servicesId = Array.isArray(services)
      ? services.map((service: string) => Number(service))
      : [Number(services)];
    const rawFiles = reqFiles.map((file) => ({
      name: file.originalname,
      size: file.size,
      type: file.mimetype,
    }));

    const contentParsed = JSON.parse(content);

    const promises = reqFiles.map((file) => {
      return uploadFile(file.originalname, file.buffer);
    });

    const uploadResult = await Promise.all(promises);

    const attachment: Attachment[] = uploadResult.map((result, index) => ({
      name: rawFiles[index].name,
      path: result.path,
      size: rawFiles[index].size,
      type: rawFiles[index].type,
    }));

    const guide = await createTextGuide(
      title,
      contentParsed,
      userId,
      servicesId,
      attachment
    );
    res.json({ guide });
  } catch (error) {
    console.log({ error });
    res.status(500).json({
      message: "No se pudo crear la guía",
    });
  }
});

export default router.handler({
  onError: (err) => {
    console.error(err);
  },
});
