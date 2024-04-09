import {
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import AuthLayout from "./layout";
// Import scss
import "./assets/scss/theme.scss";
import "./styles/global.scss";
import Welecome from "./pages/Auth/Welcome/Welcome";
import Login from "./pages/Public/Login/Login";
import UserList from "./pages/Auth/Administration/UserList";
import RoleList from "./pages/Auth/Administration/RoleList";
const App = () => {
  return (
    <Routes>
      <Route
        // The layout will wrap all the pages inside this route
        element={
          <AuthLayout>
            <Outlet />
          </AuthLayout>
        }
      >
        <Route path="/dashboard" element={<Welecome />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/roles" element={<RoleList />} />
      </Route>
      <Route path="/login" element={<Login />} />

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
