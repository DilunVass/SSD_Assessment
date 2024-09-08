import { notification } from "antd";

export const capture = (webcamRef, setImgFile, setImgFilePreview) => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
        fetch(imageSrc)
            .then((res) => res.blob())
            .then((blob) => {
                const file = new File([blob], "webcam-image.png", {
                    type: "image/png",
                });
                setImgFile(file);
                if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        setImgFilePreview(reader.result);
                    };
                    reader.readAsDataURL(file);
                }
            })
            .catch((error) =>
                console.error("Error converting image:", error)
            );
    }
};

export const isvalidPhoneNumber = (number) => {
    return /^\d+$/.test(number) && number?.length == 10;
};

export const isvalidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const openNotificationWithIcon = (type, title, desc) => {
    notification[type]({
        message: title,
        description: desc,
    });
};

export const isContainsOnlyWhiteSpace = (str) => {
    return /^\s*$/.test(str);
};

export const isValidPassword = (str) => {
    return str?.trim()?.length >= 8 && str?.trim()?.length <= 16;
};
