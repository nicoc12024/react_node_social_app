import { useEffect, useState } from "react";
import { makeRequest } from "../../axios";

const useUserSuggestions = (followedUserIds) => {
  const [users, setUsers] = useState([]);
  const [usersInBasket, setUsersInBasket] = useState([]);

  // Function to handle follow user in basket and remove from basket once followed
  const handleFollowUserInBasket = (item) => {
    setUsersInBasket((prev) => [...prev.filter((i) => i !== item)]);
  };

  // Get users not followed by the current user
  useEffect(() => {
    makeRequest
      .get("/users")
      .then((response) => {
        const usersNotFollowed = response.data.filter(
          (user) => !followedUserIds.includes(user.id)
        );
        setUsers(usersNotFollowed);
        setUsersInBasket(usersNotFollowed.slice(0, 8));
      })
      .catch((error) => console.error(error));
  }, [followedUserIds]);

  return { users, usersInBasket, handleFollowUserInBasket };
};

export default useUserSuggestions;
