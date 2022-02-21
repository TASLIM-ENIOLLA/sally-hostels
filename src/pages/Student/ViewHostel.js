import React, {Component} from "react";
import {Link} from 'react-router-dom'
import {Apple, Archive, Arrow, ArrowDown, ArrowLeft, Calender, Cancel, Check, CircleIntersect, Edit, EditInput, Facebook, Favorites, Google, Hamburger, Heart, Help, Home, Logo, LogoWhite, Logout, Map, MapOutline, MasterCardCircle, Naira, Notification, Overview, Payment, Pen, Read, Receipts, RecentCircle, Search, Settings, Star} from '../../img/SVGIcons'

import Template from './Template/Template'

const Rating = ({rating}) => {
    let res = []

    for(let x = 0; x < rating; x++){
        res.push(
            <Star key = {x} fill = "#ffc107" />
        )
    }

    return res
}

const Features = ({features_list}) => {
    let res = []

    if(features_list){
        features_list = features_list.replaceAll(/\"/g, "").split(",")

        features_list.forEach(
            (item, index) => {
                res.push(
                    <div key = {index} className = "bg-warning shadow-sm d-inline-block rounded-2x mt-2 mr-2 py-1 px-3">{item}</div>
                )
            }
        )
    }

    return res
}

const PaymentMKP = ({hostel_owner_id, hostel_id}) => {
    let [paymentData, setPaymentData] = React.useState({})
    let [transactionID, setTransactionID] = React.useState("")

    React.useEffect(
        () => {
            let mounted = true

            fetch(
                "http://localhost/sally-hostel/php/processes/Student/LoadCompanyCardDetails.php", {
                    method: "POST",
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
        <>
            <div className = "col-xs-12 col-md-6 mb-4">
                <div className = "mb-2 text-capitalize">account number</div>
                <input type = "number" readOnly defaultValue = {paymentData.account_number} className = "d-block bg-clear w-100 outline-0 border rounded p-3" />
            </div>
            <div className = "col-xs-12 col-md-6 mb-4">
                <div className = "mb-2 text-capitalize">account bank</div>
                <input type = "text" readOnly defaultValue = {paymentData.account_bank} className = "d-block bg-clear w-100 outline-0 border rounded p-3" />
            </div>
            <div className = "col-xs-12 col-md-6 mb-4">
                <div className = "mb-2 text-capitalize">holder's name</div>
                <input type = "text" readOnly defaultValue = {paymentData.holders_name} className = "d-block bg-clear w-100 outline-0 border rounded p-3" />
            </div>
            <div className = "col-12 col-md-6 mb-4">
                <div className = "mb-2 text-capitalize">Phone number</div>
                <input type = "phone" readOnly defaultValue = {paymentData.phone} className = "d-block bg-clear w-100 outline-0 border rounded p-3" />
            </div>
            <div className = "mb-4 italic text-muted px-4">The user is to make payment to <span className = "theme-color">Sally Hostels</span> via the details given above. If the transaction is successful, the user is to enter the transaction ID in the field below for verification. Once verified the user receives an email stating how to acquire the rented property</div>
            <div className = "col-12 mb-4">
                <div className = "mb-2 text-capitalize">Payment Transaction ID</div>
                <input type = "text" value = {transactionID} onChange = {
                    (e) => {
                        setTransactionID(e.target.value)
                    }
                } placeholder = "Enter payment transaction ID here..." className = "d-block bg-clear w-100 outline-0 border rounded p-3" />
            </div>
            <div className = "col-12">
                <input type = "button" value = "Verifiy Payment" className = {"d-block transit flicker theme-bg w-100 outline-0 border rounded-1x p-3 text-white half-bold text-c" + (
                    (transactionID.length > 0)
                    ? ""
                    : " d-none"
                )} onClick = {
                    (e) => {
                        let userData = JSON.parse(window.localStorage.getItem("SALLY-HOSTELS"))
                        let requestData = {
                            user_id: userData.id,
                            full_name: userData.full_name,
                            accountType: userData.accountType,
                            hostel_owner_id: hostel_owner_id,
                            hostel_id: hostel_id,
                            transactionID: transactionID
                        }
                        fetch(
                            "http://localhost/sally-hostel/php/processes/Student/AddTransactionData.php", {
                                method: "POST",
                                body: JSON.stringify(requestData)
                            }
                        ).then(
                            response => response.json()
                        ).then(
                            (response) => {
                                if(response.response === "success"){
                                    window.toast("Successfully sent transaction ID. Please wait while your payment is being verified. You'll be notified via the notification page.", "success")
                                    setTransactionID("")
                                }
                                else{
                                    window.toast("An error occured, please try again.", "danger")
                                }
                            }
                        )
                    }
                }/>
            </div>
        </>
    )
}

export default function ViewHostel(){
    const THEME_COLOR = "#03a86b"
    const TEXT_SECONDARY = "#6c757d"

    let [userData] = React.useState(
        JSON.parse(
            window.localStorage.getItem("SALLY-HOSTELS")
        )
    )
    let [hostelData, setHostelData] = React.useState([])
    let [hostelImages, setHostelImages] = React.useState([])
    let [payment, setPayment] = React.useState(false)

    const ImagesPreview = ({photos}) => {
        return photos.map(
            (each, key) => (
                <div key = {key} style = {{
                    minWidth: "150px",
                    minHeight: "150px",
                    maxWidth: "150px",
                    maxHeight: "150px",
                    backgroundImage: "url(http://localhost/sally-hostel/images/hostels/" + hostelData.owner_id + "/" + hostelData.id + "/" + each + ")",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }} className = "border shadow mx-3 rounded-2x"
                ></div>
            )
        )
    }

    const MakePaymentMKP = ({hostel_id}) => {
        const [_payments, _setPayments] = React.useState([])
        const [exists, setExists] = React.useState(false)

        React.useEffect(
            () => {
                let mounted = true

                fetch(
                    "http://localhost:80/sally-hostel/php/processes/Student/LoadUserPayments.php", {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: window.localStorage.getItem("SALLY-HOSTELS")
                    }
                ).then(
                    e => e.json()
                ).then(
                    response => {
                        if(mounted){
                            _setPayments(response.data)

                            response.data.forEach(
                                (each, item) => {
                                    if(hostel_id === each._to){
                                        setExists(true)
                                    }
                                }
                            )
                        }
                    }
                )

                return () => {
                    mounted = false
                }
            }, [hostel_id]
        )
        return (
            (exists)
            ? (
                <button className = "text-capitalize rounded-2x w-100 disabled half-bold text-c  p-3 theme-bg text-white border-0 shadow outline-0">
                    payment awaiting acknowledgement
                </button>
            )
            : (
                <button onClick = {
                    (e) => {
                        setPayment(!payment)
                    }
                } className = "text-capitalize rounded-2x w-100 half-bold text-c  p-3 theme-bg text-white border-0 shadow outline-0">
                    make payment
                </button>
            )
        )
    }

    React.useEffect(
        () => {
            let mounted = true
            let search = window.location.search

            if(search === ""){
                window.location.replace("/student")
            }

            fetch(
                "http://localhost:80/sally-hostel/php/processes/Student/LoadHostelData.php" + search, {
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
                        setHostelImages(response.data.photos)
                        setHostelData(response.data)
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
                <h4 className = "theme-color half-bold">View Hostel</h4>
            </div>
            <div className = "pt-4 px-3">
                <div>
                    <div className = "rounded-2x rounded-2x shadow border" style = {{
                        minHeight: "300px",
                        backgroundImage: (
                            (hostelData.id)
                            ? "url(http://localhost/sally-hostel/images/hostels/" + hostelData.owner_id + "/" + hostelData.id + "/" + hostelImages[0] + ")"
                            : ""
                        ),
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                    }}></div>
                    <div className = "py-5">
                        <div className = "mb-5 text-c">
                            <h4 className = "theme-color half-bold">{hostelData.name}</h4>
                            <div className = "half-bold mt-1">
                                <Rating rating = {(hostelData.rating)} /> ({(hostelData.rating)} Star Rating)
                            </div>
                            <div className = "half-bold mt-1">Posted on: {hostelData.timestamp}</div>
                        </div>
                        <div className = "mb-5">
                            <div className = "theme-color mb-3 half-bold">Photos</div>
                            <div className = "flex-h overflow-x-auto">
                                <ImagesPreview photos = {hostelImages} />
                            </div>
                        </div>
                        <div className = "mb-3 pt-1">
                            <div className = "theme-color half-bold">Physical address</div>
                            <div className = "text-capitalize">
                                {hostelData.address}
                            </div>
                        </div>
                        <div className = "mb-3 pt-1">
                            <div className = "theme-color half-bold">Type</div>
                            <div className = "text-capitalize">
                                {hostelData.hostel_type}
                            </div>
                        </div>
                        <div className = "mb-3 pt-1">
                            <div className = "theme-color half-bold">Price</div>
                            <div className = "text-capitalize">
                                ₦{
                                    new Intl.NumberFormat().format(
                                        parseInt(
                                            ("" + hostelData.price).replace(/,/g, "")
                                        )
                                        + parseInt(
                                            ("" + hostelData.price).replace(/,/g, "") * .05
                                        )
                                    )} / year
                                <span className = "italic theme-color ml-3 text-lowercase">+5% commission</span>
                            </div>
                        </div>
                        <div className = "mb-3 pt-1">
                            <div className = "theme-color half-bold">Features</div>
                            <div className = "text-capitalize">
                                <Features features_list = {hostelData.features} />
                            </div>
                        </div>
                        <div className = "mb-3 pt-1">
                            <div className = "theme-color half-bold">Description</div>
                            <div className = "text-capitalize">
                                {(
                                    ((hostelData.description + "").length > 0)
                                    ? hostelData.description
                                    : "--- No description available ---"
                                )}
                            </div>
                        </div>
                        <div className = "mb-3 pt-1">
                            <div className = "theme-color half-bold">Available apartments</div>
                            <div className = "text-capitalize">
                                <span className = "theme-color">
                                    {
                                        (hostelData.no_of_apartments)
                                        - (hostelData.no_of_vacant_apartments) + ""
                                    }
                                </span>
                                / {hostelData.no_of_apartments} apartments
                            </div>
                        </div>
                        <div className = "mt-5">
                            <MakePaymentMKP hostel_id = {hostelData.id} />
                        </div>
                    </div>
                </div>
            </div>
            <div
                style = {{
                    top: 0,
                    left: 0,
                    background: "rgba(0,0,0,.5)"
                }}
                className = {"p-5 po-abs w-100 h-100 overflow-y-auto animated fadeIn" + (
                    (payment)
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
                                setPayment(!payment)
                            }
                        }>
                            <Cancel fill = "#ffffff" />
                        </div>
                    </div>
                    <div className = "px-4 py-5 flex-h flex-wrap">
                        <PaymentMKP hostel_owner_id = {hostelData.owner_id} hostel_id = {hostelData.id} />
                    </div>
                </div>
            </div>
        </Template>
    )
}
