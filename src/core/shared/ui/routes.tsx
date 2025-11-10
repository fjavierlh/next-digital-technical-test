import { Route, Routes } from "react-router-dom";
import App from "../../../App";
import { UserDetailPage } from "../../user/ui/pages/user-detail-page";

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/user/:userId" element={<UserDetailPage />} />
  </Routes>
);
