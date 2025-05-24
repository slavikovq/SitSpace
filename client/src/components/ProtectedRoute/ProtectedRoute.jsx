import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider"
import LoadingPage from "../LoadingPage/LoadingPage";

export default function ProtectedRoute(){
    const { user, isLoading } = useAuth();

    if(isLoading) return <LoadingPage />

    return user ? <Outlet /> : <Navigate to={"/signIn"} replace /> 
}