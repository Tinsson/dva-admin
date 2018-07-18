import request from '../utils/request'

export function EduList(params){
    return request('/backend/audit/edu-audit', {
        method: 'GET',
        body: params
    })
}

export function VerifyEdu(params){
    return request('/backend/audit/set-audit', {
        method: 'POST',
        body: params
    })
}