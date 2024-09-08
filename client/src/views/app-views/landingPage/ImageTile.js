import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Avatar, Image } from "antd";
import { GOOGLE_BUCKET_URL } from "configs/AppConfig";
import axios from "axios";
import { isContainsOnlyWhiteSpace } from "helpers";

const ImageTile = ({ item }) => {
    const { currentTheme } = useSelector((state) => state.theme);

    const [isImageAvailable, setIsImageAvailable] = useState(false);
    const [fullName, setFullName] = useState(
        `${item?.first_name} ${item?.last_name}`
    );

    useEffect(() => {
        axios
            .head(`${GOOGLE_BUCKET_URL}/${item?.image}`)
            .then((res) => {
                if (
                    res.status === 200 &&
                    `${GOOGLE_BUCKET_URL}/${item?.image}`.length >
                        GOOGLE_BUCKET_URL.length + 2
                ) {
                    //console.log(`img existenet for: ${props.name}`);
                    setIsImageAvailable(true);
                }
            })
            .catch((err) => {
                setIsImageAvailable(false);
            });
    }, [item]);

    return (
        <>
            <div
                className={`img-tile-wrapper ${
                    currentTheme === "dark" && "img-tile-wrapper-dark"
                }`}
            >
                {/* <div className="img-text-info">
                    <p
                        className={`img-text-name ${
                            currentTheme === "dark" && "img-text-name-dark"
                        }`}
                    >
                        9090
                    </p>
                </div> */}
                {isImageAvailable && (
                    <Image
                        src={`${GOOGLE_BUCKET_URL}/${item?.image}`}
                        className="img-tile"
                        preview={{
                            mask: null
                        }}
                    />
                )}
                {!isImageAvailable && (
                    <Image
                        src="/img/avatars/noprofile.jpg"
                        className="img-tile"
                        preview={{
                            mask: null
                        }}
                    />
                )}
                <div className="img-text-info">
                    <p
                        className={`img-text-name ${
                            currentTheme === "dark" && "img-text-name-dark"
                        }`}
                    >
                        JAvaScript Advanced Topics and Tutorial
                    </p>
                    <p
                        className={`img-text-name2 ${
                            currentTheme === "dark" && "img-text-name-dark2"
                        }`}
                    >
                        Marsh Rooney 
                    </p>
                    <p
                        className={`img-text-name3 ${
                            currentTheme === "dark" && "img-text-name-dark3"
                        }`}
                    >
                        $13.68
                    </p>
                    {/* <p className="img-text-date">
                        Expired at: 2024-9-10
                    </p> */}
                </div>
            </div>
        </>
    );
};

export default ImageTile;

//v1
