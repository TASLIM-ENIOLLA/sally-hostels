import React, {Component} from "react";
import {Logo, Search, Naira} from '../../img/SVGIcons'
import Template from "./Template/Template"

export default function Index(){
    let [paymentData, setpaymentData] = React.useState([])
    let [paymentDataDynamic, setpaymentDataDynamic] = React.useState([])
    let [searchQuery, setsearchQuery] = React.useState({
        search_words: "",
        category: "sender_name"
    })

    const PaymentItem = ({data}) => {
        let [infoState, setInfoState] = React.useState(false)
        let [status, setStatus] = React.useState(data.status)

        let [hostelData] = React.useState(data.hostel_data)
        let [ownerData] = React.useState(data.owner_data)
        let [senderData] = React.useState(data.sender_data)

        let [paymentID] = React.useState(data.id)

        const payment_item_action = (action, payment_id) => {
            let prompt_question = "Do you really want to " + (
                (action === "acknowledge")
                ? "acknowledge"
                : "unacknowledge"
            ) + " this transaction? Concerned parties will be notified of this action."

            if(window.confirm(prompt_question)){
                fetch(
                    "http://localhost:80/sally-hostel/php/processes/Admin/UpdatePaymentData.php", {
                        method: "POST",
                        body: JSON.stringify({
                            status: action,
                            payment_id: payment_id,
                            hostel_data: hostelData,
                            owner_data: ownerData,
                            sender_data: senderData
                        })
                    }
                ).then(
                    e => e.json()
                ).then(
                    response => {
                        if(response.type === "success"){
                            setStatus((
                                (action === "acknowledge")
                                ? "verified"
                                : "pending"
                            ))
                        }
                    }
                )
            }
        }

        return (
            <div
                className = {"mb-4 animated fadeIn rounded-2x po-rel overflow-0 shadow-sm active-menu" + (
                (infoState)
                ? ""
                : " double-line"
            )} onClick = {
                (e) => {
                    setInfoState(!infoState)
                }
            }>
                <div className = "p-3">
                    <div className = "half-bold flex-h flex-wrap a-i-c j-c-space-between text-dark">
                        <div className = "col-xs-12">{data.timestamp}</div>
                        <div className = "col-xs-12 italic text-capitalize">{status}</div>
                    </div>
                    <div className = "half-bold text-muted mt-1">
                        REF: {data.transaction_ID}
                    </div>
                    <div className = "half-bold text-muted mt-1">
                        SENDER: {senderData.full_name}
                    </div>
                    <div className = "half-bold text-muted mt-1">
                        HOSTEL NAME: {hostelData.name}
                    </div>
                    <div className = "half-bold text-muted mt-1">
                        AMOUNT: <Naira /> {data.amount}
                    </div>
                    <div className = "half-bold text-muted mt-1">
                        THROUGH: SALLY HOSTELS
                    </div>
                    <div className = {"mt-3"}>
                        <button className = {"border border-secondary rounded col-xs-12 px-5 outline-0 py-2 bg-clear text-capitalize half-bold" + (
                            (status === "pending")
                            ? " theme-color"
                            : " text-danger"
                        )} onClick = {
                            (e) => {
                                payment_item_action((
                                    (status === "pending")
                                    ? "acknowledge"
                                    : "unacknowledge"
                                ), data.id)
                            }
                        }>
                            {
                                (
                                    (status === "pending")
                                    ? "acknowledge"
                                    : "unacknowledge"
                                )
                            }
                        </button>
                    </div>
                </div>
                <div className = {"po-abs p-3 w-100 left-0" + (
                    (infoState)
                    ? " d-none"
                    : ""
                )} style = {{
                    top: "101%",
                    transform: "translate(0, -100%)",
                    background: "linear-gradient(#7fd8b700, #87e6c3ba)"
                }}></div>
            </div>
        )
    }

    const Payments = () => {
        if(paymentDataDynamic.length > 0){
            return paymentDataDynamic.map(
                (each, key) => (
                    <PaymentItem key = {key} data = {each} />
                )
            )
        }
        else{
            return (
                <div className = "bg-white my-3 rounded-2x shadow-sm p-5 half-bold text-muted text-c">
                    Oops, nothing here!
                </div>
            )
        }
    }

    const make_search = () => {
        if(searchQuery.search_words.length > 0){
            let result = []
            paymentData.forEach(
                (each, item) => {
                    if(searchQuery.category === "sender_name"){
                        if(new RegExp(searchQuery.search_words, "i").test(each.sender_data.full_name)){
                            result.push(each)
                        }
                    }
                    else if(searchQuery.category === "hostel_data"){
                        if(new RegExp(searchQuery.search_words, "i").test(each.hostel_data.name)){
                            result.push(each)
                        }
                    }
                    else if(searchQuery.category === "ref_id"){
                        if(new RegExp(searchQuery.search_words, "i").test(each.transaction_ID)){
                            result.push(each)
                        }
                    }
                }
            )

            setpaymentDataDynamic(result)
        }
        else{
            setpaymentDataDynamic(paymentData)
        }
    }

    const filter_data = (filterQuery) => {
        if(filterQuery !== "all"){
            let result = paymentData.filter(
                (each) => {
                    return each.status === filterQuery
                }
            )

            setpaymentDataDynamic(result)
        }
        else{
            setpaymentDataDynamic(paymentData)
        }

    }

    React.useEffect(
        () => {
            fetch(
                "http://localhost:80/sally-hostel/php/processes/Admin/LoadPayments.php", {
                    method: "POST"
                }
            ).then(
                e => e.json()
            ).then(
                response => {
                    setpaymentData(response.data)
                    setpaymentDataDynamic(response.data)
                }
            )
        }, []
    )

    return (
        <Template>
            <div className = "my-5">
                <h4 className = "half-bold text-capitalize text-muted">Payments</h4>
            </div>
            <div>
                <div className = "row mb-3">
                    <div className = "col-xs-12 col-lg-9">
                        <div className = "p-3 mb-2 flex-1 rounded-2x bg-white flex-h a-i-c shadow-sm">
                            <Search />
                            <input type = "text" onChange = {
                                (e) => {
                                    let s = searchQuery
                                        s.search_words = e.target.value

                                    setsearchQuery(s)
                                    make_search()
                                }
                            } placeholder = "Search here..." className = "border-0 flex-1 bg-clear ml-2 outline-0 h-100" />
                            <select onChange = {
                                (e) => {
                                    let s = searchQuery
                                        s.category = e.target.value

                                    setsearchQuery(s)
                                    make_search()
                                }
                            } style = {{
                                border: "0"
                            }} className = "d-inline-block pl-3 border-left text-capitalize outline-0">
                                <option value = "sender_name">sender name</option>
                                <option value = "hostel_data">hostel name</option>
                                <option value = "ref_id">ref. ID</option>
                            </select>
                        </div>
                    </div>
                    <div className = "col-xs-12 col-lg-3">
                        <div className = "p-3 mb-2 flex-1 rounded-2x bg-white flex-h a-i-c shadow-sm">
                            <select style = {{
                                border: "0"
                            }} className = "d-inline-block w-100 text-capitalize outline-0" onChange = {
                                (e) => {
                                    filter_data(e.target.value)
                                }
                            }>
                                <option value = "all">all</option>
                                <option value = "verified">verified</option>
                                <option value = "pending">pending</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className = "overflow-y-auto pt-4">
                    <Payments />
                </div>
            </div>
        </Template>
    )
}
