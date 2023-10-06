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
    const { prompt } = req.body;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      temperature: 0,
      stream: false,
      max_tokens: 300,
      prompt,
    });

    res.json({ result: response.data.choices[0].text });
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
