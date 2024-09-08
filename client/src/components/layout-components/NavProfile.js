import React from "react";
import axios from "axios";
import { Dropdown, Avatar, Switch } from "antd";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
    EditOutlined,
    SettingOutlined,
    ShopOutlined,
    QuestionCircleOutlined,
    LogoutOutlined,
    UserOutlined,
} from "@ant-design/icons";
import NavItem from "./NavItem";
import Flex from "components/shared-components/Flex";
import { signOut } from "store/slices/authSlice";
import {
    onSwitchTheme,
} from "store/slices/themeSlice";
import styled from "@emotion/styled";
import {
    FONT_WEIGHT,
    MEDIA_QUERIES,
    SPACER,
    FONT_SIZES,
} from "constants/ThemeConstant";
import { useCookies } from "react-cookie"
import { GOOGLE_BUCKET_URL } from "configs/AppConfig";
import { API_BASE_URL } from "configs/AppConfig";
import { useNavigate } from "react-router-dom";
import AvatarStatus from "components/shared-components/AvatarStatus";

const Icon = styled.div(() => ({
    fontSize: FONT_SIZES.LG,
}));

const Profile = styled.div(() => ({
    display: "flex",
    alignItems: "center",
}));

const UserInfo = styled("div")`
    padding-left: ${SPACER[2]};

    @media ${MEDIA_QUERIES.MOBILE} {
        display: none;
    }
`;

const Name = styled.div(() => ({
    fontWeight: FONT_WEIGHT.SEMIBOLD,
}));

const Title = styled.span(() => ({
    opacity: 0.8,
}));

// const MenuItem = (props) => (
// 	<Flex as="a" href={props.path} alignItems="center" gap={SPACER[2]}>
// 		<Icon>{props.icon}</Icon>
// 		<span>{props.label}</span>
// 	</Flex>
// )

const MenuItemSignOut = (props) => {
    const dispatch = useDispatch();

    const handleSignOut = () => {
        dispatch(signOut());
        const removeCookie = props.removeCookie
        removeCookie('isDarkMode', {path : '/'})
        removeCookie('userImage', {path : '/'})
        removeCookie('token', { path: '/' })
        removeCookie('isDefaultPassword', { path: '/' })
        removeCookie('userId', { path: '/' })
        removeCookie('userRole', { path: '/' })
        removeCookie('userFirstName', { path: '/' })
        removeCookie('userLastName', { path: '/' })
    };

    return (
        <div onClick={handleSignOut}>
            <Flex alignItems="center" gap={SPACER[2]}>
                <Icon>
                    <LogoutOutlined />
                </Icon>
                <span>{props.label}</span>
            </Flex>
        </div>
    );
};

export const NavProfile = ({ mode }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userRole, userFirstName, userLastName, userImage, token } = useSelector(
        (state) => state.auth
    );
    console.log(userLastName)
    const { currentTheme } = useSelector(state => state.theme);
    const [cookies, setCookie, removeCookie] = useCookies(['isDefaultPassword', 'token', 'userId', 'userRole', 'userFirstName', 'userLastName']);
    console.log(cookies)
    const extractInitialLetters = () => {
        let output = '';
        if(userFirstName !== undefined || userFirstName !== null || userFirstName !== '')
            output += userFirstName? userFirstName[0] : '';
        else if(userLastName !== undefined || userLastName !== null || userLastName !== '')
            output += userLastName? userLastName[0] : '';
        return output;
    }

    const items = [
        {
            key: "Switch Theme",
            label: (
                <Flex alignItems="center" gap={SPACER[2]}>
                    <Switch
                        checkedChildren={<span>Dark</span>}
                        unCheckedChildren={<span>Dark</span>}
                        defaultChecked={
                            currentTheme === "dark" ? true : false
                        }
                        onChange={() => {
                            // localStorage.setItem("THEME", localStorage.getItem("THEME") === 'light'? 'dark' : 'light');
                            axios
                                .put(
                                    `${API_BASE_URL}/api/User/Theme`,
                                    {},
                                    {
                                        headers: {
                                            AccessToken: token,
                                        },
                                    }
                                )
                                .then((res) => console.log(res));
                            dispatch(
                                onSwitchTheme(
                                    currentTheme === "light"
                                        ? "dark"
                                        : "light"
                                )
                            );
                            setCookie(
                                "isDarkMode",
                                currentTheme === "light"
                                    ? "dark"
                                    : "light",
                                {
                                    path: "/",
                                    expires: new Date(
                                        Date.now() + 3600e3
                                    ),
                                }
                            );
                        }}
                    />
                </Flex>
            )
        },
        {
            key: "User Profile",
            label: (
                <Flex alignItems="center" gap={SPACER[2]}
                    onClick={() => {
                        navigate("app/dashboards/userProfile");
                    }}
                >
                    <Icon>
                        <UserOutlined />
                    </Icon>
                    <span>User Profile</span>
                </Flex>
            )
        },
        {
            key: "Sign Out",
            label: <MenuItemSignOut removeCookie={removeCookie} label="Sign Out" />,
        },
    ];
    
    return (
        <Dropdown placement="bottomRight" menu={{items}} trigger={["click"]}>
        	<NavItem mode={mode}>
        		<Profile>
                    {/* {
                        userImage === "" || userImage === null || userImage === undefined ?
                        <Avatar>{`${userFirstName[0]?.toUpperCase()}${userLastName[0]?.toUpperCase()}`}</Avatar> : 
                        <Avatar src={userImage} /> 
                    } */}
                    <AvatarStatus
                        src={`${GOOGLE_BUCKET_URL}/${userImage}`}
                        name={`${userFirstName} ${userLastName}`}
                        dontShowNameAndSubtitle={true}
                    />
        			<UserInfo className="profile-text">
        				<Name>{userFirstName} {userLastName}</Name>
        				{/* <Title>{userRole}</Title> */}
        			</UserInfo>
        		</Profile>
        	</NavItem>
        </Dropdown>
    );
};

export default NavProfile;
