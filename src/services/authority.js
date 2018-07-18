import request from '../utils/request'

export function PermissionList(params){
    return request('/backend/permission/list', {
        method: 'GET',
        body: params
    })
}

export function PermissionEdit(params){
    return request('/backend/permission/edit', {
        method: 'POST',
        body: params
    })
}