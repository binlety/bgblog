import React from 'react'
import {observer,inject} from 'mobx-react'
import {Button, Drawer,Message, Form,Input,Select} from 'antd';
import SelectSelf from 'component/custom/SelectSelf/index.jsx'
import './index.less'

const Option = Select.Option;
@inject('CategoryManage')
@observer
class Wrapper extends React.Component{
    constructor(props){
        super(props)
        this.state={
            visible: false,
            fieldA:'',
            fieldB:[]
        }
        
    }
    state = { visible: false };
    showDrawer = () => {
      this.setState({
        visible: true,
      });
    };
  
    onClose = () => {
      this.setState({
        visible: false,
      });
    };
    onCloseMask=()=>{
        Message.info('离开编辑内容将被清除')
    }
    handleChange=(k,v)=>{
       this.setState({
           [k]:v
       })
      }
      save=()=>{ 
          const {fieldA,fieldB}= this.state
         this.props.CategoryManage.CategoryAdd({fieldA,fieldB})
         this.clearAndClose()
      }
      clearAndClose=()=>{
        Message.success('编辑内容已清除')
          this.setState({
            visible: false,
            fieldA:'',
            fieldB:[]
        })
      }
    render(){
        const formItemLayout={
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
          }
        const buttonItemLayout={ span: 14, offset: 4 }
        return(
            <div>
            <Button type="primary" onClick={this.showDrawer}>
              新增栏目
            </Button>
            <Drawer
              title="新建栏目直接影响博客首页导航排版 , 切记规划好 , 三思而后行奥"
              closable={false}
              onClose={this.onClose}
              visible={this.state.visible}
              placement='top'
              onClose={()=>this.onCloseMask()}
            >
            <Form>
               <Form.Item label="Field A" {...formItemLayout} >
                 <Input placeholder="现在填入你想要的栏目新名字吧" value={this.state.fieldA} onChange={(e)=>this.handleChange('fieldA',e.target.value)}/>
               </Form.Item>
              <Form.Item label="Field B" {...formItemLayout} >
        
                <SelectSelf
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="顺便给它打上tag吧"
                    options={options}
                    value={this.state.fieldB}
                    onChange={(v)=>this.handleChange("fieldB",v)}
                />
              </Form.Item>
              <Form.Item >
                <Button type="primary"  {...buttonItemLayout} onClick={()=>this.save()} disabled={!this.state.fieldA || this.state.fieldB==0}>提交</Button>
                <Button onClick={()=>this.clearAndClose()}>返回</Button>
              </Form.Item> 
            </Form>
            </Drawer>
          </div>
        )
    }
}
const options=[{
    title:'心情',
    value:"心情"
},{
    title:'旅行',
    value:"旅行"
},{
    title:'流行',
    value:"流行"
},{
  title:'启蒙',
  value:"启蒙"
},{
  title:'技术',
  value:"技术"
},{
  title:'时尚',
  value:"时尚"
},{
  title:'娱乐',
  value:"娱乐"
},,{
  title:'吃喝玩乐',
  value:"吃喝玩乐"
}]
export default Wrapper;

// import React from 'react'
// import {observer,inject} from 'mobx-react'
// import {Button, Drawer,Message, Form,Input,Select} from 'antd';
// import SelectSelf from 'component/custom/SelectSelf/index.jsx'
// import './index.less'

// const Option = Select.Option;


// @inject('NavTab')
// @observer
// class Wrapper extends React.Component{
//     state = { visible: false };
//     componentDidMount() {
//         // To disabled submit button at the beginning.
//         this.props.form.validateFields();
//       }
//     showDrawer = () => {
//       this.setState({
//         visible: true,
//       });
//     };
  
//     onClose = () => {
//       this.setState({
//         visible: false,
//       });
//     };
//     onCloseMask=()=>{
//         Message.info('取消新增栏目的动作吗,离开数据将清除')
//     }
//     handleSubmit = (e) => {
//         e.preventDefault();
//         this.props.form.validateFields((err, values) => {
//           if (!err) {
//             console.log('Received values of form: ', values);
//           }
//         });
//       }
//        hasErrors=(fieldsError)=> {
//         return Object.keys(fieldsError).some(field => fieldsError[field]);
//       }
//       selectHandleChange=(value)=>{
//         // console.log(value,'g')
//       }
//     render(){
//         const formItemLayout={
//             labelCol: { span: 4 },
//             wrapperCol: { span: 14 },
//           }
//         const buttonItemLayout={ span: 14, offset: 4 }
//         const {
//             getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
//           } = this.props.form;
      
//           // Only show error after a field is touched.
//           const fieldAError = isFieldTouched('fieldA') && getFieldError('fieldA');
//           const fieldBError = isFieldTouched('fieldB') && getFieldError('fieldB');
//         return(
//             <div>
//             <Button type="primary" onClick={this.showDrawer}>
//               新增栏目
//             </Button>
//             <Drawer
//               title="规划好,切记要三思奥"
//               closable={false}
//               onClose={this.onClose}
//               visible={this.state.visible}
//               placement='top'
//             //   onClose={()=>this.onCloseMask()}
//             >
//             <Form onSubmit={(e)=>this.handleSubmit(e)}>
//                <Form.Item label="Field A" {...formItemLayout}   validateStatus={fieldAError ? 'error' : ''}
//           help={fieldAError || ''}>
//                {getFieldDecorator('fieldA', {
//             rules: [{ required: true, message: 'Please input the content!' }],
//           })(
//                  <Input placeholder="现在填入你想要的栏目新名字吧" />)}
//                </Form.Item>
//               <Form.Item label="Field B" {...formItemLayout} validateStatus={fieldBError ? 'error' : ''}
//           help={fieldBError || ''}>
//               {getFieldDecorator('fieldB', {
//             rules: [{ required: true, message: 'Please input the content!' }],
//           })(
//                 <SelectSelf
//                     mode="multiple"
//                     style={{ width: '100%' }}
//                     placeholder="顺便给它打上tag吧"
//                     options={options}
//                     // onChange={(e)=>this.selectHandleChange(e)}
//                 />
//                 )}
//               </Form.Item>
//               <Form.Item >
//                 <Button type="primary"  htmlType="submit" {...buttonItemLayout} disabled={this.hasErrors(getFieldsError())}>提交</Button>
//               </Form.Item> 
//             </Form>
//             </Drawer>
//           </div>
//         )
//     }
// }
// const options=[{
//     title:'1',
//     value:"1"
// },{
//     title:'2',
//     value:"2"
// },{
//     title:'3',
//     value:"3"
// }]
// export default Form.create({ name: 'horizontal_login' })(Wrapper);