const ShareButton = ({ onClick }) => (
  <button
    className="border-none font-semibold py-[5px] px-[10px] text-white cursor-pointer bg-[#5271ff] rounded-[3px]"
    onClick={onClick}
  >
    Share
  </button>
);

export default ShareButton;
