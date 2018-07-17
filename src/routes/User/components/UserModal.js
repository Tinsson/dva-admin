import React, { Component, Fragment } from 'react'
import styles from './UserModal.less'
import { Modal, Row, Col, Card, Tabs, Icon, Table, Button, message  } from 'antd'
import { connect } from 'dva'
import PanelLine from '../../../components/PanelLine'
const TabPane = Tabs.TabPane;


class UserModal extends Component{
    constructor(props){
        super();
    }

    _levelTxt(level){
        switch (level){
            case 'A':
                return '授课中';
            case 'B':
                return '暂不需要';
            case 'D':
                return '寻找中';
            default: 
                return '未知';
        }
    }

    handleRefresh(id, role){
        this.props.onRefresh(id, role, ()=>{
            message.success('刷新成功！');
        });
    }

    render(){
        let info = this.props.modalData;
        
        this.lineList = [{
            label: '姓名',
            value: info.body_name
        },{
            label: '身份证',
            value: info.show_idcard
        },{
            label: '手机号',
            value: info.phone
        },{
            label: '客户角色',
            value: info.role === 1? '家长': '家教'
        },{
            label: '客户状态',
            value: this._levelTxt(info.level)
        },{
            label: '所属助教',
            value: info.assistant_name
        },{
            label: '城市',
            value: info.city
        },{
            label: '地址',
            value: info.geo_name
        }]

        this.baseList = [{
            label: '注册',
            value: info.addtime
        },{
            label: '实名认证',
            value: info.identity
        },{
            label: '通过时间',
            value: info.identity_time
        },{
            label: '设备',
            value: info.device
        },{
            label: '最近登录时间',
            value: info.logintime
        }]

        if(info.role === 2){
            this.lineList = this.lineList.concat([{
                label: '学校',
                value: info.school
            },{
                label: '学历',
                value: info.diploma
            },{
                label: '专业',
                value: info.professional
            },{
                label: '入学情况',
                value: info.edu_now
            }])

            this.baseList.splice(3, 0, {
                label: '学历认证',
                value: info.education
            },{
                label: '通过时间',
                value: info.education_time
            })
        }



        this.recordCol = [{
            title: info.role === 1 ? '家教姓名': '家长姓名',
            dataIndex: info.role === 1 ? 'tutor_name': 'learn_name'
        },{
            title: '预付款总课时',
            dataIndex: 'class_hour'
        },{
            title: '时间',
            dataIndex: 'create_at'
        }];

        let footer = (
            <Row type="flex" align="middle" justify="space-between">
                <Col span={12}></Col>
                <Col span={12}>
                    <Button type="default" onClick={this.handleRefresh.bind(this, info.id, info.role)}>刷新</Button>
                </Col>
            </Row>
        );

        return (
            <Fragment>
                <Modal title={`用户面板(${info.nickname})`} footer={footer} width={1200} visible={this.props.visible} onCancel={this.props.onCloseModal}>
                    <Row gutter={16}>
                        <Col span={16}>
                            <PanelLine lineList={this.lineList} />
                        </Col>
                        <Col span={8}>
                            <Card bodyStyle={{ padding: '10px' }}>
                            <Tabs defaultActiveKey="1">
                                <TabPane tab="基本信息" key="1">
                                    <div className={styles.tabBox}>
                                        <div className={styles.innerWrap}>
                                            <div className={styles.halfBoxFirst}>
                                                <img className={styles.userImg} src={info.portrait} alt="头像" />
                                            </div>
                                            {
                                                this.baseList.map((item, index) =>
                                                    <div className={styles.halfBoxFirst} key={index}>
                                                        <h2 className={styles.tabTitle}>{item.label}:</h2>
                                                        <p className={styles.tabInfo}>{item.value}</p>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                </TabPane>
                                <TabPane tab={info.role === 1?'购买记录':'预付款记录'} key="2">
                                    <div className={styles.tabBox}>
                                        <Table size="small" rowKey="uid" pagination={false} columns={this.recordCol} dataSource={info.order_list}/>
                                    </div>
                                </TabPane>
                                <TabPane tab="课程安排" key="3">
                                    <div className={styles.tabBox}>
                                        <div className={styles.timeOut}>
                                            <div className={styles.timeLine}>
                                                <div className={styles.Label1}>星期</div>
                                                <div className={styles.partBox}>
                                                    {
                                                        ['一', '二', '三', '四', '五', '六', '日'].map(item => 
                                                            <div className={styles.part} key={item}>{item}</div>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                            <div className={styles.timeLine}>
                                                <div className={styles.Label1}>上午</div>
                                                <div className={styles.partBox}>
                                                    {
                                                        info.class_list?info.class_list.map(item => 
                                                            <div className={styles.part} key={item.id}>
                                                                <span className={item.am === 1?styles.partIcon:styles.partIconHide}>
                                                                    <Icon type="check-circle-o" />
                                                                </span>
                                                            </div>
                                                        ):{}
                                                    }
                                                </div>
                                            </div>
                                            <div className={styles.timeLine}>
                                                <div className={styles.Label1}>下午</div>
                                                <div className={styles.partBox}>
                                                    {
                                                        info.class_list?info.class_list.map(item => 
                                                            <div className={styles.part} key={item.id}>
                                                                <span className={item.pm === 1?styles.partIcon:styles.partIconHide}>
                                                                    <Icon type="check-circle-o" />
                                                                </span>
                                                            </div>
                                                        ):{}
                                                    }
                                                </div>
                                            </div>
                                            <div className={styles.timeLineLast}>
                                                <div className={styles.Label1}>下午</div>
                                                <div className={styles.partBox}>
                                                    {
                                                        info.class_list?info.class_list.map(item => 
                                                            <div className={styles.part} key={item.id}>
                                                                <span className={item.night === 1?styles.partIcon:styles.partIconHide}>
                                                                    <Icon type="check-circle-o" />
                                                                </span>
                                                            </div>
                                                        ):{}
                                                    }
                                                </div>
                                            </div>
                                        </div>   
                                    </div>
                                </TabPane>
                            </Tabs>
                            </Card>
                        </Col>
                    </Row>
                </Modal>
            </Fragment>
        )
    }
}

let mapToState = (state) => {
    return {
        visible: state.global.usermodal.visible,
        role: state.global.usermodal.role,
        modalData: state.global.usermodal.modalData,
        id: state.global.usermodal.id,
        loading: state.global.usermodal.loading
    }
}

let mapToDispatch = (dispatch) => {
    return {
        onCloseModal(){
            dispatch({type: 'global/close_user_modal'})
        },
        onRefresh(id, role, fn){
            dispatch({type: 'global/checkUser', payload: {
                id,
                role
            }, fn})
        }
    }
}

export default connect(mapToState, mapToDispatch)(UserModal);