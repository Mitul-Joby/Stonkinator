import Nav from 'react-bootstrap/Nav';

import { LandNavbar } from '../components/'

import network from '../static/network.jpg'
import predictions from '../static/predictions.png'
import StockinatorWhite from '../static/StonkinatorWhite.png'

function LandPage() {
    return (
        <>
            <LandNavbar />
            <div style={{ maxWidth: "100vw" }}>
                <section id="home" className="d-flex justify-content-center align-items-center" style={{ height: '100vh', backgroundImage: `url(${network})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <div className="d-flex flex-column align-items-center">
                        <div className="d-flex flex-column align-items-center" style={{ width: '80%' }}>
                            <img src={StockinatorWhite} alt="Stockinator" style={{ width: '100%' }} />
                            <div className="text-white text-center my-3" style={{ fontSize: '1.5rem' }}>
                                A tool to help you make better investment decisions by predicting the future of the stock market.
                            </div>
                        </div>
                        <div className="d-flex justify-content-around">
                            <Nav.Link href="#about" className="text-white text-center" >
                                <button className="btn btn-outline-light">LEARN MORE</button>
                            </Nav.Link>
                        </div>
                    </div>
                </section>

                <section id="about" className="d-flex" style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
                    <div className="ms-4 me-3 my-5">
                        <div className="mt-5" style={{ color: '#003f5c', fontSize: '2rem', fontWeight: 'bold', fontFamily: 'unset' }}>
                            <b><u>About Stonkinator</u></b>
                        </div>
                        <div className="d-flex flex-column">
                            <div className="p" style={{ fontSize: '1.1rem', textAlign: 'justify' }}>
                                Stock market prediction and analysis are some of the most difficult jobs to complete.
                                There are numerous causes for this, including market volatility and a variety of other dependent and independent variables that influence the value of a certain stock in the market.
                                These variables make it extremely difficult for any stock market expert to anticipate the rise and fall of the market with great precision.
                                <br />
                                <br />
                                However, with the introduction of Machine Learning and its strong algorithms, the most recent market research and Stock Market Prediction advancements have begun to include such approaches in analyzing stock market data.
                                <br />
                                <br />
                                Stonkinator aims to :
                                <ul>
                                    <li>Provide a platform for users to predict the future of the stock market.</li>
                                    <li>Provide a platform for users to analyze the stock market.</li>
                                    <li>Provide a platform for users to compare their predictions with the actual market.</li>
                                </ul>
                            </div>
                            <div className="p-2 d-flex justify-content-center">
                                <img src={predictions} alt="Predictions" style={{ width: '40%', minWidth: '300px' }} />
                            </div >
                            <div className="p flex-fill" style={{ fontSize: '1.1rem', textAlign: 'justify' }}>
                                <br />
                                The Stonkinator platform uses a Long Short-Term Memory (LSTM) model to predict the future of the stock market.
                                <br />
                                The LSTM model is a type of recurrent neural network that is used in deep learning because it is capable of learning order dependence in sequence prediction problems.
                                <br />
                                <ul>
                                    <li>
                                        The LSTM model is trained on historical data from yahoo finance.
                                    </li>
                                    <li>
                                        The model is then used to predict the future of the stock market.
                                    </li>
                                    <li>
                                        The model is then evaluated using the Root Mean Square Error (RMSE) metric.
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </section>
                <section id="disclaimer" className="d-flex text-white" style={{ minHeight: '30vh', backgroundColor: '#003f5c' }}>
                    <div className="ms-4 me-3 my-5">
                        <div className="mt-3" style={{ fontSize: '2rem', fontWeight: 'bold', fontFamily: 'unset' }}>
                            DISCLAIMER
                        </div>
                        <br />
                        <p style={{ fontSize: '1.1rem', textAlign: 'justify' }}>
                                The Content is for informational purposes only, you should not construe any such information or other material as legal, tax, investment, financial, or other advice.
                                This website, including but not limited to text, images, videos, spreadsheets, hyperlinks, and computer source code; is written and created solely for educational purposes and does not constitute a solicitation, recommendation, endorsement, to buy or sell any securities or other financial instruments in this or in in any other jurisdiction in which such solicitation or offer would be unlawful under the securities laws of such jurisdiction.
                        </p>
                    </div>
                </section>
                <div className="text-white text-center bottom-0 bg-black" style={{ maxWidth: "100vw"}} >
                    Copyright © Stonkinator 2022
                </div>
            </div>
        </>
    );
}

export default LandPage;