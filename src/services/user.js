import request from '../utils/request';

//登录用户信息
export function UserList(params) {
    return request('/backend/user/user-list', {
        method: 'GET',
        body: params
    });
}