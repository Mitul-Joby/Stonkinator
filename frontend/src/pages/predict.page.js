import axios from "axios";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { HomeNavbar, StockCarousel, responsive } from '../components'


function SearchPage() {
    const [search, setSearch] = useState("")
    const [error, setError] = useState(null)

    const [loading, setLoading] = useState(false)
    const [stock, setStock] = useState(null)
    const [stockData, setStockData] = useState(null)
    const [stockPrediction, setPrediction] = useState(null)

    const getStockData = () => {
        setLoading(true)
        axios.get(`/stocks/${search}`)
            .then((response) => {
                if (!response.data.error) {
                    let stockDict = {
                        name: response.data.stock,
                        company: response.data.company,
                        stats: response.data.stats,
                        price: response.data.price
                    }
                    setStock(stockDict)
                    setError(null)
                } else {
                    setStock(null)
                    setError("No stock found")
                }
            }).catch((error) => {
                setError("No stock found")
            })

        axios.post('/stocks/predict', {
            stock: search
        }).then((response) => {
            setLoading(false)
            if (!response.data.error) {
                setPrediction(response.data.prediction)
                let data = response.data.past60days
                let last = data[data.length - 1]
                data.push({
                    DATE: last.DATE,
                    PREDICTED: last.CLOSE
                })
                let preds = response.data.prediction.predictions
                let dates = response.data.prediction.dates
                dates.forEach((date, index) => {
                    data.push({
                        DATE: date,
                        PREDICTED: preds[index]
                    })
                })
                setStockData(data)
            }
        }).catch((error) => {
            setLoading(false)
        })
    }

    return (
        <div className="home-page" style={{ backgroundColor: '#f5f5f5', height: '100vh' }}>
            <HomeNavbar />
            <div className="mx-4" style={{ marginTop: '70px' }}>
                <div className="row">
                    <div className="col-12">
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Search for a stock" aria-label="Search for a stock" aria-describedby="button-addon2" value={search} onChange={(e) => setSearch(e.target.value)} />
                            <button className="btn btn-outline-secondary" type="submit" id="button-addon2" onClick={getStockData}>Search</button>
                        </div>
                    </div>

                    {error && <div className="col-12">
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    </div>
                    }

                    {(stockData) ? (
                        <div className="col-12">
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={stockData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="DATE" />
                                    <YAxis type="number" domain={['auto', 'auto']} />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dot={false} dataKey="CLOSE" stroke="#132639" activeDot={{ r: 8 }} />
                                    <Line type="monotone" dataKey="PREDICTED" stroke="#007bff" activeDot={{ r: 8 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    ) : null}

                    {(stock) ? (<>
                        <div className="col-12">
                            <div className="card mt-4">
                                <div className="card-body">
                                    <h4 className="card-title">Predictions for {stock.name}</h4>
                                    {loading ? <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div> : (stockPrediction) ? (
                                        <div>
                                            <h6 className="card-subtitle mb-2 text-muted">RMSE: {stockPrediction.rmse}</h6>
                                            <span className="card-text"><b>{stockPrediction.date}</b>: ${stockPrediction.predictions[0]}</span><br />
                                            <span className="card-text"><b>{stockPrediction.dates[1]}</b>: ${stockPrediction.predictions[1]}</span><br />
                                            <span className="card-text"><b>{stockPrediction.dates[2]}</b>: ${stockPrediction.predictions[2]}</span><br />
                                            <span className="card-text"><b>{stockPrediction.dates[3]}</b>: ${stockPrediction.predictions[3]}</span><br />
                                            <span className="card-text"><b>{stockPrediction.dates[4]}</b>: ${stockPrediction.predictions[4]}</span>
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="card mt-4">
                                <div className="card-body">
                                    <h4 className="card-title">{stock.name}</h4>
                                    <h6 className="card-subtitle mb-2 text-muted">Price: ${stock.price}</h6>
                                    <br />
                                    <h6 className="card-text">Industry: {stock.company.industry}</h6>
                                    <h6 className="card-text">Sector: {stock.company.sector}</h6>
                                    <p className="card-text" style={{ textAlign: 'justify' }}>
                                        {stock.company.longBusinessSummary}
                                    </p>
                                    <Carousel
                                        draggable={false}
                                        centerMode={true}
                                        responsive={responsive}
                                        infinite={true}
                                        autoPlay={true}
                                        autoPlaySpeed={3000}
                                        customTransition=" transform 750ms ease-in-out"
                                    >
                                        {stock.stats.map((stat, index) => (
                                            <div key={index} className="card mx-2 px-2 py-2" style={{ height: '3.5rem', width: 'auto', overflow: 'hidden' }}><b>{stat[0]} : {stat[1]}</b></div>
                                        ))}
                                    </Carousel>

                                </div>
                            </div>
                        </div>
                    </>) : null}

                    {(stock && stockData && stockPrediction) ? null : <StockCarousel />}
                </div>
            </div>
        </div >
    );
}

export default SearchPage;
