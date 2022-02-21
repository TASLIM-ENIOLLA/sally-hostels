import React, {Component} from "react"
import {Link} from "react-router-dom"
import {LogoWhite, Logo, Check} from '../../../img/SVGIcons'
// import {Link} from 'react-router-dom'

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

export default class Index extends Component{
    constructor(){
        super()
    }
    render(){
        return (
            <Template>
                {{
                    left: (
                        <div className = "px-5">
                            <div className = "text-c d-inline-block px-4 py-2 rounded-2x shadow bg-white">
                                <Logo />
                            </div>
                            <Heading>
                                Hello, list your properties on Sally Hostels.com
                            </Heading>
                            <div className = "h5 mt-4 text-white">
                                Registration can take as little as 5 minutes to complete - get started today!
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
                    ),
                    right: (
                        <div className = "w-100 h-100 flex-v j-c-c a-i-c">
                            <div className = "bg-white overflow-y-auto shadow p-5 rounded-2x w-100" style = {{maxWidth: "480px"}}>
                                <div className = "bold text-capitalize mb-3">
                                    create new listing
                                </div>
                                <div className = "pt-4">
                                    <div className = "flex-h a-i-c mb-4">
                                        <Check />
                                        <div className = "flex-h flex-1 text-capitalize ml-2 half-bold">
                                            <span className = "flex-1 single-line text-muted">listing is totally free</span>
                                        </div>
                                    </div>
                                    <div className = "flex-h a-i-c mb-4">
                                        <Check />
                                        <div className = "flex-h flex-1 text-capitalize ml-2 half-bold">
                                            <span className = "flex-1 single-line text-muted">24/7 customer support</span>
                                        </div>
                                    </div>
                                    <div className = "flex-h a-i-c mb-4">
                                        <Check />
                                        <div className = "flex-h flex-1 text-capitalize ml-2 half-bold">
                                            <span className = "flex-1 single-line text-muted">set rules on property</span>
                                        </div>
                                    </div>
                                    <div className = "flex-h a-i-c mb-4">
                                        <div className = "text-muted text-capitalize half-bold">
                                            by continuing, you agree to let sally hostels.com send you an email concerning you property registration
                                        </div>
                                    </div>
                                </div>
                                <div className = "mt-3 text-muted">
                                    <input
                                        type = "button"
                                        defaultValue = "Continue"
                                        className = "mt-2 text-capitalize half-bold outline-0 border rounded py-2 px-4 theme-bg text-white"
                                        onClick = {
                                            (e) => {
                                                window.location = "./setup/get-hostel-name"
                                            }
                                        } />
                                    <span className = "mx-2">or</span>
                                    <Link to = "/hostel-owner" className = "text-capitalize half-bold theme-color underline">Skip</Link>
                                </div>
                            </div>
                        </div>
                    )
                }}
            </Template>
        )
    }
}
