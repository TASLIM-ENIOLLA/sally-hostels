import React, {Component} from "react"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import {LogoWhite, Logo, Check, Naira} from '../../../img/SVGIcons'

import Template, {PriceInput} from './Template/Template'

const Heading = ({children}) => {
    return (
        <div style = {{
            fontSize: "3rem"
        }} className = "half-bold mt-4 text-white">
            {children}
        </div>
    )
}

const RightMKP = () => {
    const [price, setPrice] = React.useState(0)

    return (
        <div className = "bg-white overflow-y-auto shadow p-5 rounded-2x w-100" style = {{maxWidth: "480px"}}>
            <div className = "bold text-capitalize mb-3">
                price
            </div>
            <div className = "pt-4">
                <div>
                    <div className = "mb-2">
                        <div className = "text-capitalize half-bold">amount</div>
                        <div className = "flex-h a-i-c border rounded-2x mt-3 overflow-0">
                            <div className = "py-3 px-4 border-right bg-light">
                                <Naira />
                            </div>
                            <input value = {price} onKeyPress = {
                                (e) => {
                                    let key = e.key
                                    if(!/\d/.test(key)){
                                        e.preventDefault()
                                    }
                                }
                            } onChange = {
                                (e) => {
                                    let localprice = e.target.value.replace(/\,/g, "")
                                    setPrice(new Intl.NumberFormat().format(localprice))
                                }
                            } type = "text" className = "p-3 flex-1 outline-0 rounded-2x border-0" />
                        </div>
                    </div>
                    <div className = "flex-h a-i-c mb-4">
                        <div className = "text-muted text-capitalize half-bold">
                            you can always change this later in the settings so feel free!
                        </div>
                    </div>
                </div>
            </div>
            <div className = "text-capitalize text-muted">
                <input
                    type = "button"
                    onClick = {
                        (e) => {
                            let search = window.location.search
                                search += "&price=" + price
                            window.location = "./get-hostel-images" + search
                        }
                    }
                    defaultValue = "Continue"
                    className = {"half-bold outline-0 border rounded py-2 px-4 theme-bg text-white" + (
                        (parseFloat(price.toString().replace(/\,/g, "")) > 0)
                        ? ""
                        : " disabled"
                    )} />
            </div>
        </div>
    )
}

export default function GetPrice(){
    return (
        <Template>
            {{
                left: (
                    <div className = "px-5">
                        <div className = "text-c d-inline-block px-4 py-2 rounded-2x shadow bg-white">
                            <Logo />
                        </div>
                        <Heading>
                            How much do you want to charge?
                        </Heading>
                        <div className = "h5 mt-4 text-white">
                            The price you want out customers to book your room or apartment
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
                    <RightMKP />
                )
            }}
        </Template>
    )
}
