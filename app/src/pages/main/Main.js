import React, { useState, useEffect } from 'react'
import {
    SafeAreaView,
    Image,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'

import { logo, dislike, like } from '../../assets'
import { DevService } from '../../services/dev'
import AsyncStorage from '@react-native-community/async-storage'

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
//TODO: Colocar style em outro arquivo. Criar uma psta Main com a screen e o css
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    logo: {
        marginTop: 30,
    },

    cardsContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        maxHeight: 500,
    },

    card: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        margin: 30,
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
    },

    avatar: {
        flex: 1,
        height: 300,
    },

    footer: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },

    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },

    bio: {
        fontSize: 14,
        color: '#999',
        marginTop: 5,
        lineHeight: 18,
    },

    buttonsContainer: {
        flexDirection: 'row',
        marginBottom: 30,
    },

    button: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },

    empty: {
        alignSelf: 'center',
        color: '#999',
        fontSize: 24,
        fontWeight: 'bold',
    },
})
