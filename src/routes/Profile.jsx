import React from 'react'
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    
    const auth = getAuth();
    const navigate = useNavigate();

    const onLogoutClick = () => {
        signOut(auth).then(() => {
        // Sign-out successful.
            alert("로그아웃 되었습니다.")
            navigate("/")
        }).catch((error) => {
        // An error happened.
            console.log(error);
        });
    }
  return (
    <button onClick={onLogoutClick}>Logout</button>
  )
}

export default Profile