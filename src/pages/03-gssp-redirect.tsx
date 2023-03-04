import { type GetServerSidePropsContext } from "next";
import { useSession } from "next-auth/react";
import { getServerAuthSession } from "~/server/auth";
import { getBaseUrl } from "~/utils/api";

export default function GsspRedirect() {
  const { data: session } = useSession();

  return (
    <div>
      <h1>gSSP Redirect</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getServerAuthSession(ctx);

  if (!session) {
    return {
      redirect: {
        // destination: "/",
        destination: `/api/auth/signin?callbackUrl=${getBaseUrl()}/03-gssp-redirect`,
        permanent: false,
      },
    };
  }

  return { props: { session } };
}
