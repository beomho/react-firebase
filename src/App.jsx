import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import AppRouter from './components/Router'
import { authService } from './firebase'
import { getAuth, onAuthStateChanged } from "firebase/auth";



function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null)
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsLoggedIn(true);
      setUserObj(user.uid);
    } else {
      setIsLoggedIn(false);
    }
    setInit(true);
  });

  return (
    <>
      {
        init ? <AppRouter isLoggedIn={isLoggedIn}
        userObj={userObj}></AppRouter> : "회원정보 확인중..."
      }
    </>

  )
}

export default App
