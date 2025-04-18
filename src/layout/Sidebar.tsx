import SidebarContent from "./SidebarContent";
import { Link } from "react-router-dom";
import env from "../env/config";
const TAG = env.cmsTag;
const ENV = env.env.toLocaleUpperCase();
const Sidebar = (): JSX.Element => {
  return (
    <>
      <div className="vertical-menu">
        <div className="navbar-brand-box">
          <Link to="/" className="logo logo-light" style={{ color: "white" }}>
            <span className="logo-sm">
              <h5 className="text-white mt-4 mb-0">CMS</h5>
            </span>
            <span className="logo-lg">
              {TAG ? (
                <h6 className="text-white mt-4">CMS BASE UI ({ENV})</h6>
              ) : (
                <h4 className="text-white mt-4 mb-0">CMS BASE UI</h4>
              )}
            </span>
          </Link>
          {!!TAG && <p className="text-muted m-0 hidden-in-sidebar">{TAG}</p>}
        </div>
        <div data-simplebar className="h-100">
          <SidebarContent />
        </div>
        <div className="sidebar-background"></div>
      </div>
    </>
  );
};

export default Sidebar;
