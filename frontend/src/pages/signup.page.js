import { Link } from 'react-router-dom';

import SignUpCard from "../components/SignUpCard.component";

import StockinatorWhite from '../static/StonkinatorWhite.png'

function SignUpPage() {
    return (
        <>
            <div className="d-flex justify-content-center align-items-center text-white" style={{ backgroundColor: "#070e18", minHeight: "100vh" }}>
                <Link to="/"  className="top-0 position-absolute mt-3" >
                    <img src={StockinatorWhite} alt="Stockinator"  style={{ minWidth: "200px", width: "40vw", maxWidth: "500px" }} />
                </Link>
                <div className="bottom-0 ">
                <SignUpCard/>
                <footer className="text-white text-center position-relative bottom-0">
                    <div className="card text-white text-center " style={{ borderRadius: "30px 30px 0px 0px", borderColor: "transparent", backgroundColor: "#000000", maxWidth: "100vw" , fontSize: "0.7rem" }} >
                        &nbsp;This website uses cookies to store session data.&nbsp;
                        <br />
                        &nbsp;&nbsp;&nbsp;By continuing to use this website, you consent to our use of cookies.&nbsp;&nbsp;&nbsp;
                    </div>
                </footer>
                </div>
            </div>
        </>
    );
}
export default SignUpPage;



