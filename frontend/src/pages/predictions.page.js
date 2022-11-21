import axios from "axios";
import { useState, useEffect } from "react";

import { HomeNavbar } from '../components'

function PredictionsPage() {

    const [predictions, setPredictions] = useState(null);

    useEffect(() => {
        axios.get("/stocks/predictions", { withCredentials: true })
            .then((response) => {
                if (!response.error) {
                    setPredictions(response.data.data.predictions)
                }
            })
    }, [])
    return (
        <>
            <HomeNavbar />
            <div style={{ marginTop: "55px" }}>
                <div className="mx-3 my-3">
                    <h1>Past Predictions</h1>
                    <div className="row">
                        {predictions && predictions.map((prediction) => (
                            <div className="col-12 col-md-4">
                                <div className="card m-2">
                                    <div className="card-body">
                                        <h5 className="card-title">{prediction.ticker}</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">{prediction.date}</h6>
                                        {prediction.predictions && prediction.dates && prediction.predictions.map((val, index) => (
                                            <>
                                                <span className="card-text"><b>{prediction.dates[index]}</b> : {val}</span><br/>
                                            </>
                                        ))}
                                    </div>
                                    <div className="card-footer">
                                        <small className="text-muted">RMSE: {prediction.rmse}</small>
                                </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default PredictionsPage;
