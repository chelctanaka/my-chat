"use client";

import Loading from "@/components/presentational/atoms/Loading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Textarea from "@/components/presentational/atoms/Textarea";
import Button from "@/components/presentational/atoms/Button";
import { UseFormReturn } from "react-hook-form";
import Input from "../atoms/Input";
// import Input from "@/components/presentational/atoms/Input";

type ProfileProps = {
  form: UseFormReturn<any>;
  avatar: string;
  username: string | undefined;
  bio: string | undefined;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  saveBio: (e: React.FormEvent<HTMLFormElement>) => void;
  changeAvatar: (e: React.ChangeEvent<HTMLInputElement>) => void;
  status: string | undefined;
};

export default function Profile({
  avatar,
  username,
  bio,
  isEditing,
  setIsEditing,
  form,
  saveBio,
  changeAvatar,
  status,
}: ProfileProps) {
  if (status === "loading") {
    return <Loading />;
  }
  return (
    <Card className="w-[350px] mx-auto">
      <form onSubmit={form.handleSubmit(saveBio)}>
        <CardHeader>
          <div className="flex items-center">
            <Avatar className="mr-2">
              <AvatarImage src={avatar} alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {isEditing && (
              <Input
                id="image"
                name="image"
                type="file"
                onChange={changeAvatar}
              />
            )}
          </div>
          <CardTitle>{username}</CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <Textarea
              register={form.register("bio")}
              className="w-full h-24 p-2 border rounded resize-none text-base"
            />
          ) : (
            <p className="w-full h-24 p-2 border rounded text-base">{bio}</p>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {isEditing ? (
            <Button type="submit">Save</Button>
          ) : (
            <Button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setIsEditing(true);
              }}
            >
              Edit profile
            </Button>
          )}
          {isEditing && (
            <Button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setIsEditing(false);
              }}
              className="ml-2"
            >
              Cancel
            </Button>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
