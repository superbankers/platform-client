/* eslint-disable */
import React, { useState } from 'react';
import Modal from 'react-modal';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { toggleStockModal, buyStock, sellStock } from '../../redux/reducers/main'
import { getHours } from '../common/helper'
 
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
  const [amount, setAmount] = useState(0);
  const { name } = props.state.main.modals.stock
  const stock = props.state.main.stocks.filter((s) => s.name == name)
  const myStock = props.state.main.profile.stocks.filter((s) => s.name == name)
  return (
    <Modal
      isOpen={props.state.main.modals.stock.open}
      onRequestClose={() => props.toggleStockModal(false)}
      style={customStyles}
      contentLabel="Stock Modal"
    >
      <div
        className="icon-close modal-close"
        onClick={() => props.toggleStockModal(false)}
        role="button"
      />
      <div className="modal-top">
        <img className="modal-top-img" src={stock[0] ? stock[0].pic : ""} />
        <div className="modal-top-description">
          <div className="modal-top-description-item">Name:</div>
          <div className="modal-top-description-item">Industry:</div>
          <div className="modal-top-description-item">Risk Assessment (out of 10):</div>
          <div className="modal-top-description-item">Total Shares:</div>
          <div className="modal-top-description-item">Valuation (SGD):</div>
          <div className="modal-top-description-item">Share Price (SGD):</div>
        </div>
        <div className="modal-top-description">
          <div className="modal-top-description-item">{stock[0] ? stock[0].name : ""}</div>
          <div className="modal-top-description-item">{stock[0] ? stock[0].industry : ""}</div>
          <div className="modal-top-description-item">{stock[0] ? stock[0].risk_assessment : ""}</div>
          <div className="modal-top-description-item">{stock[0] ? stock[0].total_shares : ""}</div>
          <div className="modal-top-description-item">{stock[0] ? stock[0].valuation[getHours(props.state.main.profile.start_time)] : ""}</div>
          <div className="modal-top-description-item">{stock[0] ? (stock[0].valuation[getHours(props.state.main.profile.start_time)] / stock[0].total_shares) : ""}</div>
        </div>
      </div>
      <div className="modal-description">{stock[0] ? stock[0].description : ""}</div>
      {
        myStock.length == 0 ? (
          <div className="modal-getloan">
            <div className="modal-getloan-header">Buy Shares</div>
            <div className="d-flex">
              <div>
                <div>Number of Shares ({stock[0] ? stock[0].total_shares : ""}):</div>
                <input
                  className="modal-getloan-input"
                  type="number"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div>{amount} X {stock[0] ? (stock[0].valuation[getHours(props.state.main.profile.start_time)] / stock[0].total_shares) : ""}(share price) = {stock[0] ? (Math.round(stock[0].valuation[getHours(props.state.main.profile.start_time)] / stock[0].total_shares * amount * 100) / 100) : ""} SGD</div>
              <div
                className="modal-getloan-button"
                role="button"
                onClick={() => props.buyStock(amount, (stock[0].valuation[getHours(props.state.main.profile.start_time)] / stock[0].total_shares * amount), name, props.state.main.profile.bank_balance - (stock[0].valuation[getHours(props.state.main.profile.start_time)] / stock[0].total_shares * amount))}
              >
                Get Stocks
              </div>
            </div>
          </div>
        ) : (
          <div className="modal-repayloan">
            <div className="d-flex">
              <div>
                <div className="modal-repayloan-header">Selling Shares</div>
                <div>Number of Shares (max {myStock[0].shares}):</div>
                <input
                  className="modal-repayloan-input"
                  type="number"
                  onChange={(e) => setAmount(e.target.value)}
                />
                <div className="modal-repayloan-details">Name: {myStock[0].name}</div>
                <div className="modal-repayloan-details">No. of shares: {myStock[0].shares}</div>
                <div className="modal-repayloan-details">Date (year):{2000 + getHours(props.state.main.profile.start_time)}</div>
              </div>
              <div>
                <div>{amount} X {stock[0] ? (stock[0].valuation[getHours(props.state.main.profile.start_time)] / stock[0].total_shares) : ""}(share price) = {stock[0] ? (Math.round(stock[0].valuation[getHours(props.state.main.profile.start_time)] / stock[0].total_shares * amount * 100) / 100) : ""} SGD</div>
                <div
                  className="model-repayloan-button"
                  role="button"
                  onClick={() => props.sellStock(amount, (stock[0].valuation[getHours(props.state.main.profile.start_time)] / stock[0].total_shares * amount), name, props.state.main.profile.bank_balance - (stock[0].valuation[getHours(props.state.main.profile.start_time)] / stock[0].total_shares * amount))}
                >
                  Sell Stocks
                </div>
              </div>
            </div>
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
  toggleStockModal, buyStock, sellStock
 }, dispatch)
 
export default connect(mapStateToProps, mapDispatchToProps)(StockModal)
