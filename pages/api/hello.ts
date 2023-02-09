// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import webpush from 'web-push'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const vapidKey = webpush.generateVAPIDKeys()

  // const vapidKey = {
  //   publicKey:
  //     "BOJbNAs15gxY3Fj75-HbUzBEqyp7I40uG5yHSYIqRQYIf2b9MfZwod9g_Lb16GG2asT304tPTBMlcKAC_NXQj7g",
  //   privateKey: "Uzp_LnwbGOvkTY5NPy6p6Mnw3Tp1ElrrSnJR02bmA8o",
  // };
  // webpush.setVapidDetails(
  //   "mailto:abgkcode@gmail.com",
  //   vapidKey.publicKey,
  //   vapidKey.privateKey
  // );
  // const subscription = req.body;
  res.status(200).json({ name: vapidKey.privateKey })
}
