import React, { useState } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Header from './common/header'
import Events from './game/events'
import Loans from './game/loans'
import Stocks from './game/stocks'
import Profile from './game/profile'
// import Footer from './common/footer'

/* eslint-disable */

const Main = (props) => {
	const [page, setPage] = useState("profile")
	console.log(props)
	return (
		<div className="home">
			<Header />
			<div className="home-body">
				<div className="home-body-game">
					<div className="home-body-game-nav">
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
						{page == "profile" && <Profile />}
						{page == "events" && <Events />}
						{page == "loans" && <Loans />}
						{page == "stocks" && <Stocks />}
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