import SitManagerView from "../../../components/SitManagerView/SitManagerView";
import { useState, useEffect } from "react";
import "../../../scss/ManageInvite.scss";
import InviteCard from "../../../components/InviteCard/InviteCard";
import { getUserByEmail } from "../../../models/user";
import { alert } from "../../../utils/sweetAlert";
import {
  createInvite,
  getAllAuthorInvites,
  getAllUserInvites,
} from "../../../models/invite";
import { useAuth } from "../../../context/AuthProvider";
import { getAllAuthorShares, getAllUserShares } from "../../../models/share";

export default function ManageInvite() {
  const [email, setEmail] = useState();
  const [authorInvites, setAuthorInvites] = useState([]);
  const [userInvites, setUserInvites] = useState([]);
  const [authorShared, setAuthorShared] = useState([]);
  const [userShared, setUserShared] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    document.title = "Invite people • SitSpace";
    loadInviteData();
    loadSharedData();
  }, []);

  const loadInviteData = async () => {
    const userRes = await getAllUserInvites();
    const authorRes = await getAllAuthorInvites();

    if (userRes.status === 200) {
      setUserInvites(userRes.payload);
    }
    if (userRes.status === 500) {
      alert("error", `${userRes.message}`);
    }
    if (authorRes.status === 200) {
      setAuthorInvites(authorRes.payload);
    }
    if (authorRes.status === 500) {
      alert("error", `${authorRes.message}`);
    }
  };

  const loadSharedData = async () => {
    const userRes = await getAllUserShares();
    const authorRes = await getAllAuthorShares();

    if (userRes.status === 200) {
      setUserShared(userRes.payload);
    }
    if (userRes.status === 500) {
      alert("error", `${userRes.message}`);
    }
    if (authorRes.status === 200) {
      setAuthorShared(authorRes.payload);
    }
    if (authorRes.status === 500) {
      alert("error", `${authorRes.message}`);
    }
  };

  const sendData = async () => {
    if (email === user.email)
      return alert("error", "You cant send invite to yourself!");
    const userRes = await getUserByEmail(email);
    if (userRes.status === 200) {
      const inviteRes = await createInvite({
        author_id: user._id,
        author_email: user.email,
        author_f_name: user.first_name,
        author_l_name: user.last_name,
        user_id: userRes.payload._id,
        user_email: userRes.payload.email,
        user_f_name: userRes.payload.first_name,
        user_l_name: userRes.payload.last_name,
      });
      if (inviteRes.status === 201) {
        alert("success", "Invite send.");
        loadInviteData();
        loadSharedData();
      }
      if (inviteRes.status === 409 || inviteRes.status === 500) {
        alert("error", `${inviteRes.message}`);
      }
    }
    if (userRes.status === 404 || userRes.status === 500) {
      alert("error", `${userRes.message}`);
    }
  };

  const handleButton = (e) => {
    e.preventDefault();
    sendData();
  };

  return (
    <>
      <SitManagerView headerText={"Invite people"} pageNow={"invite"}>
        <div className="i-body">
          <div className="i-info">
            <div className="i-details">
              <h1>Invite people</h1>
              <div className="input-section">
                <input
                  type="email"
                  id="b"
                  placeholder="Enter user email you want to invite"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <p>
                By inviting people, you allow them to view all the seating plans
                you have created.
              </p>
            </div>
            <div className="button-i">
              <button className="i-edit-btn" onClick={handleButton}>
                Send invite
              </button>
            </div>
          </div>

          <div className="invites-box">
            <div className="i-left">
              <h1>Invitations</h1>
              {authorInvites.map((invite) => (
                <InviteCard status={"pending"} type={"invitation"} invite={invite} view={"user"}/>
              ))}
              {authorShared.map((shared) => (
                <InviteCard status={"done"} type={"invitation"} shared={shared} view={"user"}/>
              ))}
            </div>
            <div className="i-right">
              <div>
                <h1>Shared with me </h1>
              </div>
              {userInvites.map((invite) => (
                <InviteCard status={"pending"} type={"shared"} invite={invite} view={"author"}/>
              ))}
              {userShared.map((shared) => (
                <InviteCard status={"done"} type={"shared"} shared={shared} view={"author"}/>
              ))}
            </div>
          </div>
        </div>
      </SitManagerView>
    </>
  );
}
