/* eslint-disable */
import React from 'react';
import Modal from 'react-modal';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { toggleEventModal } from '../../redux/reducers/main'
 
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    maxWidth: '50vw',
    background: 'rgb(197, 193, 255)'
  }
};
const EventModal = (props) => {
  const { index } = props.state.main.modals.event
  const event = props.state.main.events[index]
  return (
    <Modal
      isOpen={props.state.main.modals.event.open}
      onRequestClose={() => props.toggleEventModal(false)}
      style={customStyles}
      contentLabel="Event Modal"
    >
      <div
        className="icon-close modal-close"
        onClick={() => props.toggleEventModal(false)}
        role="button"
      />
      <div className="modal-event-title">{event.name}</div>
      <img className="modal-event-pic" src={event.pic} />
      <div className="modal-event-description">{event.description}</div>
    </Modal>
  );
}

const mapStateToProps = (state) => {
  return {
    state
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({ 
  toggleEventModal
 }, dispatch)
 
export default connect(mapStateToProps, mapDispatchToProps)(EventModal)
