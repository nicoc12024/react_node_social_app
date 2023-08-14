import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";

const useProfile = (userId) => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const { currentUser } = useContext(AuthContext);
  // User Data
  const {
    isLoading: userLoading,
    data: userData,
    error: userError,
  } = useQuery(["user", userId], async () => {
    const res = await makeRequest.get("/users/find/" + userId);
    return res.data;
  });

  // Relationship Data
  const {
    isLoading: relationshipLoading,
    data: relationshipData,
    error: relationshipError,
  } = useQuery(["relationship", userId], async () => {
    const res = await makeRequest.get("/relationships?followedUserId=" + userId);
    return res.data;
  });

  // Follow/Unfollow Mutation
  const queryClient = useQueryClient();
  const followUnfollowMutation = useMutation(
    (following) => {
      if (following) return makeRequest.delete("/relationships?userId=" + userId);
      return makeRequest.post("/relationships", { userId });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["relationship"]);
      },
    }
  );

  // Error Handling
  if (userError || relationshipError) {
    console.log(userError, relationshipError);
  }

  const handleFollow = () => {
    followUnfollowMutation.mutate(relationshipData.includes(currentUser.id));
  };

  return {
    userLoading,
    userData,
    userError,
    relationshipLoading,
    relationshipData,
    relationshipError,
    openUpdate,
    setOpenUpdate,
    handleFollow,
  };
};

export default useProfile;
