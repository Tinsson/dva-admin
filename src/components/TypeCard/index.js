import { Component } from 'react';
import { Row, Col, Icon } from 'antd'
import styles from './index.less'

class TypeCard extends Component{

    constructor(props){
        super();
    }

    handleChange(type){
        if(type === this.props.active){
            return;
        }else{
            this.props.onChange(type);
        }
    }

    render(){
        let inner = [],
            len = this.props.columns.length;

        if(len > 0){
            inner = this.props.columns.map((item, index)=>{

                return (
                    <Col span={24/len} key={index}>
                        <div className={item.type === this.props.active ? styles.cardActive : styles.card} onClick={this.handleChange.bind(this, item.type)}>
                            <div className={styles.title}>{item.title}</div>
                            <Icon type={item.icon} className={styles.icon}></Icon>
                        </div>
                    </Col>
                );
            })
        }
        return (
            <div className={styles.typeOut}>
                <Row gutter={16}>
                    {inner}
                </Row>
            </div>
        )
    }
}

export default TypeCard;
