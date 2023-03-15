import { type GetServerSidePropsContext } from "next";
import { useSession } from "next-auth/react";
import { getServerAuthSession } from "~/server/auth";

export default function Require() {
  const { data: session, status } = useSession({
    required: true,
    // onUnauthenticated() {
    //   // Can implement your own logic here
    // },
  });

  if (status === "loading") {
    return "Loading...";
  }

  return (
    <div>
      <h1>require</h1>
      <p>super secret message</p>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return {
    props: {
      session: await getServerAuthSession(ctx),
    },
  };
}
