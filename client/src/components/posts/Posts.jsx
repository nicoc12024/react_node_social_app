import Post from "../post/Post";
import { usePosts } from "./usePosts";
import BeatLoader from "react-spinners/ClipLoader";

const Posts = ({ userId }) => {
  // Get posts for the user Profile Page or Home Page when no userId is passed (backend handles this situation)
  const { isLoading, error, data } = usePosts(userId);

  return (
    <div className="flex justify-center flex-col gap-12">
      {error ? (
        "Something went wrong"
      ) : isLoading ? (
        <div className="flex items-center justify-center">
          <BeatLoader color="#36d7b7" size={60} />
        </div>
      ) : (
        data.map((post) => <Post key={post.id} post={post} />)
      )}
    </div>
  );
};

export default Posts;
