import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import io from 'socket.io-client'

import './Main.css'
import api from '../../services/api'

import { logo, dislike, like, itsAMatch } from '../../assets'

const API_URL = 'http://localhost:3333'

export default function Main({ match }) {
    const [users, setUsers] = useState([])
    const [matchDev, setMatchDev] = useState(null)

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

    useEffect(() => {
        const socket = io(API_URL, {
            query: { user: loggedUserId },
        })

        socket.on('match', dev => {
            setMatchDev(dev)
        })
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

    function renderMatch() {
        return (
            <div className='match-container'>
                <img src={itsAMatch} alt='It"s a match' />
                <img className='avatar' src={matchDev.avatar} alt='' />
                <strong> {matchDev.name} </strong>
                <p>{matchDev.bio}</p>
                <button type='button' onClick={() => setMatchDev(null)}>
                    FECHAR
                </button>
            </div>
        )
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

            {matchDev && renderMatch()}
        </div>
    )
}
