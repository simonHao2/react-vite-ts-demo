import React from "react"
import {
  Container,
  Row,
  Col,
  Card,
} from "reactstrap";
import profileImg from "../../../assets/images/profile-img.png";
import { useTranslation } from "react-i18next";
import Breadcrumbs from "../../../components/Common/Breadcrumbs";

const Welcome = () => {
  const { t } = useTranslation();
  document.title = "Dashboard | Skote - Vite React Admin & Dashboard Template";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={t("dashboard.title")}
            breadcrumbItem={t("dashboard.title")}
          />
          <Row>
            <Card className="overflow-hidden">
              <div className="bg-primary bg-soft">
                <Row>
                  <Col xs="7">
                    <div className="text-primary p-3">
                      <h5 className="text-primary"><strong><i>Welcome Back !</i></strong></h5>
                      <p>CMS Dashboard</p>
                      <div dangerouslySetInnerHTML={{ __html: t("common.author") }} ></div>
                      <p>{t("common.key", { what: 'i18next', how: 'great' })}</p>
                    </div>
                  </Col>
                  <Col xs="5" className="align-self-end">
                    <img src={profileImg} alt="" className="img-fluid" />
                  </Col>
                </Row>
              </div>
            </Card>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}
export default Welcome;
