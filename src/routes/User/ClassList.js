import React, { Component } from 'react'
import TableCard from '../../components/TableCard'
import FilterCard from '../../components/FilterCard'
import { connect } from 'dva'
import { Modal } from 'antd'
import styles from './ParentList.less'


const filter = [{
    label: '家长姓名',
    type: 'input',
    placeholder: '输入姓名',
    model: 'learn_name'
},{
    label: '家长手机号',
    type: 'input',
    placeholder: '请输入手机号',
    model: 'learn_phone'
},{
    label: '上课时间',
    type: 'daterange',
    placeholder: '请选择时间',
    range: ['start_time', 'end_time']
}]
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
            title: '家长',
            dataIndex: 'learn_name'
        },{
            title: '手机号',
            dataIndex: 'learn_phone'
        },{
            title: '家教',
            dataIndex: 'tutor_name'
        },{
            title: '上课时间',
            dataIndex: 'create_at'
        },{
            title: '下课时间',
            dataIndex: 'update_at'
        },{
            title: '课时数量',
            dataIndex: 'class_hour'
        },{
            title: '剩余课时',
            dataIndex: 'free_hour'
        },{
            title: '课程反馈',
            dataIndex: 'remark',
            render: (text) => {
                return (<span className={styles.tableAction} onClick={this.handleCheck.bind(this,text)}>查看</span>)
            }
        }]
    }

    componentDidMount(){
        this.props.getData({
            page: this.state.pagination.page,
            size: this.state.pagination.size
        });
        this.condition = {};
    }

    handleClose = ()=>{
        this.setState({
            feedback: {
                visible: false,
                content: ''
            }
        })
    }

    handleCheck(content){
        this.setState({
            feedback: {
                visible: true,
                content
            }
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
            this.props.getData({
                ...this.state.pagination,
                ...condition
            })
        })
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

    render(){
        let tableData = {
            size: 'small',
            columns: this.columns,
            rowKey: (record, index)=>{return index},
            loading: this.props.loading,
            dataSource: this.props.classList,
            pagination: {
                current: this.state.pagination.page,
                total: this.props.total,
                pageSize: this.state.pagination.size,
                onChange: this.handleCurrentChange.bind(this)
            }
        }

        let feedback = this.state.feedback;

        return (
            <div>
                <Modal title="课程反馈" visible={feedback.visible} onCancel={this.handleClose}>
                    <p>{feedback.content}</p>
                </Modal>
                <FilterCard filterList={filter} onFilter={this.handleFilter.bind(this)}/>
                <TableCard  tableData={tableData} />
            </div>
        )
    }
}

let mapToState = (state)=>{
    return {
        classList: state.user.classList,
        total: state.user.total_class,
        loading: state.user.loading_class
    }
}

let mapToDispatch = (dispatch)=>{
    return {
        getData(data){
            dispatch({type: 'user/init_class', data});
        }
    }
}

export default connect(mapToState, mapToDispatch)(ClassList);