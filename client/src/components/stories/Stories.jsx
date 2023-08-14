import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const Stories = () => {
  const { currentUser } = useContext(AuthContext);

  // Dummy data
  const stories = [
    {
      id: 1,
      name: "John",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 2,
      name: "John",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 3,
      name: "John",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 4,
      name: "John",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
  ];

  return (
    <div className="flex justify-center lg:gap-2 gap-4 lg:h-[250px] h-[50px] md:h-fit lg:mb-7 mb-3">
      <div className="rounded-md overflow-hidden relative">
        <img
          src={`/upload/${currentUser.id}/${currentUser.profilePicture}`}
          alt=""
          className="md:w-[100%] md:h-[150px] lg:w-[100%] lg:h-[100%] h-[50px] w-[50px] object-cover md:rounded-none rounded-full"
        />
        <span className="absolute bottom-2 left-2 text-white font-semibold hidden">
          {currentUser.name}
        </span>
        <button className="absolute md:bottom-10 top-2 left-2 text-white bg-[#5271ff] border-none w-[30px] h-[30px] cursor-pointer text-2xl flex items-center justify-center rounded-full">
          <div className="absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl">
            +
          </div>
        </button>
      </div>
      {stories.map((story) => (
        <div className="rounded-md overflow-hidden relative gap-2" key={story.id}>
          <img
            src={story.img}
            alt=""
            className="md:w-[100%] md:h-[150px] lg:w-[100%] lg:h-[100%] h-[50px] w-[50px] object-cover md:rounded-none rounded-full"
          />
          <span className="absolute bottom-2 left-2 text-white font-semibold hidden">
            {story.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Stories;
