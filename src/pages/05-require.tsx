import { useSession } from "next-auth/react";

export default function Require() {
  const { status } = useSession({
    required: true,
    // onUnauthenticated() {
    //   // Can implement your own callback here
    // },
  });

  if (status === "loading") {
    return "Loading...";
  }

  return "User is logged in";
}
