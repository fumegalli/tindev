import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import {
    KeyboardAvoidingView,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    Platform,
} from 'react-native'

import { logo } from '../../assets'
import { DevService } from '../../services/dev'
import styles from './login.style'

const IS_IOS_DEVICE = Platform.OS === 'ios'

export default function Login({ navigation }) {
    const [username, setUsername] = useState('')

    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if (user) {
                navigation.navigate('Main', { id: user })
            }
        })
    }, [])

    async function handleLogin() {
        const userId = await DevService.createDev(username)

        navigation.navigate('Main', { id: userId })
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior='padding'
            enabled={IS_IOS_DEVICE}
        >
            <Image source={logo} />

            <TextInput
                style={styles.input}
                autoCapitalize='none'
                autoCorrect={false}
                placeholder='Digite seu usuário no Github'
                value={username}
                onChangeText={setUsername}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}
