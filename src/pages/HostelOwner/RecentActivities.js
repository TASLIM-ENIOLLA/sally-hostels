import React, {Component} from "react";
import {Link} from 'react-router-dom'
import {Apple, Archive, Arrow, ArrowDown, ArrowLeft, Calender, Cancel, Check, CircleIntersect, Edit, EditInput, Facebook, Favorites, Google, Hamburger, Heart, Help, Home, Logo, LogoWhite, Logout, Map, MapOutline, MasterCardCircle, Naira, Notification, Overview, Payment, Pen, Read, Receipts, RecentCircle, Ring, Search, Settings, Star} from '../../img/SVGIcons'

import Template, {PriceInput} from './Template/Template'

export default class RecentActivities extends Component{
    constructor(){
        super()

        this.state = {
            recentActivitiesList: []
        }
    }
    async getHostelOwnersNotifications(){
        const res = await fetch(
            "http://localhost:80/sally-hostel/php/processes/HostelOwner/LoadRecentActivities.php", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: JSON.parse(window.localStorage.getItem("SALLY-HOSTELS")).id
                })
            }
        )
        const response = await res.json()
        return response.data
    }
    async componentDidMount(){
        const hostels = await this.getHostelOwnersNotifications()
        let state = this.state
            state.recentActivitiesList = hostels

        this.setState(state)
    }
    render(){
        if(this.state.recentActivitiesList.length > 0){
            return(
                this.state.recentActivitiesList.map(
                    (each, key) => (
                        <div key = {key} className = "mb-3 flex-h flex-wrap cursor-pointer rounded-1x">
                            <div
                                className = "shadow user-pic border rounded-circle"
                                style = {{
                                    minWidth: "50px",
                                    maxWidth: "50px",
                                    minHeight: "50px",
                                    maxHeight: "50px"
                                }}>
                            </div>
                            <div className = "flex-1 ml-2 pb-3">
                                <div className = "mb-2 double-line">
                                    {each.notification_code}
                                </div>
                                <div className = "text-capitalize half-bold text-muted">
                                    {each.timestamp}
                                </div>
                            </div>
                        </div>
                    )
                )
            )
        }
        else{
            return(
                <div className = "mb-3 shadow-sm text-muted border text-capitalize half-bold text-c flex-wrap cursor-pointer p-5 rounded-1x">
                    you have no recent activities!
                </div>
            )
        }
    }
}
