import React, { useState } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Header from './common/header'
import { login } from '../redux/reducers/main'
// import Footer from './common/footer'

/* eslint-disable */

const Main = (props) => {
  const [form, setForm] = useState({
    username: "",
    password: ""
  })
	console.log(props)
	return (
		<div className="login">
			<Header />
			<div className="login-body">
				<div className="login-body-game">
          <div className="login-body-game-label">Login</div>
          <form onSubmit={props.login}>
            <input
              type="text"
              placeholder="USERNAME"
              onChange={(e) => { setForm({ ...form, username: e.target.value} ) }}
              value={form.username}
            />
            <input
              type="text"
              placeholder="PASSWORD"
              onChange={(e) => { setForm({ ...form, password: e.target.value} ) }}
              value={form.password}
            />
            <input
              type="submit"
              value="LOGIN"
            />
          </form>
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
const mapDispatchToProps = dispatch => bindActionCreators({ login }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Main)