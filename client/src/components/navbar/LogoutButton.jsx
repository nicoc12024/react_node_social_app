import LogoutIcon from "@mui/icons-material/Logout";

export default function LogoutButton({
  className,
  onClick,
  onMouseEnter,
  onMouseLeave,
  showLogoutTooltip,
}) {
  return (
    <div
      className={`flex items-center hover:bg-gray-300 rounded-md p-[6px] cursor-pointer relative ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <LogoutIcon fontSize="small" onClick={onClick} />
      {showLogoutTooltip && (
        <div className="absolute px-[10px] py-[4px] bg-gray-600 top-[41px] right-[0px] rounded-md text-gray-100">
          <p>Logout</p>
        </div>
      )}
    </div>
  );
}
