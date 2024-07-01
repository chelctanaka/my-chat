import { Home, LogOut, PencilLine, Search, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth, signOut } from "@/auth";

export default async function Sidebar() {
  const session = await auth();

  return (
    <div className="w-1/3 flex-col justify-start space-y-2">
      <Button variant="ghost">
        <Home className="mr-2" />
        <Link href="/">Home</Link>
      </Button>
      <Button variant="ghost">
        <Search className="mr-2" />
        <Link href="/explore">Explore</Link>
      </Button>
      <Button variant="ghost">
        <UserRound className="mr-2" />
        <Link href="/profile">Profile</Link>
      </Button>
      {session ? (
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <Button variant="ghost">
            <LogOut className="mr-2" />
            Logout
          </Button>
        </form>
      ) : (
        <Button variant="ghost">
          <PencilLine className="mr-2" />
          <Link href="/signup">Sign Up</Link>
        </Button>
      )}
    </div>
  );
}
