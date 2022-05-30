import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CreatePost from './CreatePost';
import Todo from './Todo';

export default function Todos() {
    const navigate = useNavigate();
    const [Posts, setPosts] = useState<Post[]>([]);
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if(!token) {
            navigate('/login');
        }
        async function getPosts(){
            const config = {
                headers: {
                    'Content-Type':'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const { data } = await axios.get('http://localhost:5000/api/posts', config)
                setPosts(data.posts);
            } catch (error) {
                console.log('Error is', error);
            }
        }
        getPosts();
    }, [])
    type Post = {
        _id: string,
        content: string,
        author: string,
        likes: string[]
    }
    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center bg-gray-700 text-white">
            <CreatePost />
            <div className="flex flex-col justify-center">
                {Posts.map((post:Post, idx:number) => (
                    <Todo key={idx} id={post._id} content={post.content} author={post.author} likes={post.likes} />
                ))}
            </div>
        </div>
    )
}