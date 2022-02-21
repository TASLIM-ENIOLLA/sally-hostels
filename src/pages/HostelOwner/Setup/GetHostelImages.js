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

const DragNDropArea = () => {
    return (
        <div style = {{
            border: "2px solid #007bff",
            borderStyle: "dashed"
        }} className = "px-3 py-5 flex-v rounded-2x">
            <div>
                <div className = "text-c">
                    <Overview fill = "#007bff" />
                </div>
                <div className = "text-c half-bold text-capitalize mt-2 text-muted">
                    <span>upload files here.</span>
                </div>
                <div className = "text-c half-bold text-capitalize mt-2 text-muted">
                    <span>JPG - PNG - GIF</span>
                </div>
            </div>
        </div>
    )
}

const FileInput = ({children, className, multiple, onChange}) => {
    const timestamp = new Date().getTime()
    return (
        <label htmlFor = {timestamp} className = {className + " half-bold mb-4 outline-0 border rounded py-2 px-4 theme-bg text-white"}>
            {children}
            <input
                type = "file"
                multiple = {multiple}
                id = {timestamp}
                hidden = {true}
                onChange = {onChange}
                className = "half-bold mb-4 outline-0 border rounded py-2 px-4 theme-bg text-white" />
        </label>
    )
}

const PreviewSelectedImages = ({fileList}) => {
    // console.log(fileList)
    let [returnData, setReturnData] = React.useState(
        <div className = "text-c text-muted px-3 py-5 half-bold text-capitalize">
            {fileList.length} file{(
                (fileList.length > 1)
                ? "s"
                : ""
            )} selected
        </div>
    )

    return (
        <div className = "border rounded-1x shadow-sm">
            {returnData}
        </div>
    )
}

const PreviewOrDragNDrop = ({fileList}) => {
    if(fileList.length < 1){
        return (
            <DragNDropArea />
        )
    }
    else{
        return (
            <PreviewSelectedImages fileList = {fileList}/>
        )
    }
}

const RightMKP = () => {
    let [hostelImages, setHostelImages] = React.useState([])
    let [national_ID, setNational_ID] = React.useState(null)
    let [driversLicence, setDriversLicence] = React.useState(null)
    let [passport, setPassport] = React.useState(null)
    let [ownershipProof, setOwnershipProof] = React.useState(null)

    return (
        <div className = "bg-white overflow-y-auto shadow p-5 rounded-2x w-100" style = {{maxWidth: "480px"}}>
            <div className = "bold text-capitalize mb-3">
                photos
            </div>
            <div className = "pt-4">
                <PreviewOrDragNDrop fileList = {hostelImages} />
            </div>
            <div className = "pt-4">
                <div className = "mb-2">
                    <div className = "half-bold mb-4">or</div>
                    <div>
                        <label htmlFor = {"_timestamp"} className = {" half-bold mb-4 outline-0 border text-capitalize rounded py-2 px-4 theme-bg text-white"}>
                            upload photos
                            <input
                                type = "file"
                                multiple
                                id = {"_timestamp"}
                                name = "IMG[]"
                                hidden
                                onChange = {
                                    (e) => {
                                        let arr = []
                                        for(let x = 0; x < e.target.files.length; x++){
                                            arr.push(e.target.files[x])
                                        }
                                        setHostelImages(arr)
                                    }
                                }
                                className = "multipleFileUpload half-bold mb-4 outline-0 border rounded py-2 px-4 theme-bg text-white" />
                        </label>
                    </div>
                </div>
                <div className = "flex-h a-i-c mb-4">
                    <div className = "text-muted text-capitalize half-bold">
                        you can just use a smartcamera or a digital camera here to get the job done!
                    </div>
                </div>
            </div>
            <div className = "bold text-capitalize mb-3">
                upload documents
            </div>
            <div className = "py-4">
                <div className = "mb-3 flex-h flex-wrap a-i-c j-c-space-between">
                    <div>
                        <div className = {"transit d-inline" + (
                            (national_ID)
                            ? ""
                            : " disabled"
                        )}>
                            <Check />
                        </div>
                        <span className = "ml-2 text-capitalize half-bold text-muted">national ID</span>
                    </div>
                    <label htmlFor = "N_ID" className = "flicker">
                        <span className = "mr-2 theme-color text-capitalize half-bold underline">Upload File</span>
                        <Arrow />
                        <input type = "file" onChange = {
                            (e) => {
                                setNational_ID(e.target.files[0])
                            }
                        } hidden className = "singleFileUpload" name = "N_ID" id = "N_ID" />
                    </label>
                </div>
                <div className = "mb-3 flex-h flex-wrap a-i-c j-c-space-between">
                    <div>
                        <div className = {"transit d-inline" + (
                            (driversLicence)
                            ? ""
                            : " disabled"
                        )}>
                            <Check />
                        </div>
                        <span className = "ml-2 text-capitalize half-bold text-muted">Driver's licence</span>
                    </div>
                    <label htmlFor = "D_L" className = "flicker">
                        <span className = "mr-2 theme-color text-capitalize half-bold underline">Upload File</span>
                        <Arrow />
                        <input type = "file" onChange = {
                            (e) => {
                                setDriversLicence(e.target.files[0])
                            }
                        } hidden className = "singleFileUpload" name = "D_L" id = "D_L" />
                    </label>
                </div>
                <div className = "mb-3 flex-h flex-wrap a-i-c j-c-space-between">
                    <div>
                        <div className = {"transit d-inline" + (
                            (passport)
                            ? ""
                            : " disabled"
                        )}>
                            <Check />
                        </div>
                        <span className = "ml-2 text-capitalize half-bold text-muted">passport</span>
                    </div>
                    <label htmlFor = "PS_PT" className = "flicker">
                        <span className = "mr-2 theme-color text-capitalize half-bold underline">Upload File</span>
                        <Arrow />
                        <input type = "file" onChange = {
                            (e) => {
                                setPassport(e.target.files[0])
                            }
                        } hidden className = "singleFileUpload" name = "PS_PT" id = "PS_PT" />
                    </label>
                </div>
                <div className = "mb-3 flex-h flex-wrap a-i-c j-c-space-between">
                    <div>
                        <div className = {"transit d-inline" + (
                            (ownershipProof)
                            ? ""
                            : " disabled"
                        )}>
                            <Check />
                        </div>
                        <span className = "ml-2 text-capitalize half-bold text-muted">proof of ownership</span>
                    </div>
                    <label htmlFor = "POP" className = "flicker">
                        <span className = "mr-2 theme-color text-capitalize half-bold underline">Upload File</span>
                        <Arrow />
                        <input type = "file" onChange = {
                            (e) => {
                                setOwnershipProof(e.target.files[0])
                            }
                        } hidden className = "singleFileUpload" name = "POP" id = "POP" />
                    </label>
                </div>
            </div>
            <div className = "text-capitalize text-muted">
                <input
                    type = "button"
                    onClick = {
                        (e) => {
                            let formData = new FormData()
                            let multipleFileUpload = document.querySelector(".multipleFileUpload")

                            for(let x = 0; x < multipleFileUpload.files.length; x++){
                                formData.append(multipleFileUpload.name, multipleFileUpload.files[x]);
                            }

                            document.querySelectorAll(".singleFileUpload").forEach(
                                item => {
                                    formData.append(item.name, item.files[0])
                                }
                            )

                            let xmlHtttp = new XMLHttpRequest();
                            xmlHtttp.onreadystatechange = function(){
                                if(xmlHtttp.readyState == 4 && xmlHtttp.status == 200){
                                    let responseText = JSON.parse(xmlHtttp.responseText);

                                    if(responseText.responseType === "success"){
                                        window.toast(
                                            responseText.message,
                                            responseText.responseType
                                        ).then(
                                            () => {
                                                window.location = "/hostel-owner/"
                                            }
                                        )
                                    }
                                    else{
                                        window.toast(
                                            responseText.message,
                                            "danger"
                                        )
                                    }
                                }
                            };
                            xmlHtttp.open(
                                "POST",
                                "http://localhost/sally-hostel/php/processes/HostelOwner/CreateNewHotel.php" + window.location.search + "&owner_id=" + JSON.parse(window.localStorage.getItem("SALLY-HOSTELS")).id,
                                true
                            );
                            xmlHtttp.send(formData);
                        }
                    }
                    defaultValue = "Continue"
                    className = {"half-bold outline-0 border rounded py-2 px-4 theme-bg text-white" + (
                        (hostelImages.length > 0 && national_ID != null && driversLicence != null && passport != null && ownershipProof != null)
                        ? ""
                        : " disabled"
                    )} />
            </div>
        </div>
    )
}

export default function GetPrice (){
    return (
        <Template>
            {{
                left: (
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
                ),
                right: (
                    <RightMKP />
                )
            }}
        </Template>
    )
}
