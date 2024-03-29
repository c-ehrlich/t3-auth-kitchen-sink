import { type NextPage } from "next";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { data: session } = useSession();

  const secretMessage = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: session?.user !== undefined }
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-3xl text-white">Auth demo</h1>
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-center text-2xl text-white">
            {session && <span>Logged in as {session.user?.name}</span>}
            {secretMessage.data && <span> - {secretMessage.data}</span>}
          </p>
          <button
            className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
            onClick={session ? () => void signOut() : () => void signIn()}
          >
            {session ? "Sign out" : "Sign in"}
          </button>
        </div>
        <ul className="text-white">
          <li className="flex flex-col">
            <Link href="/00-context">- Context</Link>
            <Link href="/01-require">- require</Link>
            <Link href="/02-gssp">- gSSP</Link>
            <Link href="/03-gssp-redirect">- gSSP redirect</Link>
            <Link href="/04-redirect-clientside">- Redirect Client-side</Link>
            <Link href="/05-middleware">- middleware (requires jwt)</Link>
          </li>
        </ul>
      </div>
    </main>
  );
};

export default Home;
