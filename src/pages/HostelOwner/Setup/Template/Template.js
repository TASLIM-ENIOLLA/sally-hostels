import React, {Component} from "react"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import {LogoWhite, Logo, Check, Naira} from '../../../../img/SVGIcons'
import {Link} from 'react-router-dom'

import SplashPage from '../../../SplashPage'

export const PriceInput = ({children, value, placeholder}) => {
    return (
        <div className = "mb-4 border flex-h a-i-c j-c-c overflow-x-0 rounded-2x mt-2">
            <div className = "p-3 border-right bg-light">
                <Naira />
            </div>
            <div className = "flex-1">
                <input type = "text" id = "integer" onKeyPress = {
                    (e) => {
                        e.preventDefault()
                        let key = e.key
                        if(/\d/.test(key)){
                            if(e.target.value.replace(",", "").length < 11){
                                let value = e.target.value.replaceAll(",", "") + key
                                    value = new Intl.NumberFormat().format(value)
                                e.target.value = value
                            }
                            else{
                                document.querySelector("#decimal").value = key
                                document.querySelector("#decimal").focus()
                            }
                        }
                        else if(key === "."){
                            document.querySelector("#decimal").value = ""
                            document.querySelector("#decimal").focus()
                        }
                    }
                } className = "p-3 outline-0 border-0 d-block w-100" placeholder = "0" />
            </div>
            <div className = "px-1 bold">.</div>
            <div>
                <input type = "text" id = "decimal" onKeyDown = {
                    (e) => {
                        e.preventDefault()
                        let key = e.key
                        if(/\d/.test(key)){
                            if(e.target.value.replace(",", "").length < 2){
                                let value = e.target.value.replaceAll(",", "") + key
                                    value = new Intl.NumberFormat().format(value)
                                e.target.value = value
                            }
                        }
                        else{
                            let value = e.target.value
                            e.target.value = value.replace(/\d$/, "")

                            if(e.target.value.length == 0){
                                document.querySelector("#integer").focus()
                            }
                        }
                    }
                } style = {{
                    width: "50px"
                }} className = "bg-light p-3 outline-0 border-0 d-block" placeholder = "00" />
            </div>
        </div>
    )
}

export default class Template extends Component{
    constructor({children, parentComponentState}){
        super()

        this.renderRightMarkup = children.right
        this.renderLeftMarkup = children.left
    }
    render(){
        return (
            <SplashPage>
                {{
                    left: this.renderLeftMarkup,
                    right: this.renderRightMarkup
                }}
            </SplashPage>
        )
    }
}
