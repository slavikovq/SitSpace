import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import SignUp from "./SignUp/SignUp";
import SignIn from "./SignIn/SignIn";


export default function AppRoutes() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SignUp" element={<SignUp/>} />
          <Route path="/SignIn" element={<SignIn/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}