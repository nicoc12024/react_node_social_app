const CoverProfilePictures = ({ id, coverPicture, profilePicture }) => (
  <div className="h-[300px] relative">
    <img
      src={`/upload/${id}/${coverPicture}`}
      alt=""
      className="w-full h-full object-cover"
    />
    <img
      src={`/upload/${id}/${profilePicture}`}
      alt=""
      className="xl:w-[200px] xl:h-[200px] w-[150px] h-[150px] rounded-full object-cover absolute top-[200px] right-0 left-0 m-auto"
    />
  </div>
);

export default CoverProfilePictures;
