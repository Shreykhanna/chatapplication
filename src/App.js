import React, { Component } from 'react';
import './App.css';
import MessageList from './components/MessageList'
import NewRoomForm from './components/NewRoomForm'
import RoomList from './components/RoomList'
import SendMessageForm from './components/SendMessageForm'
import ChatKit from '@pusher/chatkit'
import {tokenUrl,instanceLocator} from './config'

class App extends Component {
  constructor()
  {
    super()
    this.state={
      messages:[]
    }
}

  componentDidMount(){
    const chatManager=new ChatKit.ChatManager({
      instanceLocator,
      userId : 'tester',
      tokenProvider:new ChatKit.TokenProvider({
      url:tokenUrl
      })
    })
      chatManager.connect().then(currentUser=>
      {
        currentUser.subscribeToRoom({
          roomId: 19387809,
          hooks : {
             onNewMessage:message=>{
               console.log('message.text',message.text);
               this.setState({
                 messages:[...this.state.messages,message]
               })
             }
           }
         })
    });

}
  render(){
    return(
      <div className="App">
        
        <MessageList messages={this.state.messages}/>

      </div>
    );
  }
}

export default App;
