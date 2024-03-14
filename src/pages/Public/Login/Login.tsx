import { useState } from "react";
// import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { Container, Row, Col, Card, CardBody, Form, Input, Label, FormFeedback } from "reactstrap";
//* Import css modules if need
import profile from "../../../assets/images/profile-img.png";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { useFormik } from "formik";
import LoadingButton from "../../../components/LoadingButton/LoadingButton";

const Login = () => {

    const { t } = useTranslation();
    const [isRememberMe, setIsRememberMe] = useState<boolean>(localStorage.getItem("isRememberMe") === 'true' ? true : false)
    // const [loading, setLoading] = useState<boolean>(false);
    const error = false;
    const loading = false;

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            email: 'admin@email.com',
            password: 'Aa123456',

        },
        validationSchema: Yup.object({
            email: Yup.string().email('emailIsInvalid').required('emailIsRequired'),
            password: Yup.string().min(8, 'passwordLessThan8chars').matches(/^(?=.*[a-z])(?=.*[A-Z])/, 'passwordMustHaveLowUpperLetter').required('passwordIsRequired'),
        }),
        onSubmit: async (values: any) => {
            // setLoading(true);
            // const { email, password } = values;
            if (isRememberMe) {
                localStorage.setItem('Email', values.email);
                localStorage.setItem('Password', values.password);
            } else {
                localStorage.removeItem('Email');
                localStorage.removeItem('Password');
            }
            //   dispatch({ type: loginActions.USER_LOGIN, email, password });
        }
    });

    const handleRmemberMe = (value: boolean) => {
        localStorage.setItem('isRememberMe', value.toString());
        setIsRememberMe(value);
    }
    document.title = "Login | Login - CMS"
    return (
        <div>
            <div className="account-pages my-5 pt-sm-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} lg={6} xl={5}>
                            <Card className="overflow-hidden">
                                <div className="bg-primary bg-soft">
                                    <Row>
                                        <Col xs={7}>
                                            <div className="text-primary p-4">
                                                <h5 className="text-primary">{t("common.welcome")}</h5>
                                                <p>{t("common.welcomeMessage")}</p>
                                            </div>
                                        </Col>
                                        <Col className="col-5 align-self-end">
                                            <img src={profile} alt="" className="img-fluid" />
                                        </Col>
                                    </Row>
                                </div>
                                <CardBody className="pt-0">
                                    <div className="p-2">
                                        <Form
                                            className="form-horizontal"
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                validation.handleSubmit();
                                                return false;
                                            }}
                                        >
                                            {/* {error ? (
                        <Alert color="danger">{t(`${error}`)}</Alert>
                      ) : null} */}

                                            <div className="mb-3">
                                                <Label>{t("user.email")}</Label>
                                                <Input
                                                    id="email"
                                                    name="email"
                                                    className="form-control"
                                                    type="email"
                                                    value={validation.values.email || ""}
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    invalid={
                                                        validation.touched.email && validation.errors.email ? true : false
                                                    }
                                                />
                                                {validation.touched.email && validation.errors.email ? (
                                                    <FormFeedback type="invalid" >{validation.errors.email === "emailIsRequired" ? t('user.emailIsRequired') : validation.errors.email === "emailIsInvalid" ? t('email.emailIsInvalid') : ""}</FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3">
                                                <Label>{t("user.password")}</Label>
                                                <Input
                                                    type="password"
                                                    name="password"
                                                    className="form-control"
                                                    id="formrow-password-Input"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.password || ""}
                                                    invalid={
                                                        validation.touched.password && validation.errors.password ? true : false
                                                    }
                                                />
                                                {validation.touched.password && validation.errors.password ? (
                                                    <FormFeedback type="invalid" >{validation.errors.password === "passwordLessThan8chars" ? t('user.passwordLessThan8chars') : validation.errors.password === "passwordMustHaveLowUpperLetter" ? t('user.passwordMustHaveLowUpperLetter') : validation.errors.password === 'passwordIsRequired' ? t('user.passwordIsRequired') : ""}</FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="form-check">
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    id="customControlInline"
                                                    defaultChecked={isRememberMe}
                                                    onChange={(e) => handleRmemberMe(e.target.checked)}
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="customControlInline"
                                                >
                                                    {t("common.rememberMe")}
                                                </label>
                                            </div>

                                            <div className="mt-3 d-grid">
                                                <LoadingButton
                                                    color="primary"
                                                    type="submit"
                                                    buttonText={t("common.login")}
                                                    loading={error ? false : loading}
                                                />
                                            </div>
                                        </Form>
                                    </div>
                                </CardBody>
                            </Card>
                            {/* <div className="mt-5 text-center">
              <p>
                Don&#39;t have an account ?{" "}
                <Link to="/register" className="fw-medium text-primary">
                  {" "}
                  Signup now{" "}
                </Link>{" "}
              </p>
              <p>
                © {new Date().getFullYear()} Skote. Crafted with{" "}
                <i className="mdi mdi-heart text-danger" /> by Themesbrand
              </p>
            </div> */}
                        </Col>
                    </Row>
                </Container>
            </div >
        </div >
    );
};

export default Login;
