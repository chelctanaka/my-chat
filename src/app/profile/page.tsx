import { SessionProvider } from "next-auth/react";
import Profile from "./profile";

export default function Page() {
  return (
    <SessionProvider>
      <Profile />
    </SessionProvider>
  );
}
