import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useState } from "react";

export const useSharePost = () => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const queryClient = useQueryClient();

  const createPostMutation = useMutation(
    (newPost) => {
      return makeRequest.post("/posts", newPost);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("posts");
      },
    }
  );

  const uploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload/post", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleShare = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    let imageUrl = "";
    if (file) imageUrl = await uploadImage();
    createPostMutation.mutate({ description, image: imageUrl });
    setDescription("");
    setFile(null);
    setIsSubmitting(false);
  };

  return {
    file,
    setFile,
    description,
    setDescription,
    isSubmitting,
    handleShare,
  };
};
