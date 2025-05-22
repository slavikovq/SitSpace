import Sidebar from "../../components/Sidebar/Sidebar"
import SeatingPreviewCard from "../../components/SeatingPreviewCard/SeatingPreviewCard"
import "../../scss/SeatingPreview.scss"

export default function SeatingPreview() {
  return (
    <div className="sp-layout">
      <Sidebar />
      <div className="sp-content">
        <div className="sp-title">
          <h1>Seating preview</h1>
        </div>
        <div className="sp-body">
          <SeatingPreviewCard/>
        </div>
      </div>
    </div>
  )
}
