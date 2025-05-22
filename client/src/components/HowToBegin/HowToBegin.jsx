import "../../scss/HowToBegin.scss";

export default function HowToBegin() {
  return (
    <>
      <div id="HowToBegin">
        <div className="htb-content">
          <div>
            <div className="htb-title">
              <h6>—SitSpace—</h6>
              <h1>How to Begin</h1>
            </div>

            <div className="htb-cards">
              <div className="htb-card">
                <h3>01</h3>
                <h2>Log In</h2>
                <p>
                Click ”Login” in the top right corner. If you don't have an account, sign up quickly. Once logged in, you'll land on your dashboard to manage everything.
                </p>
              </div>
              <div className="htb-card">
                <h3>02</h3>
                <h2>Create a Group</h2>
                <p>
                Click “Create Group” to set up your class. Choose the type of room you're planning for. Once your group is created, continue by creating a class within it.
                </p>
              </div>
              <div className="htb-card">
                <h3>03</h3>
                <h2>Build Your Plan</h2>
                <p>
                Click on “Seating Plan,” choose your group and class, and configure the seating order by selecting options. Save your setup when you're done.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
