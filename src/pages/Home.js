import React, {Component} from "react";
import {LogoWhite} from '../img/SVGIcons'

import {Link} from 'react-router-dom'


export default class Home extends Component{
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

        // let SALLY_HOSTELS = getCookie("SALLY-HOSTELS")
        //
        // if(SALLY_HOSTELS){
        //     let accountType = JSON.parse(SALLY_HOSTELS).accountType
        //     window.location = "/" + accountType
        // }
    }
    render(){
        return (
            <div className = "vh100 vw100 flex-v j-c-c a-i-c bg-splash text-dark">
                <div>
                    <div>
                        <Link to = "/">
                            <LogoWhite />
                        </Link>
                    </div>
                    <div className = "pt-4">
                        <Link to = "/account-type">
                            <button
                                style = {{
                                    borderRadius: "30px"
                                }}
                                className = "bg-white border-0 outline-0 theme-color shadow text-capitalize py-3 px-5"
                            >get started</button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}
