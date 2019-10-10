import React from 'react'
import {observer,inject} from 'mobx-react'
import {Redirect,Link} from 'react-router-dom'
import { Form, Icon, Input, Button, Checkbox } from 'antd';


import './index.less'
@inject("LoginReg")
@observer
class Login extends React.Component{
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            const {login} = this.props.LoginReg
            login(values)
          }
        });
      }
      componentWillMount(){
        this.props.LoginReg.publicSetMethod('redirect',null)
       }
    render(){
        const { getFieldDecorator } = this.props.form;
        const {redirect,loginRegMsg,publicSetMethod} = this.props.LoginReg
        return(
            <div id="loginWrapper">
             {redirect ? <Redirect to={redirect}></Redirect> : null}
            
            <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户名" onChange={()=>publicSetMethod('loginRegMsg','')}/>
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码" onChange={()=>publicSetMethod('loginRegMsg','')}/>
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
              {loginRegMsg ? <a>{loginRegMsg}</a> : null}<Link to="/register">register now!</Link>
            </Form.Item>
          </Form>
          </div>
        )
    }
}


export default Form.create({ name: 'normal_login' })(Login)