import React, { Component } from 'react'
import TableCard from '../../components/TableCard'
import FilterCard from '../../components/FilterCard'
import UserModal from './components/UserModal'
import styles from './ParentList.less'
import { connect } from 'dva'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { message } from 'antd'


const filter = [{
    label: '姓名',
    type: 'input',
    placeholder: '输入姓名',
    model: 'body_name'
},{
    label: '客户角色',
    type: 'select',
    placeholder: '请选择类型',
    model: 'role',
    options: [{
      label: '家长',
      value: 1
    },{
      label: '家教',
      value: 2
    }]
},{
    label: '时间',
    type: 'daterange',
    placeholder: ['开始', '结束'],
    range: ['start_time', 'end_time']
}]
let initPage = 1;
let initSize = 20;


class ParentList extends Component {

    state = {
        page: initPage,
        size: initSize
    }

    componentDidMount(){
        this.props.getData({
            page: this.state.page,
            size: this.state.size
        });
        this.condition = {};
        this.visible = false;
    }

    handleFilter(condition){
        this.condition = condition;
        this.setState({
            page: initPage,
            size: initSize
        },()=>{
            this.props.getData({
                ...this.state,
                ...condition
            })
        })
    }

    handleCurrentChange(page,size){
        this.setState({
            page,
            size
        },()=>{
            this.props.getData({
                ...this.state,
                ...this.condition
            });
        });
    }

    render() {
        const columns = [{
            title: '姓名',
            dataIndex: 'body_name'
        },{
            title: '手机',
            dataIndex: 'phone',
            render: (phone) =>{
                return (
                    <CopyToClipboard text={phone} onCopy={()=>{message.success('复制成功')}}>
                        <span style={{color: '#0f76c7', cursor: 'pointer'}}>{phone}</span>
                    </CopyToClipboard>
                )
            }
        },{
            title: '微信昵称',
            dataIndex: 'nickname'
        },{
            title: '客户角色',
            dataIndex: 'role',
            render: (role) => {
                let color = '',
                    txt = '';
                if(role === 1){
                    txt = '家长';
                    color = '#ff5722';
                }else if(role === 2){
                    txt = '家教';
                    color = '#009688';
                }
                return (<span style={{color}}>{txt}</span>)
            }
        },{
            title: '城市',
            dataIndex: 'city'
        },{
            title: '审核状态',
            dataIndex: 'certime'
        },{
            title: '客户状态',
            dataIndex: 'level',
            render: (level)=>{
                let txt = '';
                switch (level){
                    case "A":
                        txt = '授课中';
                        break;
                    case "B":
                        txt = '暂不需要';
                        break;
                    case "D":
                        txt = '寻找中';
                        break;
                    default: 
                        txt = '未知';
                }
                return ( <span>{txt}</span>)
            }
        },{
            title: '操作',
            dataIndex: 'operation',
            render: (op, record)=>{
                this.props.openUserModal(record.id);
                //console.log(record.id);
            }
        }];

        let tableData = {
            size: 'small',
            columns,
            rowKey: 'id',
            loading: this.props.loading,
            dataSource: this.props.user,
            pagination: {
                current: this.state.page,
                total: this.props.total,
                pageSize: this.state.size,
                onChange: this.handleCurrentChange.bind(this)
            }
        }
        return (
            <div>
                <UserModal />
                <FilterCard filterList={filter} onFilter={this.handleFilter.bind(this)}/>
                <TableCard extra={<div className={styles.extra}>总计：{this.props.total}</div>} 
                           tableData={tableData} />
            </div>
        )
    }
}

let mapToState = (state)=>{
    return {
        user: state.user.userData,
        total: state.user.total,
        loading: state.user.loading
    }
}

let mapToDispatch = (dispatch)=>{
    return {
        getData(data){
            dispatch({type: 'user/init', data});
        },
        openUserModal(id){
            dispatch({type: 'user/init_panel', id})
        }
    }
}

export default connect(mapToState, mapToDispatch)(ParentList);