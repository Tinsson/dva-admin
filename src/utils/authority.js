//判断用户是否已经登录

export default function authLogin(){
    let token = localStorage.getItem('token');
    if(token){

        let cur_path = localStorage.getItem('cur_path'),
            menu = localStorage.getItem('menu');
        return {
            menu,
            cur_path
        };
        
    }else{
        return false;
    }
}

export function setAuth(data){
    for(let key in data){
        localStorage.setItem(key, JSON.stringify(data[key]));
    }
}

export function removeAuth(data){
    localStorage.clear();
}