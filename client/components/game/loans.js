/* eslint-disable */
import React from 'react'
import cx from 'classnames'
import { getHours } from '../common/helper'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { toggleLoanModal } from '../../redux/reducers/main'

// loans: [
//   {
//     name: "Sample Loan", // unique identifier
//     pic: "https://cdn.iconscout.com/icon/free/png-256/bank-1850789-1571030.png", // give default bank photo link
//     bank: "Bank",
//     risk_assessment: 8, // scale of 1 to 10, 10 being the highest
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam finibus ex felis, ut mollis diam porttitor sed. Aliquam ultrices dignissim egestas. Morbi mi diam, mattis maximus hendrerit ultricies, hendrerit vel neque. Suspendisse potenti. Morbi in pulvinar justo, eget rutrum quam. Vestibulum tincidunt, dolor ut porta iaculis, orci massa semper nunc, sodales ultricies enim sapien nec magna. Nullam commodo enim et blandit laoreet. Fusce elit sem, semper in dapibus ut, consequat eu turpis.",
//     interest_rates: [9, 8, 7, 6, 5, 4, 3, 2, 1.3, 2.2] // annual interest rate (index 0 is current interest)
//   }
// ],

const Loans = (props) => {
  return (
    <div className="loans">
      <div className="list-header">Loans</div>
      <div className="list-seg">
        {props.loans.map((loan, num) => {
          const hours = getHours(props.profile.start_time);
          const percentChange = (loan.interest_rates[hours] - loan.interest_rates[hours > 0 ? hours - 1 : hours]) / loan.interest_rates[hours > 0 ? hours - 1 : hours]
          return (
            <div
              className="list-seg-item"
              onClick={() => props.toggleLoanModal(true, loan.name)}
              role="button"
            >
              <div className="list-seg-item-content">
                <img className="list-seg-item-pic" src={loan.pic} />
                <div className="list-seg-item-details">
                  <div className="list-seg-item-details-item">Name:</div>
                  <div className="list-seg-item-details-item">Bank:</div>
                  <div className="list-seg-item-details-item">Interest Rate:</div>
                </div>
                <div className="list-seg-item-details">
                  <div className="list-seg-item-details-item">{loan.name}</div>
                  <div className="list-seg-item-details-item">{loan.bank}</div>
                  <div className="list-seg-item-details-item">{loan.interest_rates[getHours(props.profile.start_time)]}%</div>
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
const mapDispatchToProps = dispatch => bindActionCreators({ toggleLoanModal }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Loans);
