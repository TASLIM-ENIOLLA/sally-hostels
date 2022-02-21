import React, {Component} from "react";
import {Link} from 'react-router-dom'

import SplashPage from './SplashPage'

export default class Register extends Component{
    constructor(props){
        super()

        this.props = props

        this.state = {
            formData: {
                accountType: this.props.type,
                full_name: "",
                email: "",
                phone: "",
                password: "",
                c_password: ""
            }
        }

        this.renderMarkup = (
            <div className = "overflow-y-auto bg-white shadow p-5 rounded-2x w-100" style = {{maxWidth: "480px"}}>
                {this.register()}
            </div>
        )
    }
    register = () => {
        return (
            <>
                <div className = "bold theme-color">
                    Register as a{(
                        (this.props.type == "hostel-owner")
                        ? "n"
                        : ""
                    )} {this.props.type.replace("-", " ")}
                </div>
                <div className = "pt-4">
                    <div>
                        <div className = "text-capitalize">Full name</div>
                        <input
                            required
                            type = "text"
                            placeholder = "Enter your name and surname"
                            className = "mb-4 d-block w-100 mt-2 outline-0 border rounded p-3"
                            onChange = {
                                (e) => {
                                    let state = this.state
                                        state.formData.full_name = e.target.value

                                    this.setState(state)
                                }
                            } />
                    </div>
                    <div>
                        <div className = "text-capitalize">email</div>
                        <input
                            required
                            type = "email"
                            placeholder = "Type email here"
                            className = "mb-4 d-block w-100 mt-2 outline-0 border rounded p-3"
                            onChange = {
                                (e) => {
                                    let state = this.state
                                        state.formData.email = e.target.value

                                    this.setState(state)
                                }
                            } />
                    </div>
                    <div>
                        <div className = "text-capitalize">Phone number</div>
                        <input
                            required
                            type = "phone"
                            placeholder = "Type phone number here"
                            className = "mb-4 d-block w-100 mt-2 outline-0 border rounded p-3"
                            onChange = {
                                (e) => {
                                    let state = this.state
                                        state.formData.phone = e.target.value

                                    this.setState(state)
                                }
                            } />
                    </div>
                    <div>
                        <div className = "text-capitalize">Password</div>
                        <input
                            required
                            type = "password"
                            placeholder = "Create password"
                            className = "mb-4 d-block w-100 mt-2 outline-0 border rounded p-3"
                            onChange = {
                                (e) => {
                                    let state = this.state
                                        state.formData.password = e.target.value

                                    this.setState(state)
                                }
                            } />
                    </div>
                    <div>
                        <div className = "text-capitalize">Confirm Password</div>
                        <input
                            required
                            type = "password"
                            placeholder = "Confirm password"
                            className = "mb-4 d-block w-100 mt-2 outline-0 border rounded p-3"
                            onChange = {
                                (e) => {
                                    let state = this.state
                                        state.formData.c_password = e.target.value

                                    this.setState(state)
                                }
                            } />
                    </div>
                    <div>
                        <input
                            type = "button"
                            value = "Sign Up"
                            className = "mb-4 mt-2 outline-0 border rounded py-2 px-4 theme-bg text-white"
                            onClick = {
                                (e) => {
                                    e.target.classList.add("disabled")
                                    let formData = this.state.formData

                                    if(formData.full_name.length > 0 && formData.email.length > 0 && formData.password.length > 0){
                                        if(formData.password !== formData.c_password){
                                            window.toast("Passwords do not match. Try again!", "danger")
                                        }
                                        else{
                                            let formDataJSON = JSON.stringify(formData)
                                            fetch(
                                                "http://localhost:80/sally-hostel/php/processes/SignUp.php", {
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
                                                        let date = new Date();

                                                        window.localStorage.setItem(
                                                            "SALLY-HOSTELS",
                                                            JSON.stringify(response.data)
                                                        )

                                                        window.toast("Sign up successful. Redirecting...", "success", 2000).then(
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
                                    }
                                    else{
                                        e.target.classList.remove("disabled")
                                        window.toast("One or more field(s) are empty!", "danger")
                                    }
                                }
                            } />
                    </div>
                    <div className = "mt-3 text-capitalize text-muted">
                        already have an account? <Link className = "theme-color underline" to = "/login">Login</Link>
                    </div>
                </div>
            </>
        )
    }
    render(){
        return (
            <SplashPage title = "Register">
                {{
                    left: null,
                    right: this.renderMarkup
                }}
            </SplashPage>
        )
    }
}
