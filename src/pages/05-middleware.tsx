import { useSession } from "next-auth/react";

// this is protected by src/middleware.ts
// that middleware requires the jwt strategy in order to work

export default function ProtectedByMiddleware() {
  const session = useSession();
  return (
    <div>
      <h1>Protected By Middleware</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}

// Usage of NextAuth.js with Next.js middleware [requires the use of the JWT session strategy](https://next-auth.js.org/configuration/nextjs#caveats) for authentication. This is because the middleware is only able to access the session cookie if it is a JWT. By default, Create T3 App is configured to use the **default** database strategy, in combination with Prisma as the database adapter.
// After switching to the JWT session strategy. Make sure to update the `session` callback in `src/server/auth.ts`.
// The `user` object will be `undefined`. Instead, retrieve the user's ID from the `token` object.
// I.e.:
//
// ```diff:server/auth.ts
//   export const authOptions: NextAuthOptions = {
// +   session: {
// +     strategy: "jwt",
// +   },
//     callbacks: {
// -     session({ session, user }) {
// +     session({ session, token }) {
// -       if (session.user) {
// +       if (session.user && token.sub) {
// -         session.user.id = user.id;
// +         session.user.id = token.sub;
//         }
//         return session;
//       }
//     },
//   };
// ```
