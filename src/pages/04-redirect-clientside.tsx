import { useRouter } from "next/router";
import { api, getBaseUrl } from "../utils/api";

export default function AuthedPage() {
  const router = useRouter();

  const secret = api.example.getSecretMessage.useQuery(undefined, {
    retry: (count, err) => {
      // `onError` only runs once React Query stops retrying
      if (err.data?.code === "UNAUTHORIZED") {
        return false;
      }
      return count > 3 ? false : true;
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
