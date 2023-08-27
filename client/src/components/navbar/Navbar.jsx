import React from "react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import LogoutButton from "./LogoutButton";
import ProfileButton from "./ProfileButton";
import HomeButton from "./HomeButton";

/**
 * Navbar Component
 *
 * This component is responsible for rendering the navigation bar at the top of the application.
 * It provides navigational links and interactive buttons for the home page, user profile, and logout.
 *
 * Features:
 * - Home Button: Navigates to the home page, with tooltip functionality for additional context.
 * - Profile Button: Redirects to the user's profile page, available on both mobile and desktop.
 * - Logout Button: Logs out the current user, available on both mobile and desktop.
 * - Layout Responsiveness: Adjusts the layout based on the screen size (using md breakpoints).
 * - Brand Logo/Link: Displays the application brand "Social" and links to the home page.
 *
 * State:
 * - showHomeTooltip: Controls the visibility of the tooltip for the Home Button.
 * - showProfileTooltip: Controls the visibility of the tooltip for the Profile Button.
 * - showLogoutTooltip: Controls the visibility of the tooltip for the Logout Button.
 *
 * Context:
 * - AuthContext: Consumes the current user information and logout functionality.
 *
 * Dependencies:
 * - HomeButton, ProfileButton, LogoutButton: Components for the interactive buttons in the navbar.
 * - react-router-dom: Used for navigation and linking within the application.
 */

export default function Navbar() {
  const [showHomeTooltip, setShowHomeTooltip] = useState(false);
  const [showProfileTooltip, setShowProfileTooltip] = useState(false);
  const [showLogoutTooltip, setShowLogoutTooltip] = useState(false);

  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between py-[10px] px-[20px] h-[50px] border-b-[1px] sticky bg-white z-10 top-0">
      {/* Top left side of the navbar */}
      <div className="flex justify-between md:justify-start items-center w-full gap-4">
        <Link
          to="/"
          className="text-lg font-bold uppercase text-violet-700 cursor-pointer"
        >
          Social
        </Link>
        {/* Home Button */}
        <HomeButton
          onClick={() => navigate("/")}
          onMouseEnter={() => setShowHomeTooltip(true)}
          onMouseLeave={() => setShowHomeTooltip(false)}
          showHomeTooltip={showHomeTooltip}
        />
        {/* Profile Button */}
        <ProfileButton
          className="md:hidden"
          onMouseEnter={() => setShowProfileTooltip(true)}
          onMouseLeave={() => setShowProfileTooltip(false)}
          onClick={() => navigate(`/profile/${currentUser.id}`)}
          showProfileTooltip={showProfileTooltip}
        />
        {/* Logout Button */}
        <LogoutButton
          className="md:hidden"
          onClick={() => logout()}
          onMouseEnter={() => setShowLogoutTooltip(true)}
          onMouseLeave={() => setShowLogoutTooltip(false)}
          showLogoutTooltip={showLogoutTooltip}
        />
      </div>

      {/* Top right side of the navbar */}
      <div className="md:flex hidden items-center justify-end gap-4 w-full">
        {/* Profile Button */}
        <ProfileButton
          onMouseEnter={() => setShowProfileTooltip(true)}
          onMouseLeave={() => setShowProfileTooltip(false)}
          onClick={() => navigate(`/profile/${currentUser.id}`)}
          showProfileTooltip={showProfileTooltip}
          desktop="desktop"
          currentUser={currentUser}
        />
        {/* Logout Button */}
        <LogoutButton
          onClick={() => logout()}
          onMouseEnter={() => setShowLogoutTooltip(true)}
          onMouseLeave={() => setShowLogoutTooltip(false)}
          showLogoutTooltip={showLogoutTooltip}
        />
      </div>
    </div>
  );
}
