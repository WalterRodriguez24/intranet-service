import { register } from "@/application/user/server/use-case";
import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.post(async (req, res) => {
  const { password, email, username, roleId, firstName, lastName, jobTitleId } =
    req.body;

  try {
    const user = await register({
      password,
      email,
      username,
      firstName,
      lastName,
      jobTitleId,
      roleId,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: "Error registering user" });
  }
});

export default router.handler({
  onError: (err) => {
    console.error(err);
  },
});
