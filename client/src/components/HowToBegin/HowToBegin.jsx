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
                <h2>🔐 Log In</h2>
                <p>
                To get started, click the Login button at the top right of the page.
                If you don’t have an account yet, you can sign up in just a few seconds. 
                Once you're in, you’ll be taken straight to your dashboard, where you’ll manage your seating plans and groups. 
                This is the first step to unlocking everything SitSpace has to offer. It’s simple, secure, and gets you moving forward right away.
                </p>
              </div>
              <div className="htb-card">
                <h3>02</h3>
                <h2>👥 Create a Group</h2>
                <p>
                After logging in, click on “Create Group” to set up a new class or team.
                You can choose the type of room you’re planning for—like a classroom or a meeting space.
                You’ll also have the option to invite others to help manage the seating.
                This is helpful for teachers working with co-teachers, or managers assigning layouts.
                Once your group is ready, you’re all set to build the space.
                </p>
              </div>
              <div className="htb-card">
                <h3>03</h3>
                <h2>🪑 Build Your Seating Plan</h2>
                <p>
                Now it’s time to design your seating arrangement.
                Select your group and click “Create a Classroom” to open the layout builder.
                You can drag and drop desks, chairs, and other elements into place with ease.
                Adjust the layout to fit your real-world room setup and assign seats to individuals.
                When you're done, you can always save and return to update it later.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
