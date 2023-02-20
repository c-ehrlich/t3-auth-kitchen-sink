import { useSession } from "next-auth/react";
import { api } from "~/utils/api";

export default function ProtectedProcedure() {
  // if you want to know how to ssr this, check out my previous video!
  const { data: session } = useSession();
  const secret = api.example.getSecretMessage.useQuery(undefined, {
    enabled: session?.user !== undefined,
  });

  return (
    <div>
      <h1>Protected Procedure</h1>
      <pre>{JSON.stringify(secret, null, 2)}</pre>
    </div>
  );
}
