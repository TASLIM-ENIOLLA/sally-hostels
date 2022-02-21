import React, {Component} from "react";
import {Link} from 'react-router-dom'
import {Apple, Archive, Arrow, ArrowDown, ArrowLeft, Calender, Cancel, Check, CircleIntersect, Edit, EditInput, Facebook, Favorites, Google, Hamburger, Heart, Help, Home, Logo, LogoWhite, Logout, Map, MapOutline, MasterCardCircle, Naira, Notification, Overview, Payment, Pen, Read, Receipts, RecentCircle, Search, Settings, Star} from '../../img/SVGIcons'

import Template from './Template/Template'

export default function StudentFavourites(){
    const THEME_COLOR = "#03a86b"
    const TEXT_SECONDARY = "#6c757d"
    const TEXT_PINK = "#e83e8c"

    let [searchQuery, setSearchQuery] = React.useState("")
    let [searchList, setSearchList] = React.useState([])
    let [mostRatedHostelsData, setMostRatedHostelsData] = React.useState([])

    function make_search(searchQuery){
        if(searchQuery){
            searchQuery = {
                hostel_name: searchQuery,
                hostel_location: "",
                userId: JSON.parse(window.localStorage.getItem("SALLY-HOSTELS")).id
            }
            fetch(
                "http://localhost/sally-hostel/php/processes/Student/SearchFavourites.php", {
                    method: "POST",
                    body: JSON.stringify(searchQuery)
                }
            ).then(
                response => response.json()
            ).then(
                (response) => {
                    setSearchList(response.data)
                }
            )
        }
    }

    function searchListMKP(){
        let mkp_arr = []

        if(searchList.length > 0){
            searchList.map(
                (each, index) => {
                    mkp_arr.push(
                        <Link to = {"/student/view-hostel/?hostel_id=" + each.id} key = {index} className = "col-xs-12 col-lg-6 mb-4">
                            <div className = "bg-white flex-h p-3 rounded-2x shadow-sm">
                                <div className = "px-2">
                                    <div id = {"search_result_" + index} className = "shadow-sm rounded-2x flex-h j-c-c a-i-c" style = {{
                                        minHeight: "70px",
                                        maxHeight: "70px",
                                        minWidth: "70px",
                                        maxWidth: "70px",
                                        backgroundImage: "url(http://localhost/sally-hostel/images/hostels/" + each.owner_id + "/" + each.hostel_id + "/" + each.hostel_image[0] + ")",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        backgroundImage: "url(http://localhost/sally-hostel/images/hostels/" + each.owner_id + "/" + each.id + "/" + each.hostel_image[0] + ")",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center"
                                    }} ></div>
                                </div>
                                <div className = "px-2 flex-1 text-capitalize">
                                    <div className = "flex-h">
                                        <span className = "flex-1 single-line theme-color half-bold">{each.name}</span>
                                    </div>
                                    <div className = "flex-h">
                                        <span className = "flex-1 single-line half-bold">{each.address}</span>
                                    </div>
                                    <div className = "flex-h">
                                        <span className = "flex-1 single-line theme-color half-bold">₦{new Intl.NumberFormat().format(each.price.replace(/\,/g, ""))}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                }
            )
        }
        else{
            mkp_arr.push(
                <div key = "_empty_search_result" className = "col-12 mb-4">
                    <div className = "bg-white text-c half-bold text-muted p-5 rounded-2x shadow-sm">
                        No result found!
                    </div>
                </div>
            )
        }

        return mkp_arr
    }

    React.useEffect(
            () => {
                let mounted = true

                fetch(
                    "http://localhost/sally-hostel/php/processes/Student/LoadUserFavourites.php", {
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
                        if(mounted = true){
                            setMostRatedHostelsData(response.data)
                        }
                    }
                )

                return () => {
                    mounted = false
                }
            }, []
        )

    const UserFavouriteHostels = () => {
        let [iconFillColor, setIconFillColor] = React.useState(TEXT_SECONDARY)

        const HeartDiv = ({hostelId, fav, keyid}) => {
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
                                        document.querySelector("div[title = '" + hostelId + "']").classList.add("fadeOut")
                                        document.querySelector("div[title = '" + hostelId + "']").addEventListener(
                                            "animationend",
                                            (e) => {
                                                document.querySelector("div[title = '" + hostelId + "']").remove()
                                            }
                                        )
                                        setMostRatedHostelsData(
                                            mostRatedHostelsData.filter(
                                                (each, index) => {
                                                    return each.id !== hostelId
                                                }
                                            )
                                        )
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

        if(mostRatedHostelsData.length > 0){
            return mostRatedHostelsData.map(
                (each, key) =>
                <div key = {key} title = {each.id} className = "p-3 col-md-3 mb-4 mx-3 bg-white shadow rounded-2x" style = {{
                    minWidth: "250px"
                }}>
                    <Link to = {"/student/view-hostel/?hostel_id=" + each.id} className = "d-block w-100 rounded-2x" style = {{
                        minHeight: "150px",
                        backgroundImage: "url(http://localhost/sally-hostel/images/hostels/" + each.owner_id + "/" + each.hostel_id + "/" + each.hostel_image[0] + ")",
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
                            ₦{new Intl.NumberFormat().format(each.price.replace(/\,/g, ""))}
                        </div>
                    </div>
                </div>
            )
        }
        else{
            return (
                <div className = "col-12 p-5 shadow border rounded-2x bg-light text-c text-muted half-bold">
                    You haven't chosen any favourite hostel yet. Go to <Link className = "theme-color underline" to = "/student">Home</Link> to add favourite hostels.
                </div>
            )
        }
    }

    return (
        <Template>
            <div className = "col-sm-d-flex-h po-rel j-c-space-between px-3 mt-5 mb-3 a-i-c">
                <h4 className = "theme-color half-bold">Favourites</h4>
                <div className = {"flex-h a-i-c j-c-c mx-2" + (
                    (mostRatedHostelsData.length > 0)
                    ? ""
                    : " d-none"
                )}>
                    <div className = "p-3 mr-3 rounded-2x bg-white flex-h flex-1 a-i-c shadow">
                        <Search />
                        <input type = "text" placeholder = "Search your favourite hostels..." className = "border-0 flex-1 bg-clear ml-2 outline-0 h-100" value = {searchQuery} onChange = {
                            (e) => {
                                setSearchQuery(e.target.value)
                                make_search(e.target.value)
                            }
                        } />
                    </div>
                    {
                        // <div>
                        //     <input value = "search" type = "submit" className = "py-3 rounded-2x border-0 shadow outline-0 theme-bg text-white text-capitalize px-4" />
                        // </div>
                    }
                </div>
                <div className = {"w-100 py-4 px-3 top-0 left-0 p-3 po-abs" + (
                    (searchQuery.length > 0)
                    ? ""
                    : " d-none"
                )} style = {{
                    top: "100%",
                    zIndex: 10000
                }}>
                    <div className = "w-100 border rounded-2x overflow-0 shadow bg-light">
                        <div className = "flex-h a-i-c bg-white border-bottom">
                            <div className = "bg-danger flex-h j-c-c a-i-c" style = {{
                                minHeight: "50px",
                                maxHeight: "50px",
                                minWidth: "50px",
                                maxWidth: "50px"
                            }} onClick = {
                                (e) => {
                                    setSearchQuery("")
                                }
                            }>
                                <Cancel fill = "#FFFFFF" />
                            </div>
                            <span className = "flex-1 px-3 single-line half-bold theme-color">Search results</span>
                        </div>
                        <div
                            style = {{
                                height: "300px"
                            }}
                            className = "flex-1 border-top overflow-y-auto p-3 flex-h flex-wrap"
                        >
                            {searchListMKP()}
                        </div>
                    </div>
                </div>
            </div>
            <div className = "pt-4">
                <div className = "mb-3">
                    <div className = "px-3 flex-h j-c-space-between flex-wrap">
                        <div className = "h5 half-bold text-dark text-capitalize">all favourites</div>
                    </div>
                    <div className = "flex-h flex-wrap py-4">
                        <UserFavouriteHostels />
                    </div>
                </div>
            </div>
        </Template>
    )

}
