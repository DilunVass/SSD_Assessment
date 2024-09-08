import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
    Avatar,
    Badge,
    Card,
    Table,
    Tag,
    Tooltip,
    message,
    Button,
    List,
    Popover,
    Row,
    Col,
    Select,
    Form,
    Divider,
    notification,
    Breadcrumb,
    Image,
} from "antd";
import {
    EyeOutlined,
    DeleteOutlined,
    EditOutlined,
    UsergroupDeleteOutlined,
    CheckOutlined,
} from "@ant-design/icons";
import BreadcrumbCustom from "components/custom-components/BreadcrumbCustom";
import Chart from "react-apexcharts";
import ApexCharts from "apexcharts";
import { VictoryPie } from "victory-pie";
import { current } from "@reduxjs/toolkit";

const DefaultDashboard = () => {

    const {currentTheme} = useSelector(state => state.theme);
    const data = [
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
    ];

    // useEffect(() => {
    //     var options = {
    //         series: [44, 55],
    //         chart: {
    //             type: "donut",
    //             height: "40%",
    //             // width: "60px"
    //         },
    //         responsive: [
    //             {
    //                 breakpoint: 400,
    //                 options: {
    //                     chart: {
    //                         width: "100%",
    //                     },
    //                     legend: {
    //                         position: "bottom",
    //                     },
    //                 },
    //             },
    //         ],
    //     };

    //     var chart = new ApexCharts(document.querySelector("#chart"), options);
    //     chart.render();
    // }, []);

    return (
        <>
            <BreadcrumbCustom
                name="My Courses"
                level1="Profile"
                level2="My Courses"
                // level1Redirect="/app/dashboards/membership/view"
                // level2="Renew membership"
            />

            {data.map((item, index) => {
                return (
                    <Row gutter={16} style={{ width: "100%" }}>
                        <Row style={{ width: "100%" }}>
                            <Col span={24}>
                                <Card
                                    title="Course Name By Steve Smith"
                                    bordered={false}
                                >
                                    <Row style={{ width: "100%"}}>
                                        <Col sx={12} style={{width: "50%"}}>
                                            <Image
                                                src="/img/avatars/noprofile.jpg"
                                                // className="img-tile"
                                                style={{
                                                    cursor: "pointer",
                                                    borderRadius: "5px",
                                                }}
                                                width={60}
                                                height={60}
                                                preview={{
                                                    mask: null,
                                                }}
                                            />
                                        </Col>
                                        <Col sx={12} style={{width: "50%", display: "flex", justifyContent: "end"}}>
                                            {/* <div id="chart" style={{width: "50%"}}></div> */}
                                            <div style={{height: "70px", width: "250px", display: "flex", justifyContent: "end"}}>
                                                <VictoryPie
                                                    padAngle={({ datum }) => datum.y}
                                                    innerRadius={40}
                                                    // data={
                                                    //     [
                                                    //         { x:1, label:"Cats", y: 35 },
                                                    //         { x:2, label:"Dogs", y: 40 },
                                                    //         { x:3, label:"Birds", y: 55 }
                                                    //     ]
                                                    // }
                                                    data={
                                                        [
                                                            { x: 1, label: "Completed", y: 1 },
                                                            { x: 2, label: "Todo", y: 2 },
                                                            // { x: 3, label: "Birds", y: 55 }
                                                        ]
                                                    }
                                                    height={140}
                                                    colorScale={["#FF5733", "#3498DB", "#27AE60"]}
                                                    style={{
                                                        labels: {
                                                            fontSize: 30, // Specify the desired font size for labels
                                                            fontWeight: 'bold', // Optionally, set font weight
                                                            fill: currentTheme === "dark"? 'white' : 'black'
                                                        }
                                                    }}
                                                    // width={700}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    </Row>
                );
            })}
        </>
    );
};

export default DefaultDashboard;
