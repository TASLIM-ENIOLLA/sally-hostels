import React, {Component} from "react";
import {Logo} from '../../img/SVGIcons'

export default function Login(){

    const [loginCredentials, setloginCredentials] = React.useState({
        username: "",
        password: ""
    })

    return (
        <div className = "vh100 p-5 vw100 bg-splash">
            <div className = "mt-5 animated slideInDown rounded-2x mx-auto bg-white shadow p-5" style = {{
                maxWidth: "550px",
            }}>
                <div>
                    <h4 className = "pt-3 pb-2 d-inline-block theme-color half-bold bottom-dash">
                        Login
                    </h4>
                </div>
                <div className = "mt-5">
                    <div className = "mb-3">
                        <div className = "text-capitalize half-bold text-muted mb-2">username</div>
                        <input value = {loginCredentials.username} onChange = {
                            (e) => {
                                setloginCredentials({
                                    ...loginCredentials,
                                    username: e.target.value
                                })
                            }
                        } className = "border outline-0 rounded-1x d-block w-100 p-3" type = "text" />
                    </div>
                    <div className = "mb-3">
                        <div className = "text-capitalize half-bold text-muted mb-2">password</div>
                        <input value = {loginCredentials.password} onChange = {
                            (e) => {
                                setloginCredentials({
                                    ...loginCredentials,
                                    password: e.target.value
                                })
                            }
                        } className = "border outline-0 rounded-1x d-block w-100 p-3" type = "password" />
                    </div>
                    <div className = "mt-5">
                        <input className = "theme-bg flicker shadow border-0 half-bold text-white outline-0 rounded-1x px-5 p-3 text-capitalize" type = "button" value = "Log in" onClick = {
                            (e) => {
                                fetch(
                                    "http://localhost:80/sally-hostel/php/processes/Admin/Login.php", {
                                        method: "POST",
                                        body: JSON.stringify(loginCredentials)
                                    }
                                ).then(
                                    e => e.json()
                                ).then(
                                    response => {
                                        if(response.type === "success"){
                                            window.toast("Login successful, redirecting!", response.type).then(
                                                e => {
                                                    window.localStorage.setItem(
                                                        "SALLY-HOSTELS",
                                                        JSON.stringify({
                                                            id          : response.message.id,
                                                            full_name   : response.message.full_name,
                                                            accountType : "admin"
                                                        })
                                                    )

                                                    window.location = "/admin"
                                                }
                                            )
                                        }
                                        else{
                                            window.toast(response.message, "danger")
                                        }
                                    }
                                )
                            }
                        } />
                    </div>
                </div>
            </div>
        </div>
    )
}
