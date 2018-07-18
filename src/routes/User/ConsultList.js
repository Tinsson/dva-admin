import React, { Component } from 'react'
import TableCard from '../../components/TableCard'
import UserModal from './components/UserModal'
import { connect } from 'dva'


let initPage = 1;
let initSize = 20;

class ClassList extends Component{
    constructor(props){
        super();
        this.state = {
            pagination: {
                page: initPage,
                size: initSize
            },
            feedback: {
                visible: false,
                content: ''
            }
        }

        this.columns = [{
            title: '操作角色',
            dataIndex: 'role',
            render: (role) => {
                let txt = '';
                if(role === 1){
                    txt = '家长';
                }else if(role === 2){
                    txt = '家教';
                }
                return (<span>{txt}</span>)
            }
        },{
            title: '操作人手机/昵称',
            dataIndex: 'phone',
            render: (phone, record)=>{
                return (<span style={{color: '#2db7f5',cursor: 'pointer'}} 
                            onClick={this.handleCheck.bind(this, record.uid, record.role)}>{`${phone}/${record.nickname}`}</span>)
            }
        },{
            title: '被操作人手机/昵称',
            dataIndex: 'to_phone',
            render: (to_phone, record)=>{
                let to_role = '';
                  if(record.role === 1){
                    to_role = 2
                  }else{
                    to_role = 1;
                  }
                return (<span style={{color: '#f44336',cursor: 'pointer'}}
                            onClick={this.handleCheck.bind(this, record.to_uid, to_role)}>{`${to_phone}/${record.to_nickname}`}</span>)
            }
        },{
            title: '操作时间',
            dataIndex: 'create_at'
        }]
    }

    componentDidMount(){
        this.props.getData({
            page: this.state.pagination.page,
            size: this.state.pagination.size
        });
        this.condition = {};
    }


    handleCurrentChange(page, size){
        this.setState({
            pagination: {
                page,
                size
            }
        },()=>{
            this.props.getData({
                ...this.state.pagination,
                ...this.condition
            });
        });
    }

    handleCheck(id, role){
        let payload = {
            id,
            role
        }
        this.props.openUserModal(payload);
    }

    render(){
        let tableData = {
            size: 'small',
            columns: this.columns,
            rowKey: (record, index)=>{return index},
            loading: this.props.loading,
            dataSource: this.props.consultData,
            pagination: {
                current: this.state.pagination.page,
                total: this.props.total,
                pageSize: this.state.pagination.size,
                onChange: this.handleCurrentChange.bind(this)
            }
        }


        return (
            <div>
                <UserModal onRefresh={this.handleCheck.bind(this)}/>
                <TableCard  tableData={tableData} />
            </div>
        )
    }
}

let mapToState = (state)=>{
    return {
        consultData: state.user.consultData,
        total: state.user.total_consult,
        loading: state.user.loading_consult
    }
}

let mapToDispatch = (dispatch)=>{
    return {
        getData(data){
            dispatch({type: 'user/init_consult', data});
        },
        openUserModal(payload){
            dispatch({type: 'global/checkUser', payload})
        }
    }
}

export default connect(mapToState, mapToDispatch)(ClassList);