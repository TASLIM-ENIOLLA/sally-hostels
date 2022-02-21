import React, {Component} from "react";
import {LogoWhite} from '../img/SVGIcons'

import {Link} from 'react-router-dom'


export default class SplashPage extends Component{
    constructor(props){
        super()

        this.props = props
        this.children = props.children

        const LeftDefaultContent = () => {
            return (
                <>
                    <Link to = "/">
                        <LogoWhite />
                    </Link>
                    <button
                        style = {{
                            borderRadius: "30px"
                        }}
                        onClick = {
                            (e) => {
                                document.querySelector("#rightContent").scrollIntoView()
                            }
                        }
                        className = "bg-white col-md-d-none mt-3 border-0 outline-0 theme-color shadow text-capitalize py-3 px-5">
                        {this.props.title} <span className = "fa fa-arrow-down mx-2"></span>
                    </button>
                </>
            )
        }

        if(this.children.left === null){
            this.children.left = <LeftDefaultContent />
        }
    }
    render(){
        return (
            <div className = "vh100 vw100 flex-h flex-wrap bg-light text-dark">
                <div className = "overflow-y-auto h-100 col-12 col-md-6 col-lg-5 bg-splash sideBarShadow flex-v j-c-c a-i-c">
                    {(
                        (typeof(this.children.left) !== "string")
                        ? this.children.left
                        : ""
                    )}
                </div>
                <div id = "rightContent" className = "col-12 col-md-6 col-lg-7 p-5 h-100 flex-v j-c-c a-i-c">
                    {this.children.right}
                </div>
            </div>
        )
    }
}
