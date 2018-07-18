import React, { Component } from 'react'
import TableCard from '../../components/TableCard'
import FilterCard from '../../components/FilterCard'
import TypeCard from '../../components/TypeCard'
import UserModal from '../User/components/UserModal'
import { Popconfirm } from 'antd'
import { connect } from 'dva'
import styles from './EduList.less'

const filter = [{
    label: '姓名',
    type: 'input',
    placeholder: '输入姓名',
    model: 'name'
},{
    label: '手机号',
    type: 'input',
    placeholder: '请输入手机号',
    model: 'phone'
}]

const typeCols = [{
    title: '待审核',
    key: '0',
    type: 0,
    icon:'question-circle'
},{
    title: '不通过',
    key: '1',
    type: 1,
    icon: 'close-circle'
  },{
    title: '通过',
    key: '2',
    type: 2,
    icon: 'check-circle'
  }]

let initPage = 1;
let initSize = 20;

class EduList extends Component {

    constructor(props){
        super();
        this.state = {
            pagination: {
                page: initPage,
                size: initSize
            },
            type: 0
        }

        this.columns = [{
            title: '姓名',
            dataIndex: 'body_name'
        },{
            title: '手机号',
            dataIndex: 'phone'
        },{
            title: '用户信息',
            dataIndex: 'uid',
            render: (uid)=>{
                return (<span style={{color: '#328cff',cursor: 'pointer'}} onClick={this.handleCheck.bind(this,uid, 2)}>查看</span>)
            }
        },{
            title: '操作',
            dataIndex: 'index',
            render: (id, record)=>{
                let type = this.state.type,
                    uid = record.uid,
                    group = [];
                if(type === 0 || type === 1){
                    group.push(
                        <Popconfirm key={0} title="确认通过该审核吗？" onConfirm={this.handleVerify.bind(this, uid, 1)} okText="确认" cancelText="取消">
                            <span style={{color: '#328cff',cursor: 'pointer'}}>通过</span>
                            { type === 0 ? <span className={styles.divider} /> : ''}
                        </Popconfirm>
                    )
                }
                if(type === 0 || type === 2){
                    group.push(
                        <Popconfirm key={1} title="确认不通过该用户吗？" onConfirm={this.handleVerify.bind(this, uid, 0)} okText="确认" cancelText="取消">
                            <span style={{color: '#f44336',cursor: 'pointer'}}>不通过</span>
                        </Popconfirm>
                    )
                }
                return (
                    <div>{group}</div>
                )
            }
        }]
    }

    componentDidMount(){
        this.condition = {};
        this._initData();
    }

    _initData(){
        this.props.getData({
            ...this.state.pagination,
            type: this.state.type,
            ...this.condition
        });
    }

    handleVerify(uid, status){
        this.props.onVerify({
            uid,
            status,
            type: 2,
            role: 2
        },{
            ...this.state.pagination,
            type: this.state.type,
            ...this.condition
        })
    }

    handleFilter(condition){
        this.condition = condition;
        this.setState({
            pagination: {
                page: initPage,
                size: initSize
            }
        },()=>{
            this._initData();
        })
    }

    handleCurrentChange(page, size){
        this.setState({
            pagination: {
                page,
                size
            }
        },()=>{
            this._initData();
        });
    }

    handleTypeChange(type){
        this.setState({
            type,
            pagination: {
                page: initPage,
                size: initSize
            }
        },()=>{
            this._initData();
        })
    }

    handleCheck(id, role){
        let payload = {
            id,
            role
        }
        this.props.openUserModal(payload);
    }

    render() {
        let tableData = {
            size: 'small',
            columns: this.columns,
            rowKey: (record, index)=>{return index},
            loading: this.props.loading,
            dataSource: this.props.eduList,
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
                <TypeCard columns={typeCols} active={this.state.type} onChange={this.handleTypeChange.bind(this)} />
                <FilterCard filterList={filter} onFilter={this.handleFilter.bind(this)}/>
                <TableCard  tableData={tableData} />
            </div>
        )
    }
}

let mapToState = (state)=>{
    return {
        eduList: state.verify.edu.data,
        total: state.verify.edu.total,
        loading: state.verify.loading
    }
}

let mapToDispatch = (dispatch)=>{
    return {
        getData(data){
            dispatch({type: 'verify/init', data});
        },
        openUserModal(payload){
            dispatch({type: 'global/checkUser', payload})
        },
        onVerify(data, listParams){
            dispatch({type: 'verify/verify', data ,listParams});
        }
    }
}


export default connect(mapToState, mapToDispatch)(EduList);
