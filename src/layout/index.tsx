import React, {useEffect } from "react";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

interface Props {
  children?: React.ReactNode;
}
const Layout = (props: Props) => {

  useEffect(() => {
    window.scroll(0, 0);
  }, [])

  return (
    <React.Fragment>
      <div id="layout-wrapper">
        <Header />
        <Sidebar />
        <div className="main-content">
          {props.children}
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
}
export default Layout;
