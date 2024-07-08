import { SessionProvider } from "next-auth/react";
import ProfileContainer from "@/components/container/organisms/ProfileContainer";

export default function Page() {
  return (
    <SessionProvider>
      <ProfileContainer />
    </SessionProvider>
  );
}
