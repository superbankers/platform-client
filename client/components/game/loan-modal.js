/* eslint-disable */
import React, { useState } from 'react';
import Modal from 'react-modal';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { toggleLoanModal, getLoan, repayLoan } from '../../redux/reducers/main'
import { getHours, loanRepayment } from '../common/helper'
 
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
const LoanModal = (props) => {
  const [amount, setAmount] = useState(0);
  const { name } = props.state.main.modals.loan
  const loan = props.state.main.loans.filter((l) => l.name == name)
  const myLoan = props.state.main.profile.loans.filter((l) => l.name == name)
  return (
    <Modal
      isOpen={props.state.main.modals.loan.open}
      onRequestClose={() => props.toggleLoanModal(false)}
      style={customStyles}
      contentLabel="Loan Modal"
    >
      <div
        className="icon-close modal-close"
        onClick={() => props.toggleLoanModal(false)}
        role="button"
      />
      <div className="modal-top">
        <img className="modal-top-img" src={loan[0] ? loan[0].pic : ""} />
        <div className="modal-top-description">
          <div className="modal-top-description-item">Name:</div>
          <div className="modal-top-description-item">Bank:</div>
          <div className="modal-top-description-item">Risk Assessment (out of 10):</div>
          <div className="modal-top-description-item">Interest Rate:</div>
        </div>
        <div className="modal-top-description">
          <div className="modal-top-description-item">{loan[0] ? loan[0].name : ""}</div>
          <div className="modal-top-description-item">{loan[0] ? loan[0].bank : ""}</div>
          <div className="modal-top-description-item">{loan[0] ? loan[0].risk_assessment : ""}</div>
          <div className="modal-top-description-item">{loan[0] ? loan[0].interest_rates[getHours(props.state.main.profile.start_time)] : ""}%</div>
        </div>
      </div>
      <div className="modal-description">{loan[0] ? loan[0].description : ""}</div>
      {
        myLoan.length == 0 ? (
          <div className="modal-getloan">
            <div className="modal-getloan-header">Get Loan</div>
            <div className="d-flex">
              <div>
                <div>Loan Amount:</div>
                <input
                  className="modal-getloan-input"
                  type="number"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div
                className="modal-getloan-button"
                role="button"
                onClick={() => props.getLoan(2000 + getHours(props.state.main.profile.start_time), 2003 + getHours(props.state.main.profile.start_time), name, amount, props.state.main.profile.bank_balance + amount)}
              >
                3 year loan
              </div>
              <div
                className="modal-getloan-button"
                role="button"
                onClick={() => props.getLoan(2000 + getHours(props.state.main.profile.start_time), 2005 + getHours(props.state.main.profile.start_time), name, amount, props.state.main.profile.bank_balance + amount)}
              >
                5 year loan
              </div>
              <div
                className="modal-getloan-button"
                role="button"
                onClick={() => props.getLoan(2000 + getHours(props.state.main.profile.start_time), 2007 + getHours(props.state.main.profile.start_time), name, amount, props.state.main.profile.bank_balance + amount)}
              >
                7 year loan
              </div>
            </div>
          </div>
        ) : (
          <div className="modal-repayloan">
            <div className="modal-repayloan-header">Loan Repayment</div>
            <div className="modal-repayloan-details">Name: {myLoan[0].name}</div>
            <div className="modal-repayloan-details">Loan Amount: {myLoan[0].loan_amount}</div>
            <div className="modal-repayloan-details">Start of Loan (year): {myLoan[0].start_year}</div>
            <div className="modal-repayloan-details">End of Loan (year):{myLoan[0].end_year}</div>
            <div className="modal-repayloan-details">Date (year):{2000 + getHours(props.state.main.profile.start_time)}</div>
            <div className="modal-repayloan-details">Repayment Amount (SGD):{loanRepayment(loan[0].interest_rates ,myLoan[0].start_year, 2000 + getHours(props.state.main.profile.start_time), myLoan[0].loan_amount)}</div>
            <div
              className="model-repayloan-button"
              role="button"
              onClick={() => props.repayLoan(myLoan[0].name, loanRepayment(loan[0].interest_rates ,myLoan[0].start_year, 2000 + getHours(props.state.main.profile.start_time), myLoan[0].loan_amount), props.state.main.profile.bank_balance - loanRepayment(loan[0].interest_rates ,myLoan[0].start_year, 2000 + getHours(props.state.main.profile.start_time), myLoan[0].loan_amount))}
            >Repay</div>
          </div>
        )
      }
    </Modal>
  );
}

const mapStateToProps = (state) => {
  return {
    state
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({ 
  toggleLoanModal, getLoan, repayLoan
 }, dispatch)
 
export default connect(mapStateToProps, mapDispatchToProps)(LoanModal)
