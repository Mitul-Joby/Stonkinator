import axios from "axios";
import { useDispatch } from 'react-redux'
import { signOut } from '../redux/features/userSlice'

function SignOutButton() {
    const dispatch = useDispatch()

    const signOutRequest = async (e) => {
        e.preventDefault();
        await axios.get('/account/signout').then((response) => {
            dispatch(signOut())
            window.location.href = "/"
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <>
            <div className="btn btn-outline-light mx-2" onClick={signOutRequest}>Sign Out</div>
        </>
    );
}

export default SignOutButton;