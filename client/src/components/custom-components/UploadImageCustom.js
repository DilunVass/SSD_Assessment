import React, {useRef, useState} from "react";
import Webcam from "react-webcam";
import { Menu, Input, Dropdown, Space, Avatar, Modal, Row, Col } from "antd";
import UploadImgIcon from "../../assets/img/upload-img.png"
import { capture } from "helpers";

const UploadImageCustom = ({imgFilePreview, setImgFile, setImgFilePreview}) => {
    
    const webcamRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const menu = ({
        setImgFile,
        setImgFilePreview,
        setIsModalOpen,
    }) => (
        <Menu
            items={[
                {
                    key: "1",
                    label: (
                        <label htmlFor="img-upload">
                            <p>Upload From Your Device</p>
                            <Input
                                id="img-upload"
                                type="file"
                                accept="image/png, image/jpg, image/jpeg"
                                onChange={(e) => {
                                    const img = e.target.files[0];
                                    if (img) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            setImgFilePreview(reader.result);
                                        };
                                        reader.readAsDataURL(img);
                                    }
                                    setImgFile(img);
                                    // setWebCamImage(null);
                                }}
                                style={{ display: "none" }}
                            ></Input>
                        </label>
                    ),
                },
                {
                    key: "2",
                    label: (
                        <p
                            onClick={() => {
                                setIsModalOpen(true);
                            }}
                        >
                            Using Web Cam
                        </p>
                    ),
                },
            ]}
        />
    );

    return (
        <>
            <Dropdown
                overlay={menu({
                    setImgFile,
                    setImgFilePreview,
                    isModalOpen,
                    setIsModalOpen,
                    webcamRef,
                    //capture,
                })}
            >
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        <Avatar
                            size={140}
                            // src={imgFile? imgFilePreview : webCamImage? webCamImage : null}
                            src={
                                imgFilePreview ? imgFilePreview : UploadImgIcon
                            }
                            style={{ cursor: "pointer" }}
                        />
                    </Space>
                </a>
            </Dropdown>
            <Modal
                title="Capture An Image"
                open={isModalOpen}
                onOk={() => {
                    capture(webcamRef, setImgFile, setImgFilePreview);
                    setIsModalOpen(false);
                }}
                onCancel={() => {
                    setIsModalOpen(false);
                }}
            >
                <Row>
                    <Col xs={24}>
                        <Webcam style={{ width: "100%" }} ref={webcamRef} />
                    </Col>
                </Row>
            </Modal>
        </>
    );
};

export default UploadImageCustom;
