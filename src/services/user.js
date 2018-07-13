import request from '../utils/request';

//登录用户信息
export function UserList(params) {
    return request('/backend/user/user-list', {
        method: 'GET',
        body: params
    });
}

export function TutorPanel(params){
    return request('/backend/user/tutor-panel', {
        method: 'GET',
        body: params
    });
}

export function LearnPanel(params){
    return request('/backend/user/learn-panel', {
        method: 'GET',
        body: params
    });
}