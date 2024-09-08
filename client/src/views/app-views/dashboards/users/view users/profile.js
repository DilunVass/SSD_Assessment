import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import axios from "axios";
import {
    Avatar,
    Card,
    Form,
    Space,
    Input,
    Button,
    Select,
    InputNumber,
    notification,
    DatePicker,
    Tabs,
    message,
    Steps,
    theme,
    Row,
    Col,
    Checkbox,
} from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import BreadcrumbCustom from "components/custom-components/BreadcrumbCustom";
import AvatarStatus from "components/shared-components/AvatarStatus";
// import { isUserContactNumberAvailable } from "helpers/validatingMethods";
// import { isUserEmailAvailable } from "helpers/validatingMethods";
// import { AUTH_TOKEN } from "constants/AuthConstant";
import { API_BASE_URL } from "configs/AppConfig";
import { GOOGLE_BUCKET_URL } from "configs/AppConfig";
import {
    setUserRole,
    setUserFirstName,
    setUserLastName,
} from "store/slices/authSlice";
import { signOut } from 'store/slices/authSlice';
import { isValidPassword } from "helpers";

const { Option } = Select;
dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
const weekFormat = 'MM/DD';
const monthFormat = 'YYYY/MM';

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
    },
};

const EditUser = () => {
    const { token, userImage, userId, userFirstName, userLastName, userRole } =
        useSelector((state) => state.auth);
    const { currentTheme } = useSelector(state => state.theme);

    // console.log(token)

    // const location = useLocation();
    // const searchParams = new URLSearchParams(location.search);
    // const userObj = searchParams.get("user");
    // const user = JSON.parse(userObj);

    const [userData, setUserData] = useState({});

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/user/${userId}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
            
                setUserData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [userId, token]); // Make sure to include dependencies

    console.log(userData.user_name);
    


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [online, setOnline] = useState(navigator.onLine);
    const [loading, setLoading] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [needToChangePassword, setNeedToChangePassword] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");

    const [cookies, setCookie, removeCookie] = useCookies([
        "isDefaultPassword",
        "token",
        "userId",
        "userRole",
        "userFirstName",
        "userLastName",
        "userImage",
        "isDarkMode",
    ]);

    const [inputValidations, setInputValidations] = useState({
        user_name: true,
        email: true,
        phone_number: true,
    }) 

    const handleSiubmit = () => {
        if (online) {
            setLoading(true);
            axios
                .post(
                    `${API_BASE_URL}/api/user/${userId}`,
                    {
                        user_name: userInfo.user_name,
                        first_name: userInfo.first_name.trim(),
                        last_name: userInfo.last_name.trim(),
                        role: userRole,
                        password: userInfo.password,
                        email: userInfo.email.trim(),
                        contact_no: userInfo.phone_number,
                        
                        password: "",
                    },
                    {
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    }
                )
                .then((response) => {
                    if (response.data.data.status === "Success") {

                        setCookie("userRole", response.data.user.role, {
                            path: "/",
                            expires: new Date(Date.now() + 3600e3),
                        });
                        setCookie(
                            "userFirstName",
                            response.data.user.first_name,
                            {
                                path: "/",
                                expires: new Date(Date.now() + 3600e3),
                            }
                        );
                        setCookie(
                            "userLastName",
                            response.data.user.last_name,
                            {
                                path: "/",
                                expires: new Date(Date.now() + 3600e3),
                            }
                        );

                        dispatch(
                            setUserFirstName(response.data.user.first_name)
                        );
                        dispatch(setUserLastName(response.data.user.last_name));
                        dispatch(setUserRole(response.data.user.role));

                        //changing password.......................................................

                        if(needToChangePassword){
                            axios
                            .post(
                                `${API_BASE_URL}/api/Auth/UpdateUsersPassword`,
                                {
                                    id: response.data.user.id,
                                    user_name: response.data.user.user_name,
                                    first_name: response.data.user.first_name,
                                    last_name: response.data.user.last_name,
                                    reg_date: response.data.user.reg_date,
                                    reg_by: response.data.user.reg_by,
                                    role: response.data.user.role,
                                    password: newPassword,
                                    email: response.data.user.email,
                                    phone_number: response.data.user.phone_number,
                                    accesstoken: "",
                                    status: response.data.user.status,
                                    isDefaultPassword: true,
                                    profilePicture: response.data.user.profilePicture,
                                    isDarkMode: response.data.user.isDarkMode,
                                },
                                {
                                    headers: {
                                        AccessToken: token,
                                        "Content-Type": "application/json",
                                        Accept: "text/plain",
                                    },
                                }
                            )
                            .then((response) => {
                                console.log(response);
                                if (response.data.data.status === "Success") {
                                    openNotificationWithIcon(
                                        "success",
                                        "Successfully Changed The Password",
                                        "Kindly signin again using the new password."
                                    );
                                    // const removeCookie = props.removeCookie
                                    removeCookie("isDarkMode", { path: "/" });
                                    removeCookie("userImage", { path: "/" });
                                    removeCookie("token", { path: "/" });
                                    removeCookie("isDefaultPassword", {
                                        path: "/",
                                    });
                                    removeCookie("userId", { path: "/" });
                                    removeCookie("userRole", { path: "/" });
                                    removeCookie("userFirstName", {
                                        path: "/",
                                    });
                                    removeCookie("userLastName", { path: "/" });
                                    dispatch(signOut());
                                } else if (
                                    response.data.data.status === "Fail"
                                ) {
                                    openNotificationWithIcon(
                                        "error",
                                        "Error Occurred",
                                        "Password could not be updated."
                                    );
                                } else {
                                    openNotificationWithIcon(
                                        "error",
                                        "Error Occurred",
                                        "Password could not be updated."
                                    );
                                }
                            })
                            .catch((error) => {
                                console.log(error, error.message);
                                openNotificationWithIcon(
                                    "error",
                                    "Error Occurred",
                                    "Password could not be updated."
                                );
                            });
                        }

                        openNotificationWithIcon(
                            "success",
                            "Successfully Updated",
                            "User updated sucessfully."
                        );
                        setLoading(false);
                        navigate("/app/dashboards/users/view");
                    } else if (response.data.data.status === "Fail") {
                        openNotificationWithIcon(
                            "error",
                            "Error Occurred",
                            "User could not be updated."
                        );
                        setLoading(false);
                    } else {
                        openNotificationWithIcon(
                            "error",
                            "Error Occurred",
                            "User could not be updated."
                        );
                        setLoading(false);
                    }
                })
                .catch((error) => {
                    openNotificationWithIcon(
                        "error",
                        "Error Occurred",
                        "User could not be updated."
                    );
                    setLoading(false);
                });
        } else {
            openNotificationWithIcon(
                "error",
                "No Internet",
                "Check Your Internet Connectivity."
            );
            setLoading(false);
        }
    };

    //validate a phone number
    const isvalidPhoneNumber = (number) => {
        return /^\d+$/.test(number) && number?.length == 10;
    };

    //validate a phone number
    const isvalidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    //sync date values
    const onChangeRegDate = (date, dateString) => {
        setUserInfo({
            ...userInfo,
            reg_date: dateString,
        });
    };

    //show notifications
    const openNotificationWithIcon = (type, title, desc) => {
        notification[type]({
            message: title,
            description: desc,
        });
    };

    //checks for the current internet connectivity
    useEffect(() => {
        const handleOnlineStatusChange = () => {
            setOnline(navigator.onLine);
        };

        window.addEventListener("online", handleOnlineStatusChange);
        window.addEventListener("offline", handleOnlineStatusChange);

        return () => {
            window.removeEventListener("online", handleOnlineStatusChange);
            window.removeEventListener("offline", handleOnlineStatusChange);
        };
    }, []);

    // useEffect(() => {
    //     const loadUserInfo = async () => {
    //         axios
    //             .get(`${API_BASE_URL}/api/Auth/GetuserbyID/${userId}`, {
    //                 headers: {
    //                     AccessToken: token,
    //                     "Content-Type": "application/json",
    //                     Accept: "text/plain",
    //                 },
    //             })
    //             .then((response) => response.data)
    //             .then((data) => {
    //                 setUserInfo(data.user);
    //             })
    //             .catch((error) => {
    //                 console.error("Error fetching data:", error);
    //             });
    //     };
    //     loadUserInfo();
    // }, []);

    // console.log(userInfo);
    return (
        <>
            <div>
                <BreadcrumbCustom
                    name="My Profile"
                    level1="Users"
                    level1Redirect="/app/dashboards/users/view"
                    level2="View Users / Profile"
                />
                <Card className={currentTheme === "light" && "ant-card-custom"}>
                    <Row>
                        <Col
                            sm={{ span: 24 }} md={{ span: 6, offset: 2 }}
                            // sm={24}
                            // md={6}
                            style={{
                                // display: "flex",
                                // justifyContent: "end",
                                // alignItems: "start",
                                paddingTop: "20px",
                            }}
                            // justifyC={{ xs: 'center', sm: 'start' }}
                        >
                            <AvatarStatus
                                src={`${GOOGLE_BUCKET_URL}/${userImage}`}
                                name={`${userFirstName} ${userLastName}`}
                                size={150}
                                dontShowNameAndSubtitle={true}
                            />
                        </Col>
                        <Col sm={24} md={12}>
                            <Form
                                {...formItemLayout}
                                style={{
                                    padding: "20px",
                                    // backgroundColor: "green"
                                    // border: "1px solid #0d6efd",
                                    // borderRadius: "5px",
                                    // marginBottom: "-20px"
                                    //backgroundColor: "red"
                                }}
                                layout="vertical"
                            >
                                <Form.Item
                                    label="User Name"
                                    //hasFeedback
                                    validateStatus={
                                        userData.user_name !== ""
                                            ? "success"
                                            : "error"
                                    }
                                    style={{ marginBottom: "10px" }}
                                    wrapperCol={{ xs: 24, sm: { span: 24 } }}
                                >
                                    <Input
                                        placeholder="User Name"
                                        id="error"
                                        value={userData.user_name}
                                        onChange={(e) => {
                                            setUserInfo({
                                                ...userData,
                                                userData: e.target.value.trim(),
                                            });
                                        }}
                                        // disabled={true}
                                    />
                                </Form.Item>

                                <Form.Item
                                    //label="Full Name"
                                    //wrapperCol={{ xs: 24, sm: { span: 12 } }}
                                    style={{ marginBottom: "-10px" }}
                                    wrapperCol={{ xs: 24, sm: { span: 24 } }}
                                >
                                    <Form.Item
                                        label="First Name"
                                        //hasFeedback
                                        validateStatus={
                                            userData.first_name !== ""
                                                ? "success"
                                                : "error"
                                        }
                                        // style={{ marginBottom: "50px" }}
                                        style={{
                                            display: "inline-block",
                                            width: "calc(48%)",
                                            marginRight: "calc(4%)",
                                        }}
                                    >
                                        <Input
                                            placeholder="First Name"
                                            id="error"
                                            value={userData.first_name}
                                            onChange={(e) => {
                                                setUserInfo({
                                                    ...userData,
                                                    first_name: e.target.value.trim(),
                                                });
                                            }}
                                            disabled={userRole !== "ADMIN" && true}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Last Name"
                                        //hasFeedback
                                        validateStatus={
                                            userData.last_name !== ""
                                                ? "success"
                                                : "error"
                                        }
                                        // style={{ marginBottom: "50px" }}
                                        style={{
                                            display: "inline-block",
                                            width: "calc(48%)",
                                            // marginRight: "calc(4%)",
                                        }}
                                    >
                                        <Input
                                            placeholder="Last Name"
                                            id="error"
                                            value={userData.last_name}
                                            onChange={(e) => {
                                                setUserInfo({
                                                    ...userData,
                                                    last_name: e.target.value.trim(),
                                                });
                                            }}
                                            disabled={userRole !== "ADMIN" && true}
                                        />
                                    </Form.Item>
                                </Form.Item>

                                <Form.Item
                                    style={{marginBottom: '-10px'}}
                                    wrapperCol={{ xs: 24, sm: { span: 24 } }}
                                >
                                    <Form.Item
                                        label="Contact Number"
                                        //style={{ marginBottom: "0px" }}
                                        //hasFeedback
                                        // help={
                                        //     // isvalidPhoneNumber(
                                        //     //     userInfo.phone_number
                                        //     // )
                                        //     //     ? ""
                                        //     //     : "Enter a valid phone number!"
                                        //     isvalidPhoneNumber(userInfo?.phone_number) || userInfo?.phone_number === ""? inputValidations.phone_number === false && userInfo?.phone_number !== ""? "Contact number is already used" : "" : "Enter a valid phone number"
                                        // }
                                        validateStatus={
                                            isvalidPhoneNumber(
                                                userData.contact_no
                                            )
                                                ? "success"
                                                : "error"
                                        }
                                        style={{
                                            display: "inline-block",
                                            width: "calc(48%)",
                                            marginRight: "calc(4%)",
                                        }}
                                        className="custom-form-item"
                                    >
                                        <Input
                                            type="tel"
                                            placeholder="Contact Number"
                                            value={userData.contact_no}
                                            onChange={(e) => {
                                                setUserInfo({
                                                    ...userData,
                                                    contact_no: e.target.value,
                                                });
                                                // setInputValidations({
                                                //     ...inputValidations,
                                                //     phone_number: await isUserContactNumberAvailable(e.target.value, token, userInfo?.user_name)
                                                // })
                                            }}
                                            onKeyDown={(event) => {
                                                if (
                                                    event.key !== "Backspace" &&
                                                    !/[0-9]/.test(event.key)
                                                ) {
                                                    event.preventDefault();
                                                }
                                            }}
                                            // disabled={userRole !== "Admin" && true}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="E-mail"
                                        // style={{ marginBottom: "50px" }}
                                        //hasFeedback
                                        // help={
                                        //     // isvalidEmail(userInfo.email)
                                        //     //     ? ""
                                        //     //     : "Enter a valid e-mail address!"
                                        //     isvalidEmail(userInfo?.email) || userInfo?.email === ""? inputValidations.email === false && userInfo?.email !== ""? "Email is already used" : "": "Enter a valid e-mail address"
                                        // }
                                        validateStatus={
                                            isvalidEmail(userData.email)
                                                ? "success"
                                                : "error"
                                        }
                                        style={{
                                            display: "inline-block",
                                            width: "calc(48%)",
                                            // marginRight: "calc(4%)",
                                        }}
                                        className="custom-form-item"
                                    >
                                        <Input
                                            type="email"
                                            placeholder="E-mail"
                                            value={userData.email}
                                            onChange={(e) => {
                                                setUserInfo({
                                                    ...userData,
                                                    email: e.target.value.trim(),
                                                });
                                                // setInputValidations({
                                                //     ...inputValidations,
                                                //     email: await isUserEmailAvailable(e.target.value.trim(), token, userInfo?.user_name)
                                                // })
                                            }}
                                            disabled={userRole !== "ADMIN" && true}
                                        />
                                    </Form.Item>
                                </Form.Item>

                                <Form.Item
                                    //label="Registration"
                                    style={{ marginBottom: "-10px" }}
                                    //wrapperCol={{ xs: 24, sm: { span: 12 } }}
                                    wrapperCol={{ xs: 24, sm: { span: 24 } }}
                                >
                                    {/* <Form.Item
                                        label="Registration"
                                        style={{
                                            display: "inline-block",
                                            width: "100%"
                                            //width: "calc(48%)",
                                            //marginRight: "calc(4%)"
                                        }}
                                    >
                                        <DatePicker
                                            style={{
                                                //display: "inline-block",
                                                width: "100%",
                                                //marginRight: "calc(4%)",
                                            }}
                                            onChange={onChangeRegDate}
                                            value={dayjs(userInfo?.reg_date, dateFormat)} format={dateFormat}
                                            disabled={true}
                                            allowClear={false}
                                        />
                                    </Form.Item> */}
                                    {/* <Form.Item
                                        label="Role"
                                        style={{
                                            display: "inline-block",
                                            width: "calc(48%)",
                                        }}
                                    >
                                        <Select
                                            style={{
                                                // display: "inline-block",
                                                width: "100%",
                                            }}
                                            placeholder="Role"
                                            value={userInfo.role}
                                            onChange={(value) => {
                                                setUserInfo({
                                                    ...userInfo,
                                                    role: value,
                                                });
                                            }}
                                        >
                                            <Option value="Admin">Admin</Option>
                                            <Option value="User">User</Option>
                                        </Select>
                                    </Form.Item> */}
                                </Form.Item>

                                <Form.Item
                                    // wrapperCol={{
                                    //     xs: 24,
                                    //     sm: { span: 12 },
                                    // }}
                                    wrapperCol={{ xs: 24, sm: { span: 24 } }}
                                    style={{marginBottom: "10px"}}
                                >
                                    <Checkbox
                                        checked={
                                            needToChangePassword ? true : false
                                        }
                                        onChange={() => {
                                            setNeedToChangePassword(
                                                !needToChangePassword
                                            );
                                            setNewPassword("");
                                            setNewPasswordConfirmation("");
                                        }}
                                    >
                                        I need to change my password.
                                    </Checkbox>
                                </Form.Item>

                                {needToChangePassword && (
                                    <Form.Item
                                        //label="New Password"
                                        // wrapperCol={{
                                        //     xs: 24,
                                        //     sm: { span: 12 },
                                        // }}
                                        wrapperCol={{ xs: 24, sm: { span: 24 } }}
                                        style={{ marginBottom: "0px" }}
                                    >
                                        <Form.Item
                                            label="New Password"
                                            //hasFeedback
                                            // validateStatus={
                                            //     newPassword !== ""
                                            //         ? "success"
                                            //         : "error"
                                            // }
                                            // style={{ marginBottom: "50px" }}
                                            help={newPassword === "" || isValidPassword(newPassword) === true ? "" : "Password must contain 8 to 16 characters."}
                                            style={{
                                                display: "inline-block",
                                                width: "calc(48%)",
                                                marginRight: "calc(4%)",
                                            }}
                                            className="custom-form-item"
                                        >
                                            <Input.Password
                                                placeholder="Password"
                                                id="error"
                                                value={newPassword}
                                                onChange={(e) => {
                                                    setNewPassword(
                                                        e.target.value.trim()
                                                    );
                                                }}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            label="Confirm Password"
                                            //hasFeedback
                                            help={newPassword !== newPasswordConfirmation? "Confirm new password" : ""}
                                            validateStatus={
                                                newPassword ===
                                                newPasswordConfirmation
                                                    ? "success"
                                                    : "error"
                                            }
                                            // style={{ marginBottom: "50px" }}
                                            style={{
                                                display: "inline-block",
                                                width: "calc(48%)",
                                                // marginRight: "calc(4%)",
                                            }}
                                            className="custom-form-item"
                                        >
                                            <Input.Password
                                                placeholder="Confirm Password"
                                                id="error"
                                                value={newPasswordConfirmation}
                                                onChange={(e) => {
                                                    setNewPasswordConfirmation(
                                                        e.target.value.trim()
                                                    );
                                                }}
                                            />
                                        </Form.Item>
                                    </Form.Item>
                                )}

                                <Form.Item
                                    // wrapperCol={{
                                    //     xs: 24,
                                    //     sm: { span: 12 },
                                    // }}
                                    wrapperCol={{ xs: 24, sm: { span: 24 } }}
                                >
                                    {!needToChangePassword && (
                                        <Button
                                            type="primary"
                                            //htmlType="submit"
                                            loading={loading}
                                            style={{ width: "100%" }}
                                            disabled={
                                                userInfo.user_name === "" ||
                                                userInfo.first_name === "" ||
                                                userInfo.last_name === "" ||
                                                userInfo.reg_date === "" ||
                                                userInfo.role === "" ||
                                                userInfo.phone_number === "" ||
                                                inputValidations.phone_number === false ||
                                                userInfo.email === "" ||
                                                !isvalidPhoneNumber(
                                                    userInfo.phone_number
                                                ) ||
                                                inputValidations.email === false ||
                                                !isvalidEmail(userInfo.email)
                                                    ? true
                                                    : false
                                            }
                                            onClick={() => {
                                                handleSiubmit();
                                            }}
                                        >
                                            Update Me
                                        </Button>
                                    )}
                                    {needToChangePassword && (
                                        <Button
                                            //key="submit"
                                            type="primary"
                                            //htmlType="submit"
                                            loading={loading}
                                            style={{ width: "100%" }}
                                            // disabled={
                                            //     userInfo.user_name === "" ||
                                            //     userInfo.first_name === "" ||
                                            //     userInfo.last_name === "" ||
                                            //     userInfo.reg_date === "" ||
                                            //     userInfo.role === "" ||
                                            //     userInfo.phone_number === "" ||
                                            //     inputValidations.phone_number === false ||
                                            //     userInfo.email === "" ||
                                            //     newPassword === "" ||
                                            //     isValidPassword(newPassword) === false ||
                                            //     isValidPassword(newPasswordConfirmation) === false ||
                                            //     newPasswordConfirmation ===
                                            //         "" ||
                                            //     newPassword !==
                                            //         newPasswordConfirmation ||
                                            //     !isvalidPhoneNumber(
                                            //         userInfo.phone_number
                                            //     ) ||
                                            //     inputValidations.email === false ||
                                            //     !isvalidEmail(userInfo.email)
                                            //         ? true
                                            //         : false
                                            // }
                                            onClick={() => {
                                                handleSiubmit();
                                            }}
                                        >
                                            Update Me
                                        </Button>
                                    )}
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </Card>
            </div>
        </>
    );
};

export default EditUser;
