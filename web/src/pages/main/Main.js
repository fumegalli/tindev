import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import './Main.css'
import api from '../../services/api'

import { logo, dislike, like } from '../../assets'

export default function Main({ match }) {
    const [users, setUsers] = useState([])
    const { id: loggedUserId } = match.params

    useEffect(() => {
        async function loadUsers() {
            const response = await api.get('/devs', {
                headers: { user: loggedUserId },
            })

            setUsers(response.data)
        }

        loadUsers()
    }, [loggedUserId])

    async function handleDislike(id) {
        await api.post(`/devs/${id}/dislikes`, null, {
            headers: { user: loggedUserId },
        })

        setUsers(users.filter(user => user._id !== id))
    }

    async function handleLike(id) {
        await api.post(`/devs/${id}/likes`, null, {
            headers: { user: loggedUserId },
        })

        setUsers(users.filter(user => user._id !== id))
    }

    function renderUsers() {
        return users.map(user => (
            <li key={user._id}>
                <img src={user.avatar} alt={user.name} />
                <footer>
                    <strong> {user.name} </strong>
                    <p> {user.bio} </p>
                </footer>

                <div className='buttons'>
                    <button
                        type='button'
                        onClick={() => handleDislike(user._id)}
                    >
                        <img src={dislike} alt='dislike' />
                    </button>
                    <button type='button' onClick={() => handleLike(user._id)}>
                        <img src={like} alt='like' />
                    </button>
                </div>
            </li>
        ))
    }

    return (
        <div className='main-container'>
            <Link to='/'>
                <img src={logo} alt='Tindev' />
            </Link>
            {users.length > 0 ? (
                <ul>{renderUsers()}</ul>
            ) : (
                <div className='empty'> Acabou :( </div>
            )}
        </div>
    )
}
