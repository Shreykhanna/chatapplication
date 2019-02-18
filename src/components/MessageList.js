import React from 'react'
import Message from '../components/Message'

class MessageList extends React.Component{

  render()
  {
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
