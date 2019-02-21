import React from 'react'
import Message from '../components/Message'
import ReactDom from 'react-dom'

class MessageList extends React.Component{

componenWillUpdate(){
  const node=ReactDom.findDOMNode(this)
  this.shouldScrollToBottom=node.scrollTop + node.clientHeight +100 >= node.scrollHeight
}
  componentDidUpdate(){
    if(this.shouldScrollToBottom){
    const node=ReactDom.findDOMNode(this)
    node.scrollTop=node.scrollHeight
  }
  }

  render()
  {
      if(!this.props.roomId){
        return(
          <div className="message-list">
                    <div className="join-room">
                        &larr; Join a room!
                    </div>
                </div>
        )
      }
      return(
      <div className="message-list">
        {this.props.messages.map((message,index)=>{
          return(
            <Message key={message} userName={message.sender_id} text={message.text}/>

          )
        })}
      </div>
    )
  }
}
export default MessageList
