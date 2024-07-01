"use client";

import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";

export default function AddPost({ addPost }: any) {
  // const [isEmpty, setIsEmpty] = useState(true);
  const form = useForm({
    defaultValues: {
      content: "",
    },
  });

  // テキストエリアの値を監視
  const content = form.watch("content");

  const onSubmit = async ({ content }: any) => {
    await addPost({ content });
    form.reset();
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="what is happening?!"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={!content}>
            Post
          </Button>
        </div>
      </form>
    </Form>
  );
}
