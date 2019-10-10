import React from 'react'
import {observer,inject} from 'mobx-react'
import {Select} from 'antd';
import './index.less'
const Option = Select.Option;
@inject('NavTab')
@observer
class Wrapper extends React.Component{
    renderOptions=(options)=>{
      return options&& options.map((option)=>{
        return <Option value={option.value} key={option.key || option.title}>{option.title}</Option>
      })
    }
    render(){
        const{width,mode,placeholder,value,defaultValue,options,onChange}= this.props
        return(
            <Select
                mode={mode}
                style={width}
                placeholder={placeholder}
                value={value || defaultValue}
                onChange={onChange}
            >
            {this.renderOptions(options)}
          </Select>
        )
    }
}

export default Wrapper