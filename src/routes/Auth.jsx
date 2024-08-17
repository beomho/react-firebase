import React, { useState } from 'react'
import {  
  getAuth
, createUserWithEmailAndPassword
, signInWithEmailAndPassword
, GoogleAuthProvider 
, signInWithPopup
} from "firebase/auth";


const Auth = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState('');

    const auth = getAuth();


    const onChange = (e) => {
        
        const { name, value } = e.target;

        if(name === "email"){
            setEmail(value);
        }else if(name === "password"){
            setPassword(value);
        }
    }

    const onSubmit = (e) =>{
        e.preventDefault();
        if(newAccount){
            //회원가입
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                setError(errorMessage);
            });
        }{
            //로그인
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                setError(errorMessage);
            });

        }
    }

    let toggleAccount = () => setNewAccount(prev => !prev);

    const onSocialClick = (e) => {
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            console.log(token, user)
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            
            console.log(errorCode, errorMessage);
        });
    }
  return (
    <div>
        <form onSubmit={onSubmit}>
            <input name="email" type="email" placeholder="Email" required
            value={email} onChange={onChange} />
            <input name="password" type="password" placeholder="password" required
            value={password} onChange={onChange} />
            <button>{newAccount ? "Create Account" : "Log in"}</button>
            {error}
        </form>
        <div onClick={toggleAccount}>
            {newAccount ? "Create Account" : "Log in"}
        </div>
        <hr/>
        <button name="google" onClick={onSocialClick}>구글 로그인</button>
    </div>
  )
}

export default Auth