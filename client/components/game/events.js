/* eslint-disable */
import React from 'react'
import { getHours } from '../common/helper'

const Events = (props) => {
  return (
    <div className="events">
      <div className="list-header">Events</div>
      <div className="list-seg">
        {props.events.map((event, num) => {
          if (num > getHours(props.profile.start_time)) return;
          return (
            <div className="list-seg-item">
              <img className="list-seg-item-pic" src={event.pic} />
              <div className="list-seg-item-details">
                <div className="list-seg-item-details-item">Name:</div>
                <div className="list-seg-item-details-item">Description:</div>
              </div>
              <div className="list-seg-item-details">
                <div className="list-seg-item-details-item">{event.name}</div>
                <div className="list-seg-item-details-item">{event.description}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
    
  )
}

export default Events
