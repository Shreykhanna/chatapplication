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
      messages:[],
      joinableRooms:[],
      joinedRooms:[]
    }
    this.sendMessage=this.sendMessage.bind(this)
    this.subscribeToRoom=this.subscribeToRoom.bind(this)

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
        this.currentUser=currentUser
        this.currentUser.getJoinableRooms().then(joinableRooms =>{
          this.setState({
            joinableRooms,
            joinedRooms:this.currentUser.rooms
          })
        })
        .catch(error=>console.log("error in joinable rooms : "+error))
        this.subscribeToRoom();
           })
    .catch(error=>console.log("Error in Connecting.... : "+error))
  }
  subscribeToRoom(){
    this.currentUser.subscribeToRoom({
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
  }
    sendMessage(text){
      console.log("inside send message method")
      this.currentUser.sendMessage({
          text,
          roomId:19387809
        })
    }
 render(){
    return(
      <div className="App">
      <RoomList rooms={[...this.state.joinableRooms],[...this.state.joinedRooms]}/>
        <MessageList messages={this.state.messages}/>
        <SendMessageForm sendMessage={this.sendMessage}/>
      </div>
    );
  }
}

export default App;
