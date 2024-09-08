import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, Row, Col } from "antd";
import LoginForm from "../../components/LoginForm";
import RegisterForm from "views/auth-views/components/RegisterForm";
import Flex from "components/shared-components/Flex";

const backgroundStyle = {
    backgroundImage: "url(/img/others/img-17.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    minHeight: "100vh",
    paddingTop: "30px",
    paddingBottom: "30px",
    display: "Flex",
    justifyContent: "center",
    alignItems: "center",
};

const Login = (props) => {
    const theme = useSelector((state) => state.theme.currentTheme);
    const [openSignUpDrawer, setOpenSignUpDrawer] = useState(false);

    const showSignUpDrawer = () => {
        setOpenSignUpDrawer(true);
    };
    const onSignUpDrawerClose = () => {
        setOpenSignUpDrawer(false);
    };

    return (
        <div style={backgroundStyle}>
            <div className="login-page-wrapper-overlay"></div>
            <div style={{ width: "100%", maxWidth: "1200px" }}>
                <Row style={{ width: "100%" }}>
                    <Col xs={24}>
                        <Row justify="end" style={{ height: "100%" }}>
                            <Col
                                xs={24}
                                sm={14}
                                style={{
									display: "flex",
									justifyContent: "start",
									alignItems: "center", 
									// backgroundColor: "white"
								}}
                            >
								<Row style={{width: "100%"}}>
									<Col xs={0} sm={4}/>
									<Col xs={24} sm={20} >
										<div className="login-form-banner">
											<Row>
												<Col xs={24}>
													<p className="login-form-banner-p-1">The future of</p>
												</Col>
												<Col xs={24}>
													<p className="login-form-banner-p-1">E-Learning</p>
												</Col>
												<Col xs={24}>
													<div class="typewriter">
														<p className="login-form-banner-p-1">Is wide open!</p>
													</div>
												</Col>
											</Row>
										</div>
									</Col>
								</Row>
							</Col>
                            <Col
                                xs={24}
                                sm={10}
                                md={10}
                                lg={10}
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    paddingLeft: "5%",
                                    paddingRight: "5%",
                                }}
                            >
                                <Card
                                    style={{
                                        width: "100%",
                                        margin: "0px !important",
                                    }}
                                >
                                    <div>
                                        <div className="text-center">
                                            <p>
                                                Don't have an account yet?
                                                <a
                                                    style={{
                                                        marginLeft: "3px",
                                                    }}
                                                    onClick={() => {
                                                        showSignUpDrawer();
                                                    }}
                                                >
                                                    Sign Up
                                                </a>
                                            </p>
                                        </div>
                                        <Row justify="center">
                                            <Col
                                                xs={24}
                                                sm={24}
                                                md={20}
                                                lg={20}
                                            >
                                                <LoginForm {...props} />
                                            </Col>
                                        </Row>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <RegisterForm
                    open={openSignUpDrawer}
                    onClose={onSignUpDrawerClose}
                />
            </div>
        </div>
    );
};

export default Login;
