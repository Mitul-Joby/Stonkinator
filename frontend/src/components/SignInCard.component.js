import axios from "axios";
import { useState } from "react";
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { signIn, signOut } from '../redux/features/userSlice'

function SignInCard() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null);
    const [passwordType, setPasswordType] = useState("password");
    const [signInUser, setSignInUser] = useState({ usernameEmail: "", password: "" });

    const dispatch = useDispatch()
  
    const signInRequest = async (e) => {
        e.preventDefault();

        await axios.post("/account/signin", signInUser).then(res => {
            console.log(res);
            if (res.data.authenticated) {
                dispatch(signIn(res.data.user));
                setErrorMessage(null);
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            } else {
                dispatch(signOut());
                setErrorMessage("An error occurred. Please try again.");
            }
        }).catch(err => {
            dispatch(signOut());
            console.log(err);
            if (err.response && err.response.data && err.response.data.message) {
                setErrorMessage(err.response.data.message);
            } else {
                setErrorMessage("An error occurred. Please try again.");
            }
        });
    }

    return (
        <div id="signInCard" className="text-black card shadow position-absolute top-50 start-50 translate-middle ml-5" style={{ width: "30%", minWidth: "300px",borderRadius: "30px" }}>
            <div className="card-body">
                <h2 className="card-title mb-1 fw-normal">Please Sign In</h2>
                <div className="card-text">
                    <form onSubmit={signInRequest}>
                        <br />
                        <div className="form-floating">
                            <input type="text" className="form-control" id="usernameEmail" required placeholder="name@example.com" value={ signInUser.usernameEmail } onChange={ (e) => setSignInUser({ ...signInUser, usernameEmail: e.target.value }) } />
                            <label htmlFor="usernameEmail">Username or Email Address</label>
                        </div>
                        <div className="form-floating input-group mb-2">
                            <input type={passwordType} className="form-control" id="password" required minLength="6" value={ signInUser.password } onChange={ (e) => setSignInUser({ ...signInUser, password: e.target.value }) } />
                            <label htmlFor="password">Password</label>
                            <button className="btn btn-outline-secondary" type="button" style={{ border:"1px solid #ced4da" }} 
                                onClick={() => { (passwordType === "password") ? setPasswordType("text") : setPasswordType("password"); }} >
                                {passwordType === "password" ? <i className="bi bi-eye" /> : <i className="bi bi-eye-slash" />}
                            </button>
                        </div>
                        {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
                        <button className="w-100 btn btn-lg btn-dark" type="submit">Sign In</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignInCard;