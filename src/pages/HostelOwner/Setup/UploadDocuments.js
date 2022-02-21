import React, {Component} from "react"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import {LogoWhite, Logo, Check, Naira, Overview, Arrow} from '../../../img/SVGIcons'

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

const FileUploads = () => {
    return (
        <>
            <div className = "mb-3 flex-h flex-wrap a-i-c j-c-space-between">
                <div>
                    <Check />
                    <span className = "ml-2 text-capitalize half-bold text-muted">national ID</span>
                </div>
                <label htmlFor = "N_ID" className = "flicker">
                    <span className = "mr-2 theme-color text-capitalize half-bold underline">Upload File</span>
                    <Arrow />
                    <input type = "file" hidden = {true} id = "N_ID" />
                </label>
            </div>
            <div className = "mb-3 flex-h flex-wrap a-i-c j-c-space-between">
                <div>
                    <Check />
                    <span className = "ml-2 text-capitalize half-bold text-muted">Driver's licence</span>
                </div>
                <label htmlFor = "D_L" className = "flicker">
                    <span className = "mr-2 theme-color text-capitalize half-bold underline">Upload File</span>
                    <Arrow />
                    <input type = "file" hidden = {true} id = "D_L" />
                </label>
            </div>
            <div className = "mb-3 flex-h flex-wrap a-i-c j-c-space-between">
                <div>
                    <Check />
                    <span className = "ml-2 text-capitalize half-bold text-muted">passport</span>
                </div>
                <label htmlFor = "N_ID" className = "flicker">
                    <span className = "mr-2 theme-color text-capitalize half-bold underline">Upload File</span>
                    <Arrow />
                    <input type = "file" hidden = {true} id = "N_ID" />
                </label>
            </div>
            <div className = "mb-3 flex-h flex-wrap a-i-c j-c-space-between">
                <div>
                    <Check />
                    <span className = "ml-2 text-capitalize half-bold text-muted">proof of ownership</span>
                </div>
                <label htmlFor = "N_ID" className = "flicker">
                    <span className = "mr-2 theme-color text-capitalize half-bold underline">Upload File</span>
                    <Arrow />
                    <input type = "file" hidden = {true} id = "N_ID" />
                </label>
            </div>
        </>
    )
}

export default function UploadDocuments(){

    return (
        <div className = "vh100 vw100 flex-h flex-wrap bg-light text-dark">
            <div className = "overflow-y-auto h-100 col-12 col-md-6 col-lg-5 bg-splash sideBarShadow flex-v j-c-c a-i-c">
                <div className = "px-5">
                    <div className = "text-c d-inline-block px-4 py-2 rounded-2x shadow bg-white">
                        <Logo />
                    </div>
                    <Heading>
                        We need to verify your hostel
                    </Heading>
                    <div className = "h5 mt-4 text-white">
                        Kindly provide the necessary details in time to complete verification.
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
                            upload documents
                        </div>
                        <div className = "py-4">
                            <FileUploads />
                        </div>
                        <div className = "text-capitalize text-muted">
                            <input
                                type = "button"
                                onClick = {
                                    (e) => {
                                        window.location = "/hostel-owner"
                                    }
                                }
                                defaultValue = "Complete"
                                className = "half-bold outline-0 border rounded py-2 px-4 theme-bg text-white" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
