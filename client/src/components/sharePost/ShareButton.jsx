const ShareButton = ({ onClick, disabled }) => (
  <button
    className="border-none font-semibold py-[5px] px-[10px] text-white cursor-pointer bg-[#5271ff] rounded-[3px]"
    onClick={onClick}
    disabled={disabled}
  >
    Share
  </button>
);

export default ShareButton;
