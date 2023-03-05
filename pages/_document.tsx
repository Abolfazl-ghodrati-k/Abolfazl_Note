import { link } from "fs";
import { Html, Head, Main, NextScript } from "next/document";
import React from "react";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="webmanifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png"></link>
        <script src="http://172.27.208.1:8097"></script>
        <meta name="theme-color" content="#3544f6" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
