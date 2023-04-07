import { Show } from "solid-js";
import { Navigate } from "solid-start";
import jwtManager from "~/application/authentication/jwtManager";
import Home from "~/application/pages/Home";

const isLoggedIn = () => Boolean(jwtManager.getToken());

export default function home() {
  return (
    <Show fallback={<Navigate href="/signup" />} when={isLoggedIn()}>
      <Home />
    </Show>
  );
}
