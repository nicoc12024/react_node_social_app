import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useSharePost } from "./useSharePost";
import UserProfilePicture from "./UserProfilePicture";
import TextInput from "./TextInput";
import ImageUploader from "./ImageUploader";
import ShareButton from "./ShareButton";

/**
 * SharePost Component
 *
 * This component is designed to provide users with the ability to share a new post on the platform.
 * It consists of an input field for text description, an image uploader for attaching media, and a share button to submit the post.
 *
 * Features:
 * - User Profile Picture: Displays the current user's profile picture next to the input field.
 * - Text Input: Allows the user to write a description for the post, using a customized TextInput component.
 * - Image Uploader: Provides functionality to upload an image file as part of the post, using the ImageUploader component.
 * - Share Button: Submits the post to the platform, with a disabling feature during submission (isSubmitting).
 *
 * State & Custom Hooks:
 * - useSharePost: Custom hook that manages the post sharing logic, including the file, description, submission status, and share handler.
 *
 * Context:
 * - AuthContext: Consumes the current user information to display relevant details in the post sharing box.
 *
 * Dependencies:
 * - UserProfilePicture, TextInput, ImageUploader: Components used to build the post sharing interface.
 */

const SharePost = () => {
  const { file, setFile, description, setDescription, handleShare, showError } =
    useSharePost();

  const { currentUser } = useContext(AuthContext);

  return (
    <div className="shadow-md rounded-[20px] bg-white text-[#555] mb-5">
      <form className="p-5">
        <div className="flex items-center justify-between gap-5">
          <div className="flex items-center w-full">
            <UserProfilePicture
              userId={currentUser.id}
              profilePicture={currentUser.profilePicture}
            />
            <TextInput
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              name={currentUser.name}
            />
            {file && (
              <img
                src={URL.createObjectURL(file)}
                alt=""
                className="h-[90px] w-[90px] object-cover"
              />
            )}
          </div>
        </div>
        <hr className="my-2" />
        {showError && (
          <div className="text-red-500 mb-2 text-sm">Please write something</div>
        )}
        <div className="flex items-center justify-between">
          <ImageUploader file={file} setFile={setFile} />
          <ShareButton onClick={handleShare} />
        </div>
      </form>
    </div>
  );
};

export default SharePost;
