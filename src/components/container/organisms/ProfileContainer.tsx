"use client";

import { supabase } from "@/lib/supabase";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form"; // useFormをインポート
import Profile from "@/components/presentational/organisms/Profile";

// コンポーネント化できる
export default function ProfileContainer() {
  const { data: session, status } = useSession();
  const username = session?.user?.username;

  const form = useForm(); // useFormのフックを使用
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
  }, [username, form.setValue]);

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

  return (
    <Profile
      form={form}
      avatar={avatar}
      username={username}
      bio={bio}
      isEditing={isEditing}
      setIsEditing={setIsEditing}
      saveBio={saveBio}
      changeAvatar={changeAvatar}
      status={status}
    ></Profile>
  );
}
