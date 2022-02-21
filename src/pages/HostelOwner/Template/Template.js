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
                    <Link to = "/hostel-owner" className = {
                        "p-3 mb-3 flex-h a-i-c rounded-1x"
                        + (
                            (/hostel-owner(\/)?$/.test(window.location))
                            ? " active-menu"
                            : ""
                        )
                    }>
                        <div className = "mr-3"><Overview fill = {TEXT_SECONDARY} /></div>
                        <div className = "half-bold text-capitalize">Overview</div>
                    </Link>
                    <Link to = "/hostel-owner/my-hostels" className = {
                        "p-3 mb-3 flex-h a-i-c rounded-1x"
                        + (
                            (/my-hostels(\/)?$/.test(window.location))
                            ? " active-menu"
                            : ""
                        )
                    }>
                        <div className = "mr-3"><Home fill = {TEXT_SECONDARY} /></div>
                        <div className = "half-bold text-capitalize">my hostels</div>
                    </Link>
                    <Link to = "/hostel-owner/notifications" className = {
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
                    <Link to = "/hostel-owner/settings" className = {
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
                    <Link to = "/hostel-owner/receipts" className = {
                        "p-3 mb-3 flex-h a-i-c rounded-1x"
                        + (
                            (/receipts(\/)?$/.test(window.location))
                            ? " active-menu"
                            : ""
                        )
                    }>
                        <div className = "mr-3"><Receipts fill = {TEXT_SECONDARY} /></div>
                        <div className = "half-bold text-capitalize">Receipts</div>
                    </Link>
                </div>
                <div className = "pt-4">
                    <Link to = "/hostel-owner/logout" className = {
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

export const DragNDropArea = () => {
    return (
        <div style = {{
            border: "2px solid #007bff",
            borderStyle: "dashed"
        }} className = "px-3 py-5 flex-v rounded-2x">
            <div>
                <div className = "text-c">
                    <Overview fill = "#007bff" />
                </div>
                <div className = "text-c half-bold text-capitalize mt-2 text-muted">
                    <span>drag and drop files here.</span>
                </div>
                <div className = "text-c half-bold text-capitalize mt-2 text-muted">
                    <span>JPG - PNG - GIF</span>
                </div>
            </div>
        </div>
    )
}

export const PriceInput = ({children, value, placeholder, onChange}) => {
    return (
        <div className = "border flex-h a-i-c j-c-c overflow-x-0 rounded-2x mt-2">
            <div className = "p-3 border-right bg-light">
                <Naira />
            </div>
            <div className = "flex-1">
                <input type = "text" id = "integer" onKeyPress = {
                    (e) => {
                        e.preventDefault()

                        let key = e.key
                        if(/\d/.test(key)){
                            if(e.target.value.replace(",", "").length < 11){
                                let value = e.target.value.replaceAll(",", "") + key
                                    value = new Intl.NumberFormat().format(value)
                                e.target.value = value
                            }
                            else{
                                document.querySelector("#decimal").value = key
                                document.querySelector("#decimal").focus()
                            }
                            onChange(e)
                        }
                        else if(key === "."){
                            document.querySelector("#decimal").value = ""
                            document.querySelector("#decimal").focus()
                        }
                    }
                } className = "p-3 outline-0 border-0 d-block w-100" placeholder = "0" />
            </div>
            <div className = "px-1 bold">.</div>
            <div>
                <input type = "text" id = "decimal" onKeyDown = {
                    (e) => {
                        e.preventDefault()
                        let key = e.key
                        if(/\d/.test(key)){
                            if(e.target.value.replace(",", "").length < 2){
                                let value = e.target.value.replaceAll(",", "") + key
                                    value = new Intl.NumberFormat().format(value)
                                e.target.value = value
                            }
                        }
                        else{
                            let value = e.target.value
                            e.target.value = value.replace(/\d$/, "")

                            if(e.target.value.length == 0){
                                document.querySelector("#integer").focus()
                            }
                        }
                    }
                } style = {{
                    width: "50px"
                }} className = "bg-light p-3 outline-0 border-0 d-block" placeholder = "00" />
            </div>
        </div>
    )
}

const Template = ({children}) => {
    const THEME_COLOR = "#03a86b"
    const TEXT_SECONDARY = "#6c757d"
    let USER = window.localStorage.getItem("SALLY-HOSTELS")
    let [showSideBar, setShowSideBar] = React.useState(false)
    let returnMKP = (
        <></>
    )

    if(USER != null){
        USER = JSON.parse(USER)
        if(USER.accountType !== "hostel-owner"){
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
    //proverb 1: 22-33
    return (
        returnMKP
    )
}

export default Template
