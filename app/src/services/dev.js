import api from './api'
import AsyncStorage from '@react-native-community/async-storage'

export class DevService {
    static async createDev(username) {
        const { data } = await api.post('/devs', { username })

        const { _id } = data

        await AsyncStorage.setItem('user', _id)

        return _id
    }

    static async getDevs(user) {
        const { data } = await api.get('/devs', {
            headers: { user },
        })

        return data
    }

    static async like(loggedUserId, userIdToLike) {
        await api.post(`/devs/${userIdToLike}/likes`, null, {
            headers: { user: loggedUserId },
        })
    }

    static async dislike(loggedUserId, userIdToDislike) {
        await api.post(`/devs/${userIdToDislike}/dislikes`, null, {
            headers: { user: loggedUserId },
        })
    }
}
