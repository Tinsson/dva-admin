import { Component } from 'react'
import TableCard from '../../components/TableCard'
import { connect } from 'dva'

const columns = [{
    title: 'id',
    dataIndex: 'admin_id'
},{
    title: '账号名',
    dataIndex: 'admin_name'
},{
    title: '手机号',
    dataIndex: 'admin_mobile'
},{
    title: '备注',
    dataIndex: 'remark'
}];

class AdminList extends Component{

    componentDidMount(){
        this.props.initData();
    }

    render(){
        let tableData = {
            size: 'small',
            columns: columns,
            rowKey: (record, index)=>{return index},
            dataSource: this.props.adminList
        }

        return (
            <div>
                <TableCard tableData={tableData}></TableCard>
            </div>
        )
    }
}

let mapPropsToState = (state)=>{
    return {
        adminList: state.authority.admin.list
    }
}

let mapDispatchToState = (dispatch)=>{
    return {
        initData: ()=>{
            dispatch({type: 'authority/adminFetch'});
        }
    }
}


export default connect(mapPropsToState, mapDispatchToState)(AdminList);