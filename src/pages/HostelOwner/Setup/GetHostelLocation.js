import React, {Component} from "react"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import {LogoWhite, Logo, Check} from '../../../img/SVGIcons'

import Template from './Template/Template'

const Heading = ({children}) => {
    return (
        <div style = {{
            fontSize: "3rem"
        }} className = "half-bold mt-4 text-white">
            {children}
        </div>
    )
}

export default function GetHostelLocation(){
    const [hostelLocation, setHostelLocation] = React.useState("")

    return (
        <div className = "vh100 vw100 flex-h flex-wrap bg-light text-dark">
            <div className = "overflow-y-auto h-100 col-12 col-md-6 col-lg-5 bg-splash sideBarShadow flex-v j-c-c a-i-c">
                <div className = "px-5">
                    <div className = "text-c d-inline-block px-4 py-2 rounded-2x shadow bg-white">
                        <Logo />
                    </div>
                    <Heading>
                        Where's your hostel located?
                    </Heading>
                    <div className = "h5 mt-4 text-white">
                        This is the name that will appear as the title of your listing on our site.
                    </div>
                    <div className = "mt-4">
                        <button
                            style = {{
                                borderRadius: "30px"
                            }}
                            onClick = {
                                (e) => {
                                    document.querySelector("#rightContent").scrollIntoView()
                                }
                            }
                            className = "bg-white half-bold col-md-d-none mt-3 border-0 outline-0 theme-color shadow text-capitalize py-3 px-5">
                            get started
                        </button>
                    </div>
                </div>
            </div>
            <div id = "rightContent" className = "col-12 col-md-6 col-lg-7 p-5 h-100 flex-v j-c-c a-i-c">
                <div className = "w-100 h-100 flex-v j-c-c a-i-c">
                    <div className = "bg-white overflow-y-auto shadow p-5 rounded-2x w-100" style = {{maxWidth: "480px"}}>
                        <div className = "bold text-capitalize mb-3">
                            hostel location
                        </div>
                        <div className = "pt-4">
                            <div className = "flex-h a-i-c mb-4">
                                <input
                                    type = "email"
                                    placeholder = "Tanke, Ilorin"
                                    value = {hostelLocation}
                                    onChange = {
                                        (e) => {
                                            setHostelLocation(e.target.value)
                                        }
                                    }
                                    className = "d-block w-100 outline-0 border rounded-2x p-3" />
                            </div>
                            <div>
                                <div className = "h5 text-capitalize mb-3 half-bold">
                                    tips
                                </div>
                                <div className = "flex-h a-i-c mb-4">
                                    <Check />
                                    <div className = "flex-h flex-1 text-capitalize ml-2 half-bold">
                                        <span className = "flex-1 single-line text-muted">enter street name and house number</span>
                                    </div>
                                </div>
                                <div className = "flex-h a-i-c mb-4">
                                    <Check />
                                    <div className = "flex-h flex-1 text-capitalize ml-2 half-bold">
                                        <span className = "flex-1 single-line text-muted">spell street name correctly</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className = "mt-3 text-capitalize text-muted">
                            <input
                                type = "button"
                                onClick = {
                                    (e) => {
                                        let search = window.location.search
                                            search += "&hostel_location=" + hostelLocation
                                        window.location = "./get-type-and-description" + search
                                    }
                                }
                                defaultValue = "Continue"
                                className = {"mt-2 half-bold outline-0 border rounded py-2 px-4 theme-bg text-white" + (
                                    (hostelLocation.length > 0)
                                    ? ""
                                    : " disabled"
                                )} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
