import React from 'react'
import { SIDE_NAV_WIDTH, SIDE_NAV_COLLAPSED_WIDTH, NAV_TYPE_TOP } from 'constants/ThemeConstant';
import { APP_NAME } from 'configs/AppConfig';
import { useDispatch, useSelector } from 'react-redux';
import utils from 'utils';
import { Grid } from 'antd';
import styled from '@emotion/styled';
import { TEMPLATE } from 'constants/ThemeConstant';
import { useNavigate } from 'react-router-dom';

const LogoWrapper = styled.div(() => ({
	height: TEMPLATE.HEADER_HEIGHT,
	display: 'flex',
	alignItems: 'center',
	padding: '0 1rem',
	backgroundColor: 'transparent',
	transition: 'all .2s ease',
}));

const { useBreakpoint } = Grid;

export const Logo = ({ mobileLogo, logoType }) => {

	const navigate = useNavigate();
	const isMobile = !utils.getBreakPoint(useBreakpoint()).includes('lg');

	const navCollapsed = useSelector(state => state.theme.navCollapsed);
	const navType = useSelector(state => state.theme.navType);

	const getLogoWidthGutter = () => {
		const isNavTop = navType === NAV_TYPE_TOP ? true : false
		if(isMobile && !mobileLogo) {
			return 0
		}
		if(isNavTop) {
			return 'auto'
		}
		if(navCollapsed) {
			return `${SIDE_NAV_COLLAPSED_WIDTH}px`
		} else {
			return `${SIDE_NAV_WIDTH}px`
		}
	}
	
	const getLogo = () => {
		if(logoType === 'light') {
			if(navCollapsed) {
			return '/img/logo-sm-white.png'
			}
			return '/img/logo-white.png'
		}
	
		if (navCollapsed) {
			return '/img/logo-sm.png'
		}
		return '/img/logo.png'
	}

	return (
		<LogoWrapper className={isMobile && !mobileLogo ? 'd-none' : 'logo'} style={{width: `${getLogoWidthGutter()}`}}>
			<img 
				src={getLogo()} 
				alt={`${APP_NAME} logo`} 
				style={{
					// padding : navCollapsed === true && "0px",
					marginLeft: navCollapsed === true ? "-30px" : "-15px",
					marginTop: navCollapsed === true ? "0px" : "15px",
					cursor: 'pointer'

				}}
				onClick={() => {navigate("/dashboards/default")}}
			/>
		</LogoWrapper>
	)
}

export default Logo;
