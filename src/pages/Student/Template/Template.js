import React, {Component} from "react";
import {Apple, Archive, Arrow, ArrowDown, ArrowLeft, Calender, Cancel, Check, CircleIntersect, Edit, EditInput, Facebook, Favorites, Google, Hamburger, Heart, Help, Home, Logo, LogoWhite, Logout, Map, MapOutline, MasterCardCircle, Naira, Notification, Overview, Payment, Pen, Read, Receipts, RecentCircle, Search, Settings, Star} from '../../../img/SVGIcons'

import {Link} from 'react-router-dom'

const SideBar = () => {
    const THEME_COLOR = "#03a86b"
    const TEXT_SECONDARY = "#6c757d"

    return (
        <>
            <div className = "py-5 text-c">
                <Logo />
            </div>
            <div className = "py-3 text-secondary">
                <div>
                    <Link to = "/student" className = {
                        "p-3 mb-3 flex-h a-i-c rounded-1x"
                        + (
                            (/student(\/)?(\/)?$/.test(window.location))
                            ? " active-menu"
                            : ""
                        )
                    }>
                        <div className = "mr-3"><Home fill = {TEXT_SECONDARY} /></div>
                        <div className = "half-bold text-capitalize">Home</div>
                    </Link>
                    <Link to = "/student/favourites" className = {
                        "p-3 mb-3 flex-h a-i-c rounded-1x"
                        + (
                            (/favourites(\/)?$/.test(window.location))
                            ? " active-menu"
                            : ""
                        )
                    }>
                        <div className = "mr-3"><Favorites fill = {TEXT_SECONDARY} /></div>
                        <div className = "half-bold text-capitalize">Favourites</div>
                    </Link>
                    <Link to = "/student/notifications" className = {
                        "p-3 mb-3 flex-h a-i-c rounded-1x"
                        + (
                            (/notifications(\/)?$/.test(window.location))
                            ? " active-menu"
                            : ""
                        )
                    }>
                        <div className = "mr-3"><Notification fill = {TEXT_SECONDARY} /></div>
                        <div className = "half-bold text-capitalize">Notifications</div>
                    </Link>
                    <Link to = "/student/settings" className = {
                        "p-3 mb-3 flex-h a-i-c rounded-1x"
                        + (
                            (/settings(\/)?$/.test(window.location))
                            ? " active-menu"
                            : ""
                        )
                    }>
                        <div className = "mr-3"><Settings fill = {TEXT_SECONDARY} /></div>
                        <div className = "half-bold text-capitalize">Settings</div>
                    </Link>
                    <Link to = "/student/payments" className = {
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
                    <Link to = "/student/logout" className = {
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

const Template = ({children}) => {
    let USER = window.localStorage.getItem("SALLY-HOSTELS")
    let [showSideBar, setShowSideBar] = React.useState(false)
    let returnMKP = (
        <></>
    )

    const THEME_COLOR = "#03a86b"
    const TEXT_SECONDARY = "#6c757d"

    if(USER != null){
        USER = JSON.parse(USER)
        if(USER.accountType !== "student"){
            window.location = "/"
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
                                    className = "mr-3 user-pic border rounded-circle"
                                    style = {{
                                        minWidth: "60px",
                                        maxWidth: "60px",
                                        minHeight: "60px",
                                        maxHeight: "60px"
                                    }}>

                                </div>
                                <div className = "text-capitalize flex-h a-i-c m-0 theme-color half-bold h5">
                                    Welcome Sally
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
    }
    else{
        window.location = "/"
    }
    //proverb 1: 22-33
    return (
        returnMKP
    )
}

export default Template
