import React, { useState, useEffect } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

//i18n
import i18n from "../../../i18n";
import { get, map } from "lodash";
import languages from '../../../locals/languages';

const LanguageDropdown = () => {
  const [menu, setmenu] = useState(false);
  const [selectedLang, setSelectedLang] = useState<string>("eng");

  useEffect(() => {
    const currentLanguage = localStorage.getItem("I18N_LANGUAGE");
    if (currentLanguage !== undefined && currentLanguage !== null && currentLanguage !== '') {
      switch (currentLanguage) {
        case 'eng':
          changeLanguageAction('eng');
          break;
        case 'zh':
          changeLanguageAction('zh');
          break;
        case 'cns':
          changeLanguageAction('cns');
          break;
        default:
          break;
      }
    }
  }, [])
  const changeLanguageAction = (lang: string) => {
    //set language as i18n
    i18n.changeLanguage(lang);
    localStorage.setItem("I18N_LANGUAGE", lang);
    setSelectedLang(lang);
    // window.location.reload();
  }
  const toggle = () => {
    setmenu(!menu);
  };
  return (
    <React.Fragment>
      <Dropdown isOpen={menu} toggle={toggle} className="d-inline-block">
        <DropdownToggle className="btn header-item waves-effect" tag="button">
          <img
            src={get(languages, `${selectedLang}.flag`)}
            alt=""
            height="16"
            className="me-1"
          />
          <span className="align-middle" style={{ marginLeft: 5 }}>
            {get(languages, `${selectedLang}.label`)}
          </span>
        </DropdownToggle>
        <DropdownMenu className="language-switch" end>
          {map(Object.keys(languages), key => (
            <DropdownItem
              key={key}
              onClick={() => changeLanguageAction(key)}
              className={`notify-item ${selectedLang === key ? "active" : "none"
                }`}
            >
              <img
                src={get(languages, `${key}.flag`)}
                alt=""
                className="me-1"
                height="12"
              />
              <span className="align-middle">
                {get(languages, `${key}.label`)}
              </span>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};
export default LanguageDropdown;
