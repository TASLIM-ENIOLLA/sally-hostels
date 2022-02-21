import React, {Component} from "react";
import {Link} from 'react-router-dom'
import {Apple, Archive, Arrow, ArrowDown, ArrowLeft, Calender, Cancel, Check, CircleIntersect, Edit, EditInput, Facebook, Favorites, Google, Hamburger, Heart, Help, Home, Logo, LogoWhite, Logout, Map, MapOutline, MasterCardCircle, Naira, Notification, Overview, Payment, Pen, Read, Receipts, RecentCircle, Search, Settings, Star} from '../../img/SVGIcons'

import Template from './Template/Template'
import MostRatedHostels from './MostRatedHostels'
import MostPopularHostels from './MostPopularHostels'

let THEME_COLOR = "#03a86b"
let TEXT_SECONDARY = "#6c757d"

const TopMostRatedHostels = () => {
    let [topMostRatedHostelsData, setTopMostRatedHostelsData] = React.useState([])

    React.useEffect(
        () => {
            let mounted = true

            fetch(
                "http://localhost/sally-hostel/php/processes/Student/LoadTopMostRatedHostelData.php", {
                    method: "POST",
                    body: window.localStorage.getItem("SALLY-HOSTELS")
                }
            ).then(
                response => response.json()
            ).then(
                (response) => {
                    if(mounted){
                        setTopMostRatedHostelsData(response)
                    }
                }
            )

            return () => {
                mounted = false
            }
        }, []
    )

    let res = null

    if(topMostRatedHostelsData.responseType === "success"){
        topMostRatedHostelsData = topMostRatedHostelsData.data
        let features = topMostRatedHostelsData.features.split(",")

        return (
            <div className = "col-d-none col-lg-d-block col-md-4">
                <div className = "theme-bg rounded-2x shadow px-3 py-4">
                    <div className = "h5 text-white text-capitalize half-bold mb-5">Top most rated hostel</div>
                    <div>
                        <div className = "mb-3 text-capitalize text-white half-bold">{topMostRatedHostelsData.name}</div>
                        <div className = "rounded-2x mb-3 shadow best-hostel" style = {{
                            minHeight: "250px",
                            backgroundImage: "url(http://localhost/sally-hostel/images/hostels/" + topMostRatedHostelsData.owner_id + "/" + topMostRatedHostelsData.id + "/" + topMostRatedHostelsData.hostel_image[0] + ")",
                            backgroundSize: "cover",
                            backgroundPosition: "center"
                        }}></div>
                        <div className = "mb-2 text-capitalize text-white half-bold underline">Features</div>
                        <div className = "text-capitalize mb-3">
                            {
                                features.map(
                                    (each, key) => <div key = {key} className = "bg-warning d-inline-block rounded-2x mt-2 mr-2 py-1 px-3">
                                        {each}
                                    </div>
                                )
                            }
                        </div>
                        <div className = "mb-2 text-capitalize text-white half-bold underline">type</div>
                        <div className = "text-capitalize text-white mb-3">
                            {topMostRatedHostelsData.type.toLowerCase()}
                        </div>
                        <div className = "mb-2 text-capitalize text-white half-bold underline">description</div>
                        <div className = "text-capitalize text-white mb-3 double-line">
                            {topMostRatedHostelsData.description}
                        </div>
                        <div className = "mb-2 text-capitalize text-white half-bold underline">Rent</div>
                        <div className = "text-capitalize text-warning mb-3 bold">
                            ₦{new Intl.NumberFormat().format(
                                topMostRatedHostelsData.price.replace(/,/g, "")
                            )}
                        </div>
                        <div>
                            <Link to = {"/student/view-hostel?hostel_id=" + topMostRatedHostelsData.id}>
                                <div className = "bg-warning p-3 rounded-2x shadow text-c text-capitalize text-dark half-bold">
                                    apply
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else{
        return (
            <></>
        )
    }
}

const Index = () => {
    const [userImgSrc, setUserImgSrc] = React.useState("")
    const [editProfile, setEditProfile] = React.useState(false)
    const [searchList, setSearchList] = React.useState([])
    const [userData, setUserData] = React.useState(JSON.parse(window.localStorage.getItem("SALLY-HOSTELS")))
    const [searchQuery, setSearchQuery] = React.useState({
        hostel_name: "",
        hostel_location: ""
    })

    const EditProfile = () => {
        let [userData2, setUserData2] = React.useState([])
        let [userImgSrc, setUserImgSrc] = React.useState("")
        let [formDataChange, setFormDataChange] = React.useState(false)

        React.useEffect(
            () => {
                let mounted = true

                fetch(
                    "http://localhost/sally-hostel/php/processes/Student/LoadUserData.php", {
                        method: "POST",
                        body: window.localStorage.getItem("SALLY-HOSTELS")
                    }
                ).then(
                    response => response.json()
                ).then(
                    (response) => {
                        if(mounted === true){
                            response.data.currentPassword = ""
                            setUserData2(response.data)

                            if(response.data.profile_img !== null){
                                setUserImgSrc("http://localhost/sally-hostel/images/" + JSON.parse(window.localStorage.getItem("SALLY-HOSTELS")).accountType + "s/" + response.data.id + "/" + response.data.profile_img)
                            }
                            else{
                                setUserImgSrc("http://localhost/sally-hostel/images/user_default.png")
                            }
                        }
                    }
                )

                return () => {
                    mounted = false
                }

            }, []
        )

        return (
            <>
                <div className = "col-xs-12 col-md-6 mb-4">
                    <div className = "mb-2">Full name</div>
                    <input type = "text" onChange = {
                        (e) => {
                            setUserData2({
                                ...userData2,
                                full_name: e.target.value
                            })
                            setFormDataChange(true)
                        }
                    } defaultValue = {userData2.full_name} className = "d-block bg-clear w-100 outline-0 border rounded p-3" />
                </div>
                <div className = "col-xs-12 col-md-6 mb-4">
                    <div className = "mb-2">Email</div>
                    <input type = "email" onChange = {
                        (e) => {
                            setUserData2({
                                ...userData2,
                                email: e.target.value
                            })
                            setFormDataChange(true)
                        }
                    } defaultValue = {userData2.email} className = "d-block bg-clear w-100 outline-0 border rounded p-3" />
                </div>
                <div className = "col-12 mb-4">
                    <div className = "mb-2">Phone number</div>
                    <input type = "phone" onChange = {
                        (e) => {
                            setUserData2({
                                ...userData2,
                                phone: e.target.value
                            })
                            setFormDataChange(true)
                        }
                    } defaultValue = {userData2.phone} className = "d-block bg-clear w-100 outline-0 border rounded p-3" />
                </div>
                <div className = "col-12 flex-v mb-4">
                    <div className = "border rounded">
                        <div className = "p-2 text-c">
                            <img className = "mx-auto" src = {userImgSrc}  height = "130" />
                        </div>
                        <div>
                            <label className = "p-3 text-capitalize text-c half-bold bg-light border-top d-block w-100 m-0">
                                change profile image
                                <input type = "file" onChange = {
                                    (e) => {
                                        let reader = new FileReader();
                                            reader.onload = () => {
                                                setUserImgSrc(reader.result)
                                            }
                                            reader.readAsDataURL(e.target.files[0]);

                                        setUserData2({
                                            ...userData2,
                                            photo: e.target.files[0]
                                        })
                                        setFormDataChange(true)
                                    }
                                } className = "bg-clear w-100 outline-0 border rounded p-3" hidden = {true} />
                            </label>
                        </div>
                    </div>
                </div>
                <div className = "col-12 mb-4">
                    <div className = "mb-2">Current password (required to update profile)</div>
                    <input type = "password" onChange = {
                        (e) => {
                            setUserData2({
                                ...userData2,
                                currentPassword: e.target.value
                            })
                        }
                    } placeholder = "Enter current password here..." className = {
                        "d-block bg-clear w-100 outline-0 border rounded p-3" + (
                            (formDataChange)
                            ? ""
                            : " disabled"
                        )
                    } />
                </div>
                <div className = "col-12">
                    <input type = "button" value = "Update Profile" className = {"d-block transit flicker theme-bg w-100 outline-0 border rounded-1x p-3 text-white half-bold text-c" + (
                        (userData2.currentPassword !== undefined && userData2.currentPassword.length > 0 && formDataChange)
                        ? ""
                        : " disabled"
                    )} onClick = {
                        (e) => {
                            let formData = new FormData()
                            for(let each in userData2){
                                formData.append(each, userData2[each])
                            }
                            let xmlHtttp = new XMLHttpRequest();
                            xmlHtttp.onreadystatechange = function(){
                                if(xmlHtttp.readyState == 4 && xmlHtttp.status == 200){
                                    let responseText = JSON.parse(xmlHtttp.responseText)

                                    if(responseText.responseType === "success"){
                                        window.toast(responseText.message, "success", 2000).then(
                                            e => {
                                                let localStorageData = {
                                                    full_name: userData2.full_name,
                                                    accountType: userData2.accountType,
                                                    id: userData2.id
                                                }

                                                window.localStorage.setItem(
                                                    "SALLY-HOSTELS",
                                                    JSON.stringify(localStorageData)
                                                )

                                                // The below was made so as to allow react load the new image
                                                // setUserImgSrc()
                                                if(userData2.photo !== undefined){
                                                    window.createCSSSelector(
                                                        ".user-profile-img",
                                                        "background-image: url("
                                                        + "http://localhost/sally-hostel/images/"
                                                        + JSON.parse(window.localStorage.getItem("SALLY-HOSTELS")).accountType
                                                        + "s/"
                                                        + userData2.id
                                                        + "/"
                                                        + responseText.timestamp
                                                        + ".png); "
                                                        + "background-size: cover; background-position: center;"
                                                    )
                                                }

                                                setUserData(localStorageData)
                                            }
                                        )

                                    }
                                    else{
                                        window.toast(responseText.message, "danger")
                                    }
                                }
                            };
                            xmlHtttp.open(
                                "POST",
                                "http://localhost/sally-hostel/php/processes/Student/UpdateUserData.php",
                                true
                            );
                            xmlHtttp.send(formData);
                        }
                    }/>
                </div>
            </>
        )
    }

    const ReturnMKP = ({userData}) => {

        React.useEffect(
            () => {
                let mounted = true

                fetch(
                    "http://localhost/sally-hostel/php/processes/Student/LoadUserData.php", {
                        method: "POST",
                        body: window.localStorage.getItem("SALLY-HOSTELS")
                    }
                ).then(
                    response => response.json()
                ).then(
                    (response) => {
                        if(mounted && response.data.profile_img != null){
                            setUserImgSrc(
                                "http://localhost/sally-hostel/images/"
                                +JSON.parse(window.localStorage.getItem("SALLY-HOSTELS")).accountType
                                + "s/"
                                + response.data.id
                                + "/"
                                + response.data.profile_img
                            )

                            window.createCSSSelector(
                                ".user-profile-img",
                                "background-image: url("
                                    + "http://localhost/sally-hostel/images/"
                                    + JSON.parse(window.localStorage.getItem("SALLY-HOSTELS")).accountType
                                    + "s/"
                                    + response.data.id
                                    + "/"
                                    + response.data.profile_img
                                    + "); background-size: cover; background-position: center;"
                                )
                        }
                        else{
                            window.createCSSSelector(
                                ".user-profile-img",
                                "background-image: url("
                                    + "http://localhost/sally-hostel/images/user_default.png"
                                    + "); background-size: cover; background-position: center;"
                                )
                        }
                    }
                )

                return () => {
                    mounted = false
                }
            }, []
        )

        if(userData === undefined){
            return (<></>)
        }
        else{
            return (
                <Template>
                    <div className = "flex-h flex-wrap mt-5">
                        <div className = "col-lg-8 po-rel">
                            <div className = "p-4 rounded-2x mb-3 bg-banner overflow-x-auto shadow">
                                <div className = "text-capitalize half-bold text-white h5">
                                    stay with us and feel at home
                                </div>
                                <div className = "overflow-x-auto">
                                    <div className = "flex-h flex-wrap a-i-c">
                                        <div className = "p-3 mr-3 mb-2 flex-1 col-xs-12 rounded-2x bg-white flex-h a-i-c shadow-sm">
                                            <Search />
                                            <input type = "text" onChange = {
                                                (e) => {
                                                    let sq = searchQuery
                                                        sq.hostel_name = e.target.value
                                                    setSearchQuery(sq)
                                                    make_search(searchQuery)
                                                }
                                            } value = {searchQuery.hostel_name} placeholder = "Search here..." className = "border-0 flex-1 bg-clear ml-2 outline-0 h-100" />
                                        </div>
                                        <div className = "p-3 mr-3 mb-2 rounded-2x col-xs-12 bg-white flex-h a-i-c shadow-sm">
                                            <MapOutline />
                                            <input type = "text" onChange = {
                                                (e) => {
                                                    let sq = searchQuery
                                                        sq.hostel_location = e.target.value
                                                    setSearchQuery(sq)
                                                    make_search(searchQuery)
                                                }
                                            } value = {searchQuery.hostel_location} placeholder = "Ilorin, Nigeria" className = "border-0 flex-1 bg-clear ml-2 outline-0 h-100" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className = {"po-abs animated slideInTop p-3 w-100 left-0" + (
                                    (searchQuery.hostel_location.length > 0 || searchQuery.hostel_name.length > 0)
                                    ? ""
                                    : " d-none"
                                )}
                                style = {{
                                    maxHeight: "400px",
                                    height: "50vh",
                                    top: "100%",
                                    zIndex: "1000"
                                }}>
                                <div className = "w-100 h-100 border rounded-2x overflow-0 shadow flex-v bg-light">
                                    <div className = "flex-h a-i-c bg-white border-bottom">
                                        <div className = "bg-danger flex-h j-c-c a-i-c" style = {{
                                            minHeight: "50px",
                                            maxHeight: "50px",
                                            minWidth: "50px",
                                            maxWidth: "50px"
                                        }} onClick = {
                                            (e) => {
                                                setSearchQuery({
                                                    ...searchQuery,
                                                    hostel_name: "",
                                                    hostel_location: ""
                                                })
                                            }
                                        }>
                                            <Cancel fill = "#FFFFFF" />
                                        </div>
                                        <span className = "flex-1 px-3 single-line half-bold theme-color">Search results</span>
                                    </div>
                                    <div className = "flex-1 border-top overflow-y-auto p-3 flex-h flex-wrap">
                                        {
                                            searchListMKP()
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className = "col-d-none col-md-d-block col-lg-4">
                            <div className = "p-4 rounded-2x bg-white shadow">
                                <div className = "flex-h a-i-c">
                                    <div
                                        className = "mr-3 user-profile-img border rounded-circle"
                                        style = {{
                                            minWidth: "60px",
                                            maxWidth: "60px",
                                            minHeight: "60px",
                                            maxHeight: "60px"
                                        }}></div>
                                    <div className = "text-capitalize theme-color half-bold h5">
                                        welcome {userData.full_name.match(/^\w+/)[0]}
                                    </div>
                                </div>
                                <div className = "mt-4 flex-h a-i-c text-secondary">
                                    <div className = "mr-3"><Settings fill = {TEXT_SECONDARY} /></div>
                                    <div>
                                        <div onClick = {
                                            (e) => {
                                                setEditProfile(!editProfile)
                                            }
                                        } className = "half-bold cursor-pointer underline text-secondary text-capitalize">edit profile</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className = "pt-4">
                        <div className = "flex-h flex-wrap">
                            <div className = "col-lg-8 po-rel">
                                <div className = "mb-3">
                                    <div className = "px-3 flex-h j-c-space-between flex-wrap">
                                        <div className = "h5 half-bold text-dark text-capitalize">most rated hostels</div>
                                        <Link to = "/student/hostels/most-rated">
                                            <div className = "theme-color h5">View all</div>
                                        </Link>
                                    </div>
                                    <div className = "flex-h overflow-x-auto py-4 px-3">
                                        <MostRatedHostels />
                                    </div>
                                </div>
                                <div className = "mb-3">
                                    <div className = "px-3 flex-h j-c-space-between flex-wrap">
                                        <div className = "h5 half-bold text-dark text-capitalize">popular hostels</div>
                                        <Link to = "/student/hostels/most-popular">
                                            <div className = "theme-color h5">View all</div>
                                        </Link>
                                    </div>
                                    <div className = "flex-h overflow-x-auto py-4 px-3">
                                        <MostPopularHostels />
                                    </div>
                                </div>
                            </div>
                            <TopMostRatedHostels />
                        </div>
                    </div>
                    <div
                        style = {{
                            top: 0,
                            left: 0,
                            background: "rgba(0,0,0,.5)"
                        }}
                        className = {"p-5 po-abs w-100 h-100 overflow-y-auto animated fadeIn" + (
                            (editProfile)
                            ? ""
                            : " d-none"
                        )}>
                        <div className = "bg-white po-rel rounded-2x shadow col-lg-7 p-0 mx-auto overflow-0">
                            <div className = "bg-light border-bottom">
                                <div style = {{
                                    width: "50px",
                                    height: "50px",
                                    top: 0,
                                    right: 0
                                }} className = "bg-danger flex-h j-c-c a-i-c" onClick = {
                                    (e) => {
                                        setEditProfile(!editProfile)
                                    }
                                }>
                                    <Cancel fill = "#ffffff" />
                                </div>
                            </div>
                            <div className = "px-4 py-5 flex-h flex-wrap">
                                <EditProfile />
                            </div>
                        </div>
                    </div>
                </Template>
            )
        }
    }

    function make_search(){
        fetch(
            "http://localhost/sally-hostel/php/processes/Student/MakeSearch.php", {
                method: "POST",
                body: JSON.stringify(searchQuery)
            }
        ).then(
            response => response.json()
        ).then(
            (response) => {
                setSearchList(response.data)
                // console.log(response)
            }
        )
    }

    function searchListMKP(){
        let mkp_arr = []

        if(searchQuery.hostel_name.length > 0 || searchQuery.hostel_location.length > 0){
            if(searchList.length > 0){
                searchList.forEach(
                    (each, index) => {
                        mkp_arr.push(
                            <div key = {index} className = "col-xs-12 col-lg-6 mb-4">
                                <div className = "bg-white flex-h p-3 rounded-2x shadow-sm">
                                    <div className = "px-2">
                                        <div id = {"search_result_" + index} className = "bg-light shadow-sm rounded-2x flex-h j-c-c a-i-c" style = {{
                                            minHeight: "70px",
                                            maxHeight: "70px",
                                            minWidth: "70px",
                                            maxWidth: "70px"
                                        }} ></div>
                                    </div>
                                    <div className = "px-2 flex-1">
                                        <div className = "flex-h">
                                            <span className = "flex-1 single-line theme-color half-bold">{each.name}</span>
                                        </div>
                                        <div className = "flex-h">
                                            <span className = "flex-1 single-line half-bold">{each.address}</span>
                                        </div>
                                        <div className = "flex-h">
                                            <span className = "flex-1 single-line theme-color half-bold">₦{new Intl.NumberFormat().format(each.price.replace(/,/g, ""))}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
        }

        return mkp_arr
    }

    return (
        <ReturnMKP userData = {userData} />
    )
}
export default Index
