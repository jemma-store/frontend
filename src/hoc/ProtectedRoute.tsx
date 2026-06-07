import { Navigate , Outlet} from "react-router-dom";
import { useUserStore } from "@/store/useUserStore";
import { Loader } from "@/components/Loader";

export const ProtectedRoute = () => {
  const user = useUserStore((state) => state.currentUser);
  const isAuthLoading = useUserStore((state) => state.isAuthLoading);

  if (isAuthLoading) {
    return <Loader />;
  }

  if (user?.role === "ADMIN") {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
}