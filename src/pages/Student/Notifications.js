import React, {Component} from "react";
import {Link} from 'react-router-dom'
import {Apple, Archive, Arrow, ArrowDown, ArrowLeft, Calender, Cancel, Check, CircleIntersect, Edit, EditInput, Facebook, Favorites, Google, Hamburger, Heart, Help, Home, Logo, LogoWhite, Logout, Map, MapOutline, MasterCardCircle, Naira, Notification, Overview, Payment, Pen, Read, Receipts, RecentCircle, Search, Settings, Star} from '../../img/SVGIcons'

import Template from './Template/Template'

export default function Notifications(){
    const THEME_COLOR = "#03a86b"
    const TEXT_SECONDARY = "#6c757d"

    let [notifications, setNotifications] = React.useState([])

    const getNotifications = (mounted) => {
        fetch(
            "http://localhost/sally-hostel/php/processes/Student/LoadUserNotifications.php", {
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
                if(mounted){
                    setNotifications(response.data)
                }
            }
        )
    }

    const markAllAsRead = (which = null) => {
        fetch(
            "http://localhost/sally-hostel/php/processes/Student/MarkAllAsRead.php" + (
                (which === null)
                ? ""
                : "?which_id=" + which
            ), {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: window.localStorage.getItem("SALLY-HOSTELS")
            }
        ).then(
            () => {
                getNotifications()
            }
        )
    }

    const Notify = ({notification}) => {
        let [doubleLine, setDoubleLine] = React.useState(true)

        if(notifications.length > 0){
            return notifications.map(
                (notification_data, index) => (
                    <div key = {index} className = {"rounded-2x mb-4 border cursor-pointer shadow" + (
                        (notification_data.read_state === "0")
                        ? " theme-bg text-white"
                        : " bg-light text-muted"
                    )}>
                        <div>
                            <div className = "flex-h p-3">
                                <div className = "pl-3">
                                    <div title = {notification_data.id} className = "double-line" onClick = {
                                        (e) => {
                                            markAllAsRead(e.target.title)
                                        }
                                    }>
                                        {(
                                            (notification_data.read_state === "0")
                                            ? <div className = "half-bold d-inline italic mr-2">UNREAD -</div>
                                            : <div className = "half-bold d-inline italic mr-2">READ -</div>
                                        )}
                                        {notification_data.notification_code}
                                    </div>
                                    <div className = "mt-2 half-bold">
                                        <div>{notification_data.timestamp}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className = "mt-3">
                            <div className = "theme-color border d-inline bg-light py-2 px-3 mx-3 shadow rounded" data-notification-id = {notification_data.id} onClick = {
                                (e) => {
                                    let notification_id = e.target.getAttribute("data-notification-id")
                                    let text = document.querySelector("div[title = '" + notification_id + "']")
                                    if(text.classList.contains("double-line")){
                                        text.classList.remove("double-line")
                                        e.target.innerHTML = "Close"
                                    }
                                    else{
                                        text.classList.add("double-line")
                                        e.target.innerHTML = "Open"
                                    }
                                }
                            }>Open</div>
                        </div>
                    </div>
                )
            )
        }
        else{
            return (
                <div className = "col-12 p-5 shadow border rounded-2x bg-light text-c text-muted half-bold">
                    You don't have any notification yet. Important information will be diplayed here.
                </div>
            )
        }
    }

    React.useEffect(
        () => {
            let mounted = true

            getNotifications(mounted)

            return () => {
                mounted = false
            }
        }, []
    )

    return (
        <Template>
            <div className = "flex-h j-c-space-between px-3 mb-3 mt-5 a-i-c">
                <h4 className = "theme-color half-bold">Notifications</h4>
                <div className = "flex-h a-i-c j-c-c">
                    <div>
                        <button onClick = {
                            () => {
                                markAllAsRead()
                                window.toast("All marked as read.", "success")
                            }
                        } type = "submit" className = {"py-3 flex-h a-i-c rounded-2x border-0 shadow outline-0 theme-bg text-white half-bold text-capitalize px-4" + (
                            (notifications.length > 0)
                            ? ""
                            : " disabled"
                        )}>
                            <div className = "mr-2">mark all as read</div>
                            <Read />
                        </button>
                    </div>
                </div>
            </div>
            <div className = "pt-4 px-3">
                <Notify notification = {notifications}/>
            </div>
        </Template>
    )
}
