import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Context() {
  // render UseSession2 only after 2 seconds
  // to show that the context is shared
  const [renderSession2, setRenderSession2] = useState(false);
  setTimeout(() => {
    setRenderSession2(true);
  }, 2000);

  return (
    <div>
      <h1>Context</h1>
      <UseSession1 />
      {renderSession2 ? <UseSession2 /> : null}
    </div>
  );
}

function UseSession1() {
  const { data: session } = useSession();
  return (
    <div>
      <h3>Session 1</h3>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}

function UseSession2() {
  const { data: session } = useSession();
  return (
    <div>
      <h3>Session 2</h3>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
