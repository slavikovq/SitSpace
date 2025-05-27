import Sidebar from "../Sidebar/Sidebar"
import "../../scss/SitManagerView.scss"
import bars from "../../assets/icons/bars.svg"
import { useEffect, useState } from "react";

export default function SitManagerView({children, headerText, pageNow}){
  const [activeSidebar, setActiveSidbar] = useState(false);

  const showSidebar = () => {
    if(!activeSidebar){
      setActiveSidbar(true);
    } else{
      setActiveSidbar(false);
    }
  }

    return(
        <>
            <div className="sm-layout">
              <Sidebar page={pageNow} activeSidebar={activeSidebar} showSidebar={showSidebar}/>
              <div className="sm-content">
                <div className="sm-title">
                  <div className="sm-title-main">
                    	<h1>{headerText}</h1>
                  </div>
                  <div className="sm-bars">
                    {!activeSidebar && (<img src={bars} alt="Bars" onClick={showSidebar}/>)}
                  </div>
                </div>
                {children}
              </div>
            </div>
        </>
    )
}