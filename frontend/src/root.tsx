// @refresh reload

import {
  Body,
  Head,
  Html,
  Meta,
  Scripts,
  Title,
} from "solid-start";

import App from "./app";

import "./root.css";

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>Draw Contest</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <App />
        <Scripts />
      </Body>
    </Html>
  );
}
