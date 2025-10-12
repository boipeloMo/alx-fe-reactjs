import React from "react";
import { useParams } from "react-router-dom";

const BlogPost = () => {
  const { id } = useParams();

  return <h3>Showing blog post with ID: {id}</h3>;
};

export default BlogPost;
