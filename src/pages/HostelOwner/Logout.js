import React, {Component} from "react";
import {Link} from 'react-router-dom'
import {Apple, Archive, Arrow, ArrowDown, ArrowLeft, Calender, Cancel, Check, CircleIntersect, Edit, EditInput, Facebook, Favorites, Google, Hamburger, Heart, Help, Home, Logo, LogoWhite, Logout, Map, MapOutline, MasterCardCircle, Naira, Notification, Overview, Payment, Pen, Read, Receipts, RecentCircle, Search, Settings, Star} from '../../img/SVGIcons'

import Template from './Template/Template'

export default class Notifications extends Component{
    constructor(){
        super()

        this.state = {
            accountType: JSON.parse(window.localStorage.getItem("SALLY-HOSTELS")).accountType
        }
    }
    render(){
        const THEME_COLOR = "#03a86b"
        const TEXT_SECONDARY = "#6c757d"

        return (
            <Template>
                <div className = "flex-h j-c-space-between px-3 mb-3 mt-5 a-i-c">
                    <h4 className = "theme-color half-bold">Logout</h4>
                </div>
                <div className = "pt-4 px-3 animated-fast slideInDown">
                    <div style = {{
                        maxWidth: "500px"
                    }} className = "shadow bg-white mx-auto p-3 rounded-2x">
                        <div className = "text-c py-4 half-bold text-secondary">
                            Are you sure you really want to logout?
                        </div>
                        <div className = "flex-h j-c-space-evenly a-i-c p-3">
                            <button className = "border-0 outline-0 px-4 rounded py-2 bg-danger half-bold text-white text-capitalize mx-3" onClick = {
                                (e) => {
                                    window.localStorage.removeItem("SALLY-HOSTELS")
                                    window.location = "/"
                                }
                            }>logout</button>
                            <button className = "theme-border outline-0 px-4 rounded py-2 bg-clear half-bold theme-color text-capitalize mx-3" onClick = {
                                (e) => {
                                    let accountType = this.state.accountType

                                    window.location = "/" + accountType
                                }
                            }>cancel</button>
                        </div>
                    </div>
                </div>
            </Template>
        )
    }
}
