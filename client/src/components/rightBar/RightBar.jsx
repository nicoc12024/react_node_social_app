import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import { TransitionGroup } from "react-transition-group";
import UserListItem from "./UserListItem";
import useUserSuggestions from "./useUserSuggestion";
import useFollow from "../../useHooksShared/useFollow";

export default function RightBar() {
  const { currentUser } = useContext(AuthContext);

  const { followedUserIds, handleFollow } = useFollow();

  const { usersInBasket, handleFollowUserInBasket } = useUserSuggestions(followedUserIds);

  return (
    <div className="sticky lg:block bg-[#f6f3f3] hidden text-sm w-[27%] overflow-y-scroll h-[calc(100vh-50px)] top-[50px]">
      <div className="py-5 lg:p-4">
        <div className="item p-5 mb-5 shadow-md bg-white">
          {/* Suggestions for you */}
          <span className="text-gray-800">Suggestions For You</span>
          <div>
            {usersInBasket && (
              <Box sx={{ mt: 1 }}>
                <List>
                  <TransitionGroup>
                    {usersInBasket.map((item) => (
                      <Collapse key={item.id}>
                        <UserListItem
                          item={item}
                          handleFollowUserInBasket={handleFollowUserInBasket}
                          handleFollow={handleFollow}
                          currentUser={currentUser}
                        />
                      </Collapse>
                    ))}
                  </TransitionGroup>
                </List>
              </Box>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
