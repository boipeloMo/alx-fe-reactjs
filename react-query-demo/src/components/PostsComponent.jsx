import React from "react";
import { useQuery } from "react-query";

// Fetch function
const fetchPosts = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
};

const PostsComponent = () => {
  const { data, error, isLoading, isError, refetch } = useQuery(
    "posts", // Query key (used for caching)
    fetchPosts
  );

  if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-4">Posts from JSONPlaceholder</h2>
      <button
        onClick={() => refetch()}
        className="mb-4 bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Refetch Posts
      </button>
      <ul className="space-y-3">
        {data.map((post) => (
          <li key={post.id} className="border p-3 rounded shadow">
            <h3 className="font-semibold">{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsComponent;
