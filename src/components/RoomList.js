import React from 'react'
export default class  RoomList extends React.Component{
  render()
  {
    const orderRooms=[...this.props.rooms].sort((a,b) => a.id>b.id)
    console.log(this.props.rooms)
    return(
      <div className="rooms-list">
        <ul>
          <h3> Your rooms : </h3>
          {orderRooms.map(room => {
              const active=this.props.roomId===room.id ? "active" : "";
              return(
              <li key={room.id} className={"room"+active}>
              <a onClick={() => this.props.subscribeToRoom(room.id)} href="#">#{room.name}</a>
              </li>)
          })}
        </ul>
      </div>
    )
  }
}
