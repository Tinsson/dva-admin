import dynamic from 'dva/dynamic'
//import authLogin from '../utils/authority';

function dynamicWrap(app, models, component){
    return dynamic({
        app,
        models: () => models.map(m => import(`../models/${m}.js`)),
        component
    })
}

export default function allRouters(app){
    const routerConfig = {
        '/user/parent-list': {
            name: '用户列表',
            component: dynamicWrap(app, ['user'], () => import('../routes/User/ParentList'))
        },
        '/user/firstClass': {
            name: '课程列表',
            component: dynamicWrap(app, ['user'], () => import('../routes/User/ClassList'))
        },
        '/verify/edu-list': {
            name: '学历审核列表',
            component: dynamicWrap(app, ['verify'], () => import('../routes/Verify/EduList'))
        }
    };

    let finalRouter = [];

    Object.keys(routerConfig).forEach((val)=>{
        finalRouter.push({
            path: val,
            component: routerConfig[val].component
        })
    })

    return finalRouter;

    /*let auth = authLogin();
    if(auth){
        //已登录
        let menu = JSON.parse(auth.menu),
            urlArr = [],
            finalRouter = [];

        menu.forEach(val=>{
            if('children' in val){
                val.children.forEach(vval=>{
                    urlArr.push(val.path+vval.path);
                })
            }
        });

        Object.keys(routerConfig).forEach((val)=>{
            if(urlArr.includes(val)){
                finalRouter.push({
                    path: val,
                    component: routerConfig[val].component
                })
            }
        })

        return finalRouter;
        
    }else{
        return [];
    }*/
}