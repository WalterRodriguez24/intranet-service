import { createRouter } from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";

import multer from "multer";
import imageService from "@/shared/server/file-storage/upload-media";

const inMemoryStorage = multer.memoryStorage();
const uploadStrategy = multer({ storage: inMemoryStorage }) as any;

type GuideRequest = {
  files: Express.Multer.File[];
} & NextApiRequest;

const router = createRouter<GuideRequest, NextApiResponse>();

router.use(uploadStrategy.array("files")).post(async (req, res) => {
  const { files } = req;

  try {
    const result = await imageService.uploadMedia(files);

    return res.status(200).json(result);
  } catch (error) {
    console.log({ error });
    res.status(400).json({ message: "Error uploading media" });
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default router.handler({
  onError: (err) => {
    console.error(err);
  },
});
