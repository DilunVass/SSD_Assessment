import React from "react";
import { useSelector } from "react-redux"
import { Breadcrumb, Divider } from "antd";
import { useNavigate } from "react-router";

const BreadcrumbCustom = (props) => {

    const navigate = useNavigate();
    const currentTheme = useSelector((state) => state.theme.currentTheme);

    return (
        <>
            <h4 style={{
                color : currentTheme === "dark" ? "white" : "black"
            }}
            >
                {props.name}
            </h4>
            <Breadcrumb style={{ marginBottom: "15px" }}>
                <Breadcrumb.Item onClick={() => {navigate('/app/dashboards/default')}}><a>Home</a></Breadcrumb.Item>
                <Breadcrumb.Item
                    onClick={() => {
                        if(props.level1Redirect)
                            navigate(props.level1Redirect)
                    }}
                ><a>{props.level1}</a></Breadcrumb.Item>
                <Breadcrumb.Item>{props.level2}</Breadcrumb.Item>
            </Breadcrumb>
        </>
    );
};

export default BreadcrumbCustom;

/*
application_number: "0111";
contact_no: "0716666666666666666666";
dob: "1999-01-01";
first_name: "Test name 1";
gender: "male";
id: 1025;
image: "17d5ff93-d84c-48f8-8615-fa3e0c21b635_profile.jpeg";
last_name: "Test Name 2";
membership: "Couple / monthly package ";
membership_amount: "5000.0000";
membership_exp_date: "2024-03-23";
membership_id: 0;
membership_reg_date: "2024-02-22";
payment_method: null;
reg_by: "sahan";
reg_date: "2024-02-01";
status: "Active";
*/

/*
{
            "id": 49,
            "package_nmae": "Chamalka testing- 3",
            "duration": "30",
            "price": 5000.0000,
            "status": "Active",
            "memberCount": 4
        }
*/

/*
"membership": [
    {
        "id": 3622,
        "application_no": "1664",
        "member_name": null,
        "image": null,
        "package_id": "27",
        "package_name": "Strength monthly NEW",
        "package_reg_date": "2024-02-19",
        "package_Duration": "30",
        "package_exp_date": "2024-03-20",
        "package_amount": 3000.0000,
        "payment_method": "Card",
        "created_by": "user2",
        "created_date": "2024-02-01",
        "approved_by": "sahan",
        "approved_date": "1709616142723",
        "status": "Pending",
        "membershipMap": [
            {
                "applicationNo": null,
                "membershipId": null,
                "name": "KITHSIRI VINEJ",
                "image": "7f970a66-18a4-47cb-80b9-ec943575beee_profile.jpeg"
            }
        ]
    }
],
*/


/*
"id": 2,
"user_name": "Ayesha",
"first_name": "ayesha",
"last_name": "perera",
"reg_date": "2023-02-07",
"reg_by": "admin",
"role": "User",
"password": null,
"email": "ayesha.p@gmail.com",
"phone_number": "0778988987",
"accesstoken": null,
"status": "Active"
*/


/* create memeber inou object
{
  "id": 0,
  "application_number": "9870",
  "first_name": "Testing fn",
  "last_name": "Testing ln",
  "dob": "1998-03-08",
  "gender": "male",
  "image": "sample.jpg",
  "contact_no": "0782745231",
  "membership_id": 0,
  "membership": "New testing Membership",
  "membership_reg_date": "2023-03-08",
  "membership_exp_date": "2023-04-08",
  "payment_method": "card",
  "membership_amount": "4500.00",
  "reg_by": "sahan",
  "reg_date": "2023-03-08",
  "status": "Active"
}
*/

// updating member
// {
//     "id": "<integer>",
//     "application_number": "<string>",
//     "first_name": "<string>",
//     "last_name": "<string>",
//     "dob": "<string>",
//     "gender": "<string>",
//     "image": "<string>",
//     "contact_no": "<string>",
//     "membership_id": "<integer>",
//     "membership": "<string>",
//     "membership_reg_date": "<string>",
//     "membership_exp_date": "<string>",
//     "payment_method": "<string>",
//     "membership_amount": "<string>",
//     "reg_by": "<string>",
//     "reg_date": "<string>",
//     "status": "<string>"
//   }


// updating member
// {
    // "id": 1039,
    // "application_number": "1015",
    // "first_name": "jhon",
    // "last_name": "smith jr.",
    // "dob": "2024-03-03",
    // "gender": "male",
    // "image": "sample.jpg",
    // "contact_no": "0751223345",
    // "membership_id": 0,
    // "membership": "Student monthly-strength",
    // "membership_reg_date": "2024-03-04",
    // "membership_exp_date": "2024-03-29",
    // "payment_method": null,
    // "membership_amount": "25000",
    // "reg_by": "sahan",
    // "reg_date": "2024-03-09",
    // "status": "Active"
// }



// {
//     "id": 1039,
//     "application_number": "1015",
//     "first_name": "JK yash",
//     "last_name": "Perera",
//     "dob": "1998-03-08",
//     "gender": "male",
//     "image": "sample.jpg",
//     "contact_no": "0782745231",
//     "membership_id": 0,
//     "membership": "Student monthly-strength",
//     "membership_reg_date": "2024-03-04",
//     "membership_exp_date": "2024-03-29",
//     "payment_method": null,
//     "membership_amount": "25000",
//     "reg_by": "sahan",
//     "reg_date": "2024-03-09",
//     "status": "Active"
// },

//create memebrship req body - but member doesnot get creaed
/*
{
  "id": 0,
  "application_no": "7030",
  "member_name": "Rahul Sharma",
  "image": "sample.jpg",
  "package_id": "52",
  "package_name": "Shoulders Press workout",
  "package_reg_date": "2024-03-13",
  "package_Duration": "40",
  "package_exp_date": "2024-04-14",
  "package_amount": "2500",
  "payment_method": "Cash",
  "created_by": "sahan",
  "created_date": "2024-03-13",
  "approved_by": "sahan",
  "approved_date": "2024-03-13",
  "status": "Active",
  "membershipMap": [
    {
      "applicationNo": "7030",
      "membershipId": 0,
      "name": "Rahul Sharma",
      "image": "sample.jpg"
    }
  ]
}
*/ 