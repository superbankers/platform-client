/* eslint-disable */
import React from 'react';
import Modal from 'react-modal';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { toggleSuccessModal } from '../../redux/reducers/main'
 
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    maxWidth: '70vw',
    background: 'rgb(197, 193, 255)'
  }
};
const StockModal = (props) => {
  return (
    <Modal
      isOpen={props.state.main.modals.success.open}
      onRequestClose={() => props.toggleSuccessModal(false)}
      style={customStyles}
      contentLabel="Success Modal"
    >
      <div
        className="icon-close modal-close"
        onClick={() => props.toggleSuccessModal(false)}
        role="button"
      />
      {props.state.main.modals.success.success ? (
        <div>
          <div className="modal-success icon-check" />
          <div className="modal-success">Success</div>
        </div>
      ) : (
        <div>
          <div className="icon-close modal-success error" />
          <div className="modal-success error">Error</div>
        </div>
      )}
      
    </Modal>
  );
}

const mapStateToProps = (state) => {
  return {
    state
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({ 
  toggleSuccessModal
 }, dispatch)
 
export default connect(mapStateToProps, mapDispatchToProps)(StockModal)
