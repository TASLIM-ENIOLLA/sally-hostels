import React, {Component} from "react";
import {Link} from 'react-router-dom'
import {Apple, Archive, Arrow, ArrowDown, ArrowLeft, Calender, Cancel, Check, CircleIntersect, Edit, EditInput, Facebook, Favorites, Google, Hamburger, Heart, Help, Home, Logo, LogoWhite, Logout, Map, MapOutline, MasterCardCircle, Naira, Notification, Overview, Payment, Pen, Read, Receipts, RecentCircle, Search, Settings, Star} from '../../img/SVGIcons'

import Template from './Template/Template'

export default function Payments(){
    const THEME_COLOR = "#03a86b"
    const TEXT_SECONDARY = "#6c757d"

    let [paymentData, setPaymentData] = React.useState([])

    const ReceiptsMKP = () => {
        if(paymentData.length > 0){
            return paymentData.map(
                (each, index) => (
                    <div key = {index} className = "p-3 mb-4 rounded-2x shadow-sm active-menu">
                        <div className = "half-bold flex-h flex-wrap a-i-c j-c-space-between text-dark">
                            <div className = "col-xs-12">{each.timestamp}</div>
                            <div className = "col-xs-12 italic text-capitalize">{each.status}</div>
                        </div>
                        <div className = "half-bold text-muted mt-1">
                            REF: {each.transaction_ID}
                        </div>
                        <div className = "half-bold text-muted mt-1">
                            RECEPIENT: {each.hostel_owner}
                        </div>
                        <div className = "half-bold text-muted mt-1">
                            HOSTEL NAME: {each.hostel_name}
                        </div>
                        <div className = "half-bold text-muted mt-1">
                            THROUGH: SALLY HOSTELS
                        </div>
                    </div>
                )
            )
        }
        else{
            return (
                <div className = "col-12 p-5 border shadow-sm rounded-2x bg-light text-c text-muted half-bold">
                    You don't any receipt.
                </div>
            )
        }
    }

    React.useEffect(
        () => {
            let mounted = true
            let search = window.location.search

            fetch(
                "http://localhost:80/sally-hostel/php/processes/Student/LoadUserPayments.php" + search, {
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
                        setPaymentData(response.data)
                    }
                }
            )

            return () => {
                mounted = false
            }
        }, []
    )

    return (
        <Template>
            <div className = "flex-h j-c-space-between px-3 mb-3 mt-5 a-i-c">
                <h4 className = "theme-color half-bold">Payments</h4>
            </div>
            <div className = "py-4 px-3 rounded-2x">
                <div className = "text-capitalize half-bold h5">receipts</div>
                <div className = "pt-4">
                    <ReceiptsMKP paymentData = {paymentData} />
                </div>
            </div>
        </Template>
    )
}
