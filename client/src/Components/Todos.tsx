import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CreatePost from './CreatePost';
import Todo from './Todo';
import HeroBackground from './Background';

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
        <div className="w-full flex flex-col items-center text-white">
            <HeroBackground />
            <CreatePost />
            <div className="z-50 flex flex-col justify-center">
                {Posts.map((post:Post, idx:number) => (
                    <Todo key={idx} id={post._id} content={post.content} author={post.author} likes={post.likes} />
                ))}
            </div>
        </div>
    )
}