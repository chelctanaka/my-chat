"use client";

import { Form, FormField, FormItem, FormControl } from "../../ui/form";
import Button from "../atoms/Button";
import Textarea from "../atoms/Textarea";

interface PostFormProps {
  form: any;
  content: any;
  onSubmit: (data: any) => void;
}

export default function PostForm({ form, content, onSubmit }: PostFormProps) {
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
                  field={field}
                />
              </FormControl>
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
