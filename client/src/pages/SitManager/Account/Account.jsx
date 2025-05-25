import "../../../scss/Account.scss";
import SitManagerView from "../../../components/SitManagerView/SitManagerView";
import userPfp from "../../../assets/img/user.png";
import { useAuth } from "../../../context/AuthProvider";
import { alert } from "../../../utils/sweetAlert";
import { useState, useEffect } from "react";
import { updateUser, verifyUserPassword } from "../../../models/user";
import Swal from "sweetalert2";
import bcrypt from "bcryptjs";

export default function Account() {
  const { user, fetchUser, logout } = useAuth();
  const [previewImg, setPreviewImage] = useState(user.profilePicture);
  const [formData, setFormData] = useState();

  useEffect(() => {
    document.title = "Account • SitSpace";
  }, []);

  const sendData = async (formData) => {
    console.log(formData)
    Swal.fire({
      title: "Saving changes...",
      text: "Please, wait.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    if (formData?.email) {
      const emailRegex =
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i;

      if (!emailRegex.test(formData.email)) {
        alert("error", "Wrong email format.");
        return;
      }
    }

    const res = await updateUser(formData);

    Swal.close();

    if (res.status === 200) {
      alert("success", "Your informations has been updated.");
      await fetchUser();
    }
    if (res.status === 404 || res.status === 500) {
      alert("error", `${res.message}`);
    }
  };

  const openInputFile = () => {
    document.getElementById("imgProfile").click();
  };

  const handleFile = (file) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    const maxSize = 5 * 1024 * 1024;

    if (file && allowedTypes.includes(file.type)) {
      if (file.size > maxSize) {
        alert("error", "File is too large. (Max. 5MB)");
      } else {
        const imgUrl = URL.createObjectURL(file);
        setPreviewImage(imgUrl);
        setFormData((prev) => ({
          ...prev,
          removeProfilePicture: false,
          profilePicture: file,
        }));
      }
    } else {
      alert("error", "Unsupported file format.");
    }
  };

  const handleChangePassword = async () => {
    const { value: passwords } = await Swal.fire({
      title: "<span class='swal-title'>Change your password</span>",
      html: `
      <input id="old-password" type="password" class="swal2-input full-width" placeholder="Enter your old password">
      <input id="new-password" type="password" class="swal2-input full-width" placeholder="Enter your new password">
      <input id="confirm-password" type="password" class="swal2-input full-width" placeholder="Enter your new password again">
    `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Change password",
      cancelButtonColor: "#1E1E1E",
      confirmButtonColor: "#D7B5A2",
      reverseButtons: true,
      customClass: {
        popup: "custom-swal-popup",
      },
      preConfirm: () => {
        const oldPassword = document.getElementById("old-password").value;
        const newPassword = document.getElementById("new-password").value;
        const confirmPassword =
          document.getElementById("confirm-password").value;

        if (!oldPassword || !newPassword || !confirmPassword) {
          Swal.showValidationMessage("Vyplňte všechna pole!");
          return false;
        }

        if (newPassword !== confirmPassword) {
          Swal.showValidationMessage("Nová hesla se neshodují!");
          return false;
        }

        return { oldPassword, newPassword };
      },
    });

    if (passwords) {
      const res = await verifyUserPassword(passwords.oldPassword);

      if (res.status !== 200) return alert("error", "Incorrect password");
      const hashedPassword = await bcrypt.hash(passwords.newPassword, 10);

      await sendData({ password: hashedPassword });
      await logout();
    }
  };

  const previewImage = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const deleteImage = () => {
    setPreviewImage(null);
    setFormData((prev) => ({
      ...prev,
      removeProfilePicture: true,
      profilePicture: null,
    }));
  };

  const handleInput = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const cancelChanges = async (e) => {
    e.preventDefault();
    setFormData(null);
    await fetchUser();
  };

  const handleButton = (e) => {
    e.preventDefault();
    sendData(formData);
  };

  return (
    <SitManagerView headerText="My account" pageNow={"account"}>
      <div className="acc-container">
        <div className="acc-content">
          <div className="acc-profile">
            <div className="acc-pfp">
              <h1>Profile picture</h1>
              <img src={previewImg ? previewImg : userPfp} alt={userPfp} />
            </div>
            <div className="acc-manager">
              <div className="acc-profile-btns">
                <button className="upload-btn" onClick={openInputFile}>
                  Upload picture
                </button>
                {user.profilePicture || previewImg ? (
                  <button className="remove-btn" onClick={deleteImage}>
                    Remove picture
                  </button>
                ) : (
                  ""
                )}
              </div>
              <input
                type="file"
                style={{ display: "none" }}
                id="imgProfile"
                onChange={previewImage}
              />
              <div className="imgInfoText">
                <p>
                  Format: <b>PNG, JPG</b> or <b>JPEG</b>
                </p>
                <p>
                  Recommended size: <b>150x150</b>
                </p>
                <p>
                  Max. file size: <b>5MB</b>
                </p>
              </div>
            </div>
          </div>

          <hr className="acc-divider" />

          <div className="acc-form">
            <div className="acc-form-containers">
              <div className="acc-personal">
                <h1>Personal information</h1>
                <input
                  type="text"
                  placeholder="First name"
                  name="first_name"
                  defaultValue={user.first_name}
                  onChange={handleInput}
                />
                <input
                  type="text"
                  placeholder="Last name"
                  name="last_name"
                  defaultValue={user.last_name}
                  onChange={handleInput}
                />
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  defaultValue={user.email}
                  onChange={handleInput}
                />
              </div>

              <div className="acc-password">
                <h1>Password change</h1>
                <button className="pw-btn" onClick={handleChangePassword}>
                  Change your password
                </button>
              </div>
            </div>

            <div className="acc-btns" id={formData ? "" : "none"}>
              <button className="cancel-btn" onClick={cancelChanges}>
                Cancel
              </button>
              <button className="save-btn" onClick={handleButton}>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </SitManagerView>
  );
}
