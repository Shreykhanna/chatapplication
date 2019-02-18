import React from 'react'

class SendMessageForm extends React.Component{
  constructor(){
    super()
  this.state={
    message:''
}
this.handleChange=this.handleChange.bind(this);
this.handleSubmit=this.handleSubmit.bind(this);
}
  handleChange(event){
    this.setState({
      message:event.target.value
    })
  }
  handleSubmit(event){
        event.preventDefault()
        this.props.sendMessage(this.state.message)
        this.setState({
          message:''
        })
  }
render()
{
  console.log(this.state.message);
  return(
  <form  className="send-message-form" onSubmit={this.handleSubmit}>
  <input type="text" onChange={this.handleChange} value={this.state.message} placeholder="Type your message here"/>
  </form>
  )
}
}
export default SendMessageForm
