import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";

// AvatarImageと AvatarFallbackはセット
export default function UserAvatar({ src, alt }: { src: string; alt: string }) {
  return (
    <Avatar>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
