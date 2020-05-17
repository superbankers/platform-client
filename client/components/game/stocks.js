/* eslint-disable */
import React from 'react'
import cx from 'classnames'
import { getHours } from '../common/helper'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { toggleStockModal } from '../../redux/reducers/main'

const Stocks = (props) => {
  return (
    <div className="stocks">
      <div className="list-header">Stocks</div>
      <div className="list-seg">
        {props.stocks.map((stock, num) => {
          const listStock = props.stocks.filter(s => s.name == stock.name)[0];
          const hours = getHours(props.profile.start_time);
          const percentChange = listStock.valuation[hours] - listStock.valuation[hours > 0 ? hours - 1 : hours]
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
                  <div className="list-seg-item-details-item">{stock.shares ? stock.shares : 0}</div>
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
const mapDispatchToProps = dispatch => bindActionCreators({ 
  toggleStockModal
 }, dispatch)
 
export default connect(mapStateToProps, mapDispatchToProps)(Stocks)
