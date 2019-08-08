import React from 'react'
import { View, StyleSheet, Image } from 'react-native'

import { logo } from '../assets'

export default function Login() {
    return (
        <View style={styles.container}>
            <Image source={logo} />
        </View>
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
})
