import { Configuration, OpenAIApi } from "openai";
import { nanoid } from "nanoid";
import { createRouter } from "next-connect";

import type { NextApiRequest, NextApiResponse } from "next";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

const router = createRouter<NextApiRequest, NextApiResponse>();

router.post(async (req, res) => {
  try {
    const { messages } = req.body;

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
    });

    const responseMessage = {
      id: nanoid(),
      ...response.data.choices[0].message,
    };

    res.json(responseMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json("Error generating response");
  }
});

export default router.handler({
  onError: (err) => {
    console.error(err);
  },
});
