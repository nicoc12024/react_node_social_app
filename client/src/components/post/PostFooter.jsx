import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";

const PostFooter = ({
  isLoading,
  data,
  currentUser,
  handleLike,
  post,
  setCommentOpen,
  commentOpen,
}) => (
  <div className="flex items-center gap-5">
    <div className="flex items-center gap-2 cursor-pointer text-xs">
      {isLoading ? (
        "Loading"
      ) : data.includes(currentUser.id) ? (
        <FavoriteOutlinedIcon
          className="text-red-500"
          onClick={handleLike}
          data-testid="liked-icon-red"
        />
      ) : (
        <FavoriteBorderOutlinedIcon onClick={handleLike} data-testid="like-icon" />
      )}
      {data ? data.length : 0} Likes
    </div>
    <div
      className="flex items-center gap-2 cursor-pointer text-xs"
      onClick={() => setCommentOpen(!commentOpen)}
    >
      <TextsmsOutlinedIcon />
      {post ? post.numberOfComments : 0} Comments
    </div>
    <div className="flex items-center gap-2 cursor-pointer text-xs">
      <ShareOutlinedIcon />
      Share
    </div>
  </div>
);

export default PostFooter;
