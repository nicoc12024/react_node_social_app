import React from "react";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

export default function HomeButton({
  onClick,
  onMouseEnter,
  onMouseLeave,
  showHomeTooltip,
}) {
  return (
    <div
      data-testid="home-button-container"
      className="flex items-center hover:bg-gray-300 rounded-md p-[6px] relative cursor-pointer"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <HomeOutlinedIcon data-testid="home-icon" fontSize="small" onClick={onClick} />
      {showHomeTooltip && (
        <div className="absolute px-[10px] py-[4px] bg-gray-600 top-[41px] left-[-16px] rounded-md text-gray-100">
          <p>Home</p>
        </div>
      )}
    </div>
  );
}
