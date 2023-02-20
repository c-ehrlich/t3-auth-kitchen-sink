import { useRouter } from "next/router";
import { api, getBaseUrl } from "../utils/api";

export default function AuthedPage() {
  const router = useRouter();
  console.log(router.basePath);

  // `authedHello` is the example Create T3 App "hello" procedure
  // but as a protectedProcedure, ie throws "UNAUTHORIZED" if no session.
  // Replace this with a middleware that throws on whatever condition you need it to.
  const secret = api.example.getSecretMessage.useQuery(undefined, {
    retry: (_count, err) => {
      // `onError` only runs once React Query stops retrying
      if (err.data?.code === "UNAUTHORIZED") {
        return false;
      }
      return true;
    },
    onError: (err) => {
      if (err.data?.code === "UNAUTHORIZED") {
        void router.push(
          `/api/auth/signin?error=SessionRequired&callbackUrl=${getBaseUrl()}/04-redirect-clientside`
        );
      }
    },
  });

  return (
    <div>
      <h1>Authed Page</h1>
      <p>{secret.data ?? "Loading..."}</p>
    </div>
  );
}
