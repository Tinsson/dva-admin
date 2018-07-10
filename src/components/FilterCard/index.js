import { Component } from 'react';
import { Card, Input, Select, DatePicker } from 'antd'
import styles from './index.less'
import PropTypes from 'prop-types'
const Option = Select.Option;

class FilterCard extends Component{
    constructor(props){
        super();

        let regState = {};
        this.filter = props.filterList.map((val, index)=>{
            let item;
            //注册属性
            if(val.model){
                regState[val.model] = '';
            }

            switch(val.type){
                case 'input': //普通筛选框
                    item = (
                        <Input placeholder={val.placeholder} onPressEnter={this.onSearch.bind(this)} onChange={this.onChange.bind(this, val.model)}/>
                    )
                    break;
                case 'select': //单选框
                    item = (
                        <Select allowClear placeholder={val.placeholder} style={{width: '150px'}} onChange={this.onSelect.bind(this, val.model)}>
                            {val.options.map(option=><Option value={option.value} key={option.value}>{option.label}</Option>)}
                        </Select>
                    )
                    break;
                case 'date': //单日期选择框
                    item = (
                        <DatePicker placeholder={val.placeholder} onChange={this.onDatePicker.bind(this, val.model)}/>
                    )
                    break;
                default: 
                    item = (<span>未知</span>)
            }
            return (
                <div className={styles.inputGroup} key={index}>
                    <div className={styles.label}>{val.label}</div>
                    {item}
                </div>
            )
        })

        this.state = regState;
    }

    static propTypes = {
        filterList: PropTypes.array //筛选配置列表
    }

    onChange(model, e){
        this.setState({
            [model]: e.target.value
        })
    }

    onSelect(model, value){
        this.setState({
            [model]: value ? value : ''
        },()=>{
            this.onSearch();
        })
    }

    onDatePicker(model, date, dateString){
        this.setState({
            [model]: dateString ? dateString : ''
        },()=>{
            this.onSearch();
        })
    }

    onSearch(){
        let finalCondition = {};
        Object.keys(this.state).forEach(key=>{
            if(this.state[key] !== ''){
                finalCondition[key] = this.state[key];
            }
        })
        this.props.onFilter(finalCondition);
    }

    render(){

        
        return (
            <Card title="筛选查询" className={styles.filter} extra={this.props.extra}>
                <div className={styles.content}>
                    {this.filter}
                </div>
            </Card>
        )
    }
}



export default FilterCard;