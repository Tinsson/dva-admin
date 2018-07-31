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

export function AdminList(params){
    return request('/backend/admin/list', {
        method: 'GET',
        body: params
    })
}