import React, {Component} from "react";
import {Link} from 'react-router-dom'
import {Naira, Overview, Hamburger, Logo, Home, Notification, Settings, Receipts, Logout} from '../../img/SVGIcons'
import def from '../../img/corrupt_img.png'


import Template, {DragNDropArea} from './Template/Template'

export default function AddNewHostel (){
    const THEME_COLOR = "#03a86b"
    const TEXT_SECONDARY = "#6c757d"
    const [currentFeature, setCurrentFeature] = React.useState("")
    const [default_img, set_default_img] = React.useState(def)
    const [hostelData, setHostelData] = React.useState({
        name: "",
        address: "",
        type: "HALL",
        otherType: "",
        price: {
            int: 0,
            dec: 0
        },
        description: "",
        free_apartments: "",
        total_apartments: "",
        features: [],
        photos: [],
        owner_id: JSON.parse(window.localStorage.getItem("SALLY-HOSTELS")).id
    })

    const PriceInput = ({children, value, placeholder, onChange}) => {
        return (
            <div className = "border flex-h a-i-c j-c-c overflow-x-0 rounded-2x mt-2">
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
                                    let _value = e.target.value.replaceAll(",", "") + key
                                        _value = new Intl.NumberFormat().format(_value)
                                    e.target.value = _value
                                }
                                else{
                                    document.querySelector("#decimal").value = key
                                    document.querySelector("#decimal").focus()
                                }
                                onChange(e)
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
                                    let _value = e.target.value.replaceAll(",", "") + key
                                        _value = new Intl.NumberFormat().format(_value)
                                    e.target.value = _value
                                }
                            }
                            else{
                                let _value = e.target.value
                                e.target.value = _value.replace(/\d$/, "")

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

    return(
        <Template>
            <div className = "pt-4 flex-h flex-wrap">
                <div className = "flex-1 col-12 pb-5 pt-3">
                    <h4 className = "half-bold theme-color">Add new hostel</h4>
                </div>
                <div className = "col-xs-12 col-md-6">
                    <div className = "rounded-2x bg-white mb-4 shadow-sm p-4">
                        <div className = "h6 text-capitalize text-muted half-bold pb-2">hostel name <span className = "text-danger">*</span></div>
                        <input defaultValue = {hostelData.name} className = "outline-0 d-block w-100 px-3 py-3 border rounded-1x" onChange = {
                            (e) => {
                                setHostelData({
                                    ...hostelData,
                                    name: e.target.value
                                })
                            }
                        } />
                    </div>
                </div>
                <div className = "col-xs-12 col-md-6">
                    <div className = "rounded-2x bg-white mb-4 shadow-sm p-4">
                        <div className = "h6 text-capitalize text-muted half-bold pb-2">hostel address <span className = "text-danger">*</span></div>
                        <input
                            defaultValue = {hostelData.address} className = "outline-0 d-block w-100 px-3 py-3 border rounded-1x"
                            onChange = {
                                (e) => {
                                    setHostelData({
                                        ...hostelData,
                                        address: e.target.value
                                    })
                                }
                            }/>
                    </div>
                </div>
                <div className = "col-xs-12 col-md-6">
                    <div className = "rounded-2x bg-white mb-4 shadow-sm p-4">
                        <div className = "h6 text-capitalize text-muted half-bold pb-2">select type <span className = "text-danger">*</span></div>
                        <select onChange = {
                            (e) => {
                                setHostelData({
                                    ...hostelData,
                                    type: e.target.value
                                })
                            }
                        }
                        value = {hostelData.type} className = "outline-0 d-block w-100 px-3 py-3 border text-capitalize rounded-1x">
                            <option value = "HALL">hall</option>
                            <option value = "1_BD_FLAT">1 bedroom flat</option>
                            <option value = "2_BD_FLAT">2 bedroom flat</option>
                            <option value = "3_BD_FLAT">3 bedroom flat</option>
                            <option value = "OTHER">other</option>
                        </select>
                        {(
                            (hostelData.type === "OTHER")
                            ? <input onChange = {
                                (e) => {
                                    setHostelData({
                                        ...hostelData,
                                        otherType: e.target.value
                                    })
                                }
                            } className = "outline-0 d-block w-100 px-3 py-3 border rounded-1x mt-3" />
                            : ""
                        )}
                    </div>
                </div>
                <div className = "col-xs-12 col-md-6">
                    <div className = "rounded-2x bg-white mb-4 shadow-sm p-4">
                        <div className = "h6 text-capitalize text-muted half-bold pb-2">rentage (Price) <span className = "text-danger">*</span></div>
                        <div className = "border flex-h a-i-c j-c-c overflow-x-0 rounded-2x mt-2">
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
                                                let _value = e.target.value.replaceAll(",", "") + key
                                                setHostelData({
                                                    ...hostelData,
                                                    price: {
                                                        ...hostelData.price,
                                                        int: _value
                                                    }
                                                })
                                                    _value = new Intl.NumberFormat().format(_value)
                                                e.target.value = _value
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
                                                let _value = e.target.value.replaceAll(",", "") + key
                                                setHostelData({
                                                    ...hostelData,
                                                    price: {
                                                        ...hostelData.price,
                                                        dec: _value
                                                    }
                                                })
                                                    _value = new Intl.NumberFormat().format(_value)
                                                e.target.value = _value
                                            }
                                        }
                                        else{
                                            let _value = e.target.value
                                            e.target.value = _value.replace(/\d$/, "")

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
                    </div>
                </div>
                <div className = "col-12">
                    <div className = "rounded-2x bg-white mb-4 shadow-sm p-4">
                        <div className = "h6 text-capitalize text-muted half-bold pb-2">no. of apartments</div>
                        <div className = "flex-h flex-wrap pt-3">
                            <div className = "col-xs-12 col-md-6 pt-3">
                                <div className = "flex-h mb-2">
                                    <span className = "flex-1 single-line text-capitalize">free apartments</span>
                                </div>
                                <div>
                                <input
                                    type = "number"
                                    defaultValue = {hostelData.free_apartments} className = "outline-0 d-block w-100 px-3 py-3 border rounded-1x"
                                    onChange = {
                                        (e) => {
                                            setHostelData({
                                                ...hostelData,
                                                free_apartments: e.target.value
                                            })
                                        }
                                    }/>
                                </div>
                            </div>
                            <div className = "col-xs-12 col-md-6 pt-3">
                                <div className = "flex-h mb-2">
                                    <span className = "flex-1 single-line text-capitalize">total apartments</span>
                                </div>
                                <div>
                                <input
                                    type = "number"
                                    defaultValue = {hostelData.total_apartments} className = "outline-0 d-block w-100 px-3 py-3 border rounded-1x"
                                    onChange = {
                                        (e) => {
                                            setHostelData({
                                                ...hostelData,
                                                total_apartments: e.target.value
                                            })
                                        }
                                    }/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className = "col-12">
                    <div className = "rounded-2x bg-white mb-4 shadow-sm p-4">
                        <div className = "h6 text-capitalize text-muted half-bold pb-2">decription</div>
                        <textarea rows = "3" onChange = {
                            (e) => {
                                setHostelData({
                                    ...hostelData,
                                    description: e.target.value
                                })
                            }
                        } className = "outline-0 resize-0 d-block w-100 px-3 py-3 border rounded-1x">{hostelData.decription}</textarea>
                    </div>
                </div>
                <div className = "col-12">
                    <div className = "rounded-2x bg-white mb-4 shadow-sm p-4">
                        <div className = "h6 text-capitalize text-muted half-bold pb-2">features</div>
                        <div className = "flex-v p-2 border rounded-1x">
                            <div className = "flex-1 py-2 overflow-y-auto">
                                {
                                    hostelData.features.map(
                                        (item, key) => (
                                            <div key = {key} className = "theme-bg py-1 px-2 shadow-sm text-white text-capitalize rounded-2x d-inline-block m-2" title = {item} style = {{
                                                wordBreak: "break-all"
                                            }} onClick = {
                                                (e) => {
                                                    let this_feature = e.target.title
                                                    let features = hostelData.features.filter(
                                                        (item, index) => {
                                                            return (
                                                                (item !== this_feature)
                                                                ? item
                                                                : null
                                                            )
                                                        }
                                                    )

                                                }
                                            }>{item}</div>
                                        )
                                    )
                                }
                            </div>
                            <div>
                                <input
                                    value = {currentFeature}
                                    className = "outline-0 d-block w-100 p-2 border rounded-1x"
                                    placeholder = "Type features here..." onChange = {
                                        (e) => {
                                            setCurrentFeature(e.target.value)
                                        }
                                    } />
                                <input
                                    type = "button"
                                    defaultValue = "Add feature"
                                    className = "theme-bg mt-2 mb-1 border-0 outline-0 shadow-sm text-white px-4 py-2 text-capitalize half-bold w-auto rounded-1x" onClick = {
                                        (e) => {
                                            if(currentFeature.length > 0){
                                                let features = hostelData.features
                                                    features.push(currentFeature)
                                                setHostelData({
                                                    ...hostelData,
                                                    features: features
                                                })
                                            }
                                        }
                                    } />
                            </div>
                        </div>
                    </div>
                </div>
                <div className = "col-12">
                    <div className = "rounded-2x bg-white mb-4 shadow-sm p-4">
                        <div className = "h6 text-capitalize text-muted half-bold pb-2">photos</div>
                        {/* <DragNDropArea /> */}
                        <div className = "border text-c rounded-1x flex-v">
                            <div className = "flex-1 p-3">
                                <img height = "130" src = {default_img} />
                            </div>
                            <label className = "p-3 m-0 bg-light border-top flex-h text-c">
                                <span className = "flex-1 single-line text-capitalize half-bold text-muted">
                                    {
                                        (
                                            (hostelData.photos.length > 0)
                                            ? hostelData.photos.length + " photos selected"
                                            : "click to select photos"
                                        )
                                    }
                                </span>
                                <input multiple hidden type = "file" name = "hostel_photos[]"
                                    onChange = {
                                        (e) => {
                                            setHostelData({
                                                ...hostelData,
                                                photos: e.target.files[0]
                                            })

                                            let reader = new FileReader();
                                                reader.onload = () => {
                                                    set_default_img(reader.result)
                                                }
                                                reader.readAsDataURL(e.target.files[0]);
                                        }
                                    } />
                            </label>
                        </div>
                    </div>
                </div>
                <div className = "col-12 mb-5 mt-3">
                    <button className = "p-3 text-white d-block flicker w-100 shadow text-capitalize border-0 outline-0 rounded-1x theme-bg half-bold pb-2" onClick = {
                        (e) => {
                            let formData = new FormData()
                            for(let formObj in hostelData){
                                if(formObj == "price"){

                                    formData.append(formObj, JSON.stringify(hostelData[formObj]))
                                }
                                else{

                                    formData.append(formObj, hostelData[formObj])
                                }


                            }
                            formData.append(
                                document.querySelector("input[type='file']").name,
                                document.querySelector("input[type='file']").files
                            )
                            let xmlHtttp = new XMLHttpRequest();
                            xmlHtttp.onreadystatechange = function(){
                                if(xmlHtttp.readyState == 4 && xmlHtttp.status == 200){
                                    console.log(xmlHtttp.responseText)
                                    let responseText = JSON.parse(xmlHtttp.responseText);
                                    window.toast(
                                        responseText.data,
                                        (
                                            (responseText.responseType === "success")
                                            ? responseText.responseType
                                            : "danger"
                                        )
                                    )
                                }
                            };
                            xmlHtttp.open(
                                "POST",
                                "http://localhost:80/sally-hostel/php/processes/HostelOwner/AddNewHostel.php",
                                true
                            );
                            xmlHtttp.send(formData);
                        }
                    }>add new hostel</button>
                </div>
            </div>
        </Template>
    )
}
