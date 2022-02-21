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

const Item = ({name, value, children}) => {
    return (
        <option name = {name} value = {value}>
            {children}
        </option>
    )
}

const Select = ({children, value = undefined}) => {
    return (
        <div className = "mb-4 border pr-3 rounded-2x mt-2">
            <select onChange = {
                (e) => {
                    value = e.target.value
                }
            } className = "bg-clear text-capitalize half-bold d-block border-0 w-100 outline-0 p-3">
                {children}
            </select>
        </div>
    )
}

const RightMKP = () => {
    const [hall, setHall] = React.useState("HALL")
    const [description, setDescription] = React.useState("")
    const [features, setFeatures] = React.useState([])
    const [feature, setFeature] = React.useState("")

    return (
        <div className = "bg-white overflow-y-auto shadow p-5 rounded-2x w-100" style = {{maxWidth: "480px"}}>
            <div className = "bold text-capitalize mb-3">
                hostel type & description
            </div>
            <div className = "pt-4">
                <div>
                    <div className = "mb-3">
                        <div className = "text-capitalize half-bold">type</div>
                        <div>
                            <select onChange = {
                                (e) => {
                                    setHall(e.target.value)
                                }
                            } className = "p-3 border rounded mt-3 d-block w-100 outline-0">
                                <option value = "HALL">Hall</option>
                                <option value = "1_BD_FLAT">1 bedroom flat</option>
                                <option value = "2_BD_FLAT">2 bedroom flat</option>
                                <option value = "3_BD_FLAT">3 bedroom flat</option>
                            </select>
                        </div>
                    </div>
                    <div className = "mb-3">
                        <div className = "text-capitalize half-bold mb-3">features</div>
                        <div className = "border p-2 rounded overflow-0">
                            <div className = {(
                                (features.length > 0)
                                ? "mb-2"
                                : ""
                            )}>
                                {
                                    features.map(
                                        (each, key) => (
                                            <div title = {each} key = {key} className = "border d-inline-block px-3 py-1 rounded-2x bg-light mr-2 mb-2" onClick = {
                                                (e) => {
                                                    let i = e.target.title
                                                    let f = features.filter(
                                                        each => {
                                                            return each !== i
                                                        }
                                                    )
                                                    setFeatures(f)
                                                }
                                            }>{each}</div>
                                        )
                                    )
                                }
                            </div>
                            <div className = "">
                                <input type = "text" value = {feature} placeholder = "Add a feature" className = "p-2 border d-block w-100 rounded mb-2 outline-0 flex-1" onChange = {
                                    (e) => {
                                        setFeature(e.target.value)
                                    }
                                } />
                                <input type = "button" value = "add" className = "text-capitalize theme-bg p-2 rounded shadow-sm px-3 border-0 outline-0 text-white half-bold" onClick = {
                                    (e) => {
                                        if(feature.length > 0){
                                            setFeatures([
                                                ...features,
                                                feature
                                            ])
                                            setFeature("")
                                        }
                                    }
                                } />
                            </div>
                        </div>
                    </div>
                    <div className = "mb-3">
                        <div className = "text-capitalize half-bold">description</div>
                        <div className = "flex-h flex-1 text-capitalize half-bold">
                            <textarea
                                onChange = {
                                    (e) => {
                                        setDescription(e.target.value)
                                    }
                                }
                                placeholder = "Type description here..."
                                rows = "3"
                                value = {description}
                                className = "mb-4 resize-0 d-block w-100 mt-2 outline-0 border rounded p-3">

                            </textarea>
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
                                search += "&hall=" + hall + "&description=" + description + "&features=" + features.join()
                            window.location = "./get-price" + search
                        }
                    }
                    defaultValue = "Continue"
                    className = "half-bold outline-0 border rounded py-2 px-4 theme-bg text-white" />
            </div>
        </div>
    )
}

export default function GetTypeAndDescription(){
    return (
        <Template>
            {{
                left: (
                    <div className = "px-5">
                        <div className = "text-c d-inline-block px-4 py-2 rounded-2x shadow bg-white">
                            <Logo />
                        </div>
                        <Heading>
                            Type & description
                        </Heading>
                        <div className = "h5 mt-4 text-white">
                            The type of hostel you're listing. The description is the catchy line after the name.
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
