import React, { useState, useEffect } from 'react'
import { SafeAreaView, Image, View, Text, TouchableOpacity } from 'react-native'

import { logo, dislike, like } from '../../assets'
import { DevService } from '../../services/dev'
import AsyncStorage from '@react-native-community/async-storage'
import styles from './main.style'

export default function Main({ navigation }) {
    const id = navigation.getParam('id')
    const [users, setUsers] = useState([])

    useEffect(() => {
        async function loadUsers() {
            const response = await DevService.getDevs(id)

            setUsers(response)
        }

        loadUsers()
    }, [id])

    async function handleDislike() {
        const [{ _id: userIdToDislike }, ...rest] = users
        await DevService.dislike(id, userIdToDislike)

        setUsers(rest)
    }

    async function handleLike() {
        const [{ _id: userIdToLike }, ...rest] = users
        console.log(userIdToLike)
        console.log(id)

        await DevService.like(id, userIdToLike)

        setUsers(rest)
    }

    async function handleLogout() {
        await AsyncStorage.clear()

        navigation.navigate('Login')
    }

    function renderUsers() {
        return users.map((user, index) => (
            <View
                style={[styles.card, { zIndex: users.length - index }]}
                key={user._id}
            >
                <Image
                    style={styles.avatar}
                    source={{
                        uri: user.avatar,
                    }}
                />
                <View style={styles.footer}>
                    <Text style={styles.name}>{user.name}</Text>
                    <Text style={styles.bio} numberOfLines={3}>
                        {user.bio}
                    </Text>
                </View>
            </View>
        ))
    }
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={handleLogout}>
                <Image style={styles.logo} source={logo} />
            </TouchableOpacity>

            <View style={styles.cardsContainer}>
                {users.length > 0 ? (
                    renderUsers()
                ) : (
                    <Text style={styles.empty}> Acabou :(</Text>
                )}
            </View>
            {/* {TODO: Implementar arrastar pro lado como like e dislike} */}
            {users.length > 0 && (
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleDislike}
                    >
                        <Image source={dislike} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleLike}
                    >
                        <Image source={like} />
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    )
}
