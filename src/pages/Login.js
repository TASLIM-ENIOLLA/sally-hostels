import React, {Component} from "react";
import {LogoWhite} from '../img/SVGIcons'
import {Link} from 'react-router-dom'

import SplashPage from './SplashPage'

const RightComponent = () => {
    const [which, setWhich] = React.useState(true)
    const [formData, setFormData] = React.useState({
        email: "",
        password: "",
        accountType: "student"
    })

    return (
        <div className = "w-100 h-100 flex-v j-c-c a-i-c">
            <div className = "bg-white overflow-y-auto shadow p-5 rounded-2x w-100" style = {{maxWidth: "480px"}}>
                <div className = "bold theme-color text-capitalize">
                    Login
                </div>
                <div className = "pt-4">
                    <div className = "mb-4">
                        <div className = "col-md-11 mx-auto flex-h p-1 shadow-sm rounded theme-bg">
                            <div className = {"transit cursor-pointer flex-h col-6 p-1 px-2 rounded half-bold text-capitalize text-c" + (
                                (which)
                                ? " text-muted shadow-sm bg-white"
                                : " text-white bg-clear"
                            )} onClick = {
                                (e) => {
                                    setWhich(!which)
                                    setFormData({
                                        ...formData,
                                        accountType: "student"
                                    })
                                }
                            }>
                                <span className = "flex-1 single-line">student</span>
                            </div>
                            <div className = {"transit cursor-pointer flex-h col-6 p-1 px-2 rounded half-bold text-capitalize text-c" + (
                                (!which)
                                ? " text-muted shadow-sm bg-white"
                                : " text-white bg-clear"
                            )} onClick = {
                                (e) => {
                                    setWhich(!which)
                                    setFormData({
                                        ...formData,
                                        accountType: "hostel-owner"
                                    })
                                }
                            }>
                                <span className = "flex-1 single-line">hostel owner</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className = "text-capitalize">email</div>
                        <input
                            defaultValue = {formData.email}
                            onChange = {
                                (e) => {
                                    setFormData({
                                        ...formData,
                                        email: e.target.value
                                    })
                                }
                            }
                            type = "email"
                            placeholder = "Type email here"
                            className = "mb-4 d-block w-100 mt-2 outline-0 border rounded p-3" />
                    </div>
                    <div>
                        <div className = "text-capitalize">Password</div>
                        <input
                            defaultValue = {formData.password}
                            onKeyPress = {
                                (e) => {
                                    if(e.key === "Enter"){
                                        document.querySelector("#submit_btn").click()
                                    }
                                }
                            }
                            onChange = {
                                (e) => {
                                    setFormData({
                                        ...formData,
                                        password: e.target.value
                                    })
                                }
                            }
                            type = "password"
                            placeholder = "Enter password"
                            className = "mb-4 d-block w-100 mt-2 outline-0 border rounded p-3" />
                    </div>
                    <div>
                        <input
                            type = "button"
                            id = "submit_btn"
                            onClick = {
                                (e) => {
                                    e.target.classList.add("disabled")

                                    if(formData.email.length > 0 && formData.password.length > 0){
                                        let formDataJSON = JSON.stringify(formData)
                                        fetch(
                                            "http://localhost:80/sally-hostel/php/processes/Login.php", {
                                                method: "POST",
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                },
                                                body: formDataJSON
                                            }
                                        ).then(
                                            responseText => responseText.json()
                                        ).then(
                                            response => {
                                                if(response.responseType === "success"){
                                                    window.localStorage.setItem(
                                                        "SALLY-HOSTELS",
                                                        JSON.stringify(response.data)
                                                    )

                                                    window.toast("Login successful. Redirecting...", "success", 2000).then(
                                                        e => {
                                                            if(formData.accountType !== "student"){
                                                                window.location = "/" + formData.accountType + "/setup"
                                                            }
                                                            else{
                                                                window.location = "/" + formData.accountType
                                                            }
                                                        }
                                                    )
                                                }
                                                else{
                                                    e.target.classList.remove("disabled")
                                                    window.toast(response.data, "danger")
                                                }
                                            }
                                        )
                                    }
                                    else{
                                        e.target.classList.remove("disabled")
                                        window.toast("One or more field(s) are empty!", "danger")
                                    }
                                }
                            }
                            defaultValue = "Log In"
                            className = "mb-4 mt-2 outline-0 border rounded py-2 px-4 theme-bg text-white" />
                    </div>
                </div>
                <div className = "mt-3 text-capitalize text-muted">
                    Don't have an account? <Link className = "theme-color underline" to = "/account-type">Sign Up</Link>
                </div>
            </div>
        </div>
    )
}

export default function Login(){


    return (
        <SplashPage title = "Login">
            {{
                left: null,
                right: <RightComponent />
            }}
        </SplashPage>
    )
}
