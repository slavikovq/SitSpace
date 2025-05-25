import Sidebar from "../Sidebar/Sidebar"
import "../../scss/SitManagerView.scss"

export default function SitManagerView({children, headerText, pageNow}){
    return(
        <>
            <div className="sm-layout">
              <Sidebar page={pageNow}/>
              <div className="sm-content">
                <div className="sm-title">
                  <h1>{headerText}</h1>
                </div>
                {children}
              </div>
            </div>
        </>
    )
}