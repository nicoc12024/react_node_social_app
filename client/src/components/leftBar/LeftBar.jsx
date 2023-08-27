import React, { useContext } from "react";
import Friends from "../../assets/1.png";
import Groups from "../../assets/2.png";
import Market from "../../assets/3.png";
import Watch from "../../assets/4.png";
import Memories from "../../assets/5.png";
import Events from "../../assets/6.png";
import Gaming from "../../assets/7.png";
import Gallery from "../../assets/8.png";
import Videos from "../../assets/9.png";
import Messages from "../../assets/10.png";
import Tutorials from "../../assets/11.png";
import Courses from "../../assets/12.png";
import Fund from "../../assets/13.png";
import { AuthContext } from "../../context/authContext";

export default function LeftBar() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="sticky lg:block hidden text-sm p-4 w-[18%] overflow-y-scroll h-[calc(100vh-50px)] bg-white top-[50px]">
      <div className="container">
        {/* Current user profile picture and name section */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2">
            <img
              src={`/upload/${currentUser.id}/${currentUser.profilePicture}`}
              alt=""
              className="w-[25px] h-[25px] rounded-full object-cover"
            />
            <span>{currentUser.name}</span>
          </div>
          {/*  Main menu items like Friends, Groups, etc. */}
          <div className="flex items-center gap-3">
            <img className="w-[25] h-[25px]" src={Friends} alt="" />
            <span>Friends</span>
          </div>
          <div className="flex items-center gap-3">
            <img className="w-[25] h-[25px]" src={Groups} alt="" />
            <span>Groups</span>
          </div>
          <div className="flex items-center gap-3">
            <img className="w-[25] h-[25px]" src={Market} alt="" />
            <span>Marketplace</span>
          </div>
          <div className="flex items-center gap-3">
            <img className="w-[25] h-[25px]" src={Watch} alt="" />
            <span>Watch</span>
          </div>
          <div className="flex items-center gap-3">
            <img className="w-[25] h-[25px]" src={Memories} alt="" />
            <span>Memories</span>
          </div>
        </div>
        <hr className="my-4" />
        {/* Shortcuts section */}
        <div className="flex flex-col gap-5">
          <span>Your shortcuts</span>
          <div className="flex items-center gap-3">
            <img className="w-[25] h-[25px]" src={Events} alt="" />
            <span>Events</span>
          </div>
          <div className="flex items-center gap-3">
            <img className="w-[25] h-[25px]" src={Gaming} alt="" />
            <span>Gaming</span>
          </div>
          <div className="flex items-center gap-3">
            <img className="w-[25] h-[25px]" src={Gallery} alt="" />
            <span>Gallery</span>
          </div>
          <div className="flex items-center gap-3">
            <img className="w-[25] h-[25px]" src={Videos} alt="" />
            <span>Videos</span>
          </div>
          <div className="flex items-center gap-3">
            <img className="w-[25] h-[25px]" src={Messages} alt="" />
            <span>Messages</span>
          </div>
        </div>
        <hr className="my-4" />
        {/* Others section, containing items like Fundraiser, Tutorials, Courses, etc. */}
        <div className="flex flex-col gap-5">
          <span>Others</span>
          <div className="flex items-center gap-3">
            <img className="w-[25] h-[25px]" src={Fund} alt="" />
            <span>Fundraiser</span>
          </div>
          <div className="flex items-center gap-3">
            <img className="w-[25] h-[25px]" src={Tutorials} alt="" />
            <span>Tutorials</span>
          </div>
          <div className="flex items-center gap-3">
            <img className="w-[25] h-[25px]" src={Courses} alt="" />
            <span>Courses</span>
          </div>
          <div className="flex items-center gap-3">
            <img className="w-[25] h-[25px]" src={Courses} alt="" />
            <span>Courses</span>
          </div>
          <div className="flex items-center gap-3">
            <img className="w-[25] h-[25px]" src={Courses} alt="" />
            <span>Courses</span>
          </div>
          <div className="flex items-center gap-3">
            <img className="w-[25] h-[25px]" src={Courses} alt="" />
            <span>Courses</span>
          </div>
          <div className="flex items-center gap-3">
            <img className="w-[25] h-[25px]" src={Courses} alt="" />
            <span>Courses</span>
          </div>
          <div className="flex items-center gap-3">
            <img className="w-[25] h-[25px]" src={Courses} alt="" />
            <span>Courses</span>
          </div>
          <div className="flex items-center gap-3">
            <img className="w-[25] h-[25px]" src={Courses} alt="" />
            <span>Courses</span>
          </div>
          <div className="flex items-center gap-3">
            <img className="w-[25] h-[25px]" src={Courses} alt="" />
            <span>Courses</span>
          </div>
          <div className="flex items-center gap-3">
            <img className="w-[25] h-[25px]" src={Courses} alt="" />
            <span>Courses</span>
          </div>
        </div>
      </div>
    </div>
  );
}
