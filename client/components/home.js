import React, { useState, useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Header from './common/header'
import Events from './game/events'
import Loans from './game/loans'
import Stocks from './game/stocks'
import Profile from './game/profile'
import LoanModal from './game/loan-modal'
import StockModal from './game/stock-modal'
import SuccessModal from './game/success-modal'
// import Footer from './common/footer'

/* eslint-disable */

const Main = (props) => {
	const { user, stocks, profile, loans, events } = props.state.main;
	useEffect(() => {
    
  }, []);
	const [page, setPage] = useState("profile")
	console.log(props)
	return (
		<div className="home">
			<Header />
			<LoanModal />
			<StockModal />
			<SuccessModal />
			<div className="home-body">
				<div className="home-body-game">
					<div className="home-body-game-nav">
						<img className="home-body-game-nav-pic" src={user.pic} />
						<div>Balance: {profile.bank_balance}</div>
						<div className="home-body-game-nav-name">{user.username}</div>
						<div
							className="home-body-game-nav-link"
							onClick={() => setPage("profile")}
							role="button"
            	tabIndex={0}
						>
							Profile
						</div>
						<div
							className="home-body-game-nav-link"
							onClick={() => setPage("events")}
							role="button"
            	tabIndex={0}
						>
							Events
						</div>
						<div
							className="home-body-game-nav-link"
							onClick={() => setPage("loans")}
							role="button"
            	tabIndex={0}
						>
							Loans
						</div>
						<div
							className="home-body-game-nav-link"
							onClick={() => setPage("stocks")}
							role="button"
            	tabIndex={0}
						>
							Stocks
						</div>
					</div>
					<div className="home-body-game-body">
						{page == "profile" && <Profile user={user} profile={profile} loans={loans} stocks={stocks} />}
						{page == "events" && <Events user={user} profile={profile} loans={loans} stocks={stocks} events={events} />}
						{page == "loans" && <Loans user={user} profile={profile} loans={loans} stocks={stocks} />}
						{page == "stocks" && <Stocks user={user} profile={profile} loans={loans} stocks={stocks} />}
					</div>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
  return {
    state
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Main)