import './App.css';
import {useState, useEffect} from 'react'
import {db, auth} from '../firebase-config'
// peter - changed - 11/27/2022
import {collection, doc, setDoc, getDoc} from 'firebase/firestore'

import {createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword} from 'firebase/auth'
import Data from './data'

function App() {

  // firestore stuff
  const [accounts, setAccounts] = useState([])

  // peter - changed - 11/27/2022
  // const usersCollectionRef = collection(db, "users")

  // auth stuff
  const [registerEmail, setregisterEmail] = useState("")
  const [registerPassword, setregisterPassword] = useState("")
  const [loginEmail, setloginEmail] = useState("")
  const [loginPassword, setloginPassword] = useState("")
  const [currentUser, setcurrentUser] = useState({})

  onAuthStateChanged(auth, (loggedin) => {
    setcurrentUser(loggedin)
  })
  
  // create new user
  const register = async () => {
    try{
      // peter - changed - 11/27/2022
      const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword).then(async(userRec) => {
        const userInfo = userRec.user;
        await setDoc(doc(db, "users", userInfo.uid), {
          email: registerEmail,
          password: registerPassword,
          picked: []
        })
      })
      // peter - changed - 11/27/2022
      //createAccount()
    } catch (error) {
      console.log(error.message)
    }
  }

  const login = async () => {
    try{
      // const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      // get the user data
      const docRef = doc(db, "users", user.user.uid)
      const docSnap = await getDoc(docRef)
      console.log(docSnap._document.data.value.mapValue.fields.picked.arrayValue.values[0])
      console.log(user.user.uid)

    } catch (error) {
      console.log(error.message)
    }
  }

  const logout = async () => {
    await signOut(auth)
  }

// peter - changed - 11/27/2022 - createAccount
// ///  stuff after this line is database
//   const createAccount = async() => {
//     await addDoc(usersCollectionRef, {email: registerEmail, password: registerPassword, picked: []})
//   }



  // useEffect(() => {
  //   const getUsers = async () => {
  //     const data = await getDocs(usersCollectionRef)
  //     setAccounts(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
  //   }
  //   getUsers()
  // }, [])

  
  // const getInfo = async () => {
  //   const data = await getDocs(usersCollectionRef)
  //   console.log(data.docs)
  // }

  return (
    <div>
      <h1>Hello world</h1>
      
      <div>
        <h3>Register user</h3>
        <input placeholder="email" onChange={(e) => {setregisterEmail(e.target.value)}}/>
        <input placeholder="password" onChange={(e) => {setregisterPassword(e.target.value)}}/>
        <button onClick={register}>Create user</button>
      </div>

      <div>
        <h3>Login user</h3>
        <input placeholder="email" onChange={(e) => {setloginEmail(e.target.value)}}/>
        <input placeholder="password" onChange={(e) => {setloginPassword(e.target.value)}}/>
        <button onClick={login}>Login</button>
      </div>

      <h4>User logged in: {currentUser?.email}</h4>

      <button onClick={logout}>Sign Out</button>

      <Data />

    </div>
    
  );
}

export default App;
