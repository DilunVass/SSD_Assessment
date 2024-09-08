import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Card, Carousel, Col, Form, Input, Modal, Row, Radio, DatePicker } from 'antd';
import { image } from "d3-fetch";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useNavigate } from "react-router-dom";
import { APP_PREFIX_PATH } from "configs/AppConfig";
import {
    HomeOutlined,
    LoadingOutlined,
    SettingFilled,
    SmileOutlined,
    SyncOutlined,
    LoginOutlined
} from '@ant-design/icons';
import ImageTile from "./ImageTile";
import { BLUE_BASE, GOLD_BASE_OUR_GYM } from "constants/ThemeConstant";

// const { Option } = Select;
dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;
const dateFormat = "YYYY-MM-DD";
const weekFormat = "MM/DD";
const monthFormat = "YYYY/MM";

const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

const LandingPage = () => {

    const navigate = useNavigate();
    const { currentTheme } = useSelector(state => state.theme);

    const [selectedCourse, setSelectedCourse] = useState({
        courseName: "Javascript Advanced Topics",
        category: "Programming Languages",
        courseduration: "40",
        description: "Best online course for learn and master javasvript and js librariesframeworks",
        price: "20",
        instructor: "Jade Smith",
        sections: ["Conditions", "Iterations", "Strings", "Arrays", "Maths", "Async/Await"]
    });

    const [paymentInfo, setPaymentInfo] = useState({
        cardNumber: "",
        holder: "",
        cvc: "",
        amount: "",
        method: 1,
        expireDate: `${dayjs().format("YYYY-MM-DD")}`
    })

    const [value, setValue] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
        // setSelectedCourse(item);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        // setSelectedCourse(null);
    }

    const showModalPayment = () => {
        setIsPaymentModalOpen(true);
        // setSelectedCourse(item);
    };

    const handleCancelPayment = () => {
        setIsPaymentModalOpen(false);
        setPaymentInfo({
            cardNumber: "",
            holder: "",
            cvc: "",
            amount: "",
            method: 1,
            expireDate: `${dayjs().format("YYYY-MM-DD")}`
        })
        // setSelectedCourse(null);
    }

    const onChangeDate = (date, dateString) => {
        setPaymentInfo({...paymentInfo, expireDate: dateString})
    }

    useEffect(() => {
        const leftNav = document.getElementsByClassName("ant-layout-sider");
        leftNav[0].style.display="none";
        
        const mainContent = document.getElementsByClassName("ant-layout");
        mainContent[0].style.paddingLeft="0px";
        mainContent[1].style.paddingLeft="0px"
        mainContent[2].style.paddingLeft="0px"
        
        const unfoldIcon = document.getElementsByClassName("css-k008qs");
        unfoldIcon[0].style.display="none";
        unfoldIcon[1].style.marginLeft='30px';

        const mainWrapper = document.getElementsByClassName("css-7b9zg2");
        mainWrapper[0].style.padding="0px";

    }, [])

    const data = [
        {},{}, {},{}, {},{}, {},{}, {},{}, {},
    ]

    return(        
        <>
            <Carousel autoplay>
                <div>
                    <div style={{backgroundImage: "url(/img/others/img-18.jpg)"}} className="landing-page-carousel-slides">
                        <Row style={{width: "100%", height: "100%"}}>
                            <Col xs={24} sm={12} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <div className="landing-page-carousel-text-wrapper light-text">
                                    <span style={{fontSize: "200%", fontWeight: 900}}>Online Education</span><br/>
                                    <span>Is like a rising tide,</span><br/>
                                    <span style={{fontSize: "110%", fontWeight: 300}}>It's going to lift all boats.</span><br/><br/>
                                    <Button type="primary" icon={<LoginOutlined />}><a href={`${APP_PREFIX_PATH}/dashboards/home`}> Explore</a></Button>
                                </div>
                            </Col>
                            <Col xs={24} sm={12}>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div>
                    <div style={{backgroundImage: "url(/img/others/img-19.jpg)"}} className="landing-page-carousel-slides">
                        <Row style={{width: "100%", height: "100%"}}>
                            <Col xs={24} sm={12}>
                            </Col>
                            <Col xs={24} sm={12} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <div className="landing-page-carousel-text-wrapper light-text">
                                    <span style={{fontSize: "200%", fontWeight: 900}}>Learn Yourself</span><br/>
                                    <span>Be your own guider,</span><br/>
                                    <span style={{fontSize: "110%", fontWeight: 300}}>Leads to the path of success.</span><br/><br/>
                                    <Button type="primary" icon={<LoginOutlined />}><a href={`${APP_PREFIX_PATH}/dashboards/home`}> Explore</a></Button>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div>
                    <div style={{backgroundImage: "url(/img/others/img-20.jpg)"}} className="landing-page-carousel-slides">
                        <Row style={{width: "100%", height: "100%"}}>
                                <Col xs={24} sm={12}>
                                </Col>
                                <Col xs={24} sm={12} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                    <div className="landing-page-carousel-text-wrapper light-text">
                                        <span style={{fontSize: "200%", fontWeight: 900}}>It's a Fact That</span><br/>
                                        <span>Online learning is the future and will undoubtedly replace</span><br/>
                                        <span style={{fontSize: "110%", fontWeight: 300}}>Land-based learning in the future.</span><br/><br/>
                                        <Button type="primary" icon={<LoginOutlined />}><a href={`${APP_PREFIX_PATH}/dashboards/home`}> Explore</a></Button>
                                    </div>
                                </Col>
                            </Row>
                    </div>
                </div>
            </Carousel>
            <Card className={`img-tiles-parent-wrapper-card ${currentTheme === "light" && "ant-card-custom"}`}>
                <Row style={{display: "flex", justifyContent: "center"}}>
                    {data.map((item, index) => {
                        return (
                            <Col style={{ marginBottom: "15px" }} className="img-tiles-wrapper-column">
                                <span style={{cursor: "pointer"}} onClick={() => {showModal()}}>
                                    <ImageTile item={item} />
                                </span>
                            </Col>
                        );
                    })}                    
                </Row>
                {/* <Spin tip="Loading" size="large" id="spinning">
                    <div
                        ref={targetRef}
                        style={{
                            padding: '50px',
                            background: 'rgba(0, 0, 0, 0.05)',
                            borderRadius: '4px',
                        }}
                    />
                </Spin> */}
            </Card>
            <Modal title={selectedCourse.courseName} open={isModalOpen} onCancel={handleCancel} 
                footer={[
                    <Button type="primary" onClick={() => {showModalPayment()}}>Enroll</Button>
                ]}
            >
                <Row>
                    <Col xs={24} sm={11} style={{marginBottom: "10px"}}>
                        <img src="/img/avatars/noprofile.jpg" className="course-info-modal-img"/>
                    </Col>
                    <Col xs={24} sm={13}>
                        <span style={{fontWeight: 500, color: currentTheme === "dark"? GOLD_BASE_OUR_GYM : BLUE_BASE}}>{selectedCourse.category}</span><br/>
                        <span style={{fontSize: 14}}>{selectedCourse.instructor}</span><br/>
                        <span style={{fontSize: 12}}>{selectedCourse.courseduration} Hours</span><br/><br/>
                        <span style={{fontSize: 12}}>{selectedCourse.description}</span><br/>
                        <ul>
                            {
                                selectedCourse.sections.map((it, i) => {
                                    return(
                                        <li>{it}</li>
                                    );
                                })
                            }
                        </ul>
                        <span style={{fontSize: 12, fontWeight: 700, color: currentTheme === "dark"? GOLD_BASE_OUR_GYM : BLUE_BASE}}>$ {selectedCourse.price}/= </span><br/>
                    </Col>
                </Row>
            </Modal>
            <Modal title={"Make Payment"} open={isPaymentModalOpen} onCancel={handleCancelPayment} width={600}
                footer={[
                    <Button type="primary">Enroll</Button>
                ]}
            >
                {/* <Row>
                    <Col xs={24} sm={11} style={{marginBottom: "10px"}}>
                        <img src="/img/avatars/noprofile.jpg" className="course-info-modal-img"/>
                    </Col>
                    <Col xs={24} sm={13}>
                        <span style={{fontWeight: 500, color: currentTheme === "dark"? GOLD_BASE_OUR_GYM : BLUE_BASE}}>{selectedCourse.category}</span><br/>
                        <span style={{fontSize: 14}}>{selectedCourse.instructor}</span><br/>
                        <span style={{fontSize: 12}}>{selectedCourse.courseduration} Hours</span><br/><br/>
                        <span style={{fontSize: 12}}>{selectedCourse.description}</span><br/>
                        <ul>
                            {
                                selectedCourse.sections.map((it, i) => {
                                    return(
                                        <li>{it}</li>
                                    );
                                })
                            }
                        </ul>
                        <span style={{fontSize: 12, fontWeight: 700, color: currentTheme === "dark"? GOLD_BASE_OUR_GYM : BLUE_BASE}}>$ {selectedCourse.price}/= </span><br/>
                    </Col>
                </Row> */}

                <div>
                    <Form layout="vertical">
                        <br/>
                        <span>Select the preferable Payment method</span><br/><br/>
                        <Radio.Group onChange={(e) => {setPaymentInfo({...paymentInfo, method: e.target.value})}} value={paymentInfo.method}>
                            <Radio value={1}><img src="/img/others/img-8.png" className="payment-choise-img"/></Radio>
                            <Radio value={2}><img src="/img/others/img-9.png" className="payment-choise-img"/></Radio>
                        </Radio.Group>
                        <br/><br/>
                        <Form.Item
                            wrapperCol={{ xs: 24, sm: { span: 24 } }}
                            style={{ marginBottom: "-10px" }}
                        >
                            <Form.Item
                                style={{
                                    display: "inline-block",
                                    width: "calc(48%)",
                                    marginRight: "calc(4%)",
                                }}
                            >
                                <Form.Item
                                    label="Card Number"
                                >
                                    <Input placeholder="Card Number" value={paymentInfo.cardNumber} onChange={(e) => {setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}} />
                                </Form.Item>
                            </Form.Item>
                            <Form.Item
                                style={{
                                    display: "inline-block",
                                    width: "calc(48%)",
                                    // marginRight: "calc(4%)",
                                }}
                            >
                                <Form.Item
                                    label="CVC"
                                >
                                    <Input placeholder="CVC" value={paymentInfo.cvc} onChange={(e) => {setPaymentInfo({...paymentInfo, cvc: e.target.value})}}/>
                                </Form.Item>
                            </Form.Item>
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{ xs: 24, sm: { span: 24 } }}
                            style={{ marginBottom: "-10px" }}
                        >
                            <Form.Item
                                label="Card Holder Name"
                            >
                                <Input placeholder="Holder Name" value={paymentInfo.holder} onChange={(e) => {setPaymentInfo({...paymentInfo, holder: e.target.value})}}/>
                            </Form.Item>
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{ xs: 24, sm: { span: 24 } }}
                            style={{ marginBottom: "-10px" }}
                        >
                            <Form.Item
                                label="Amount"
                            >
                                <Input placeholder="Course Name" value={paymentInfo.amount} onChange={(e) => {setPaymentInfo({...paymentInfo, amount: e.target.value})}}/>
                            </Form.Item>
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{ xs: 24, sm: { span: 24 } }}
                            style={{ marginBottom: "-10px" }}
                        >
                            <Form.Item
                                label="Expire Date"
                                style={{
                                    display: "inline-block",
                                    width: "calc(48%)",
                                    marginRight: "calc(4%)",
                                }}
                            >
                                <DatePicker
                                    placeholder="Select Date"
                                    value={dayjs(paymentInfo.expireDate, dateFormat)}
                                    format={dateFormat}
                                    onChange={onChangeDate}
                                    style={{ width: "100%" }}
                                    allowClear={false}
                                />
                            </Form.Item>
                        </Form.Item>
                        
                        {/* <Form.Item style={{display :"flex", justifyContent: "start"}}>
                            <Button type="primary" onClick={() => {}}>Add Course</Button>
                        </Form.Item> */}
                    </Form>
                </div>
            </Modal>
            <br/>
        </>
    );
}

export default LandingPage;