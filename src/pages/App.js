import React, {Component} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

import Home from './Home'
import AccountType from './AccountType'
import Register from './Register'
import Student from './Student/Index'
import StudentFavourites from './Student/Favourites'
import StudentNotifications from './Student/Notifications'
import StudentSettings from './Student/Settings'
import StudentViewHostel from './Student/ViewHostel'
import StudentPayments from './Student/Payments'
import StudentLogout from './Student/Logout'
import HostelOwner from './HostelOwner/Index'
import HostelOwnerSetup from './HostelOwner/Setup/Index'
import HostelOwnerGetHostelName         from './HostelOwner/Setup/GetHostelName'
import HostelOwnerGetHostelLocation     from './HostelOwner/Setup/GetHostelLocation'
import HostelOwnerGetTypeAndDescription from './HostelOwner/Setup/GetTypeAndDescription'
import HostelOwnerGetPrice from './HostelOwner/Setup/GetPrice'
import HostelOwnerGetHostelImages from './HostelOwner/Setup/GetHostelImages'
import HostelOwnerUploadDocuments from './HostelOwner/Setup/UploadDocuments'
import HostelOwnerMyHostels from './HostelOwner/MyHostelsList'
import HostelOwnerViewHostel from './HostelOwner/ViewHostel'
import HostelOwnerNotifications from './HostelOwner/Notifications'
import HostelOwnerSettings from './HostelOwner/Settings'
import HostelOwnerPayments from './HostelOwner/Payments'
import HostelOwnerLogout from './HostelOwner/Logout'
import HostelOwnerAddNewHostel from './HostelOwner/AddNewHostel'
import Login from './Login'
import AdminLogin from './Admin/Login'
import Admin from './Admin/Index'
import AdminPayments from './Admin/Payments'
import AdminLogout from './Admin/Logout'

import "../css/App.css";

export default class App extends Component{
    constructor(){
        super()
        if(!/^\/student/.test(window.location.pathname) && !/^\/hostel\-owner/.test(window.location.pathname)){
            let USER = window.localStorage.getItem("SALLY-HOSTELS")

            // if(USER !== null){
            //     USER = JSON.parse(USER || "{}")
            //     if(USER.accountType !== undefined){
            //         window.location = "/" + USER.accountType
            //     }
            // }
        }
    }
    render(){
        return(
            <Router>
                <Routes>
                    <Route path = "/" element = {<Home />} />
                    <Route path = "/account-type" element = {<AccountType />} />
                    <Route path = "/register-student" element = {<Register type = "student" />} />
                    <Route path = "/register-hoster-owner" element = {<Register type = "hostel-owner" />} />
                    <Route path = "/login" element = {<Login />} />
                    <Route path = "/student/" element = {<Student />} />
                    <Route path = "/student/favourites" element = {<StudentFavourites />} />
                    <Route path = "/student/notifications" element = {<StudentNotifications />} />
                    <Route path = "/student/settings" element = {<StudentSettings />} />
                    <Route path = "/student/view-hostel/" element = {<StudentViewHostel />} />
                    <Route path = "/student/payments/" element = {<StudentPayments />} />
                    <Route path = "/student/logout" element = {<StudentLogout />} />
                    <Route path = "/hostel-owner" element = {<HostelOwner />} />
                    <Route path = "/hostel-owner/setup" element = {<HostelOwnerSetup />} />
                    <Route path = "/hostel-owner/setup/get-hostel-name" element = {<HostelOwnerGetHostelName />} />
                    <Route path = "/hostel-owner/setup/get-hostel-location" element = {<HostelOwnerGetHostelLocation />} />
                    <Route path = "/hostel-owner/setup/get-type-and-description" element = {<HostelOwnerGetTypeAndDescription />} />
                    <Route path = "/hostel-owner/setup/get-price" element = {<HostelOwnerGetPrice />} />
                    <Route path = "/hostel-owner/setup/get-hostel-images" element = {<HostelOwnerGetHostelImages />} />
                    <Route path = "/hostel-owner/setup/upload-documents" element = {<HostelOwnerUploadDocuments />} />
                    <Route path = "/hostel-owner/my-hostels" element = {<HostelOwnerMyHostels />} />
                    <Route path = "/hostel-owner/view-hostel" element = {<HostelOwnerViewHostel />} />
                    <Route path = "/hostel-owner/my-hostels/add-new-hostel" element = {<HostelOwnerAddNewHostel />} />
                    <Route path = "/hostel-owner/notifications" element = {<HostelOwnerNotifications />} />
                    <Route path = "/hostel-owner/settings" element = {<HostelOwnerSettings />} />
                    <Route path = "/hostel-owner/receipts" element = {<HostelOwnerPayments />} />
                    <Route path = "/hostel-owner/logout" element = {<HostelOwnerLogout />} />
                    <Route path = "/admin/login" element = {<AdminLogin />} />
                    <Route path = "/admin" element = {<Admin />} />
                    <Route path = "/admin/payments" element = {<AdminPayments />} />
                    <Route path = "/admin/logout" element = {<AdminLogout />} />
                </Routes>
            </Router>
        )
    }
}
