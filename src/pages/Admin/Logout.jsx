import React, {Component} from "react";
import {Logo} from '../../img/SVGIcons'
import Template from "./Template/Template"

const USER = JSON.parse(window.localStorage.getItem("SALLY-HOSTELS"))

export default function Index(){
    return (
        <Template>
            <div className = "my-5">
                <h4 className = "half-bold text-capitalize text-danger">Logout</h4>
            </div>
            <div className = "pt-4 px-3 animated-fast slideInDown">
                <div style = {{
                    maxWidth: "500px"
                }} className = "shadow bg-white mx-auto p-3 rounded-2x">
                    <div className = "text-c py-4 half-bold text-secondary">
                        Are you sure you really want to logout?
                    </div>
                    <div className = "flex-h j-c-space-evenly a-i-c p-3">
                        <button className = "border-0 outline-0 px-4 rounded py-2 bg-danger half-bold text-white text-capitalize mx-3" onClick = {
                            (e) => {
                                window.localStorage.removeItem("SALLY-HOSTELS")
                                window.location = "/"
                            }
                        }>logout</button>
                        <button className = "theme-border outline-0 px-4 rounded py-2 bg-clear half-bold theme-color text-capitalize mx-3" onClick = {
                            (e) => {
                                window.location = "/" + USER.accountType
                            }
                        }>cancel</button>
                    </div>
                </div>
            </div>
        </Template>
    )
}
