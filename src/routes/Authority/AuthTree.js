import { Component } from 'react'
import { connect } from 'dva'
import { Card, Tree, Button } from 'antd'
import AuthModal from './components/AuthModal'
const TreeNode = Tree.TreeNode;

class AuthTree extends Component{
    constructor(props){
        super();
        
    }

    componentDidMount(){
        this.props.getData();
    }
    
    handleModify(id, pid, display_name, name, show){
        let modal = {
            id,
            pid, 
            display_name,
            name,
            show
        }
        this.props.openModify(modal);
    }

    render(){

        return (
            <div>
                <AuthModal />
                <Card title="权限列表">
                    <Tree>
                    {
                    this.props.permission.map(val=>{
                        return (
                        <TreeNode key={val.id} title={
                            <div>
                                <span>{val.display_name}</span>
                                <Button type="primary" 
                                        style={{marginLeft: '20px'}} 
                                        onClick={this.handleModify.bind(this, val.id, 0, val.display_name, val.name, val.show)}
                                        size="small">编辑</Button>
                            </div>}>
                        {
                        val.children.map(vval=>{
                            return(
                            <TreeNode key={vval.id} title={
                                <div>
                                    <span>{vval.display_name}</span>
                                    <Button type="primary" 
                                            style={{marginLeft: '20px'}} 
                                            onClick={this.handleModify.bind(this,vval.id, val.id, vval.display_name, vval.name, vval.show)}
                                            size="small">编辑</Button>
                                </div>
                            } />
                            )
                        })
                        }
                        </TreeNode>
                        )
                    })
                    }
                    </Tree>
                </Card>
            </div>
        )
    }
}

let mapToState = (state)=>{
    return {
        permission: state.authority.auth.permission
    }
}

let mapToDispatch = (dispatch) => {
    return {
        getData: () => {
            dispatch({type: 'authority/permissionFetch' , data: {}})
        },
        openModify: (modal) => {
            dispatch({type: 'authority/open_auth_modal', modal})
        }
    }
}



export default connect(mapToState, mapToDispatch)(AuthTree);