import React, {Component} from "react";
import {Link} from 'react-router-dom'
import {Apple, Archive, Arrow, ArrowDown, ArrowLeft, Calender, Cancel, Check, CircleIntersect, Edit, EditInput, Facebook, Favorites, Google, Hamburger, Heart, Help, Home, Logo, LogoWhite, Logout, Map, MapOutline, MasterCardCircle, Naira, Notification, Overview, Payment, Pen, Read, Receipts, RecentCircle, Ring, Search, Settings, Star} from '../../img/SVGIcons'

import Template, {PriceInput} from './Template/Template'

export default function MyHostels (){
    const [myHostels, setmyHostels] = React.useState([])

    React.useEffect(
        () => {
            fetch(
                "http://localhost:80/sally-hostel/php/processes/HostelOwner/LoadMyHostels.php", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: JSON.parse(window.localStorage.getItem("SALLY-HOSTELS")).id
                    })
                }
            ).then(
                e => e.json()
            ).then(
                response => {
                    setmyHostels(response.data)
                }
            )
        }, []
    )

    if(myHostels.length > 0){
        return(
            <Template>
                <div className = "flex-h flex-wrap mt-5 px-3">
                    <div className = "flex-1">
                        <h4 className = "half-bold theme-color text-capitalize">my hostels</h4>
                    </div>
                </div>
                <div className = "pt-5">
                    <div className = "flex-h text-capitalize half-bold j-c-space-between px-3">
                        <h5 className = "text-secondary">my hostels</h5>
                        <Link to = "/hostel-owner/setup/get-hostel-name" className = "theme-bg px-3 py-2 rounded text-capitalize text-white half-bold shadow">add new hostel</Link>
                    </div>
                    <div className = "flex-h flex-wrap pt-4">
                        {
                            myHostels.map(
                                (each, key) => (
                                    <Link to = {"/hostel-owner/view-hostel?hostel_id=" + each.id} key = {key} className = "col-md-12 col-lg-4 py-2">
                                        <div className = "p-3 rounded-2x active-menu shadow-sm">
                                            <div className = "flex-h">
                                                <div className = "flex-1 text-muted half-bold single-line">{each.name}</div>
                                                <div>{
                                                    Math.ceil(((each.no_of_vacant_apartments / each.no_of_apartments) * 100) * 10) / 10
                                                }%</div>
                                            </div>
                                            <div className = "mt-3 flex-h j-c-space-between a-i-c">
                                                <div>
                                                    <h4 className = "m-0">{each.no_of_vacant_apartments} / {each.no_of_apartments}</h4>
                                                    <div className = "text-secondary text-capitalize half-bold">apartments</div>
                                                </div>
                                                <div>
                                                    <Ring value = {Math.ceil(((each.no_of_vacant_apartments / each.no_of_apartments) * 100) * 10) / 10 + "%"} />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            )
                        }
                    </div>
                </div>
            </Template>
        )
    }
    else{
        return(
            <Template>
                <div className = "flex-h flex-wrap mt-5 px-3">
                    <div className = "flex-1">
                        <h4 className = "half-bold theme-color text-capitalize">my hostels</h4>
                    </div>
                </div>
                <div className = "pt-5">
                    <div className = "mb-3 bg-white mx-3 shadow-sm text-muted text-capitalize half-bold text-c flex-wrap cursor-pointer p-5 rounded-1x">
                        <div className = "mb-3">you have not added any hostel!</div>
                        <Link to = "/hostel-owner/setup/get-hostel-name" className = "px-3 py-2 rounded cursor-pointer mx-2 shadow theme-bg text-white">
                            Add New Hostel
                        </Link>
                    </div>
                </div>
            </Template>
        )
    }
}
