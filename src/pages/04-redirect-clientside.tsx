import { useRouter } from "next/router";
import { api, getBaseUrl } from "../utils/api";

export default function AuthedPage() {
  const router = useRouter();

  const authedMutation = api.example.authedMutation.useMutation({
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
    onSuccess: (response) => console.log(response),
  });

  return (
    <div>
      <h1>Authed Page</h1>
      <button
        className="border border-black bg-slate-200 p-2"
        onClick={() => authedMutation.mutate()}
      >
        Authed Mutation
      </button>
    </div>
  );
}
