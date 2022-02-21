import React, {Component} from "react";
import {LogoWhite} from '../img/SVGIcons'
import {Link} from 'react-router-dom'

import SplashPage from './SplashPage'

const RadioButton = (props) => {
    return (
        <Link to = {"/" + props.name} className = "cursor-pointer mb-4 mt-3 border flex-h j-c-space-between rounded-2x a-i-c p-3">
            <div className = "text-secondary">{props.labelText}</div>
            <div checked = {false} style = {{
                width: "15px",
                height: "15px",
                borderRadius: "50%",
                border: "1.5px solid #bec3c7",
                cursor: "pointer"
            }} onClick = {
                (e) => {
                    if(e.target.checked === false){
                        e.target.checked = true
                        e.target.classList.add("theme-bg");
                    }
                    else{
                        e.target.checked = false
                        e.target.classList.remove("theme-bg");
                    }
                }
            }></div>
        </Link>
    )
}

export default class AccountTypeComp extends Component{
    constructor(){
        super()

        function getCookie(argument){
        	let cookies = document.cookie.split(";");
        	for(let x = 0; x < cookies.length; x++){
        		let cookiee = cookies[x].split("=");
        		cookiee[0] = cookiee[0].replace(/\s+/, "");
        		if(cookiee[0] == argument){
        			return decodeURIComponent(cookiee[1]);
        		}
        	}
        }

        // let SALLY_HOSTELS = window.localStorage.getItem("SALLY-HOSTELS")
        //
        // if(SALLY_HOSTELS){
        //     let accountType = JSON.parse(SALLY_HOSTELS || "{}").accountType
        //     if(accountType === undefined){
        //         window.location = "/"
        //     }
        //     else{
        //         window.location = "/" + accountType
        //     }
        // }

        this.renderMarkup = (
            <div className = "w-100 h-100 flex-v j-c-c a-i-c">
                <div className = "bg-white shadow p-5 rounded-2x w-100" style = {{maxWidth: "480px"}}>
                    <div className = "bold theme-color text-capitalize">
                        choose account type
                    </div>
                    <div className = "pt-4">
                        <RadioButton labelText = "Student" name = "register-student" />
                        <RadioButton labelText = "Hostel owner" name = "register-hoster-owner" />
                    </div>
                    <div className = "mt-3 text-capitalize text-muted">
                        already have an account? <Link className = "theme-color underline" to = "/login">Login</Link>
                    </div>
                </div>
            </div>
        )
    }
    render(){
        return (

            <SplashPage title = "Choose account type">
                {{
                    left: null,
                    right: this.renderMarkup
                }}
            </SplashPage>
        )
    }
}
