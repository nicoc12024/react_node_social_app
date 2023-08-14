import Stories from "../../components/stories/Stories";
import Posts from "../../components/posts/Posts";
import SharePost from "../../components/sharePost/SharePost";
import { useEffect } from "react";

// Home Component
// This component serves as the main layout for the home page.

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#f6f3f3] md:px-[70px] md:py-[20px] p-2 mx-auto min-h-screen lg:w-full w-screen">
      <Stories />
      <SharePost />
      <Posts />
    </div>
  );
};

export default Home;
