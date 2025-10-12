import React from "react";
import { useParams } from "react-router-dom";

const Post = () => {
  const { id } = useParams();
  return <h3>Showing details for Post ID: {id}</h3>;
};

export default Post;
