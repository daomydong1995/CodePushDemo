import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {
    const nav = useNavigation()
    return (
        <View style={styles.content}>
            <TouchableOpacity style={styles.btnNext} onPress={() => {
                nav.navigate('DEMO_CODEPUSH_SCREEN')
            }}>
                <Text style={styles.btnTitle}>Demo Code Push</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.btnSocket} onPress={() => {
                nav.navigate('DEMO_SOCKET_SCREEN')
            }}>
                <Text style={styles.btnTitle}>Demo Socket</Text>
            </TouchableOpacity> */}
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    btnNext: {
        marginBottom: 50,
        width: '40%',
        height: 40,
        backgroundColor: '#5856D6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnSocket: {
        marginBottom: 50,
        width: '40%',
        height: 40,
        backgroundColor: '#d9534f',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnTitle: {
        color: 'white'
    }
})
