import "../../../scss/Account.scss";
import SitManagerView from "../../../components/SitManagerView/SitManagerView";
import userPfp from "../../../assets/img/user.png"

export default function Account() {
  return (
    <SitManagerView headerText="My account">
      <div className="acc-container">
        <div className="acc-content">

          <div className="acc-profile">
            <div className="acc-pfp">
              <h1>Profile picture</h1>
              <img src={userPfp} alt={userPfp}/>
            </div>
            <div className="acc-manager">
              <div className="acc-profile-btns">
                <button className="upload-btn">Upload picture</button>
                <button className="remove-btn">Remove picture</button>
              </div>
              <p>Format: PNG, JPG or JPEG </p>
              <p>Recommended size: 150x150</p>
            </div>
          </div>

          <hr className="acc-divider" />

          <div className="acc-form">
            <div className="acc-form-containers">
              <div className="acc-personal">
                <h1>Personal information</h1>
                <input type="text" placeholder="First name" />
                <input type="text" placeholder="Last name" />
                <input type="email" placeholder="Email" />
              </div>

              <div className="acc-password">
                <h1>Password change</h1>
                <input type="password" placeholder="Old password..." />
                <input type="password" placeholder="New password..." />
                <input type="password" placeholder="New password again..." />
              </div>
            </div>

            <div className="acc-btns">
              <button className="cancel-btn">Cancel</button>
              <button className="save-btn">Save changes</button>
            </div>
          </div>

        </div>
      </div>
    </SitManagerView>
  );
}
