import axios from "axios";
import { useState, useEffect } from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
    xtraLarge: {
        breakpoint: { max: 4000, min: 2000 },
        items: 5,
    },
    largerDesktop: {
        breakpoint: { max: 2000, min: 1500 },
        items: 4
    },
    desktop: {
        breakpoint: { max: 1500, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

function StockCarousel() {
    const [dayGainers, setDayGainers] = useState([])
    const [dayLosers, setDayLosers] = useState([])
    const [dayActive, setDayActive] = useState([])

    useEffect(() => {
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

    return <>
        {dayActive ?
            <div className="my-2">
                <h3 className="text-muted">Most Active</h3>
                <Carousel
                    draggable={false}
                    responsive={responsive}
                    centerMode={true}
                    infinite={true}
                    autoPlay={true}
                    autoPlaySpeed={3000}
                    customTransition=" transform 750ms ease-in-out"
                >
                    {dayActive ? dayActive.map((stock) => (
                        <div className="card mx-2 bg-dark text-white" id={stock[0]}>
                            <div className="card-body">
                                <h5 className="card-title">{stock[0]}</h5>
                                <h6 className="card-subtitle mb-2 text-muted" style={{ height: "2rem" }}>{stock[1]}</h6>
                                <p style={{ height: "0.5rem" }}>
                                    <b> ${stock[2]} </b>
                                    {stock[3] > 0 ?
                                        <>
                                            <span className="text-success ms-2">+{stock[3]}</span>
                                            <span className="badge bg-success ms-2">{stock[4]}%</span>
                                        </>
                                        :
                                        <>
                                            <span className="text-danger ms-2">{stock[3]}</span>
                                            <span className="badge bg-danger ms-2">{stock[4]}%</span>
                                        </>}
                                </p>
                            </div>
                        </div>
                    )) : null}
                </Carousel>
            </div>
            : null}
        {dayGainers ?
            <div className="my-2">
                <h3 className="text-muted">Day Gainers</h3>
                <Carousel
                    draggable={false}
                    responsive={responsive}
                    centerMode={true}
                    infinite={true}
                    autoPlay={true}
                    autoPlaySpeed={3000}
                    partialVisible={false}
                    customTransition=" transform 750ms ease-in-out"
                >
                    {dayGainers ? dayGainers.map((stock) => (
                        <div className="card mx-2 bg-dark text-white" id={stock[0]}>
                            <div className="card-body">
                                <h5 className="card-title">{stock[0]}</h5>
                                <h6 className="card-subtitle mb-2 text-muted" style={{ height: "2rem" }}>{stock[1]}</h6>
                                <p style={{ height: "0.5rem" }}>
                                    <b> ${stock[2]} </b>
                                    <span className="text-success ms-2">+{stock[3]}</span>
                                    <span className="badge bg-success ms-2">{stock[4]}%</span>
                                </p>
                            </div>
                        </div>
                    )) : null}
                </Carousel>
            </div>
            : null}
        {dayLosers ?
            <div className="my-2">
                <h3 className="text-muted">Day Losers</h3>
                <Carousel
                    draggable={false}
                    responsive={responsive}
                    centerMode={true}
                    infinite={true}
                    autoPlay={true}
                    autoPlaySpeed={3000}
                    customTransition=" transform 750ms ease-in-out"
                >
                    {dayLosers ? dayLosers.map((stock) => (
                        <div className="card mx-2 bg-dark text-white" id={stock[0]}>
                            <div className="card-body">
                                <h5 className="card-title">{stock[0]}</h5>
                                <h6 className="card-subtitle mb-2 text-muted" style={{ height: "2rem" }}>{stock[1]}</h6>
                                <p style={{ height: "0.5rem" }}>
                                    <b> ${stock[2]} </b>
                                    <span className="text-danger ms-2">{stock[3]}</span>
                                    <span className="badge bg-danger ms-2">{stock[4]}%</span>
                                </p>
                            </div>
                        </div>
                    )) : null}
                </Carousel>
            </div>
            : null}
    </>;
}

export default StockCarousel;