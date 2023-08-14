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
    <div
      className={`flex items-center hover:bg-gray-300 rounded-md p-[6px] cursor-pointer relative ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      {desktop ? (
        <>
          <img
            src={`/upload/${currentUser.id}/${currentUser.profilePicture}`}
            alt=""
            className="w-[25px] h-[25px] rounded-[50%] object-cover"
          />
        </>
      ) : (
        <PersonOutlinedIcon fontSize="small" className="cursor-pointer md:block hidden" />
      )}

      {showProfileTooltip && (
        <div className="absolute px-[10px] py-[4px] bg-gray-600 top-[41px] left-[-16px] rounded-md text-gray-100">
          <p>Profile</p>
        </div>
      )}
    </div>
  );
}
