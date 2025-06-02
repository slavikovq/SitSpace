import "../../scss/InviteCard.scss";
import waiting from "../../assets/icons/waiting.svg";
import checkmark from "../../assets/icons/checkmark.svg";
import { deleteInvite } from "../../models/invite";
import { alert } from "../../utils/sweetAlert";
import { createShare, deleteShare } from "../../models/share";

export default function InviteCard({ status, type, view, shared, invite }) {
  const deleteInviteButton = async (id) => {
    const res = await deleteInvite(id);
    if (res.status === 200) {
      window.location.reload();
    }
    if (res.status === 500) {
      alert("error", `${res.message}`);
    }
  };

  const deleteSharedButton = async (id) => {
    const res = await deleteShare(id);
    if (res.status === 200) {
      window.location.reload();
    }
    if (res.status === 500) {
      alert("error", `${res.message}`);
    }
  }

  const createShareButton = async () => {
    const res = await createShare({
      author_id: invite.author_id,
      author_email: invite.author_email,
      author_f_name: invite.author_f_name,
      author_l_name: invite.author_l_name,
      user_id: invite.user_id,
      user_email: invite.user_email,
      user_f_name: invite.user_f_name,
      user_l_name: invite.user_l_name,
    });

    if (res.status === 201) {
      alert("success", "Invite accepted. Access granted.");
      await deleteInviteButton(invite._id);
      window.location.reload();
    } else {
      alert("error", res.message || "Something went wrong.");
    }
  };

  return (
    <>
      <div className="invite-card">
        <div className="card-left">
          <div id="icon-box">
            <div className="icon">
              {status === "pending" ? (
                <img src={waiting} alt="" id="waiting" />
              ) : (
                <img src={checkmark} alt="" id="done" />
              )}
            </div>
          </div>
          <div className="text">
            {view === "author" ? (
              shared ? (
                <h3>
                  {shared.author_f_name} {shared.author_l_name} (
                  {shared.author_email})
                </h3>
              ) : (
                <h3>
                  {invite.author_f_name} {invite.author_l_name} (
                  {invite.author_email})
                </h3>
              )
            ) : shared ? (
              <h3>
                {shared.user_f_name} {shared.user_l_name} ({shared.user_email})
              </h3>
            ) : (
              <h3>
                {invite.user_f_name} {invite.user_l_name} ({invite.user_email})
              </h3>
            )}
            {type === "invitation" ? (
              status === "pending" ? (
                <p>Waiting for the invite confirmation...</p>
              ) : (
                <p>This user has access to all your seating plans.</p>
              )
            ) : status === "pending" ? (
              <p>Wants you to share his seating plans with you.</p>
            ) : (
              <p>Shared you his seating plans.</p>
            )}
          </div>
        </div>
        <div className="card-right">
          {type === "invitation" ? (
            status === "pending" ? (
              <button
                className="i-edit-btn"
                onClick={() => deleteInviteButton(invite._id)}
              >
                Cancel invite
              </button>
            ) : (
              <button className="i-edit-btn" onClick={() => deleteSharedButton(shared._id)}>Remove access</button>
            )
          ) : status === "pending" ? (
            <div style={{ display: "flex", gap: "10px" }}>
              <button className="i-edit-btn" onClick={createShareButton}>Accept invite</button>
              <button
                className="i-edit-btn"
                onClick={() => deleteInviteButton(invite._id)}
              >
                Reject invite
              </button>
            </div>
          ) : (
            <button className="i-edit-btn" onClick={() => deleteSharedButton(shared._id)}>Leave</button>
          )}
        </div>
      </div>
    </>
  );
}
