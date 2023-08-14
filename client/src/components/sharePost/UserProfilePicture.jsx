const UserProfilePicture = ({ userId, profilePicture }) => {
  return (
    <img
      src={`/upload/${userId}/${profilePicture}`}
      alt=""
      className="w-[40px] h-[40px] rounded-full object-cover"
    />
  );
};

export default UserProfilePicture;
