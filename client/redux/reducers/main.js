/* eslint-disable */

import axios from 'axios'
import { push } from 'connected-react-router'

// Time moves at 1 year = 1 hr
// All arrays (valuation and interest_rates) starts in the year 2000
// Hardcode 10 events, 10 valuations, 10 interests rates
// 3 loans, 40 stocks
const initialState = {
  user: {
    username: "User Not Available",
    email: "User Not Available",
    pic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_0ZmqP9jMF1hOSUFwCJuMtD6mzAeD1awlDJMF0FbsQ92UEo8K&s",
  },
  profile: {
    salary: 0,
    bank_balance: 0,
    start_time: "2020-05-16 10:30:22", // datetime
    loans: [{
      name: "Sample Loan", // unique identifier
      start_year: 2002,
      end_year: 2010,
    }], 
    stocks: [{
      name: "Stock Name", // unique identifier
      shares: 5
    }],
  },
  stocks: [
    {
      name: "Stock Name", // unique identifier
      pic: "https://cdn2.vectorstock.com/i/1000x1000/12/36/company-building-gradient-round-icon-vector-8301236.jpg", // give default photo link
      risk_assessment: 8, // scale of 1 to 10, 10 being the highest
      industry: "Technology",
      valuation: [
        500000, 600000, 800000, 900000, 800000, 700000, 300000, 700000, 700000, 1000000 // annual valuation rate (index 0 is current interest)
      ],
      total_shares: 500000,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam finibus ex felis, ut mollis diam porttitor sed. Aliquam ultrices dignissim egestas. Morbi mi diam, mattis maximus hendrerit ultricies, hendrerit vel neque. Suspendisse potenti. Morbi in pulvinar justo, eget rutrum quam. Vestibulum tincidunt, dolor ut porta iaculis, orci massa semper nunc, sodales ultricies enim sapien nec magna. Nullam commodo enim et blandit laoreet. Fusce elit sem, semper in dapibus ut, consequat eu turpis.",
    }
  ],
  loans: [
    {
      name: "Sample Loan", // unique identifier
      pic: "https://cdn.iconscout.com/icon/free/png-256/bank-1850789-1571030.png", // give default bank photo link
      bank: "",
      risk_assessment: 8, // scale of 1 to 10, 10 being the highest
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam finibus ex felis, ut mollis diam porttitor sed. Aliquam ultrices dignissim egestas. Morbi mi diam, mattis maximus hendrerit ultricies, hendrerit vel neque. Suspendisse potenti. Morbi in pulvinar justo, eget rutrum quam. Vestibulum tincidunt, dolor ut porta iaculis, orci massa semper nunc, sodales ultricies enim sapien nec magna. Nullam commodo enim et blandit laoreet. Fusce elit sem, semper in dapibus ut, consequat eu turpis.",
      interest_rates: [9, 8, 7, 6, 5, 4, 3, 2, 1.3, 2.2] // annual interest rate (index 0 is current interest)
    }
  ],
  events: [
    {
      name: "The Great Depression", // unique identifier
      pic: "https://png.pngtree.com/png-clipart/20200225/original/pngtree-terrible-explosion-icon-isolated-png-image_5260704.jpg", // give default photo link
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam finibus ex felis, ut mollis diam porttitor sed. Aliquam ultrices dignissim egestas. Morbi mi diam, mattis maximus hendrerit ultricies, hendrerit vel neque. Suspendisse potenti. Morbi in pulvinar justo, eget rutrum quam. Vestibulum tincidunt, dolor ut porta iaculis, orci massa semper nunc, sodales ultricies enim sapien nec magna. Nullam commodo enim et blandit laoreet. Fusce elit sem, semper in dapibus ut, consequat eu turpis."
    }
  ]
}

/* eslint-disable no-case-declarations */

export default (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: {
          ...state.user,
          username: action.data.username,
          email: action.data.email,
          pic: action.data.pic,
        },
      }
    case "LOAD_GAME":
      return {
        ...state,
        profile: action.data.profile,
        stocks: action.data.stocks,
        loans: action.data.loans,
        events: action.data.events,
      }
    default:
      return state
  }
}

export function login(username, password) {
  return (dispatch) => {
    axios({
      method: 'post',
      url: 'http://127.0.0.1:8085/api/login',
      data: { username, password }
    })
      .then(function (res) {
        console.log(res);
        // if success
        const { username, email, pic } = res;
        window.localStorage.setItem('username', username);
        window.localStorage.setItem('password', password);
        dispatch({ type: "LOGIN", data: { username, email, pic } });
        dispatch(push('/'));
      })
      .catch(function (error) {
        console.log(error);
      })
  }
}
export function loadGame() {
  return (dispatch) => {
    const username = window.localStorage.getItem("username");
    const password = window.localStorage.getItem("password");
    axios({
      method: 'get',
      url: 'http://127.0.0.1:8085/api/loadGame',
      data: { username, password }
    })
      .then(function (res) {
        console.log(res);
        // if success
        const { profile, stocks, loans, events } = res;
        dispatch({ type: "LOAD_GAME", data: { profile, stocks, loans, events } });
      })
      .catch(function (error) {
        console.log(error);
      })
  }
}

// export function historyPush(url) {
//   return (dispatch) => {
//     dispatch(push(url))
//   }
// }
