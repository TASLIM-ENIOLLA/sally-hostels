import React, {Component} from "react";
import {Apple, Archive, Arrow, ArrowDown, ArrowLeft, Calender, Cancel, Check, CircleIntersect, Edit, EditInput, Facebook, Favorites, Google, Hamburger, Heart, Help, Home, Logo, LogoWhite, Logout, Map, MapOutline, MasterCardCircle, Naira, Notification, Overview, Payment, Pen, Read, Receipts, RecentCircle, Search, Settings, Star} from '../../../img/SVGIcons'

import {Link} from 'react-router-dom'

const THEME_COLOR = "#03a86b"
const TEXT_SECONDARY = "#6c757d"
let USER = window.localStorage.getItem("SALLY-HOSTELS")

const SideBar = () => {
    return (
        <>
            <div className = "py-5 text-c">
                <Logo />
            </div>
            <div className = "py-3 text-secondary">
                <div>
                    <Link to = "/admin" className = {
                        "p-3 mb-3 flex-h a-i-c rounded-1x"
                        + (
                            (/admin(\/)?$/.test(window.location))
                            ? " active-menu"
                            : ""
                        )
                    }>
                        <div className = "mr-3"><Overview fill = {TEXT_SECONDARY} /></div>
                        <div className = "half-bold text-capitalize">Overview</div>
                    </Link>
                    <Link to = "/admin/payments" className = {
                        "p-3 mb-3 flex-h a-i-c rounded-1x"
                        + (
                            (/payments(\/)?$/.test(window.location))
                            ? " active-menu"
                            : ""
                        )
                    }>
                        <div className = "mr-3"><Payment fill = {TEXT_SECONDARY} /></div>
                        <div className = "half-bold text-capitalize">Payments</div>
                    </Link>
                </div>
                <div className = "pt-4">
                    <Link to = "/admin/logout" className = {
                        "p-3 mb-3 flex-h a-i-c rounded-1x"
                        + (
                            (/logout/.test(window.location))
                            ? " active-menu"
                            : ""
                        )
                    }>
                        <div className = "mr-3"><Logout fill = {TEXT_SECONDARY} /></div>
                        <div className = "half-bold text-capitalize">Logout</div>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default function Template({children}){
    let [showSideBar, setShowSideBar] = React.useState(false)
    let returnMKP = (
        <></>
    )

    if(USER == undefined){
        window.location = "/admin/login"
    }
    else{
        returnMKP = (
            <div className = "vh100 vw100 po-rel flex-h flex-wrap bg-light text-dark">
                <div id = "sideBar" className = "col-d-none col-md-d-block overflow-y-auto px-3 h-100 min-width-230px bg-white sideBarShadow">
                    <SideBar />
                </div>
                <div id = "mainContent" className = "overflow-y-auto flex-1 py-0 px-4 h-100">
                    <div className = "col-md-d-none flex-h a-i-c j-c-space-between py-3 mb-3">
                        <div className = "flex-h a-i-c">
                            <div
                                className = "mr-3 border rounded-circle"
                                style = {{
                                    minWidth: "60px",
                                    maxWidth: "60px",
                                    minHeight: "60px",
                                    maxHeight: "60px",
                                    backgroundImage: "url(http://localhost:80/sally-hostel/images/user_default.png)",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center"
                                }}>

                            </div>
                            <div className = "text-capitalize flex-h a-i-c m-0 theme-color half-bold h5">
                                Welcome {(
                                    (JSON.parse(window.localStorage.getItem("SALLY-HOSTELS")))
                                    ? JSON.parse(window.localStorage.getItem("SALLY-HOSTELS")).full_name.match(/\w+/)[0]
                                    : ""
                                )}
                            </div>
                        </div>
                        <div>
                            <div className = "cursor-pointer p-3" style = {{
                                transform: "scale(1.3)"
                            }} onClick = {
                                (e) => {
                                    setShowSideBar(!showSideBar)
                                }
                            }>
                                <Hamburger />
                            </div>
                        </div>
                    </div>
                    {children}
                </div>
                <div className = {
                    "animated slideInLeft po-abs top-0 left-0 h-100 w-100 flex-h"
                    + (
                        (showSideBar)
                        ? ""
                        : " d-none"
                    )
                }>
                    <div className = "overflow-y-auto px-3 h-100 min-width-230px bg-white sideBarShadow">
                        <SideBar />
                    </div>
                    <div className = "flex-1" style = {{
                        background: "rgba(0, 0, 0, .5)"
                    }} onClick = {
                        (e) => {
                            setShowSideBar(false)
                        }
                    }></div>
                </div>
            </div>
        )
    }
    //proverb 1: 22-33
    return (
        returnMKP
    )
}
