import React, { useContext, useEffect } from "react";
import Posts from "../../components/posts/Posts";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import Update from "../../components/update/Update";
import useProfile from "./useProfile";
import CoverProfilePictures from "./CoverProfilePictures";
import ProfileDetails from "./ProfileDetails";
import BeatLoader from "react-spinners/ClipLoader";

const Profile = () => {
  const userId = parseInt(useLocation().pathname.split("/")[2]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { currentUser } = useContext(AuthContext);
  const {
    userLoading: isLoading,
    userData: data,
    userError: error,
    relationshipLoading: rIsLoading,
    relationshipData,
    relationshipError,
    setOpenUpdate,
    openUpdate,
    handleFollow,
  } = useProfile(userId);

  return (
    <div className="bg-[#f6f3f3] lg:w-full min-h-screen w-screen">
      {error ? (
        <div>An error has ocurred</div>
      ) : isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <BeatLoader color="#36d7b7" size={60} />
        </div>
      ) : (
        <>
          {/* Cover and profile picture */}
          <CoverProfilePictures
            id={data.id}
            coverPicture={data.coverPicture}
            profilePicture={data.profilePicture}
          />
          {/* Profile Details & Posts */}
          <div className="py-[20px] w-[80%] mx-auto">
            <ProfileDetails
              data={data}
              relationshipError={relationshipError}
              rIsLoading={rIsLoading}
              userId={userId}
              currentUser={currentUser}
              setOpenUpdate={setOpenUpdate}
              handleFollow={handleFollow}
              relationshipData={relationshipData}
            />
            <Posts userId={userId} />
          </div>
          {/* Update modal */}
          {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
        </>
      )}
    </div>
  );
};

export default Profile;
