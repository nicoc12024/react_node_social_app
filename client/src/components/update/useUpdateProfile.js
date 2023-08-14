import { useState } from "react";
import { makeRequest } from "../../axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateProfile = (user, setCurrentUser, setOpenUpdate) => {
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  const [texts, setTexts] = useState({
    email: user.email,
    name: user.name,
    city: user.city || "",
    website: user.website || "",
  });

  const queryClient = useQueryClient();

  const handleChange = (e) => {
    const updatedTexts = { ...texts, [e.target.name]: e.target.value };
    setTexts(updatedTexts);
  };

  const uploadImage = async (file, type, userId) => {
    try {
      const formData = new FormData();
      const fileName = `${userId}_${type}_${file.name}`;
      formData.append("file", file, fileName);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  // Update user info
  const updateUserInfoMutation = useMutation(
    (user) => {
      return makeRequest.put("/users", user);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["user", user.id]);
      },
    }
  );

  // On click update
  const handleClick = async (e) => {
    e.preventDefault();

    const userId = user.id;

    let coverUrl = cover
      ? await uploadImage(cover, "coverPicture", userId)
      : user.coverPicture;
    let profileUrl = profile
      ? await uploadImage(profile, "profilePicture", userId)
      : user.profilePicture;

    await updateUserInfoMutation.mutateAsync({
      ...texts,
      coverPicture: coverUrl,
      profilePicture: profileUrl,
      id: user.id,
    });

    setCurrentUser({
      ...texts,
      coverPicture: coverUrl,
      profilePicture: profileUrl,
      id: user.id,
    });
    setOpenUpdate(false);
    setCover(null);
    setProfile(null);
  };

  return {
    cover,
    setCover,
    profile,
    setProfile,
    texts,
    handleChange,
    handleClick,
  };
};
