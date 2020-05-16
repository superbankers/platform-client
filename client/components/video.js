import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Header from './common/header'
// import Footer from './common/footer'

/* eslint-disable */

const Main = (props) => {
	console.log(props)
	return (
    <div className="video">
			<Header />
			<div className="video-body">
				<div className="video-body-game">This page is currently under construction</div>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
  return {
    state
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Main)