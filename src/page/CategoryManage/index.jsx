import React from 'react'
import {observer,inject} from 'mobx-react'
import { Table, Divider, Tag,Button,Modal } from 'antd';
import CategoryAdd from 'component/CategoryAdd/index.jsx'
import './index.less'
@inject('CategoryManage')
@observer
class Wrapper extends React.Component{
    componentDidMount(){
       this.props.CategoryManage.loadCategoryList()
    }
    renderColumns=()=>{
    const {categoryItemDel} = this.props.CategoryManage
     confirm=(params)=> {
        Modal.confirm({
        title: 'Confirm',
        content: '确认删除'+params.categoryName,
        okText: '确认',
        cancelText: '取消',
        onOk:()=>categoryItemDel(params._id)
      });
    }
    const columns = [{
        title: 'CategoryName',
        dataIndex: 'categoryName',
        render: text => <a href="javascript:;">{text}</a>,
      }, {
        title: 'OpusCount',
        dataIndex: '_id',
      }, {
        title: 'CreateTime',
        dataIndex: 'createTime',
        render: text => <a href="javascript:;">{text}</a>,
      }, {
        title: 'CategoryTags',
        dataIndex: 'categoryTags',
        render: CategoryTags => (
          <span>
            {CategoryTags && CategoryTags.map(tag => {
              let color = tag.length > 5 ? 'geekblue' : 'green';
              if (tag === 'loser') {
                color = 'volcano';
              }
              return <Tag color={color} key={tag}>{tag.toUpperCase()}</Tag>;
            })}
          </span>
        ),
      }, {
        title: 'Action',
        render: (text, record) => (
          <span>
            <a href="javascript:;">停用 {record.name}</a>
            <Divider type="vertical" />
            {/* <a href="javascript:;">删除</a> */}
            <Button type="danger" size="small" onClick={()=>confirm(record)}>删除</Button>
          </span>
        ),
      }];
      return columns
    }

    render(){
        const {categoryListData,categoryItemDel}= this.props.CategoryManage
        return(
        <div>
         <CategoryAdd />
         <br/>
         <Table columns={this.renderColumns()} dataSource={categoryListData} bordered/>
        </div>
        )
    }


   
}

  
  
export default Wrapper