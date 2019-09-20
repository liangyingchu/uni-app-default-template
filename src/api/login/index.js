import request from '@/utils/request'

export function login(payload) {
    return request('loginURL', payload, 'POST')
}