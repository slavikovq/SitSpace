import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Home from "./Home/Home";
import SignUp from "./SignUp/SignUp";
import SignIn from "./SignIn/SignIn";
import Reviews from "./Reviews/Reviews";
import ViewReview from "./Reviews/ViewReview";
import SeatingPreview from "./SitManager/SeatingPreview/SeatingPreview";
import CreateReview from "./SitManager/ManageReview/CreateReview";
import UpdateReview from "./SitManager/ManageReview/UpdateReview";
import Account from "./SitManager/Account/Account"
import NotFound from "../components/NotFound/NotFound";
import LoadingPage from "../components/LoadingPage/LoadingPage";
import { useAuth } from "../context/AuthProvider";
import { useReview } from "../context/ReviewProvider";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

export default function AppRoutes() {
  const { user, isLoading } = useAuth();
  const { hasUserReview, isChecking } = useReview();

  if (isLoading || isChecking) return <LoadingPage />;

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signUp" element={user ? <Navigate to={"/sitManager/seatingPreview"} /> : <SignUp/>} />
          <Route path="/signIn" element={user ? <Navigate to={"/sitManager/seatingPreview"} /> : <SignIn/>} />
          <Route path="/reviews" element={<Reviews/>} />
          <Route path="/review/:id" element={<ViewReview/>} />

          <Route element={<ProtectedRoute />}>
            <Route path="/sitManager/seatingPreview" element={<SeatingPreview/>} />
            <Route path="/sitManager/manageReview" element={hasUserReview ? <UpdateReview/> : <CreateReview/>} />
            <Route path="/sitManager/account" element={<Account/>} />
          </Route>

          <Route path="*" element={<NotFound />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}