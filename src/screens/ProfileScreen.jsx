import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../redux/actions/userActions';
import FormContainer from '../components/FormContainer';
import { USER_UPDATE_PROFILE_RESET } from '../redux/constants/userConstants';


const ProfileScreen = ({ }) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState(null)
    let location = useLocation();
    const dispatch = useDispatch();
    const userDetails = useSelector(state => state.userDetails);
    const {loading , error, user} = userDetails;
    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;
    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const {success} = userUpdateProfile;
    const navigate = useNavigate();

    const redirect = location.search ? location.search.split('=')[1] : '/'
    const submitHandler = (e) => {
        e.preventDefault();
        if(password != confirmPassword){
            setMessage("Password do not match")
        }else{
           dispatch(updateUserProfile({id:user._id, name, email, password}))
        }
    }

    useEffect(() => {
        if(!userInfo){
            navigate("/login")
        }else{
            if(!user || !user.name || success){
                dispatch({type:USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
            }else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, userInfo, user, success])
    return (
        <div>
            <FormContainer>
                <h1>User Profile</h1>
                {error && <Message variant="danger">{error}</Message> }
                {message && <Message variant="danger">{message}</Message> }
                {success && <Message variant="success">Profile updated</Message> }
                {loading && <Loader/>}
                <form onSubmit={submitHandler} action="" className="mt-4">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input id='name' name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input id='email' name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input id='password' name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirm">Confirm password</label>
                        <input id='confirm' name="confirm" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm your password" className="form-control" />
                    </div>
                    <button className="btn btn-primary mt-3">Update</button>
                </form>

            </FormContainer>
        </div>
    )
}

export default ProfileScreen