import { useState, useEffect } from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { BiTrash, BiLike } from 'react-icons/bi';
import { ImCross } from 'react-icons/im';
import { MdDone } from 'react-icons/md';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type Props = {
    id: string,
    content: string,
    author: string,
    likes: string[]
}

function Todo({ id, author, content, likes }: Props) {
    const navigate = useNavigate();
    const [user, setUser] = useState<string>('');
    const [IsEditing, SetIsEditing] = useState<boolean>(false);
    const [EditedPost, SetEditedPost] = useState<string>('');
    const [Liked, setLiked] = useState<boolean>();
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
        setLiked(likes.includes(user));
    }, [])
    const handleEdit   = async():Promise<void> => await axios.put(`http://localhost:5000/api/posts/${id}`, { content: EditedPost }, config);
    const handleDelete = async():Promise<void> => await axios.delete(`http://localhost:5000/api/posts/${id}`, config);
    const handleLike   = async():Promise<void> => {
        setLiked(true)
        await axios.put(`http://localhost:5000/api/posts/like/${id}`, {}, config);
        
    }
    const handleUnLike = async():Promise<void> => {
        setLiked(false)
        await axios.put(`http://localhost:5000/api/posts/unlike/${id}`, {}, config);
        
    }
    const handleLikes  = async():Promise<void> => {
        if(Liked) {
            await handleUnLike();
        } else {
            await handleLike();
        }
    } 
    return (
        <div className="flex flex-row justify-between m-4">
            <div className="flex flex-col w-96">
                {id}
                <strong className="text-xl"> { author } </strong>
                {IsEditing ? (
                    <input type="text" placeholder="Edit" onChange={e => SetEditedPost(e.target.value)}
                    className="p-[5px] border rounded-md text-black focus:outline-none focus:ring-1 focus:ring-blue-600"
                    defaultValue={content} />
                ) : (
                    <p> { content } </p>
                )}
            </div>
            {user == author ? (
                <div className="flex flex-row justify-around p-2 items-center">
                    {
                        IsEditing ? (
                            <>
                                <MdDone onClick={() => {
                                    SetIsEditing(false);
                                    handleEdit();
                                    navigate(0);
                                }}
                                className="text-4xl text-white bg-green-500 p-2 duration-150 ease-in-out hover:bg-green-400" />                                
                                <ImCross onClick={() => SetIsEditing(false)}
                                className="text-4xl m-2 text-white bg-rose-500 p-2 duration-150 ease-in-out hover:bg-rose-400" />
                            </>
                        ) : (
                            <>
                                <div onClick={() => handleLikes()}
                                    className={`${Liked ? 'bg-blue-900' : 'bg-white-900'}
                                    inline-flex text-2xl w-20 p-2 duration-150 ease-in-out hover:scale-110`}>
                                    <BiLike  />
                                    <sub className="text-sm">{Liked ? 'Liked' : 'Like'}</sub>
                                </div>
                                <FiEdit2 onClick={() => SetIsEditing(true)} 
                                className="text-4xl m-2 text-black bg-yellow-500 p-2 duration-150 ease-in-out hover:bg-yellow-400" />
                            </>
                        )
                    }
                    <BiTrash className="text-4xl bg-red-900 p-2 duration-150 ease-in-out hover:bg-red-800"
                    onClick={() => {handleDelete();navigate(0)}} />
                </div>                
            ) : null}
        </div>
    )
}

export default Todo