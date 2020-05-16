/* eslint-disable */
import React from 'react';
import Modal from 'react-modal';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { toggleLoanModal } from '../../redux/reducers/main'
 
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
const LoanModal = (props) => {
  console.log(props)
  return (
    <Modal
      isOpen={props.state.main.modals.loan.open}
      onRequestClose={() => props.toggleLoanModal(false)}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div>I am a modal</div>
      <form>
        <input />
        <button>tab navigation</button>
        <button>stays</button>
        <button>inside</button>
        <button>the modal</button>
      </form>
    </Modal>
  );
}

const mapStateToProps = (state) => {
  return {
    state
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({ 
  toggleLoanModal
 }, dispatch)
 
export default connect(mapStateToProps, mapDispatchToProps)(LoanModal)
