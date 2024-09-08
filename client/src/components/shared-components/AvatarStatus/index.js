import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useSelector } from "react-redux"
import PropTypes from 'prop-types'
import { Avatar } from 'antd';
import { BLUE_BASE, GOLD_BASE_OUR_GYM } from 'constants/ThemeConstant';
import { isContainsOnlyWhiteSpace } from 'helpers';
import { GOOGLE_BUCKET_URL } from 'configs/AppConfig';

// const renderAvatar = (props) => {

// 	// if(props.src?.length > 55){

// 		const checkImageExists = async (props) => {

// 			let splitedName = props.name.split(" ");
// 			try {
// 				const response = await axios.head(props.src);
// 				if (response.status === 200) {
// 					//setImageExists(true);
// 					//console.log("your requested image is exists in the google bucket");
// 					return (
// 						<Avatar {...props} className={`ant-avatar-${props.type}`}>{props.text}</Avatar>
// 					);
// 				} else if (response.status === 404) {
// 					//setImageExists(false);
// 					//console.log("your requested image is not found in google bucket");
// 					return(
// 						<Avatar {...props}>{`${splitedName[0][0]?.toUpperCase()}${splitedName[1][0]?.toUpperCase()}`}</Avatar> 
// 					)
// 				}
// 			} catch (error) {
// 				//console.log('Error checking image existence chamalka:', error.message);
// 				//setImageExists(false);
// 				return(
// 					<Avatar {...props}>{`${splitedName[0][0]?.toUpperCase()}${splitedName[1][0]?.toUpperCase()}`}</Avatar> 
// 				)
// 			}
// 		};
	
// 		checkImageExists(props).then(res => {console.log(res);});
// 		// return (
// 		// 	<Avatar {...props} className={`ant-avatar-${props.type}`}>{props.text}</Avatar>
// 		// );
// 	// }else{
// 	// 	let splitedName = props.name.split(" ");
// 	// 	//console.log(splitedName);
// 	// 	return(
// 	// 		<Avatar {...props}>{`${splitedName[0][0]?.toUpperCase()}${splitedName[1][0]?.toUpperCase()}`}</Avatar> 
// 	// 	)
// 	// }
// }

export const AvatarStatus = props => {
	const { name, suffix, subTitle, id, type, src, icon, size, shape, gap, text, onNameClick, dontShowNameAndSubtitle } = props
	const currentTheme = useSelector((state) => state.theme.currentTheme);

	const [isImageAvailable, setIsImageAvailable] =  useState(false);

	useEffect(() => {
		axios.head(props.src)
		.then(res => {
			if(res.status === 200 && props.src?.length > GOOGLE_BUCKET_URL.length + 2){
				console.log(`img existenet for: ${props.name}`);
				setIsImageAvailable(true);
			}
		})
		.catch(err => {
			setIsImageAvailable(false);
		})
	}, [props.src])

	return (
		<div className="avatar-status d-flex align-items-center">
			{/* {renderAvatar({icon, src, type, size, shape, gap, text, name })} */}
			{
				!isImageAvailable && props.name?.trim().split(" ").length > 1 && !isContainsOnlyWhiteSpace(props.name) &&
				<Avatar {...props}>{`${props.name?.trim().split(" ")[0]?.trim()[0]?.toUpperCase() !== undefined ? props.name?.trim().split(" ")[0]?.trim()[0]?.toUpperCase() : ""}${props.name?.trim().split(" ")[props.name?.trim().split(" ").length-1]?.trim()[0]?.toUpperCase() !== undefined ? props.name?.trim().split(" ")[props.name?.trim().split(" ").length-1]?.trim()[0]?.toUpperCase() : ""}`}</Avatar> 
			}
			{
				!isImageAvailable && props.name?.trim().split(" ").length == 1 && !isContainsOnlyWhiteSpace(props.name) &&
				<Avatar {...props}>{`${props.name?.trim().split(" ")[0]?.trim()[0]?.toUpperCase()}`}</Avatar> 
			}
			{
				!isImageAvailable && (props.name?.trim() === undefined || props.name?.trim() === null) && !isContainsOnlyWhiteSpace(props.name?.trim()) &&
				<Avatar {...props}>No Name</Avatar> 
			}
			{
				!isImageAvailable && isContainsOnlyWhiteSpace(props.name) &&
				<Avatar {...props}>No Name</Avatar> 
			}
			{
				dontShowNameAndSubtitle !== true &&
				<div className="ml-2">
					<div>
						{
							onNameClick ? 
							<div onClick={() => onNameClick({name, subTitle, src, id})} className="avatar-status-name clickable">{name}</div> 
							:
							<div className="avatar-status-name" 
								style={{
									color: currentTheme === 'dark' && "White"
								}}
							>
								{name}
							</div>
						}
						<span
							style={{
								color: currentTheme === "dark" ? GOLD_BASE_OUR_GYM : BLUE_BASE
							}}
						>{suffix}</span>
					</div>
					<div className="text-muted avatar-status-subtitle">{subTitle}</div>
				</div>
			}
		</div>
	)
}

AvatarStatus.propTypes = {
	name: PropTypes.string,
	src: PropTypes.string,
	type: PropTypes.string,
	onNameClick: PropTypes.func
}


export default AvatarStatus;
