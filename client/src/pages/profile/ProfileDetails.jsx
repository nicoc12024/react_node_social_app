import React from "react";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";

const ProfileDetails = ({
  data,
  relationshipError,
  rIsLoading,
  userId,
  currentUser,
  setOpenUpdate,
  handleFollow,
  relationshipData,
}) => (
  <div className="h-fit shadow-sm rounded-[20px] xl:gap-4 bg-white text-[#555] xl:py-[75px] px-[20px] py-8 flex flex-col xl:flex-row items-center justify-center mb-5">
    {/* Socials Icons */}
    <div className="w-full flex items-center justify-center gap-4">
      <a href="http://facebook.com">
        <FacebookTwoToneIcon fontSize="large" className="text-[#555]" />
      </a>
      <a href="http://facebook.com">
        <InstagramIcon fontSize="large" className="text-[#555]" />
      </a>
      <a href="http://facebook.com">
        <TwitterIcon fontSize="large" className="text-[#555]" />
      </a>
      <a href="http://facebook.com">
        <LinkedInIcon fontSize="large" className="text-[#555]" />
      </a>
    </div>
    {/* Info details */}
    <div className="w-full flex flex-col items-center gap-2 ">
      {/* Name */}
      <span className="text-[30px] font-semibold text-center">{data.name}</span>
      <div className="w-full flex items-center justify-center gap-4 xl:justify-between">
        {/* City */}
        <div className="flex items-center gap-1 text-[#555]">
          <PlaceIcon />
          <span className="text-[12px]">{data.city}</span>
        </div>
        {/* Website */}
        <div className="flex items-center gap-1 text-[#555]">
          <LanguageIcon />
          <a
            href={`http://${data.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px]"
          >
            {data.website}
          </a>
        </div>
      </div>
      {relationshipError ? (
        <div>An error occurred</div>
      ) : rIsLoading ? (
        "Loading"
      ) : userId === currentUser.id ? (
        <button
          onClick={() => setOpenUpdate(true)}
          className="border-none bg-[#5271ff] text-white py-2 px-5 rounded-[5px] cursor-pointer"
        >
          Update
        </button>
      ) : (
        <button
          onClick={handleFollow}
          className="border-none bg-[#5271ff] text-white py-2 px-5 rounded-[5px] cursor-pointer"
        >
          {relationshipData.includes(currentUser.id) ? "Following" : "Follow"}
        </button>
      )}
    </div>
    {/* Email */}
    <div className="w-full flex items-center xl:justify-end justify-center gap-2 mt-4">
      <EmailOutlinedIcon />
    </div>
  </div>
);

export default ProfileDetails;
