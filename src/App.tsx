import {
  Navigate,
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
const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<AuthLayout> <Welecome /> </AuthLayout>} />
      <Route path="/users" element={<AuthLayout> <UserList /> </AuthLayout>} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
