import React from 'react'
import {observer,inject} from 'mobx-react'
import { Tabs } from 'antd';
import Forbidden from 'component/Forbidden/index.jsx'
import CategoryManage from 'page/CategoryManage/index.jsx'
import Photo from 'page/Photo/index.jsx'
// import {Photo} from 'page/index.js'
const TabPane = Tabs.TabPane;
@inject('NavTab')
@observer
class TabsSelf extends React.Component {
  constructor(props) {
    super(props);
    this.newTabIndex = 0;
  }

  onChange = (activeKey) => {
      const {publicSetMethodNav}= this.props.NavTab
      publicSetMethodNav('activeKey',activeKey)
  }

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  }

  remove = (targetKey) => {
    const {removeNavMenu}= this.props.NavTab
    removeNavMenu(targetKey)
  }
  renderSwitch(pane){
   switch(pane){
     case "主菜单":
     return <div>主菜单ao</div>
     case "栏目管理":
     return <CategoryManage />
     case "相册":
      return <Photo />
     default:
     return <Forbidden />
   }
  }
  render() {
      const {activeKey,tabsPan} = this.props.NavTab
    return (
      <Tabs
        onChange={this.onChange}
        activeKey={activeKey}
        type="editable-card"
        onEdit={this.onEdit}
        hideAdd
      >
        {tabsPan.map(pane => <TabPane tab={pane} key={pane}>{this.renderSwitch(pane)}</TabPane>)}
      </Tabs>
    );
  }
}

export default TabsSelf