import { useCallback, useEffect, useRef } from "react";
import PropTypes from "prop-types";

// Import Scrollbar
import SimpleBar from "simplebar-react";

// MetisMenu
import MetisMenu from "metismenujs";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
// import permissionLevel from "../../utils/permissionLevel";
const SidebarContent = () => {
    const { t } = useTranslation();
    const ref = useRef<any>();

    const activateParentDropdown = useCallback((item: any) => {
        item.classList.add("active");
        const parent = item.parentElement;
        const parent2El = parent.childNodes[1];
        if (parent2El && parent2El.id !== "side-menu") {
            parent2El.classList.add("mm-show");
        }

        if (parent) {
            parent.classList.add("mm-active");
            const parent2 = parent.parentElement;

            if (parent2) {
                parent2.classList.add("mm-show"); // ul tag

                const parent3 = parent2.parentElement; // li tag

                if (parent3) {
                    parent3.classList.add("mm-active"); // li
                    parent3.childNodes[0].classList.add("mm-active"); //a
                    const parent4 = parent3.parentElement; // ul
                    if (parent4) {
                        parent4.classList.add("mm-show"); // ul
                        const parent5 = parent4.parentElement;
                        if (parent5) {
                            parent5.classList.add("mm-show"); // li
                            parent5.childNodes[0].classList.add("mm-active"); // a tag
                        }
                    }
                }
            }
            // scrollElement(item);
            return false;
        }
        scrollElement(item);
        return false;
    }, []);
    useEffect(() => {
        const pathName = window.location.pathname;

        const initMenu = () => {
            new MetisMenu("#side-menu");
            let matchingMenuItem;
            const ul = document.getElementById("side-menu");
            if (ul) {
                const items = ul.getElementsByTagName("a");
                for (let i = 0; i < items.length; ++i) {
                    if (pathName === items[i].pathname) {
                        matchingMenuItem = items[i];
                        break;
                    }
                }
                if (matchingMenuItem) {
                    activateParentDropdown(matchingMenuItem);
                }
            }
        };
        initMenu();
    }, [activateParentDropdown]);

    useEffect(() => {
        if (ref.current) {
            ref.current.recalculate();
        }
    });

    function scrollElement(item: any) {
        if (item) {
            const currentPosition = item.offsetTop;
            if (currentPosition > window.innerHeight && ref.current) {
                ref.current.getScrollElement().scrollTop = currentPosition - 300;
            }
        }
    }

    //   let userAuth = permissionLevel("User", "View");

    return (
        <>
            <SimpleBar className="h-100" ref={ref}>
                <div id="sidebar-menu">
                    <ul className="metismenu list-unstyled" id="side-menu">
                        {/* ======Dashboard====== */}
                        <li>
                            <Link to="/dashboard" className="">
                                <i className="bx bx-home-circle"></i>
                                <span>{t("common.dashboard")}</span>
                            </Link>
                        </li>
                        {/* ======Administration====== */}
                        <li>
                            <Link to="/#" className="has-arrow">
                                <i className="bx bx-shield-quarter"></i>
                                <span>{t("common.administration.title")}</span>
                            </Link>
                            <ul className="sub-menu" aria-expanded="true">
                                <li>
                                    <Link to="/users">{t("common.administration.users")}</Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </SimpleBar >
        </>
    );
};

SidebarContent.propTypes = {
    location: PropTypes.object,
    t: PropTypes.any,
};

export default SidebarContent;
