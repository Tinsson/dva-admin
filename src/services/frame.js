import request from '../utils/request';

//登录获取信息
export function LoginApi(params) {
    return request('/backend/admin/login', {
        method: 'POST',
        body: params
    });
}