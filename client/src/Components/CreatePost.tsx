import axios from 'axios';
import { useState } from 'react';

export default function CreatePost() {
    const [IsEmpty, setIsEmpty] = useState<boolean>(true);
    const [CurrentPost, setCurrentPost] = useState<string>('');
    const handlePostMoment = (e: HTMLInputEvent):void => {
        if(e.target.value) {
            setIsEmpty(false);
            setCurrentPost(e.target.value)
        } else {
            setIsEmpty(true)
        }
    }
    interface HTMLInputEvent extends Event {
        target: HTMLInputElement & EventTarget;
    }
    const CreateNewPost = async () => {
        const token = localStorage.getItem('authToken')
        const config = {
            headers: {
                "Content-Type":"application/json",
                Authorization: `Bearer ${token}`
            }
        }
        await axios.post('http://localhost:5000/api/posts', {content: CurrentPost}, config);
    }
    return (
        <form className="w-1/3 m-10 z-50 sticky">
            <label className="block" htmlFor="Post">Start a Post</label>
            <div className="inline-flex justify-around w-full">
                <input type="text" placeholder="Post" onChange={(e) => handlePostMoment(e)}
                className="w-2/3 px-4 py-2 border rounded-md text-black focus:outline-none focus:ring-1 focus:ring-blue-600"/>
                &nbsp;&nbsp;
                <button onClick={() => CreateNewPost()}
                className={`${IsEmpty ? 'bg-gray-400':'text-white bg-blue-600 hover:bg-blue-900'} w-1/3 text-center px-6 py-2 rounded-lg`}>Finish</button>
            </div>
        </form>
    )
}