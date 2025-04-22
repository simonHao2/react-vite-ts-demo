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
import LineCharts from "./pages/Auth/Charts/LineCharts";
import HistogramCharts from "./pages/Auth/Charts/HistogramCharts";
import DragDropList from "./pages/Auth/UITemplate/DragDropList";
import SimpleDragList from "./pages/Auth/UITemplate/SimpleDragList";
import BasicForm from "./pages/Auth/FormTemplate/BasicForm";
import AdvancedForm from "./pages/Auth/FormTemplate/AdvancedForm";

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
        <Route path="/lineCharts" element={<LineCharts />} />
        <Route path="/histogramCharts" element={<HistogramCharts />} />
        <Route path="/dragDropList" element={<DragDropList />} />
        <Route path="/simpleDragList" element={<SimpleDragList />} />
        <Route path="/basicForm" element={<BasicForm />} />
        <Route path="/advancedForm" element={<AdvancedForm />} />
      </Route>
      <Route path="/login" element={<Login />} />

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
