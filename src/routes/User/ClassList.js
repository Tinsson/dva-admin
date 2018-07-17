import React, { Component } from 'react'
import TableCard from '../../components/TableCard'
import FilterCard from '../../components/FilterCard'
import { connect } from 'dva'


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
            page: initPage,
            size: initSize
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
        }]
    }

    componentDidMount(){
        this.props.getData({
            page: this.state.page,
            size: this.state.size
        });
        this.condition = {};
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

    handleCurrentChange(page, size){
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

    render(){
        let tableData = {
            size: 'small',
            columns: this.columns,
            rowKey: (record, index)=>{return index},
            loading: this.props.loading,
            dataSource: this.props.classList,
            pagination: {
                current: this.state.page,
                total: this.props.total,
                pageSize: this.state.size,
                onChange: this.handleCurrentChange.bind(this)
            }
        }

        return (
            <div>
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