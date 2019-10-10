import React from 'react'
import {observer,inject} from 'mobx-react'
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
import TabsSelf from 'component/TabsSelf/index.jsx'
import './index.less'
  const { Header, Content, Footer, Sider} = Layout;
  const SubMenu = Menu.SubMenu;
@inject('NavTab')
@observer
class Wrapper extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            collapsed: true,
          };
    }
      onCollapse = (collapsed) => {
        this.setState({ collapsed });
      }
      handleClick(k){
        const {addNavMenu}= this.props.NavTab
        addNavMenu(k.item.props.children)
        console.log(k.item.props.children)
      }
    render(){
        return(
            <Layout style={{ minHeight: '100vh' }} id="homepage">
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
        {this.state.collapsed ? '爱你' : "你这个小垃圾"  }
          <div className="logo"></div>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={(k)=>this.handleClick(k)}>
            <SubMenu
              key="sub1"
              title={<span><Icon type="home"/><span>博客门户</span></span>}
            >
              <Menu.Item key="3">栏目管理</Menu.Item>
              <Menu.Item key="4">文章管理</Menu.Item>
              <Menu.Item key="5">添加文章</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={<span><Icon type="team" /><span>Team</span></span>}
            >
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
              <Menu.Item key="9">相册</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          {/* <Header style={{ background: '#fff', padding: 0 }} /> */}
          <Content style={{ margin: '20px 16px' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
             <TabsSelf />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
        )
    }
}


export default Wrapper