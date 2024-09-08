import React, { lazy, Suspense, memo, useEffect } from "react";
import { useSelector } from "react-redux";
import { ConfigProvider } from "antd";
import Loading from "components/shared-components/Loading";
import { lightTheme, darkTheme } from "configs/ThemeConfig";
//import { resources } from "lang";
import useBodyClass from "utils/hooks/useBodyClass";
import Routes from "routes";
// import ChangeDefaultPassword from "views/change-default-password";
import { Provider, useDispatch } from 'react-redux';
import { useCookies } from "react-cookie"
import { 
	// signIn,
	setUser,
	setUserId,
    setUserImage,
	setUserFirstName,
	setUserLastName,
	setUserRole,
	setIsDefaultPassword,
	showLoading,
	stopLoading, 
	showAuthMessage, 
	hideAuthMessage, 
	signInWithGoogle, 
	signInWithFacebook,
	signInSuccess 
} from 'store/slices/authSlice';
import { onSwitchTheme } from "store/slices/themeSlice";

const AppLayout = lazy(() => import("./AppLayout"));
const AuthLayout = lazy(() => import("./AuthLayout"));

const Layouts = () => {
    const token = useSelector((state) => state.auth.token);
    const userimg = useSelector((state) => state.auth.userImage);
    const isDefaultPassword = useSelector((state) => state.auth.isDefaultPassword);
    const blankLayout = useSelector((state) => state.theme.blankLayout);

    const Layout = token && !blankLayout ? AppLayout : AuthLayout;

    const locale = useSelector((state) => state.theme.locale);

    const direction = useSelector((state) => state.theme.direction);

    const currentTheme = useSelector((state) => state.theme.currentTheme);

    useBodyClass(`dir-${direction}`);

    const themeConfig =
        currentTheme === "light" ? { ...lightTheme } : { ...darkTheme };

    const dispatch = useDispatch();
    const [cookies, setCookie, removeCookie] = useCookies([
        "isDefaultPassword",
        "token",
        "userId",
        "userRole",
        "userFirstName",
        "userLastName",
        "userImage",
        "isDarkMode"
    ]);

    useEffect(() => {
        dispatch(signInSuccess(cookies.token));
        dispatch(setIsDefaultPassword(cookies.isDefaultPassword === 'true'? 'true' : 'false'));
        dispatch(setUserId(cookies.userId));
        dispatch(setUserFirstName(cookies.userFirstName));
        dispatch(setUserLastName(cookies.userLastName));
        dispatch(setUserRole(cookies.userRole));
        dispatch(setUserImage(cookies.userImage));
        token && dispatch(onSwitchTheme(cookies.isDarkMode === 'dark' ? "dark" : "light"));
    }, []);

    return (
        <ConfigProvider
            theme={themeConfig}
            direction={direction}
        >
            <Suspense fallback={<Loading cover="content" />}>
                <Layout>
                    <Routes />
                </Layout>
            </Suspense>
        </ConfigProvider>
    );
};

export default memo(Layouts);
