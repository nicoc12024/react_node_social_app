import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useUpdateProfile } from "./useUpdateProfile";
import ImageUpload from "./ImageUpload";
import TextInput from "./TextInput";
import Button from "./Button";

// Update Component
// This component provides the functionality for a user to update their profile.
// It includes fields for updating the cover picture, profile picture, name, city, and website.
// Additionally, it provides buttons to update the information or close the update form.

export default function Update({ setOpenUpdate, user }) {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const { cover, setCover, profile, setProfile, texts, handleChange, handleClick } =
    useUpdateProfile(user, setCurrentUser, setOpenUpdate);

  return (
    <div className="update fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="wrapper lg:rounded-md m-auto w-[100%] h-[100%] lg:w-[450px] lg:h-fit bg-white p-[50px] z-50 flex flex-col gap-5 shadow-sm relative">
        <h1 className="text-gray-800">Update Your Profile</h1>
        {/* Form */}
        <form className="flex flex-col gap-5 overflow-auto">
          <div className="files flex flex-wrap gap-[20px]">
            <ImageUpload
              label="Cover Picture"
              file={cover}
              setFile={setCover}
              currentUser={currentUser}
              type="coverPicture"
            />
            <ImageUpload
              label="Profile Picture"
              file={profile}
              setFile={setProfile}
              currentUser={currentUser}
              type="profilePicture"
            />
          </div>
          <TextInput
            label="Name"
            value={texts.name}
            name="name"
            onChange={handleChange}
          />
          <TextInput
            label="Country / City"
            value={texts.city}
            name="city"
            onChange={handleChange}
          />
          <TextInput
            label="Website"
            value={texts.website}
            name="website"
            onChange={handleChange}
          />
          <Button
            label="Update"
            onClick={handleClick}
            className="border p-2 cursor-pointer text-black hover:text-white rounded-md bg-[#5271ff]"
          />
        </form>
        <Button
          label="close"
          onClick={() => setOpenUpdate(false)}
          className="close absolute top-[10px] right-[20px] border bg-[#f0544f] rounded-md p-2 cursor-pointer text-white"
        />
      </div>
    </div>
  );
}
