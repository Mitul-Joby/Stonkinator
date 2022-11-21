import axios from "axios";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useState, useEffect } from "react";
import { LineChart, Line, Label, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';

import { HomeNavbar } from '../components/'

function HomePage() {
    const [dowJones, setDowJones] = useState([])
    const [sp500, setSp500] = useState([])
    const [nasdaq, setNasdaq] = useState([])
    const [dayGainers, setDayGainers] = useState([])
    const [dayLosers, setDayLosers] = useState([])
    const [dayActive, setDayActive] = useState([])

    useEffect(() => {
        axios.get('/stocks/dowjones')
            .then((response) => {
                setDowJones(response.data.dowjones)
            })

        axios.get('/stocks/sp500')
            .then((response) => {
                setSp500(response.data.sp500)
            })

        axios.get('/stocks/nasdaq')
            .then((response) => {
                setNasdaq(response.data.nasdaq)
            })

        axios.get('/stocks/day-gainers')
            .then((response) => {
                setDayGainers(response.data.gainers)
            })

        axios.get('/stocks/day-losers')
            .then((response) => {
                setDayLosers(response.data.losers)
            })

        axios.get('/stocks/day-most-active')
            .then((response) => {
                setDayActive(response.data.most_active)
            })

    }, [])

    return (

        <div className="home-page" style={{ backgroundColor: '#f5f5f5', height: '100vh', overflow: 'hidden' }}>
            <HomeNavbar />
            <div className="mx-4" style={{ marginTop: '50px' }}>
                <div className="row" >
                    <div className="col-12 col-md-9 my-3" >
                        <div className="card shadow-sm">
                            <div className="card-body" style={{ height: '85vh', maxHeight: '85vh', overflowY: 'scroll' }}>
                                <Tabs
                                    defaultActiveKey="Dow Jones"
                                    id="tab-indices"
                                    className="mb-3"
                                >
                                    <Tab eventKey="Dow Jones" title="Dow Jones">
                                        <ResponsiveContainer width="100%" height={400}>
                                            <LineChart data={dowJones}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="DATE" />
                                                <YAxis type="number" domain={['auto', 'auto']} />
                                                <Tooltip />
                                                <Legend />
                                                <Line type="monotone" dot={false} dataKey="CLOSE" stroke="#132639" activeDot={{ r: 8 }} />
                                                <Line type="monotone" dot={false} dataKey="OPEN" stroke="#2d5986" />
                                                <Line type="monotone" dot={false} dataKey="HIGH" stroke="#6699cc" />
                                                <Line type="monotone" dot={false} dataKey="LOW" stroke="#b3cce6" />
                                            </LineChart>
                                        </ResponsiveContainer>

                                        <ResponsiveContainer width="100%" height={400}>
                                            <AreaChart data={dowJones}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="DATE" />
                                                <YAxis type="number" domain={['auto', 'auto']} />
                                                <Tooltip />
                                                <Area type="monotone" dataKey="CLOSE" stroke="#66ff33" fill="#99ff99" />
                                            </AreaChart>
                                        </ResponsiveContainer>

                                        <ResponsiveContainer width="100%" height={400}>
                                            <BarChart data={dowJones} margin={{ left: 60 }}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="DATE" />
                                                <YAxis domain={['auto', 'auto']} hide={true} >
                                                    <Label
                                                        style={{
                                                            textAnchor: "middle",
                                                            fontSize: "130%",
                                                            fill: "white",
                                                        }}
                                                        angle={270}
                                                        value={"DATE (ft.)"}
                                                    />
                                                </YAxis>
                                                <Tooltip />
                                                <Bar dataKey="VOLUME" fill="#70db70" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </Tab>
                                    <Tab eventKey="S&P 500" title="S&P 500">
                                        <ResponsiveContainer width="100%" height={300}>
                                            <LineChart data={sp500}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="DATE" />
                                                <YAxis type="number" domain={['auto', 'auto']} />
                                                <Tooltip />
                                                <Legend />
                                                <Line type="monotone" dot={false} dataKey="CLOSE" stroke="#132639" activeDot={{ r: 8 }} />
                                                <Line type="monotone" dot={false} dataKey="OPEN" stroke="#2d5986" />
                                                <Line type="monotone" dot={false} dataKey="HIGH" stroke="#6699cc" />
                                                <Line type="monotone" dot={false} dataKey="LOW" stroke="#b3cce6" />
                                            </LineChart>
                                        </ResponsiveContainer>

                                        <ResponsiveContainer width="100%" height={300}>
                                            <AreaChart data={sp500}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="DATE" />
                                                <YAxis type="number" domain={['auto', 'auto']} />
                                                <Tooltip />
                                                <Area type="monotone" dataKey="CLOSE" stroke="#66ff33" fill="#99ff99" />
                                            </AreaChart>
                                        </ResponsiveContainer>

                                        <ResponsiveContainer width="100%" height={300}>
                                            <BarChart data={sp500} margin={{ left: 60 }}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="DATE" />
                                                <YAxis domain={['auto', 'auto']} hide={true} >
                                                    <Label
                                                        style={{
                                                            textAnchor: "middle",
                                                            fontSize: "130%",
                                                            fill: "white",
                                                        }}
                                                        angle={270}
                                                        value={"DATE (ft.)"}
                                                    />
                                                </YAxis>
                                                <Tooltip />
                                                <Bar dataKey="VOLUME" fill="#70db70" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </Tab>
                                    <Tab eventKey="NASDAQ" title="NASDAQ">
                                        <ResponsiveContainer width="100%" height={300}>
                                            <LineChart data={nasdaq}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="DATE" />
                                                <YAxis type="number" domain={['auto', 'auto']} />
                                                <Tooltip />
                                                <Legend />
                                                <Line type="monotone" dot={false} dataKey="CLOSE" stroke="#132639" activeDot={{ r: 8 }} />
                                                <Line type="monotone" dot={false} dataKey="OPEN" stroke="#2d5986" />
                                                <Line type="monotone" dot={false} dataKey="HIGH" stroke="#6699cc" />
                                                <Line type="monotone" dot={false} dataKey="LOW" stroke="#b3cce6" />
                                            </LineChart>
                                        </ResponsiveContainer>

                                        <ResponsiveContainer width="100%" height={300}>
                                            <AreaChart data={nasdaq}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="DATE" />
                                                <YAxis type="number" domain={['auto', 'auto']} />
                                                <Tooltip />
                                                <Area type="monotone" dataKey="CLOSE" stroke="#66ff33" fill="#99ff99" />
                                            </AreaChart>
                                        </ResponsiveContainer>

                                        <ResponsiveContainer width="100%" height={300}>
                                            <BarChart data={nasdaq} margin={{ left: 60 }}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="DATE" />
                                                <YAxis domain={['auto', 'auto']} hide={true} >
                                                    <Label
                                                        style={{
                                                            textAnchor: "middle",
                                                            fontSize: "130%",
                                                            fill: "white",
                                                        }}
                                                        angle={270}
                                                        value={"DATE (ft.)"}
                                                    />
                                                </YAxis>
                                                <Tooltip />
                                                <Bar dataKey="VOLUME" fill="#70db70" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </Tab>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-3 my-3">
                        <div className="card shadow-sm">
                            <div className="card-body" style={{ maxHeight: '85vh', overflowY: 'scroll' }}>
                                <Tabs defaultActiveKey="Most Active" id="tab-stocks">
                                    <Tab eventKey="Most Active" title="Most Active" justify>
                                        <table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Symbol</th>
                                                    <th scope="col">Price</th>
                                                    <th scope="col">Change</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {dayActive.map((stock) => (
                                                    <tr key={stock[0]}>
                                                        <td>{stock[0]}</td>
                                                        <td>${stock[2]}</td>
                                                        <td>{(stock[3] > 0) ? <span style={{ color: 'green' }}>{stock[3]}%</span> : <span style={{ color: 'red' }}>{stock[3]}%</span>}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </Tab>
                                    <Tab eventKey="Top Today" title="Top Today">
                                        <br/>
                                        <Tabs defaultActiveKey="Gainers" id="tab-gainers-losers" justify>
                                            <Tab eventKey="Gainers" title="Gainers">
                                                <table className="table table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Symbol</th>
                                                            <th scope="col">Price</th>
                                                            <th scope="col">Change</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {dayGainers.map((stock) => (
                                                            <tr key={stock[0]}>
                                                                <td>{stock[0]}</td>
                                                                <td>${stock[2]}</td>
                                                                <td>{(stock[3] > 0) ? <span style={{ color: 'green' }}>{stock[3]}%</span> : <span style={{ color: 'red' }}>{stock[3]}%</span>}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </Tab>
                                            <Tab eventKey="Losers" title="Losers">
                                                <table className="table table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Symbol</th>
                                                            <th scope="col">Price</th>
                                                            <th scope="col">Change</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {dayLosers.map((stock) => (
                                                            <tr key={stock[0]}>
                                                                <td>{stock[0]}</td>
                                                                <td>${stock[2]}</td>
                                                                <td>{(stock[3] > 0) ? <span style={{ color: 'green' }}>{stock[3]}%</span> : <span style={{ color: 'red' }}>{stock[3]}%</span>}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </Tab>
                                        </Tabs>
                                    </Tab>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default HomePage;
