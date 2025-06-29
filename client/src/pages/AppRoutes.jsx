import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useReview } from "../context/ReviewProvider";
import Home from "./Home/Home";
import SignUp from "./SignUp/SignUp";
import SignIn from "./SignIn/SignIn";
import Reviews from "./Reviews/Reviews";
import ViewReview from "./Reviews/ViewReview";
import CreateReview from "./SitManager/ManageReview/CreateReview";
import UpdateReview from "./SitManager/ManageReview/UpdateReview";
import Account from "./SitManager/Account/Account"
import ViewAllGroups from "./SitManager/Groups/ViewAllGroups"
import ViewAllClasses from "./SitManager/Classes/ViewAllClasses"
import ViewClass from "./SitManager/Classes/ViewClass";
import ViewGroup from "./SitManager/Groups/ViewGroup";
import NotFound from "../components/NotFound/NotFound";
import LoadingPage from "../components/LoadingPage/LoadingPage";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import CreateGroup from "./SitManager/Groups/CreateGroup";
import UpdateGroup from "./SitManager/Groups/UpdateGroup";
import ViewSeatingPlan from "./SitManager/ManageSeating/ViewSeatingPlan";
import SeatingPlans from "./SitManager/ManageSeating/SeatingPlans";
import CreateSeatingPlan from "./SitManager/ManageSeating/CreateSeatingPlan";
import CreateClassroom from "./SitManager/Classes/CreateClassroom";
import UpdateClassroom from "./SitManager/Classes/UpdateClassroom";
import UpdateSeatingPlan from "./SitManager/ManageSeating/UpdateSeatingPlan";
import ManageInvite from "./SitManager/ManageInvite/ManageInvite";

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
            <Route path="/sitManager/createPlan" element={<CreateSeatingPlan/>} />
            <Route path="/sitManager/seatingPlans" element={<SeatingPlans/>} />
            <Route path="/sitManager/updateClassroom" element={<UpdateClassroom/>} />

            <Route path="/sitManager/seatingPlan/:id" element={<ViewSeatingPlan/>} />
            <Route path="/sitManager/updateSeatingPlan/:id" element={<UpdateSeatingPlan/>} />

            <Route path="/sitManager/manageReview" element={hasUserReview ? <UpdateReview/> : <CreateReview/>} />
            <Route path="/sitManager/account" element={<Account/>} />

            <Route path="/sitManager/group/:id" element={<ViewGroup/>} />
            <Route path="/sitManager/groups" element={<ViewAllGroups/>} />
            <Route path="/sitManager/createGroup" element={<CreateGroup />} />
            <Route path="/sitManager/updateGroup/:id" element={<UpdateGroup />} />

            <Route path="/sitManager/class/:id" element={<ViewClass/>} />
            <Route path="/sitManager/classes" element={<ViewAllClasses/>} />
            <Route path="/sitManager/createClassroom" element={<CreateClassroom/>} />
            <Route path="/sitManager/updateClassroom/:id" element={<UpdateClassroom/>} />

            <Route path="/sitManager/invitePeople" element={<ManageInvite />} />
          </Route>

          <Route path="*" element={<NotFound />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}