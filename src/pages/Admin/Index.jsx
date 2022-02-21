import React, {Component} from "react";
import {Logo, Ring, Naira} from '../../img/SVGIcons'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts'
import Template from "./Template/Template"

export default function Index(){
    const [hostelsFromDB, loadHostelsFromDB] = React.useState([])
    const [users, setUsers] = React.useState(0)
    const [hostelOwners, loadHostelOwners] = React.useState(0)
    const [netWorth, setNetWorth] = React.useState(0)
    const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

    React.useState(
        () => {
            fetch(
                "http://localhost:80/sally-hostel/php/processes/Admin/LoadHostels.php", {
                    method: "POST"
                }
            ).then(
                e => e.json()
            ).then(
                response => {
                    let net_worth = 0
                    loadHostelsFromDB(response.data)

                    response.data.forEach(
                        (each, item) => {
                            net_worth = (parseFloat(each.price.replace(/,/g, "")) * parseFloat(each.no_of_apartments)) + parseFloat(net_worth)
                        }
                    )

                    setNetWorth(net_worth)
                }
            )
            fetch(
                "http://localhost:80/sally-hostel/php/processes/Admin/LoadStudents.php", {
                    method: "POST"
                }
            ).then(
                e => e.json()
            ).then(
                response => {
                    setUsers(response.data.length)
                }
            )
            fetch(
                "http://localhost:80/sally-hostel/php/processes/Admin/LoadHostelOwners.php", {
                    method: "POST"
                }
            ).then(
                e => e.json()
            ).then(
                response => {
                    loadHostelOwners(response.data.length)
                }
            )
            // window.Morris.Line({
            //     element: 'morris-line-chart',
            //     data: [{
            //         y: '2006',
            //         a: 100,
            //         b: 90
            //     }, {
            //         y: '2007',
            //         a: 75,
            //         b: 65
            //     }, {
            //         y: '2008',
            //         a: 50,
            //         b: 40
            //     }, {
            //         y: '2009',
            //         a: 75,
            //         b: 65
            //     }, {
            //         y: '2010',
            //         a: 50,
            //         b: 40
            //     }, {
            //         y: '2011',
            //         a: 75,
            //         b: 65
            //     }, {
            //         y: '2012',
            //         a: 100,
            //         b: 90
            //     }],
            //     xkey: 'y',
            //     ykeys: ['a', 'b'],
            //     labels: ['Series A', 'Series B'],
            //     hideHover: 'auto',
            //     resize: true
            // });
        }, []
    )
    return (
        <Template>
            <div className = "my-5">
                <h4 className = "half-bold text-capitalize text-muted">Overview</h4>
            </div>
            <div>
                <div className = "row">
                    <div className = "col-md-12 col-lg-4 py-2">
                        <div className = "p-3 rounded-2x active-menu shadow-sm">
                            <div className = "flex-h">
                                <div className = "flex-1 text-muted half-bold text-capitalize single-line">hostels</div>
                            </div>
                            <div className = "mt-3 flex-h j-c-space-between a-i-c">
                                <div>
                                    <h4 className = "m-0">{hostelsFromDB.length} Hostel</h4>
                                    <div className = "text-secondary text-capitalize half-bold">apartments</div>
                                </div>
                                <div>
                                    <Ring value = {100 + "%"} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className = "col-md-12 col-lg-4 py-2">
                        <div className = "p-3 rounded-2x active-menu shadow-sm">
                            <div className = "flex-h">
                                <div className = "flex-1 text-muted half-bold text-capitalize single-line">users</div>
                            </div>
                            <div className = "mt-3 flex-h j-c-space-between a-i-c">
                                <div>
                                    <h4 className = "m-0">{users} Regular</h4>
                                    <div className = "text-secondary text-capitalize half-bold">client{(
                                        (users > 1)
                                        ? "s"
                                        : ""
                                    )}</div>
                                </div>
                                <div>
                                    <Ring value = {100 + "%"} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className = "col-md-12 col-lg-4 py-2">
                        <div className = "p-3 rounded-2x active-menu shadow-sm">
                            <div className = "flex-h">
                                <div className = "flex-1 text-muted half-bold text-capitalize single-line">hostel owners</div>
                            </div>
                            <div className = "mt-3 flex-h j-c-space-between a-i-c">
                                <div>
                                    <h4 className = "m-0">{hostelOwners} Hostel</h4>
                                    <div className = "text-secondary text-capitalize half-bold">partner{(
                                        (users > 1)
                                        ? "s"
                                        : ""
                                    )}</div>
                                </div>
                                <div>
                                    <Ring value = {100 + "%"} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className = "col-md-12 col-lg-4 py-2">
                        <div className = "p-3 rounded-2x active-menu shadow-sm">
                            <div className = "flex-h">
                                <div className = "flex-1 text-muted half-bold text-capitalize single-line">net worth</div>
                            </div>
                            <div className = "mt-3 flex-h j-c-space-between a-i-c">
                                <div>
                                    <h4 className = "m-0">₦{new Intl.NumberFormat().format(netWorth)}</h4>
                                    <div className = "text-secondary text-capitalize half-bold">in total revenue</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className = "my-4">
                    <div className = "fo-s-16 half-bold text-capitalize">revenue</div>
                    <div className = "row">
                        <div className="col-md-6 col-sm-12 col-xs-12 bg-danger">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                width={500}
                                height={300}
                                data={data}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                            </LineChart>
                        </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </Template>
    )
}
