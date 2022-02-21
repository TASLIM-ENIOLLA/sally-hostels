import React, {Component} from "react";
import {Link} from 'react-router-dom'
import {Apple, Archive, Arrow, ArrowDown, ArrowLeft, Calender, Cancel, Check, CircleIntersect, Edit, EditInput, Facebook, Favorites, Google, Hamburger, Heart, Help, Home, Logo, LogoWhite, Logout, Map, MapOutline, MasterCardCircle, Naira, Notification, Overview, Payment, Pen, Read, Receipts, RecentCircle, Search, Settings, Star} from '../../img/SVGIcons'

import Template from './Template/Template'

export default function UserSettings(){
    const THEME_COLOR = "#03a86b"
    const TEXT_SECONDARY = "#6c757d"

    return (
        <Template>
            <div className = "flex-h j-c-space-between px-3 mb-3 mt-5 a-i-c">
                <h4 className = "theme-color half-bold">Settings</h4>
            </div>
            <div className = "pt-4 px-3">
                <div>
                    <div>
                        <div className = "text-dark flex-h j-c-space-between a-i-c">
                            <h5 className = "text-capitalize">security</h5>
                        </div>
                        <div className = "text-capitalize half-bold text-secondary">adjust your security settings and protect your account</div>
                    </div>
                    <div className = "py-5">
                        <div className = "py-3 px-3 shadow-sm mb-4 active-menu rounded-1x flex-h a-i-c flex-wrap">
                            <div className = "col-xs-12 px-0 half-bold col-sm-12 col-md-2 flex-h text-capitalize">
                                <div className = "double-line">password</div>
                            </div>
                            <div className = "col-xs-12 col-sm-12 col-md-8">
                                <div className = "text-dark my-2 double-line">
                                    To change your password, we need to send a reset link to your email address. You can reset your password regularly to keep your account secure.
                                </div>
                            </div>
                            <div className = "col-xs-12 px-0 col-sm-12 col-md-2">
                                <button onClick = {
                                    () => {
                                        if(window.confirm("Do you really want to reset your password?")){
                                            fetch(
                                                "http://localhost/sally-hostel/php/processes/Student/Settings.php?action=reset_password", {
                                                    method: "POST",
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                    },
                                                    body: window.localStorage.getItem("SALLY-HOSTELS")
                                                }
                                            ).then(
                                                response => response.json()
                                            ).then(
                                                (response) => {
                                                    console.log(response.data)
                                                }
                                            )
                                        }
                                    }
                                } title = "Send email..." className = "rounded-1x flex-h col-12 border-0 outline-0 flicker text-capitalize theme-bg px-4 py-3 text-white">
                                    <span className = "flex-1 single-line">send email</span>
                                </button>
                            </div>
                        </div>
                        <div className = "py-3 px-3 shadow-sm mb-4 border rounded-1x flex-h a-i-c flex-wrap">
                            <div className = "col-xs-12 px-0 half-bold col-sm-12 col-md-2 flex-h text-capitalize">
                                <div className = "double-line text-danger">delete account</div>
                            </div>
                            <div className = "col-xs-12 col-sm-12 col-md-8">
                                <div className = "text-dark my-2 double-line">
                                    Once account is deleted, all data linked to it are permanently lost. This is an irreversible action, proceed on when your sure.
                                </div>
                            </div>
                            <div className = "col-xs-12 px-0 col-sm-12 col-md-2">
                                <button onClick = {
                                    () => {
                                        if(window.confirm("Do you really want to delete your account?\nAll data attached to the account will be lost permanently and you will be logged out.\n\nContinue?")){
                                            fetch(
                                                "http://localhost/sally-hostel/php/processes/Student/Settings.php?action=delete_account", {
                                                    method: "POST",
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                    },
                                                    body: window.localStorage.getItem("SALLY-HOSTELS")
                                                }
                                            ).then(
                                                response => response.json()
                                            ).then(
                                                (response) => {
                                                    if(response.responseType === "success"){
                                                        window.localStorage.removeItem("SALLY-HOSTELS")
                                                        window.location = "/"
                                                    }
                                                    else{
                                                        window.toast("An error occured, please try again.")
                                                    }
                                                }
                                            )
                                        }
                                    }
                                } title = "Send email..." className = "rounded-1x flex-h col-12 border-0 outline-0 flicker text-capitalize bg-danger px-4 py-3 text-white">
                                    <span className = "flex-1 single-line">delete account</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Template>
    )
}
