import './App.css';
import {useState, useEffect} from 'react'
import {db, auth} from './firebase-config'
import {collection, getDocs, addDoc} from 'firebase/firestore'
import {createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword} from 'firebase/auth'
import Data from './data'

function App() {

  // firestore stuff
  const [accounts, setAccounts] = useState([])
  const usersCollectionRef = collection(db, "users")

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
      const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
      createAccount()
    } catch (error) {
      console.log(error.message)
    }
  }

  const login = async () => {
    try{
      const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    } catch (error) {
      console.log(error.message)
    }
  }

  const logout = async () => {
    await signOut(auth)
  }

///  stuff after this line is database
  const createAccount = async() => {
    await addDoc(usersCollectionRef, {email: registerEmail, password: registerPassword, picked: []})
  }

  // const getInfo = async () => {
  //   const data = await getDocs(usersCollectionRef)
  //   console.log(data.docs)
  // }

  return (
    <div>
      <h1>Hello world</h1>

     {/* make change this from list of accounts to list of fields for each user */}
      <div>{accounts.map((account) => {
        return (
        <div>
          <h3>Email: {account.email}</h3>
        </div>
        )
        })}
      </div>
      
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
