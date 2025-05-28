const ChangeAvatarButton = ({ onClick }) => {
  return (
    <>
      <button onClick={onClick} className="change_img">
        Change Avatar
        {/* <input type="file" accept="image/*" id="avatar-upload" onChange={onClick} /> */}
      </button>
    </>
  );
};

export default ChangeAvatarButton;
