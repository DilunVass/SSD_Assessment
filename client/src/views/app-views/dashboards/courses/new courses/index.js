import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
// import {
//     Card,
//     Form,
//     Input,
//     Button,
//     Select,
//     InputNumber,
//     notification,
//     DatePicker,
//     Steps,
//     Row,
//     Col,
//     Checkbox,
//     Divider,
//     Tooltip,
// } from "antd";
import { Button, Card, Input, message, Steps, theme, Form, Select, notification, Divider } from "antd";
import { displayName } from "react-quill";
import { BLUE_BASE, GOLD_BASE_OUR_GYM } from "constants/ThemeConstant";
import { PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons'
import { set } from "lodash";

const {Option} = Select;

// const steps = [
//     {},
//     {},
//     {},
// ];

const NewCourse = () => {

    const { currentTheme } = useSelector(state => state.theme); 
    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);
    const [optionsCustom, setOptionsCustom] = useState([]);

    // const optionsCustom = [
    //     "IT", "Engineering", "Accounting", "Programming"
    // ]

    //const [imgFile, setImgFile] = useState(null);
    //const [imgFilePreview, setImgFilePreview] = useState(null);

    const [courseInfo, setCourseInfo] = useState({
        courseName: "",
        category: null,
        courseduration: "",
        description: "",
        price: "",
        instructor: ""
    })

    const [content, setContent] = useState(
        [
            {
                title: "",
                imgFile: null,
                imgFilePreview: null,
                videoUrl: ""
            },
            // {
            //     title: "",
            //     imgFile: null,
            //     imgFilePreview: null,
            //     videoUrl: ""
            // }
        ]
    )

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const openNotificationWithIcon = (type, title, desc) => {
        notification[type]({
            message: title,
            description: desc,
        });
    };

    const handleAddCourse = () => {
        try {
            console.log(courseInfo);
            axios.post(`http://localhost:8085/api/courses`, courseInfo)
            .then(res => {
                console.log(res.status);
                if(res.status === 200){
                    
                    setCourseInfo({
                        courseName: "",
                        category: null,
                        courseduration: "",
                        description: "",
                        price: "",
                        instructor: ""
                });

                    openNotificationWithIcon(
                        "success",
                        "Successfully Created",
                        "Successfully Creted the course."
                    );
                }
                else{
                    openNotificationWithIcon(
                        "success",
                        "Error Occured",
                        "Unable to crete th course."
                    );
                }
            })
            .catch(err => {
                console.log(err.message);
                console.log(err);
                openNotificationWithIcon(
                    "success",
                    "Error Occured",
                    "Unable to crete th course."
                );
            })
        } catch (error) {
            console.log(error);
            openNotificationWithIcon(
                "success",
                "Error Occured",
                "Unable to crete th course."
            );
        }
    }

    const handleAddScetions = () => {
        console.log(content);
    }

    useEffect(() => {
        axios.get(`http://localhost:8085/api/courses/categories`)
        .then(res => {
            //console.log(res);
            setOptionsCustom(res.data);
        })
        .catch(err => {
            console.log(err);
            setOptionsCustom([]);
        })
    }, [])

    const items = [
        {
            title: "Course Information",
            content: (
                <>
                    <Card className={currentTheme === "light" && "ant-card-custom"} style={{width: 450}}>
                        <span style={{fontSize: 16, fontWeight: 500}}>Fill The Course Information</span><br/><br/>
                        <Form layout="vertical">
                            
                            <Form.Item
                                wrapperCol={{ xs: 24, sm: { span: 24 } }}
                                style={{ marginBottom: "-10px" }}
                            >
                                <Form.Item
                                    label="Course Name"
                                >
                                    <Input placeholder="Course Name" value={courseInfo.courseName} onChange={(e) => {setCourseInfo({...courseInfo, courseName: e.target.value})}}/>
                                </Form.Item>
                            </Form.Item>

                            {/* <Form.Item
                                wrapperCol={{ xs: 24, sm: { span: 24 } }}
                                style={{ marginBottom: "-10px" }}
                            >
                                <Form.Item
                                    label="Course Category"
                                >
                                    <Input value={courseInfo.category} onChange={(e) => {setCourseInfo({...courseInfo, courseName: e.target.value})}}/>
                                </Form.Item>
                            </Form.Item> */}

                            <Form.Item
                                wrapperCol={{ xs: 24, sm: { span: 24 } }}
                                style={{ marginBottom: "-10px" }}
                            >
                                <Form.Item
                                    label="Category"
                                >
                                    <Select placeholder="Select the category" value={courseInfo.category} onChange={(val) => {setCourseInfo({...courseInfo, category: val})}}>
                                        {
                                            optionsCustom.map((item, index) => {
                                                return(
                                                    <Option key={index} value={item}>{item}</Option>
                                                );
                                            })
                                        }
                                    </Select>
                                </Form.Item>
                            </Form.Item>
                            
                            <Form.Item
                                wrapperCol={{ xs: 24, sm: { span: 24 } }}
                                style={{ marginBottom: "-10px" }}
                            >
                                <Form.Item
                                    label="Duration"
                                >
                                    <Input placeholder="Course Duration" value={courseInfo.courseduration} onChange={(e) => {setCourseInfo({...courseInfo, courseduration: e.target.value})}}/>
                                </Form.Item>
                            </Form.Item>
                            
                            <Form.Item
                                wrapperCol={{ xs: 24, sm: { span: 24 } }}
                                style={{ marginBottom: "-10px" }}
                            >
                                <Form.Item
                                    label="Price"
                                >
                                    <Input placeholder="Amount" value={courseInfo.price} onChange={(e) => {setCourseInfo({...courseInfo, price: e.target.value})}}/>
                                </Form.Item>
                            </Form.Item>
                            
                            <Form.Item
                                wrapperCol={{ xs: 24, sm: { span: 24 } }}
                                style={{ marginBottom: "-10px" }}
                            >
                                <Form.Item
                                    label="Description"
                                >
                                    <Input placeholder="Description" value={courseInfo.description} onChange={(e) => {setCourseInfo({...courseInfo, description: e.target.value})}}/>
                                </Form.Item>
                            </Form.Item>
                            
                            <Form.Item
                                wrapperCol={{ xs: 24, sm: { span: 24 } }}
                                style={{ marginBottom: "-10px" }}
                            >
                                <Form.Item
                                    label="Instructor"
                                >
                                    <Input placeholder="Instructor Name" value={courseInfo.instructor} onChange={(e) => {setCourseInfo({...courseInfo, instructor: e.target.value})}}/>
                                </Form.Item>
                            </Form.Item>

                            <Form.Item style={{display :"flex", justifyContent: "start"}}>
                                <Button type="primary" onClick={() => {handleAddCourse()}}>Add Course</Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </>
            ),
        },
        {
            title: "Content Management",
            content: (
                <>
                    <Card className={currentTheme === "light" && "ant-card-custom"} style={{width: 450}}>
                        <span style={{fontSize: 16, fontWeight: 500}}>Fill The Content Information</span><br/><br/>
                        <Form layout="vertical">
                            
                            {
                                content.map((item, index) => {
                                    // console.log("item +++++++++++++++++++++");
                                    // console.log(item);
                                    console.log("index ++++++++++++++++++++");
                                    console.log(index);
                                    return(
                                        <>
                                            <Divider style={{borderColor: "grey", fontSize: 11}} orientation="left" orientationMargin={0}>{`Section ( ${index+1} )`}</Divider>
                                            <Form.Item
                                                wrapperCol={{ xs: 24, sm: { span: 24 } }}
                                                style={{ marginBottom: "-10px" }}
                                            >
                                                <Form.Item
                                                    label="Title"
                                                >
                                                    <Input 
                                                        placeholder="Title" 
                                                        value={item.title} 
                                                        onChange={(e) => {
                                                            const newState = content.map((itemInner, indexInner) => {
                                                                if(indexInner === index){
                                                                    itemInner["title"] = e.target.value
                                                                    return itemInner
                                                                }else{
                                                                    return itemInner
                                                                }
                                                            })
                                                            // console.log("new state +++++++++++++++++++++++++++");
                                                            // console.log(newState);
                                                            setContent(newState)
                                                        }}
                                                    />
                                                </Form.Item>
                                            </Form.Item>

                                            <Form.Item wrapperCol={{ xs: 24, sm: { span: 24 } }}  style={{ marginBottom: "-10px" }}>
                                                <Form.Item
                                                    label=" "
                                                    style={{
                                                        display: "inline-block",
                                                        width: "calc(48%)",
                                                        marginRight: "calc(4%)",
                                                    }}
                                                >
                                                    {/* <Input value={courseInfo.courseName} onChange={(e) => {setCourseInfo({...courseInfo, courseName: e.target.value})}}/> */}
                                                    <label htmlFor="img-upload" key={index}>
                                                        <p style={{backgroundColor: currentTheme === "dark" ? GOLD_BASE_OUR_GYM : BLUE_BASE, color: "white", cursor: "pointer", padding: "8px 16px", borderRadius: "10px"}}>Upload Image</p>
                                                        <Input
                                                            id="img-upload"
                                                            type="file"
                                                            accept="image/png, image/jpg, image/jpeg"
                                                            onChange={(e) => {
                                                                const img = e.target.files[0];
                                                                if (img) {
                                                                    const reader = new FileReader();
                                                                    reader.onloadend = () => {
                                                                        //setImgFilePreview(reader.result);
                                                                        console.log(content);
                                                                        const newState = content.map((itemInner, indexInner) => {
                                                                            if(indexInner === index){
                                                                                console.log(index);
                                                                                console.log(indexInner);
                                                                                itemInner["imgFilePreview"] = reader.result
                                                                                return itemInner
                                                                            }else{
                                                                                return itemInner
                                                                            }
                                                                        })
                                                                        // console.log("new state +++++++++++++++++++++++++++");
                                                                        // console.log(newState);
                                                                        setContent(newState)
                                                                    };
                                                                    reader.readAsDataURL(img);
                                                                }
                                                                //setImgFile(img);
                                                                // setWebCamImage(null);
                                                            }}
                                                            style={{ display: "none" }}
                                                        ></Input>
                                                    </label>
                                                </Form.Item>
                                                <Form.Item
                                                    label="Video URL"
                                                    style={{
                                                        display: "inline-block",
                                                        width: "calc(48%)",
                                                        //marginRight: "calc(4%)",
                                                    }}
                                                >
                                                    <Input 
                                                        placeholder="Video URL" 
                                                        value={item.videoUrl} 
                                                        onChange={(e) => {
                                                            const newState = content.map((itemInner, indexInner) => {
                                                                if(indexInner === index){
                                                                    itemInner["videoUrl"] = e.target.value
                                                                    return itemInner
                                                                }else{
                                                                    return itemInner
                                                                }
                                                            })
                                                            // console.log("new state +++++++++++++++++++++++++++");
                                                            // console.log(newState);
                                                            setContent(newState)
                                                        }}
                                                    />
                                                </Form.Item>
                                            </Form.Item>
                                        </>
                                    )
                                })
                            }
                            {
                                content.length > 1 &&
                                <Button 
                                    className="mr-2" 
                                    icon={<DeleteOutlined />}
                                    onClick={() => {
                                        const arr = [...content];
                                        arr.pop();
                                        setContent(arr);
                                    }} 
                                />
                            }
                            <Button 
                                className="mr-2" 
                                icon={<PlusCircleOutlined />}
                                onClick={() => {
                                    setContent([
                                        ...content,
                                        {
                                            title: "",
                                            imgFile: null,
                                            imgFilePreview: null,
                                            videoUrl: ""
                                        } 
                                    ])
                                }}
                            />
                            <Button 
                                type="primary" 
                                onClick={() => {handleAddScetions()}}>Add Sections
                            </Button>
                        </Form>
                    </Card>
                </>
            )
        },
        {
            title: "Done",
            content: "Course Added Successfully !",
        },
    ]

    const contentStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        lineHeight: "260px",
        // textAlign: "center",
        color: token.colorTextTertiary,
        backgroundColor: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: `1px dashed ${token.colorBorder}`,
        paddingTop: 20,
        marginTop: 16,
        paddingLeft: 5,
        paddingRight: 5
    };

    return (
        <>
            <Steps current={current} items={items}/>

            <div style={contentStyle}>{items[current].content}</div>
            <div
                style={{
                    marginTop: 24,
                }}
            >
                {current < items.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
                        Next
                    </Button>
                )}
                {current === items.length - 1 && (
                    <Button
                        type="primary"
                        onClick={() => message.success("Processing complete!")}
                    >
                        Done
                    </Button>
                )}
                {current > 0 && (
                    <Button
                        style={{
                            margin: "0 8px",
                        }}
                        onClick={() => prev()}
                    >
                        Previous
                    </Button>
                )}
            </div>
        </>
    );
};

export default NewCourse;