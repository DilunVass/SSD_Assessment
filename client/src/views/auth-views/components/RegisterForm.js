import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
    Button,
    Col,
    DatePicker,
    Drawer,
    Form,
    Input,
    Row,
    Select,
    Space,
    notification
} from "antd";
import { isvalidPhoneNumber, isvalidEmail, openNotificationWithIcon } from "helpers";
import axios from "axios";
import { API_AUTH_URL } from "configs/AppConfig";
import UploadImageCustom from "components/custom-components/UploadImageCustom";
const { Option } = Select;

const RegisterForm = ({ onClose, open }) => {

    const [screenWidth, setscreenWidth] = useState(window.innerWidth);
    const [imgFilePreview, setImgFilePreview] = useState(null);
    const [imgFile, setImgFile] = useState(null);

    const [userInfo, setUserInfo] = useState({
        user_name: null,
        first_name: null,
        last_name: null,
        contact_no: null,
        email: null,
        password: null,
        base64ProfileImg: null,
    });

    const handleSubmit = async() => {
        try {
            axios.post("http://localhost:8085/api/user/register", 
            
                userInfo, 
            )
            .then( 
                res => res.data)
            .then(res => {
                console.log(res);
                if(res.statusCode === 201){
                    openNotificationWithIcon(
                        "success",
                        "User registered successfully!",
                        "Please sign in using new credentails!"
                    );
                    setUserInfo({
                        user_name: null,
                        first_name: null,
                        last_name: null,
                        contact_no: null,
                        email: null,
                        password: null,
                        base64ProfileImg: null,
                    })
                    setImgFilePreview(null);
                    setImgFile(null);
                }else{
                    openNotificationWithIcon(
                        "error",
                        "Error Occurred!",
                        "Unable to register the user!"
                    );
                }
            })
            .catch(err => {
                if(err.response.data.message === "already used user name!"){
                    openNotificationWithIcon(
                        "error",
                        "Error Occurred!",
                        "Already used user name!"
                    );
                }else{
                    openNotificationWithIcon(
                        "error",
                        "Error Occurred!",
                        "Unable to register the user!"
                    );
                }
            })
        } catch (error) {
            console.log(error);
            console.log(error.message);
            openNotificationWithIcon(
                "error",
                "Error Occurred!",
                "Unable to register the user!"
            );
        }
    }

    useEffect(() => {
        const handleResize = () => {
            setscreenWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        setUserInfo({...userInfo, base64ProfileImg: imgFilePreview});
    }, [imgFilePreview])

    return (
        <Row>
            <Col sm={12}>
                <Drawer
                    width={
                        screenWidth > 500
                            ? "30%"
                            : screenWidth > 400
                            ? "60%"
                            : "100%"
                    }
                    onClose={onClose}
                    open={open}
                    styles={{
                        body: {
                            paddingBottom: 80,
                        },
                    }}
                    extra={
                        <Space>
                            <Button onClick={onClose}>Cancel</Button>
                            <Button
                                onClick={() => {
                                    handleSubmit();
                                }}
                                type="primary"
								disabled={
                                    imgFilePreview === null ||
                                    imgFile === null ||
									userInfo.user_name === null ||
									userInfo.first_name === null ||
									userInfo.last_name === null ||
									userInfo.contact_no === null ||
									userInfo.email === null ||
									userInfo.password === null ||
									userInfo.user_name === "" ||
									userInfo.first_name === "" ||
									userInfo.last_name === "" ||
									userInfo.contact_no === "" ||
									userInfo.email === "" ||
									userInfo.password === "" ||
									isvalidEmail(userInfo.email) === false ||
									isvalidPhoneNumber(userInfo.contact_no) === false ?
									true
									:false
								}
                            >
                                Submit
                            </Button>
                        </Space>
                    }
                >
                    <UploadImageCustom setImgFile={setImgFile} imgFilePreview={imgFilePreview} setImgFilePreview={setImgFilePreview}/>
                    <br />
                    <br />
                    <Form layout="vertical" hideRequiredMark>
                        <Row>
                            <Col span={24} style={{marginBottom: "-30px"}}>
                                <Form.Item name="user_name" label="User Name">
                                    <Form.Item
                                        help={
                                            userInfo.user_name === ""
                                                ? "Fill the user name!"
                                                : ""
                                        }
                                        className="custom-form-item"
                                    >
                                        <Input
                                            placeholder="Please enter user name"
                                            value={userInfo.user_name}
                                            onChange={(e) => {
                                                setUserInfo({
                                                    ...userInfo,
                                                    user_name: e.target.value,
                                                });
                                            }}
                                        />
                                    </Form.Item>
                                </Form.Item>
                            </Col>
                            <Col span={24} style={{marginBottom: "-30px"}}>
                                <Form.Item name="first_name" label="First Name">
                                    <Form.Item
                                        help={
                                            userInfo.first_name === ""
                                                ? "Fill the first name!"
                                                : ""
                                        }
                                        className="custom-form-item"
                                    >
                                        <Input
                                            placeholder="Please enter first name"
                                            value={userInfo.first_name}
                                            onChange={(e) => {
                                                setUserInfo({
                                                    ...userInfo,
                                                    first_name: e.target.value,
                                                });
                                            }}
                                        />
                                    </Form.Item>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Col span={24} style={{marginBottom: "-30px"}}>
                            <Form.Item name="last_name" label="Last Name">
                                <Form.Item
                                    help={
                                        userInfo.last_name === ""
                                            ? "Fill the last name!"
                                            : ""
                                    }
                                    className="custom-form-item"
                                >
                                    <Input
                                        placeholder="Please enter last name"
                                        value={userInfo.last_name}
                                        onChange={(e) => {
                                            setUserInfo({
                                                ...userInfo,
                                                last_name: e.target.value,
                                            });
                                        }}
                                    />
                                </Form.Item>
                            </Form.Item>
                        </Col>
						<Col span={24} style={{marginBottom: "-30px"}}>
                            <Form.Item name="contact_no" label="Contact Number">
                                <Form.Item
                                    help={
                                        userInfo.contact_no === ""? "Fill the Contact Number!" : userInfo.contact_no !== null && isvalidPhoneNumber(userInfo.contact_no) === false? "Enter a valid phone number" : ""
                                    }
                                    className="custom-form-item"
                                >
                                    <Input
                                        placeholder="Please enter Contact Number"
                                        value={userInfo.contact_no}
                                        onChange={(e) => {
                                            setUserInfo({
                                                ...userInfo,
                                                contact_no: e.target.value,
                                            });
                                        }}
										onKeyDown={(event) => {
											if (event.key !== 'Backspace' && !/[0-9]/.test(event.key)) {
												event.preventDefault();
											}
										}}

                                    />
                                </Form.Item>
                            </Form.Item>
                        </Col>
						<Col span={24} style={{marginBottom: "-30px"}}>
                            <Form.Item name="email" label="E-mail">
                                <Form.Item
                                    help={
                                        userInfo.email === ""? "Fill the e-mail Address!" : userInfo.email !== null && isvalidEmail(userInfo.email) === false? "Enter a valid E-mail Address" : ""
                                    }
                                    className="custom-form-item"
                                >
                                    <Input
                                        placeholder="Please enter E-mail Address"
                                        value={userInfo.email}
                                        onChange={(e) => {
                                            setUserInfo({
                                                ...userInfo,
                                                email: e.target.value,
                                            });
                                        }}
                                    />
                                </Form.Item>
                            </Form.Item>
                        </Col>
						<Col span={24} style={{marginBottom: "-30px"}}>
                            <Form.Item name="password" label="Password">
                                <Form.Item
                                    help={
                                        userInfo.password === ""? "Fill the password!" : ""
                                    }
                                    className="custom-form-item"
                                >
                                    <Input
                                        placeholder="Please enter password"
                                        value={userInfo.password}
                                        onChange={(e) => {
                                            setUserInfo({
                                                ...userInfo,
                                                password: e.target.value,
                                            });
                                        }}
                                    />
                                </Form.Item>
                            </Form.Item>
                        </Col>
                    </Form>
                </Drawer>
            </Col>
        </Row>
    );
};

export default RegisterForm;