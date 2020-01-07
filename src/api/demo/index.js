import request from '@/utils/request'

export function getList() {
    return request('/demo/getList')
}