import React, { Component } from 'react';
import { Layout, Menu, Icon} from 'antd'
import { Link } from 'dva/router'
import styles from '../assets/css/MenuLayout.less'
import { connect } from 'dva'

const { SubMenu, Item } = Menu;
const { Header, Content, Sider} = Layout;



class MenuLayout extends Component{
    constructor(props, context){
        super();
        this.state = {
            collapsed: false
        }
    }

    

    _toggle = ()=>{
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render(){
        let menu = [];
        if(this.props.menu){
            menu = this.props.menu;
        }

        //console.log(this.props);
        
        let cur_path = this.props.path;
        let menuList = menu.map(val=>{
            let child = val.children.map(vval=>{
                let inner;
                if((val.path + vval.path) === cur_path){
                    inner = vval.display_name;
                }else{
                    inner = <Link to={val.path + vval.path}>{vval.display_name}</Link>;
                }
                return (
                    <Item key={vval.name}>
                        {inner}
                    </Item>
                )
            })
            return (
                <SubMenu key={val.name} title={<span><Icon type="switcher" /><span>{val.display_name}</span></span>}>
                    {child}
                </SubMenu>
            )
        });

        return (
            <Layout style={{height: '100%'}}>
                <Sider width={200} collapsible collapsed={this.state.collapsed}>
                    <div className={styles.logo_box}>
                        
                    </div>
                    <Menu
                        mode="inline"
                        theme="dark"
                        defaultSelectedKeys={[cur_path.split('/')[2]]}
                        defaultOpenKeys={[cur_path.split('/')[1]]}
                        style={{ height: '100%', borderRight: 0 }}
                        >
                        {menuList}
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon
                            className={styles.trigger}
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this._toggle}
                            />
                        <div className={styles.logoutBox} onClick={this.props.handleLogOut}>
                            <Icon type="logout" />
                            <span className={styles.txt}>退出登录</span>
                        </div>
                    </Header>
                    <Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
                    {this.props.children}
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

let mapToState = (state)=>{
    return {
        state
    }
}

let mapToDispatch = (dispatch)=>{
    return {
        handleLogOut(){
            dispatch({type: 'frame/logout'});
        }
    }
}

export default connect(mapToState , mapToDispatch)(MenuLayout);