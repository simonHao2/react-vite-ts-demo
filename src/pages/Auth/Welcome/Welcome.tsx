import React, { useEffect, useState } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
} from "reactstrap";
import profileImg from "../../../assets/images/profile-img.png";
import { useTranslation } from "react-i18next";
import Breadcrumbs from "../../../components/Common/Breadcrumbs";
import AsyncSelect from 'react-select/async';
import { decrement, increment, selectCount } from "../../../redux/slice/count.slice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

const Welcome = () => {
  const { t } = useTranslation();
  document.title = "Dashboard | Skote - Vite React Admin & Dashboard Template";

  const [options, setOptions] = useState<any>([]);
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

  const filterOptions = (inputValue: string) => {
    const filters = options.filter((i) => i.label.toLowerCase().includes(inputValue.toLowerCase()));
    if (filters.length > 0) {
      return filters;
    } else {
      //call api

    }

  };
  const fetchDogs = async () => {
    const apiUrl = 'https://api.thedogapi.com/v1'
    const res: any = await fetch(apiUrl + `/breeds?limit=10`);
    const data: any = await res.json();
    const tempOptions: any = [];
    for (const index in data) {
      const obj = { label: data[index].name, value: data[index].id };
      tempOptions.push(obj);
    }
    setOptions(tempOptions);
  }
  useEffect(() => {
    fetchDogs();
  }, [])
  //https://api.thedogapi.com/v1/breeds?limit=2
  const promiseOptions = (inputValue: string) =>
    new Promise<any>((resolve) => {
      setTimeout(() => {
        resolve(filterOptions(inputValue));
      }, 1000);
    });


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
              <Row>
                <div>
                  <div className="mb-3">
                    <Button
                      aria-label="Increment value"
                      onClick={() => dispatch(increment())}
                    >
                      +
                    </Button>
                    <span className="text-danger">{count}</span>
                    <Button
                      aria-label="Decrement value"
                      onClick={() => dispatch(decrement())}
                    >
                      -
                    </Button>
                  </div>
                  {/* 这里省略了额外的 render 代码 */}
                </div>
              </Row>
            </Card>
          </Row>
          {/* Test Select */}
          <Card className="mb-3">
            <CardBody>
              <AsyncSelect
                cacheOptions
                defaultOptions={options}
                loadOptions={promiseOptions}
              />
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}
export default Welcome;
