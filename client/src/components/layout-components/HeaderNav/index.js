/** @jsxImportSource @emotion/react */
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { TEMPLATE } from "constants/ThemeConstant";
import { Button, Switch, Input } from "antd";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    SearchOutlined,
    CloseOutlined
} from "@ant-design/icons";
import Logo from "../Logo";
import NavProfile from "../NavProfile";
import Header from "./Header";
import HeaderWrapper from "./HeaderWrapper";
import Nav from "./Nav";
import NavEdge from "./NavEdge";
import NavItem from "../NavItem";
import {
    toggleCollapsedNav,
    onMobileNavToggle,
    onSwitchTheme,
} from "store/slices/themeSlice";
import { setGlobalSearchKey } from "store/slices/authSlice";
import {
    NAV_TYPE_TOP,
    SIDE_NAV_COLLAPSED_WIDTH,
    SIDE_NAV_WIDTH,
} from "constants/ThemeConstant";
import utils from "utils";
import { API_BASE_URL } from "configs/AppConfig";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const HeaderNav = (props) => {
    const { isMobile } = props;
    const [searchActive, setSearchActive] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
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

    const navCollapsed = useSelector((state) => state.theme.navCollapsed);
    const mobileNav = useSelector((state) => state.theme.mobileNav);
    const navType = useSelector((state) => state.theme.navType);
    const headerNavColor = useSelector((state) => state.theme.headerNavColor);
    const currentTheme = useSelector((state) => state.theme.currentTheme);
    const { token, globalSearchKey } = useSelector((state) => state.auth);

    const [searchKey, setSearchKey] = useState("");

    const onSearchClose = () => {
        setSearchActive(false);
    };

    const onToggle = () => {
        if (!isMobile) {
            dispatch(toggleCollapsedNav(!navCollapsed));
        } else {
            dispatch(onMobileNavToggle(!mobileNav));
        }
    };

    const isNavTop = navType === NAV_TYPE_TOP;
    const isDarkTheme = currentTheme === "dark";
    //const isDarkTheme = true

    const navMode = useMemo(() => {
        if (!headerNavColor) {
            return utils.getColorContrast(isDarkTheme ? "#000000" : "#ffffff");
        }
        return utils.getColorContrast(headerNavColor);
    }, [isDarkTheme, headerNavColor]);

    const navBgColor = isDarkTheme
        ? TEMPLATE.HEADER_BG_DEFAULT_COLOR_DARK
        : TEMPLATE.HEADER_BG_DEFAULT_COLOR_LIGHT;

    const getNavWidth = () => {
        if (isNavTop || isMobile) {
            return "0px";
        }
        if (navCollapsed) {
            return `${SIDE_NAV_COLLAPSED_WIDTH}px`;
        } else {
            return `${SIDE_NAV_WIDTH}px`;
        }
    };

    useEffect(() => {
        if (!isMobile) {
            onSearchClose();
        }
    });

    return (
        <Header
            isDarkTheme={isDarkTheme}
            headerNavColor={headerNavColor || navBgColor}
        >
            <HeaderWrapper isNavTop={isNavTop}>
                <Logo logoType={navMode} />
                <Nav navWidth={getNavWidth()}>
                    <NavEdge left>
                        {isNavTop && !isMobile ? null : (
                            <NavItem onClick={onToggle} mode={navMode}>
                                <div className="d-flex align-items-center">
                                    {navCollapsed || isMobile ? (
                                        <MenuUnfoldOutlined className="nav-icon" />
                                    ) : (
                                        <MenuFoldOutlined className="nav-icon" />
                                    )}
                                </div>
                            </NavItem>
                        )}
                    </NavEdge>
                    <NavEdge left>
                        <Input
                            placeholder="Search..."
                            prefix={<SearchOutlined />}
                            suffix={<CloseOutlined onClick={() => {dispatch(setGlobalSearchKey(''))}}/>}
                            value={globalSearchKey}
                            onChange={(e) => {dispatch(setGlobalSearchKey(e.target.value))}}
                            style={{height: "50px", marginTop: "10px"}}
                        />
                    </NavEdge>
                    <NavEdge right>
                        <NavProfile mode={navMode} />
                    </NavEdge>
                </Nav>
            </HeaderWrapper>
        </Header>
    );
};

export default HeaderNav;
