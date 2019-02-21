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
      roomId:null,
      messages:[],
      joinableRooms:[],
      joinedRooms:[]
    }
    this.sendMessage=this.sendMessage.bind(this)
    this.subscribeToRoom=this.subscribeToRoom.bind(this)
    this.createRoom=this.createRoom.bind(this)
    this.getRooms=this.getRooms.bind(this)

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
        this.getRooms()
      })
    .catch(error=>console.log("Error in Connecting.... : "+error))
  }

  getRooms()
  {
    this.currentUser.getJoinableRooms().then(joinableRooms =>{
      this.setState({
        joinableRooms,
        joinedRooms:this.currentUser.rooms
      })
    })
    .catch(error=>console.log("error in joinable rooms : "+error))
  }

  subscribeToRoom(roomId){
    this.setState({
      messages:[]
    })
    this.currentUser.subscribeToRoom({
    roomId: roomId,
    hooks : {
       onNewMessage:message=>{
         console.log('message.text',message.text);
         this.setState({
           messages:[...this.state.messages,message]
         })
       }
     }
   })
   .then(room=>{
     this.setState({
       roomId:room.id
     })
     this.getRooms()
   })
   .catch(err => console.log('Error in joining the rooms : ' + err))
  }
  sendMessage(text){
      console.log("inside send message method")
      this.currentUser.sendMessage({
          text,
          roomId:this.state.roomId
        })
  }
  createRoom(name){
      this.currentUser.createRoom({
        name
      })
      .then(room => this.subscribeToRoom(room.id))
      .catch(err => console.log("Error in creating the room",err))
    }
 render(){
    return(
      <div className="App">
        <RoomList
         rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
         subscribeToRoom={this.subscribeToRoom}
         roomId={this.state.roomId}/>
        <MessageList messages={this.state.messages} roomId={this.state.roomId}/>
        <SendMessageForm  disabled={!this.state.roomId} sendMessage={this.sendMessage}/>
        <NewRoomForm createRoom={this.createRoom}/>
      </div>
    );
  }
}
export default App;
