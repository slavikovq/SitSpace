import AppRoutes from "./pages/AppRoutes";
import AuthProvider from "./context/AuthProvider";
import { ReviewProvider } from "./context/ReviewProvider";

export default function App() {
  return (
    <>
      <AuthProvider>
        <ReviewProvider>
          <AppRoutes />
        </ReviewProvider>
      </AuthProvider>
    </>
  );
}