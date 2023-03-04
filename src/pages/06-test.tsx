import {
  type InferGetServerSidePropsType,
  type GetServerSideProps,
  GetServerSidePropsContext,
} from "next";
import { useSession } from "next-auth/react";
import { getServerAuthSession } from "~/server/auth";

export default function GsspPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
  // ^?
) {
  const { data: session } = useSession();
  return <pre>{JSON.stringify(props, null, 2)}</pre>;
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return {
    props: {
      session: await getServerAuthSession(ctx),
      foo: "bar",
    },
  };
};
