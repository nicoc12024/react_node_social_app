import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../axios";

const useFollow = () => {
  const [followedUserIds, setFollowedUserIds] = useState([]);
  const queryClient = useQueryClient();

  // Follow/Unfollow Mutation
  const followUnfollowMutation = useMutation(
    (userToFollowId) => {
      if (followedUserIds.includes(userToFollowId))
        return makeRequest.delete("/relationships?userId=" + userToFollowId);
      return makeRequest.post("/relationships", { userId: userToFollowId });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["relationships"]);
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  // Relationship Data for the current user
  const { data: currentUserFollowing } = useQuery(["relationships"], async () => {
    const res = await makeRequest.get("/relationships/relationships-for-current-user");
    return res.data;
  });

  // Effect to set followedUserIds
  useEffect(() => {
    if (currentUserFollowing) setFollowedUserIds(currentUserFollowing);
  }, [currentUserFollowing]);

  // Function to handle follow/unfollow
  const handleFollow = (userToFollowId) => {
    const isFollowing = followedUserIds.includes(userToFollowId);
    followUnfollowMutation.mutate(userToFollowId, {
      onSuccess: () => {
        if (isFollowing) {
          setFollowedUserIds(followedUserIds.filter((id) => id !== userToFollowId));
        } else {
          setFollowedUserIds([...followedUserIds, userToFollowId]);
        }
      },
    });
  };

  return {
    followedUserIds,
    setFollowedUserIds,
    handleFollow,
    currentUserFollowing,
  };
};

export default useFollow;
