import {
  type InferGetServerSidePropsType,
  type GetServerSidePropsContext,
} from "next";
import { useSession } from "next-auth/react";
import { getServerAuthSession } from "~/server/auth";

export default function GsspPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  console.log("props", props);

  const { data: session } = useSession();

  return (
    <div>
      <h1>gSSP</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return {
    props: {
      session: await getServerAuthSession(ctx),
      foo: "bar",
    },
  };
}
