import { Component } from 'react';
import { Card, Table } from 'antd'

class TableCard extends Component{

    render(){
        return (
            <Card title={this.props.title?this.props.title:'数据列表'} extra={this.props.extra}>
                <Table {...this.props.tableData}/>
            </Card>
        )
    }
}

export default TableCard;