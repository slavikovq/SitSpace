import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import SignUp from "./SignUp/SignUp";
import SignIn from "./SignIn/SignIn";
import Reviews from "./Reviews/Reviews";
import ViewReview from "./ViewReview/ViewReview";
import SeatingPreview from "./SeatingPreview/SeatingPreview";

export default function AppRoutes() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SignUp" element={<SignUp/>} />
          <Route path="/SignIn" element={<SignIn/>} />
          <Route path="/Reviews" element={<Reviews/>} />
          <Route path="/Review" element={<ViewReview/>} />
          <Route path="/Seating-preview" element={<SeatingPreview/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}