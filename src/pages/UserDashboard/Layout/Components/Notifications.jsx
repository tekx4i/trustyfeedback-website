import React from "react";
import { ReactSVG } from "react-svg";
import { format } from "date-fns";
import popup from "../../../../assets/Dashboard/popup.svg";
import "../UserDashboardLayout.scss";
const Notifications = ({ notifi, setNotification, read, setRead, notific, debouncedMarkRead }) => {
  return (
    <div className={`custom_dropdown`}>
      {notifi && <div className="backdrop" onClick={() => setNotification(false)}></div>}
      <div className={`dropdown_ctm_logout notifications ${notifi ? "visible_content" : "hidden_content"}`}>
        <div className="notification_dropdown">
          <h4>Notification</h4>
        </div>
        <div className="read_unreaad">
          <button className={`read_btn ${read === 1 ? "active" : ""}`} onClick={() => setRead(1)}>
            All Notifications
          </button>
          <button className={`read_btn ${read === 2 ? "active" : ""}`} onClick={() => setRead(2)}>
            Unread Notifications
          </button>
        </div>
        <div className="notification_popup">
          {notific.length > 0 ? (
            notific?.map((i) => (
              <div className="notifi-text" key={i.id}>
                <div className="text-start">
                  <h6 className="text-start">{i.message}</h6>
                  <p className="text-start">{format(new Date(i?.created_at), "MMM dd, yyyy")}</p>
                </div>
                {!i.is_read && (
                  <div className="mark_as_read" style={{ cursor: "pointer" }} onClick={() => debouncedMarkRead(i.id)}>
                    <span>Mark as read</span>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-4">
              <ReactSVG src={popup} />
              <h5>No New Notification yet</h5>
              <p>Check this section for updates, exclusive and general notifications.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
