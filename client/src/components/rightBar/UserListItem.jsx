import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";

const UserListItem = ({ item, handleFollowUserInBasket, handleFollow, currentUser }) => {
  if (item.id === currentUser.id) {
    return null;
  }

  return (
    <ListItem
      className="gap-2 my-2 !p-0"
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete"
          title="Delete"
          onClick={() => {
            handleFollowUserInBasket(item);
            handleFollow(item.id);
          }}
        >
          <ListItemText primary="Follow" />
        </IconButton>
      }
    >
      <div>
        <img
          src={`/upload/${item.id}/${item.profilePicture}`}
          className="w-[40px] h-[40px] rounded-full object-cover"
          alt={item.name}
          loading="lazy"
        />
      </div>
      <ListItemText primary={item.name} />
    </ListItem>
  );
};

export default UserListItem;
