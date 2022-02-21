import React, {Component} from "react";
import {Link} from 'react-router-dom'
import {Apple, Archive, Arrow, ArrowDown, ArrowLeft, Calender, Cancel, Check, CircleIntersect, Edit, EditInput, Facebook, Favorites, Google, Hamburger, Heart, Help, Home, Logo, LogoWhite, Logout, Map, MapOutline, MasterCardCircle, Naira, Notification, Overview, Payment, Pen, Read, Receipts, RecentCircle, Search, Settings, Star} from '../../img/SVGIcons'

import Template from './Template/Template'

export default function MostPopularHostels(){
    const THEME_COLOR = "#03a86b"
    const TEXT_SECONDARY = "#6c757d"
    const TEXT_PINK = "#e83e8c"

    let [mostPopularHostelsData, setMostPopularHostelsData] = React.useState([])
    let [iconFillColor, setIconFillColor] = React.useState(TEXT_SECONDARY)

    React.useEffect(
        () => {
            let mounted = true

            fetch(
                "http://localhost:80/sally-hostel/php/processes/Student/LoadMostPopularHostels.php", {
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
                        setMostPopularHostelsData(response.data)
                    }
                }
            )

            return () => {
                mounted = false
            }
        }, []
    )
    const HeartDiv = ({hostelId, fav}) => {
        const [favValue, setFavValue] = React.useState(fav)
        const [iconFillColor, setIconFillColor] = React.useState((
            (fav === "false")
            ? TEXT_SECONDARY
            : TEXT_PINK
        ))

        return (
            <div onClick = {
                (e) => {
                    let postData = JSON.stringify({
                        hostelId: hostelId,
                        userId: JSON.parse(window.localStorage.getItem("SALLY-HOSTELS")).id,
                        action: (
                            (favValue === "true")
                            ? "unfavourite"
                            : "favourite"
                        )
                    })

                    fetch(
                        "http://localhost:80/sally-hostel/php/processes/Student/AddHotelToFavourites.php", {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: postData
                        }
                    ).then(
                        responseJSON => responseJSON.json()
                    ).then(
                        response => {
                            if(response.responseType === "success"){
                                if(favValue === "true"){
                                    window.toast("Hostel has been removed from favourites", "success", 1500)
                                    document.querySelectorAll("path[hostelid = '" + hostelId + "']").forEach(
                                        item => {
                                            item.setAttribute("fill", TEXT_SECONDARY)
                                        }
                                    )
                                    setIconFillColor(TEXT_SECONDARY)
                                    setFavValue("false")
                                }
                                else{
                                    window.toast("Hostel has been added to favourites", "success", 1500)
                                    document.querySelectorAll("path[hostelid = '" + hostelId + "']").forEach(
                                        item => {
                                            item.setAttribute("fill", TEXT_PINK)
                                        }
                                    )
                                    setIconFillColor(TEXT_PINK)
                                    setFavValue("true")
                                }
                            }
                        }
                    )
                }
            } className = "cursor-pointer">
                <Heart fill = {iconFillColor} fav = {fav} hostelId = {hostelId} />
            </div>
        )
    }

    mostPopularHostelsData = mostPopularHostelsData.map(
        (each, key) =>
        <div key = {key} className = "p-3 col-md-3 mx-3 bg-white shadow rounded-2x" style = {{
            minWidth: "250px"
        }}>
            <Link to = {"/student/view-hostel/?hostel_id=" + each.id} className = "d-block w-100 rounded-2x" style = {{
                minHeight: "150px",
                backgroundImage: "url(http://localhost/sally-hostel/images/hostels/" + each.owner_id + "/" + each.id + "/" + each.hostel_image[0] + ")",
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}></Link>
            <div className = "pt-3">
                <div className = "flex-h j-c-space-between a-i-c mb-3">
                    <div className = "one-line half-bold text-capitalize">{each.name}</div>
                    <HeartDiv fav = {each.favourite} hostelId = {each.id} />
                </div>
                <div className = "flex-h a-i-c mb-3">
                    <div className = "mr-2">
                        <Map fill = {TEXT_SECONDARY} />
                        <span className = "half-bold underline text-capitalize mx-2 theme-color">see location</span>
                    </div>
                    <div className = "one-line half-bold text-secondary">{each.location}</div>
                </div>
                <div className = "text-capitalize theme-color bold">
                    ₦{new Intl.NumberFormat().format(each.price.replace(/,/g, ""))}
                </div>
            </div>
        </div>
    )
    // mostPopularHostelsData.push(
    //     <div key = "_last" className = "p-3 col-md-3 mx-3 bg-light flex-v j-c-c a-i-c shadow rounded-2x" style = {{
    //         minWidth: "250px",
    //         minHeight: "100%"
    //     }}>
    //         <Link to = "/student/hostels/most-popular">
    //             <div className = "flex-v j-c-c a-i-c flicker">
    //                 <div>
    //                     <span className = "fa-stack fa-2x">
    //                     <span className = "fa fa-circle fa-stack-2x theme-color"></span>
    //                         <span className = "fa fa-arrow-right fa-stack-1x text-white"></span>
    //                     </span>
    //                 </div>
    //                 <div>
    //                     <h6 className = "text-capitalize half-bold theme-color underline">see more</h6>
    //                 </div>
    //             </div>
    //         </Link>
    //     </div>
    // )
    return mostPopularHostelsData
}
