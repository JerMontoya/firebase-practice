import React from "react";
import "./App.css";
import { auth, db } from "./firebase/init";
import { collection, addDoc, getDocs, getDoc, doc, query, where, updateDoc, deleteDoc } from "firebase/firestore";
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

  async function updatePost() {
    const hardCodedID = "J3f2m1hXx2SfoAjdtaUP"
    const postRef = doc(db, "posts", hardCodedID);
    const post = await getPostsById(hardCodedID);
    const newPost = {
      ...post,
      title: "land a $400k job"
    };
    updateDoc(postRef, newPost);
  }

  function deletePost() {
    const hardCodedID = "J3f2m1hXx2SfoAjdtaUP"
    const postRef = doc(db, "posts", hardCodedID);
    deleteDoc(postRef);
  }

  function createPost() {
    const post = {
      title: "Land a $500k job",
      description: "Finish FES",
      uid: user.uid,
    };
    addDoc(collection(db, "posts"), post)
  }

  async function getAllPosts() {
    const { docs } = await getDocs(collection(db, "posts"));
    const posts = docs.map(elem => ({...elem.data(), id: elem.id}));
  }

 async function getPostsById(id) {
    const postRef = doc(db, "posts", id);
    const postSnap = await getDoc(postRef);
    return postSnap.data();
  }

  async function getPostByUid() {
    const postCollectioRef = await query(
      collection(db, "posts"),
      where("uid", "==", user.uid)
    );
    const { docs } = await getDocs(postCollectioRef);
  }

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
      <button onClick={createPost}>Create Post</button>
      <button onClick={getAllPosts}>Get all posts</button>
      <button onClick={getPostsById}>Get post by ID</button>
      <button onClick={getPostByUid}>Get post by UID</button>
      <button onClick={updatePost}>Update Post</button>
      <button onClick={deletePost}>Delete Post</button>
    </div>
  );
}

export default App;
