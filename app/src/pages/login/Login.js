import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import {
    KeyboardAvoidingView,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    Platform,
} from 'react-native'

import { logo } from '../../assets'
import { DevService } from '../../services/dev'

const IS_IOS_DEVICE = Platform.OS === 'ios'

//TODO: Add <ScrollView keyboardShouldPersistTaps=“handled”>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
    },

    input: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#ddd',
        marginTop: 20,
        paddingHorizontal: 15,
    },

    button: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#DF4723',
        borderRadius: 4,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
})
