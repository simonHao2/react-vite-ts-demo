import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { useTranslation } from "react-i18next";

const ProfileMenu = () => {
  const [menu, setMenu] = useState(false);
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item d-flex align-items-center"
          id="page-header-user-dropdown"
          tag="button"
        >
          <i className="bx bx-user-circle font-size-18 me-1"></i>
          <span className="d-none d-xl-inline-block ms-1">Hao</span>
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownItem tag={Link} to="/profile">
            <i className="bx bx-user font-size-16 align-middle me-1"></i>
            {t("common.userProfile")}
          </DropdownItem>
          <div className="dropdown-divider"></div>
          <DropdownItem tag={Link} to="/logout">
            <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger"></i>
            <span>{t("common.logout")}</span>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default ProfileMenu; 