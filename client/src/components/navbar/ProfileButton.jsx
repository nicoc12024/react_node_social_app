import React from "react";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

export default function ProfileButton({
  className,
  onClick,
  onMouseEnter,
  onMouseLeave,
  showProfileTooltip,
  desktop,
  currentUser,
}) {
  return (
    <button
      className={`flex items-center hover:bg-gray-300 rounded-md p-[6px] cursor-pointer relative ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      data-testid="profile-button-container"
      aria-label="Profile"
    >
      {desktop ? (
        <>
          <img
            src={`/upload/${currentUser.id}/${currentUser.profilePicture}`}
            alt={currentUser.name}
            className="w-[25px] h-[25px] rounded-[50%] object-cover"
          />
        </>
      ) : (
        <PersonOutlinedIcon
          fontSize="small"
          className="cursor-pointer md:block hidden"
          data-testid="profile-icon"
        />
      )}

      {showProfileTooltip && (
        <div className="absolute px-[10px] py-[4px] bg-gray-600 top-[41px] left-[-16px] rounded-md text-gray-100">
          <p>Profile</p>
        </div>
      )}
    </button>
  );
}
