import React, { Component } from 'react';
import { Row, Col } from 'antd'
import styles from './index.less'
import PropTypes from 'prop-types'

class PanelLine extends Component{
    static propTypes = {
        lineList: PropTypes.array
    }

    render(){
        let lineList = this.props.lineList,
            divideLine = [];
        for(let i = 0, len = lineList.length; i < len; i += 4){
            divideLine.push(lineList.slice(i, i+4));
        }


        return (
            <div className={styles.infoArea}>
                {divideLine.map((item, index) => 
                    <div className={styles.singleLine} key={index}>
                        <Row>
                            {item.map((val, iindex) => {
                                return (
                                    <Col span={6} key={iindex}>
                                        <p className="label">{val.label}</p>
                                        <p className="value">{val.value}</p>
                                    </Col>
                                )
                            })}
                        </Row>
                    </div>
                )}
            </div>
        )
    }
}

export default PanelLine;