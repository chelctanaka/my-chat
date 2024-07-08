import Dropdown from "@/components/presentational/molucules/Dropdown";

export default function DropdownContainer({
  id,
  loading,
  fetchPosts,
}: {
  id: number;
  loading: boolean;
  fetchPosts: () => void;
}) {
  const onDelete = async () => {
    const res = await fetch(`/api/post/${id}`, { method: "DELETE" });
    if (!res.ok) {
      throw new Error("Failed to delete post");
    }
    await fetchPosts();
  };

  return <Dropdown onDelete={onDelete} loading={loading} />;
}
