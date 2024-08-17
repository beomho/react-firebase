import React, {useEffect, useState} from 'react'
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp, getDocs } from "firebase/firestore"; 
import Post from '../components/Post';

function Home(userObj) {
    const [post, setPost] = useState('');
    const [posts, setPosts] = useState([]);
    const getPosts = async () => {
        const querySnapshot = await getDocs(collection(db, "posts"));
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
            const postObj = {
                ...doc.data(),
                id:doc.id
            }
            setPosts((prev)=>[postObj, ...prev]);
        });
    }

    useEffect(() =>{
        getPosts();
    }, [])

    console.log(posts);

    const onChange = (e) => {
        const{target:{value}} = e;
        setPost(value);
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        try{
            // Add a new document with a generated id.
            const docRef = await addDoc(collection(db, "posts"), {
                post,
                date : serverTimestamp(),
                uid : userObj
            });
            console.log("Document written with ID: ", docRef.id);
            setPost('');
        }catch(e){
            console.log("error: ",e);
        }
        
    }
  return (
    <div>
        <form onSubmit={onSubmit}>
            <input type="text" value={post} placeholder="새 포스트를 입력하세요"
            onChange={onChange}/>
            <button type="submit">입력</button>
        </form>
        <hr/>
        <h3>Post List</h3>
        <ul>
            {
                posts.map(item=>(
                    <li key={item.id}>{item.post}</li>
                ))
            }
        </ul>
    </div>
  )
}

export default Home