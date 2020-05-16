/* eslint-disable */
import React from 'react'

const Social = (props) => {
  return (
    <div className="events">
      <div className="list-header">Social</div>
      <div className="list-seg">
        {props.social.map((s, num) => {
          return (
            <div className="list-seg-item">
              <img className="list-seg-item-pic" src={s.pic} />
              <div className="list-seg-item-details">
                <div className="list-seg-item-details-item">Name:</div>
                <div className="list-seg-item-details-item">Email:</div>
                <div className="list-seg-item-details-item">Valuation:</div>
              </div>
              <div className="list-seg-item-details">
                <div className="list-seg-item-details-item">{s.username}</div>
                <div className="list-seg-item-details-item">{s.email}</div>
                <div className="list-seg-item-details-item">{s.valuation}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
    
  )
}

export default Social
