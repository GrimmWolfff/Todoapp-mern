import { useState, useEffect } from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { BiTrash, BiLike } from 'react-icons/bi';
import { ImCross } from 'react-icons/im';
import { MdDone } from 'react-icons/md';
import axios from 'axios';

type Props = {
    id: string,
    content: string,
    author: string
}

function Todo({ id, author, content, likes }: Props) {
    const [user, setUser] = useState<string>('');
    const [IsEditing, SetIsEditing] = useState<boolean>(false);
    const [EditedPost, SetEditedPost] = useState<string>('');
    const config = {
        headers: {
            'Content-Type':'application/json',
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
    }

    useEffect(() => {
        const getUser = async () => {
            const { data } = await axios.get('http://localhost:5000/api/auth/getuser', config);
            setUser(data.username);
        }
        getUser();
    })
    const handleEdit = async(event: HTMLInputEvent):Promise<void> => {
        if(event.key == 'Enter') await axios.put('http://localhost:5000/api/posts/${id}', { content: EditedPost }, config);
    }

    const handleDelete = async():Promise<void> => await axios.delete(`http://localhost:5000/api/posts/${id}`, config)
    const handleLike = async():Promise<void> => await axios.put(`http://localhost:5000/api/posts/like/${id}`, config);
    const handleUnLike = async():Promise<void> => await axios.put(`http://localhost:5000/api/posts/unlike/${id}`, config);
    

    interface HTMLInputEvent extends Event {
        target: HTMLInputElement & EventTarget;
        key: String
    }

    return (
        <div className="flex flex-row justify-between m-4">
            <div className="flex flex-col w-96">
                {id}
                <strong className="text-xl"> { author } </strong>
                {IsEditing ? (
                    <input type="text" placeholder="Edit" onChange={e => SetEditedPost(e.target.value)}
                    className="p-[5px] border rounded-md text-black focus:outline-none focus:ring-1 focus:ring-blue-600"
                    defaultValue={content} onKeyDown={e => handleEdit(e)} />
                ) : (
                    <p> { content } </p>
                )}
            </div>
            {user == author ? (
                <div className="flex flex-row p-2 items-center">
                    {
                        IsEditing ? (
                            <>
                                <MdDone onClick={() => SetIsEditing(false)}
                                className="text-4xl text-white bg-green-500 p-2 duration-150 ease-in-out hover:bg-green-400" />                                
                                <ImCross onClick={() => SetIsEditing(false)}
                                className="text-4xl m-2 text-white bg-rose-500 p-2 duration-150 ease-in-out hover:bg-rose-400" />
                            </>
                        ) : (
                            <>
                                <BiLike onClick={() => handleLike()}
                                className={`${likes.includes(user) ? 'text-blue' : 'text-white'}
                                text-4xl m-2 p-2 duration-150 ease-in-out hover:scale-125`} />
                                <FiEdit2 onClick={() => SetIsEditing(true)} 
                                className="text-4xl m-2 text-black bg-yellow-500 p-2 duration-150 ease-in-out hover:bg-yellow-400" />
                            </>
                        )
                    }
                    <BiTrash className="text-4xl bg-red-900 p-2 duration-150 ease-in-out hover:bg-red-800"
                    onClick={() => handleDelete()} />
                </div>                
            ) : null}
        </div>
    )
}

export default Todo