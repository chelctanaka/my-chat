"use client";

import Loading from "@/components/my/loading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form"; // useFormをインポート

export default function Profile() {
  const { data: session, status } = useSession();
  const username = session?.user?.username;

  const { register, handleSubmit, setValue } = useForm(); // useFormのフックを使用
  const [avatar, setAvatar] = useState("");
  const [bio, setBio] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [file, setFile] = useState<File | null>(null); // ファイルの状態を追加

  useEffect(() => {
    async function fetchBio() {
      const response = await fetch(`/api/user/bio/${username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { user } = await response.json();
      setBio(user.bio);

      const { data } = await supabase.storage
        .from("avatar")
        .getPublicUrl(user.image);

      setAvatar(data.publicUrl);
    }
    if (username) {
      fetchBio();
    }
  }, [username, setValue]);

  const changeAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile); // ファイルを状態に保存

      const imageUrl = URL.createObjectURL(selectedFile);
      setAvatar(imageUrl);
    }
  };

  const saveBio = async (data: any) => {
    if (file && file.type.match("image.*")) {
      // fileを使用
      const extension = file.name.split(".")[1];
      const fileName = `${uuidv4()}.${extension}`;

      const { error } = await supabase.storage
        .from("avatar")
        .upload(fileName, file);

      const response = await fetch(`/api/user/avatar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, image: fileName }),
      });

      if (response.ok) {
        // await supabase.storage.from("avatar").remove([fileName]);

        const { data } = await supabase.storage
          .from("avatar")
          .getPublicUrl(fileName);

        console.log(data.publicUrl);
        setAvatar(data.publicUrl);
      }
    }

    await fetch(`/api/user/bio`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, bio: data.bio }),
    });

    setIsEditing(false);
  };

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <Card className="w-[350px] mx-auto">
      <form onSubmit={handleSubmit(saveBio)}>
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
              {...register("bio")}
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
