import { login } from '@/api/login'

const user = {
    state: {
        token: uni.getStorageSync('TOKEN') || ''
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
            uni.setStorageSync('TOKEN', token)
        }
    },

    actions: {
        Login({ commit }, payload) {
            login(payload).then(data => {
                const { token } = data
                commit('SET_TOKEN', token)
            })
        }
    }
}

export default user
