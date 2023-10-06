import { listServices } from "@/application/service/server/use-case";
import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(async (req, res) => {
  const services = await listServices();
  res.json(services);
});

export default router.handler({
  onError: (err) => {
    console.error(err);
  },
});
