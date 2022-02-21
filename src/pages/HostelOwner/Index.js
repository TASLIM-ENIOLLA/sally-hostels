import React, {Component} from "react";
import {Link} from 'react-router-dom'
import {Apple, Archive, Arrow, ArrowDown, ArrowLeft, Calender, Cancel, Check, CircleIntersect, Edit, EditInput, Facebook, Favorites, Google, Hamburger, Heart, Help, Home, Logo, LogoWhite, Logout, Map, MapOutline, MasterCardCircle, Naira, Notification, Overview, Payment, Pen, Read, Receipts, RecentCircle, Ring, Search, Settings, Star} from '../../img/SVGIcons'

import Template, {PriceInput} from './Template/Template'
import RecentActivities from './RecentActivities'
import MyHostels from './MyHostels'

export default function Index(){
    const SALLY_HOSTELS_USER = JSON.parse(window.localStorage.getItem("SALLY-HOSTELS"))
    const THEME_COLOR = "#03a86b"
    const TEXT_SECONDARY = "#6c757d"
    const [editProfile, setEditProfile] = React.useState(false)
    const [userImgSrc, setUserImgSrc] = React.useState("")
    const [userData, setUserData] = React.useState({
        full_name: SALLY_HOSTELS_USER.full_name,
        id: SALLY_HOSTELS_USER.id,
        accountType: SALLY_HOSTELS_USER.accountType
    })

    const EditProfile = () => {
        let [userData2, setUserData2] = React.useState([])
        let [userImgSrc2, setUserImgSrc2] = React.useState("")
        let [formDataChange, setFormDataChange] = React.useState(false)

        React.useEffect(
            () => {
                fetch(
                    "http://localhost/sally-hostel/php/processes/HostelOwner/LoadUserData.php", {
                        method: "POST",
                        body: window.localStorage.getItem("SALLY-HOSTELS")
                    }
                ).then(
                    response => response.json()
                ).then(
                    (response) => {
                        response.data.currentPassword = ""
                        setUserData2(response.data)

                        if(response.data.profile_img !== null){
                            setUserImgSrc2(
                                "http://localhost/sally-hostel/images/"
                                + JSON.parse(
                                    window.localStorage.getItem("SALLY-HOSTELS")
                                ).accountType
                                + "s/"
                                + response.data.id
                                + "/"
                                + response.data.profile_img
                            )
                        }
                        else{
                            setUserImgSrc2("http://localhost/sally-hostel/images/user_default.png")
                        }
                    }
                )
            }, []
        )

        return (
            <>
                <div className = "col-xs-12 col-md-6 mb-4">
                    <div className = "mb-2">Full name</div>
                    <input type = "text" onChange = {
                        (e) => {
                            setUserData2({
                                ...userData2,
                                full_name: e.target.value
                            })
                            setFormDataChange(true)
                        }
                    } defaultValue = {userData2.full_name} className = "d-block bg-clear w-100 outline-0 border rounded p-3" />
                </div>
                <div className = "col-xs-12 col-md-6 mb-4">
                    <div className = "mb-2">Email</div>
                    <input type = "email" onChange = {
                        (e) => {
                            setUserData2({
                                ...userData2,
                                email: e.target.value
                            })
                            setFormDataChange(true)
                        }
                    } defaultValue = {userData2.email} className = "d-block bg-clear w-100 outline-0 border rounded p-3" />
                </div>
                <div className = "col-12 mb-4">
                    <div className = "mb-2">Phone number</div>
                    <input type = "phone" onChange = {
                        (e) => {
                            setUserData2({
                                ...userData2,
                                phone: e.target.value
                            })
                            setFormDataChange(true)
                        }
                    } defaultValue = {userData2.phone} className = "d-block bg-clear w-100 outline-0 border rounded p-3" />
                </div>
                <div className = "col-12 flex-v mb-4">
                    <div className = "border rounded">
                        <div className = "p-2 text-c">
                            <img className = "mx-auto" src = {userImgSrc2}  height = "130" />
                        </div>
                        <div>
                            <label className = "p-3 text-capitalize text-c half-bold bg-light border-top d-block w-100 m-0">
                                change profile image
                                <input type = "file" onChange = {
                                    (e) => {
                                        let reader = new FileReader();
                                            reader.onload = () => {
                                                setUserImgSrc2(reader.result)
                                            }
                                            reader.readAsDataURL(e.target.files[0]);

                                        setUserData2({
                                            ...userData2,
                                            photo: e.target.files[0]
                                        })

                                        setFormDataChange(true)
                                    }
                                } className = "bg-clear w-100 outline-0 border rounded p-3" hidden = {true} />
                            </label>
                        </div>
                    </div>
                </div>
                <div className = "col-12 mb-4">
                    <div className = "mb-2">Current password (required to update profile)</div>
                    <input type = "password" onChange = {
                        (e) => {
                            setUserData2({
                                ...userData2,
                                currentPassword: e.target.value
                            })
                        }
                    } placeholder = "Enter current password here..." className = {
                        "d-block bg-clear w-100 outline-0 border rounded p-3" + (
                            (formDataChange)
                            ? ""
                            : " disabled"
                        )
                    } />
                </div>
                <div className = "col-12">
                    <input type = "button" value = "Update Profile" className = {"d-block transit flicker theme-bg w-100 outline-0 border rounded-1x p-3 text-white half-bold text-c" + (
                        (userData2.currentPassword !== undefined && userData2.currentPassword.length > 0 && formDataChange)
                        ? ""
                        : " disabled"
                    )} onClick = {
                        (e) => {
                            let formData = new FormData()
                            let xmlHtttp = new XMLHttpRequest()

                            for(let each in userData2){
                                formData.append(each, userData2[each])
                            }

                            xmlHtttp.onreadystatechange = () => {
                                if(xmlHtttp.readyState == 4 && xmlHtttp.status == 200){
                                    let responseText = JSON.parse(xmlHtttp.responseText)

                                    if(responseText.responseType === "success"){
                                        window.toast(responseText.message, "success", 2000).then(
                                            e => {
                                                let localStorageData = {
                                                    full_name: userData2.full_name,
                                                    accountType: userData2.accountType,
                                                    id: userData2.id
                                                }

                                                window.localStorage.setItem(
                                                    "SALLY-HOSTELS",
                                                    JSON.stringify(localStorageData)
                                                )

                                                // The below was made so as to allow react load the new image
                                                // setUserImgSrc()
                                                if(userData2.photo !== undefined){
                                                    window.createCSSSelector(
                                                        ".user-profile-img",
                                                        "background-image: url("
                                                            + "http://localhost/sally-hostel/images/"
                                                            + JSON.parse(window.localStorage.getItem("SALLY-HOSTELS")).accountType
                                                            + "s/"
                                                            + userData2.id
                                                            + "/"
                                                            + responseText.timestamp
                                                            + ".png"
                                                        + "); "
                                                        + "background-size: cover; background-position: center;"
                                                    )
                                                }

                                                setUserData(localStorageData)
                                            }
                                        )

                                    }
                                    else{
                                        window.toast(responseText.message, "danger")
                                    }
                                }
                            };
                            xmlHtttp.open(
                                "POST",
                                "http://localhost/sally-hostel/php/processes/HostelOwner/UpdateUserData.php",
                                true
                            );
                            xmlHtttp.send(formData);
                        }
                    }/>
                </div>
            </>
        )
    }

    React.useEffect(
        () => {
            fetch(
                "http://localhost/sally-hostel/php/processes/HostelOwner/LoadUserData.php", {
                    method: "POST",
                    body: window.localStorage.getItem("SALLY-HOSTELS")
                }
            ).then(
                response => response.json()
            ).then(
                (response) => {
                    if(response.data.profile_img != null){
                        setUserImgSrc(
                            "http://localhost/sally-hostel/images/"
                            + JSON.parse(
                                window.localStorage.getItem("SALLY-HOSTELS")
                            ).accountType
                            + "s/"
                            + response.data.id
                            + "/"
                            + response.data.profile_img
                        )

                        window.createCSSSelector(
                            ".user-profile-img",
                            "background-image: url("
                                + "http://localhost/sally-hostel/images/"
                                + JSON.parse(window.localStorage.getItem("SALLY-HOSTELS")).accountType
                                + "s/"
                                + response.data.id
                                + "/"
                                + response.data.profile_img
                            + ")"
                            + "; background-size: cover; background-position: center;"
                        )
                    }
                    else{
                        window.createCSSSelector(
                            ".user-profile-img",
                            "background-image: url("
                                + "http://localhost/sally-hostel/images/user_default.png"
                            + ")"
                            + "; background-size: cover; background-position: center;"
                        )
                    }
                }
            )
        }, []
    )

    return (
        <Template>
            <div className = "flex-h flex-wrap mt-5 px-3">
                <div className = "flex-1">
                    <h4 className = "half-bold theme-color">Overview</h4>
                </div>
                <div className = "bg-white col-d-none col-md-d-flex-h p-3 rounded-2x shadow flex-h">
                    <div>
                        <h5 className = "half-bold text-capitalize">Hello, {userData.full_name.match(/\w+/)[0]}</h5>
                        <div className = "text-capitalize cursor-pointer underline theme-color"  onClick = {
                            (e) => {
                                setEditProfile(!editProfile)
                            }
                        } >edit profile</div>
                    </div>
                    <div style = {{
                        maxWidth: "60px",
                        minWidth: "60px",
                        maxHeight: "60px",
                        minHeight: "60px"
                    }} className = "ml-2 shadow user-profile-img border rounded-circle"></div>
                </div>
            </div>
            <div className = "pt-4">
                <MyHostels />
                <div className = "pt-4 flex-h flex-wrap">
                    <div className = "col-lg-8 mb-4">
                        <div className = "p-3 rounded-2x shadow-sm bg-white">
                            <h5 className = "half-bold text-capitalize text-dark">overall revenue</h5>
                            <div className = "pt-4">
                                You currently don't have any data available.
                            </div>
                        </div>
                    </div>
                    <div className = "col-lg-4 mb-4">
                        <div className = "p-3 rounded-2x shadow-sm bg-white">
                            <h5 className = "half-bold text-capitalize text-dark">recent activity</h5>
                            <div className = "pt-4">
                                <RecentActivities />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                style = {{
                    top: 0,
                    left: 0,
                    background: "rgba(0,0,0,.5)"
                }}
                className = {"p-5 po-abs w-100 h-100 overflow-y-auto animated fadeIn" + (
                    (editProfile)
                    ? ""
                    : " d-none"
                )}>
                <div className = "bg-white po-rel rounded-2x shadow col-lg-7 p-0 mx-auto overflow-0">
                    <div className = "bg-light border-bottom">
                        <div style = {{
                            width: "50px",
                            height: "50px",
                            top: 0,
                            right: 0
                        }} className = "bg-danger flex-h j-c-c a-i-c" onClick = {
                            (e) => {
                                setEditProfile(!editProfile)
                            }
                        }>
                            <Cancel fill = "#ffffff" />
                        </div>
                    </div>
                    <div className = "px-4 py-5 flex-h flex-wrap">
                        <EditProfile state = {editProfile} />
                    </div>
                </div>
            </div>
        </Template>
    )
}
