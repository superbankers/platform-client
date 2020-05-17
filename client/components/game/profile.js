/* eslint-disable */
import React from 'react'
import cx from 'classnames'
import { getHours } from '../common/helper'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { toggleLoanModal, toggleStockModal, restartGame } from '../../redux/reducers/main'

const Profile = (props) => {
  const hours = getHours(props.profile.start_time);
  return (
    <div className="profile">
      <div className="list-header">Profile</div>
      <div
        className="icon-refresh modal-close"
        onClick={() => props.restartGame()}
        role="button"
      >
        Restart Game
      </div>
      <div className="profile-details">Username: {props.user.username}</div>
      <div className="profile-details">Email: {props.user.email}</div>
      <div className="profile-details">Salary: {props.profile.salary}</div>
      <div className="profile-details">Bank Balance: {props.profile.bank_balance}</div>
      <div className="profile-details">Start Year: 2000</div>
      <div className="profile-details">Current Year: {2000 + getHours(props.profile.start_time)}</div>
      <div className="list-header">Loans</div>
      <div className="list-seg">
        {props.profile.loans.map((loan, num) => {
          const listLoan = props.loans.filter(l => l.name == loan.name)[0];
          const percentChange = (listLoan.interest_rates[hours] - listLoan.interest_rates[hours > 0 ? hours - 1 : hours]) / listLoan.interest_rates[hours > 0 ? hours - 1 : hours]
          return (
            <div
              className="list-seg-item"
              onClick={() => props.toggleLoanModal(true, loan.name)}
              role="button"
            >
              <div className="list-seg-item-content">
                <img className="list-seg-item-pic" src={listLoan.pic} />
                <div className="list-seg-item-details">
                  <div className="list-seg-item-details-item">Name:</div>
                  <div className="list-seg-item-details-item">Loan Start:</div>
                  <div className="list-seg-item-details-item">Loan End:</div>
                  <div className="list-seg-item-details-item">Interest Rate:</div>
                </div>
                <div className="list-seg-item-details">
                  <div className="list-seg-item-details-item">{listLoan.name}</div>
                  <div className="list-seg-item-details-item">{loan.start_year}</div>
                  <div className="list-seg-item-details-item">{loan.end_year}</div>
                  <div className="list-seg-item-details-item">{listLoan.interest_rates[getHours(props.profile.start_time)]}%</div>
                </div>
              </div>
              <div className={cx("indicator", {
                "neg": percentChange < 0,
                "pos": percentChange > 0,
                "equal": percentChange == 0
              })}>
                <div className={cx("indicator-arrow", {
                  "icon-arrow-up": percentChange > 0,
                  "icon-arrow-down": percentChange < 0,
                  "icon-clock": percentChange == 0,
                })} />
                <div className="indicator-value">{parseInt(percentChange * 100) / 100}</div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="list-header">Stocks</div>
      <div className="list-seg">
        {props.profile.stocks.map((stock, num) => {
          const listStock = props.stocks.filter(s => s.name == stock.name)[0];
          const percentChange = (listStock.valuation[hours] - listStock.valuation[hours > 0 ? hours - 1 : hours]) / listStock.valuation[hours > 0 ? hours - 1 : hours]
          return (
            <div
              className="list-seg-item"
              onClick={() => props.toggleStockModal(true, stock.name)}
              role="button"
            >
              <div className="list-seg-item-content">
                <img className="list-seg-item-pic" src={listStock.pic} />
                <div className="list-seg-item-details">
                  <div className="list-seg-item-details-item">Name:</div>
                  <div className="list-seg-item-details-item">No. Shares owned:</div>
                  <div className="list-seg-item-details-item">Share Price:</div>
                  <div className="list-seg-item-details-item">Value:</div>
                </div>
                <div className="list-seg-item-details">
                  <div className="list-seg-item-details-item">{listStock.name}</div>
                  <div className="list-seg-item-details-item">{stock.shares}</div>
                  <div className="list-seg-item-details-item">{listStock.valuation[getHours(props.profile.start_time)] / listStock.total_shares}</div>
                  <div className="list-seg-item-details-item">{(listStock.valuation[getHours(props.profile.start_time)] / listStock.total_shares) * stock.shares}</div>
                </div>
              </div>
              <div className={cx("indicator", {
                "neg": percentChange < 0,
                "pos": percentChange > 0,
                "equal": percentChange == 0
              })}>
                <div className={cx("indicator-arrow", {
                  "icon-arrow-up": percentChange > 0,
                  "icon-arrow-down": percentChange < 0,
                  "icon-clock": percentChange == 0,
                })} />
                <div className="indicator-value">{parseInt(percentChange * 100) / 100}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    state
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({ toggleLoanModal, toggleStockModal, restartGame }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
