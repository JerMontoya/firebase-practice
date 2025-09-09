import React from "react";
import "./App.css";
import { auth } from "./firebase/init";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

function App() {
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [authLoading, setAuthLoading] = React.useState(false);

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setTimeout(() => {

        setLoading(false);
        if (user) {
          setUser(user);
        } else {
          setUser({});
        }
      }, 2000)
    });
  }, []);

  function register() {
    createUserWithEmailAndPassword(auth, "email@email.com", "test123")
      .then((user) => {
        setUser(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function login() {
    setAuthLoading(true);
    signInWithEmailAndPassword(auth, "email@email.com", "test123")
      .then(({ user }) => {
        setTimeout(() => {
          setUser(user);
          setAuthLoading(false);
        }, 1000);
      })
      .catch((error) => {
        console.log(error.message);
        setAuthLoading(false);
      });
  }

  function logout() {
    signOut(auth);
    setUser({});
  }


  return (
    <div className="App">
      {authLoading ? (
        <div className="App__container">
        <div className="skeleton skeleton-button"></div>
        <div className="skeleton skeleton-button"></div>
      </div>
      ) : user?.email ? (
        <>
          <div className="logout__container">
            <button className="user__logout" onClick={logout}>
              {user.email[0].toUpperCase()}
            </button>
          </div>
        </>
      ) : (
        <>
        <div className="logout__container">

          <button className="btn" onClick={register}>Register</button>
          <button className="btn" onClick={login}>Login</button>
        </div>
        </>
      )}
    </div>
  );
}

export default App;
