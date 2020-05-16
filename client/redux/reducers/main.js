/* eslint-disable */

import axios from 'axios'
import { push } from 'connected-react-router'
import { getHours } from '../../components/common/helper'

// Time moves at 1 year = 1 hr
// All arrays (valuation and interest_rates) starts in the year 2000
// Hardcode 10 events, 10 valuations, 10 interests rates
// 3 loans, 40 stocks
const initialState = {
  modals: {
    loan: {
      open: false,
      name: ""
    },
    stock: {
      open: false,
      name: ""
    },
    success: {
      open: false,
      success: false
    },
    event: {
      open: false,
      index: 0
    }
  },
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
      loan_amount: 100,
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
      bank: "DBS",
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
    },
    {
      name: "The Great Depression", // unique identifier
      pic: "https://png.pngtree.com/png-clipart/20200225/original/pngtree-terrible-explosion-icon-isolated-png-image_5260704.jpg", // give default photo link
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam finibus ex felis, ut mollis diam porttitor sed. Aliquam ultrices dignissim egestas. Morbi mi diam, mattis maximus hendrerit ultricies, hendrerit vel neque. Suspendisse potenti. Morbi in pulvinar justo, eget rutrum quam. Vestibulum tincidunt, dolor ut porta iaculis, orci massa semper nunc, sodales ultricies enim sapien nec magna. Nullam commodo enim et blandit laoreet. Fusce elit sem, semper in dapibus ut, consequat eu turpis."
    },
    {
      name: "The Great Depression", // unique identifier
      pic: "https://png.pngtree.com/png-clipart/20200225/original/pngtree-terrible-explosion-icon-isolated-png-image_5260704.jpg", // give default photo link
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam finibus ex felis, ut mollis diam porttitor sed. Aliquam ultrices dignissim egestas. Morbi mi diam, mattis maximus hendrerit ultricies, hendrerit vel neque. Suspendisse potenti. Morbi in pulvinar justo, eget rutrum quam. Vestibulum tincidunt, dolor ut porta iaculis, orci massa semper nunc, sodales ultricies enim sapien nec magna. Nullam commodo enim et blandit laoreet. Fusce elit sem, semper in dapibus ut, consequat eu turpis."
    },
    {
      name: "The Great Depression", // unique identifier
      pic: "https://png.pngtree.com/png-clipart/20200225/original/pngtree-terrible-explosion-icon-isolated-png-image_5260704.jpg", // give default photo link
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam finibus ex felis, ut mollis diam porttitor sed. Aliquam ultrices dignissim egestas. Morbi mi diam, mattis maximus hendrerit ultricies, hendrerit vel neque. Suspendisse potenti. Morbi in pulvinar justo, eget rutrum quam. Vestibulum tincidunt, dolor ut porta iaculis, orci massa semper nunc, sodales ultricies enim sapien nec magna. Nullam commodo enim et blandit laoreet. Fusce elit sem, semper in dapibus ut, consequat eu turpis."
    },
    {
      name: "The Great Depression", // unique identifier
      pic: "https://png.pngtree.com/png-clipart/20200225/original/pngtree-terrible-explosion-icon-isolated-png-image_5260704.jpg", // give default photo link
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam finibus ex felis, ut mollis diam porttitor sed. Aliquam ultrices dignissim egestas. Morbi mi diam, mattis maximus hendrerit ultricies, hendrerit vel neque. Suspendisse potenti. Morbi in pulvinar justo, eget rutrum quam. Vestibulum tincidunt, dolor ut porta iaculis, orci massa semper nunc, sodales ultricies enim sapien nec magna. Nullam commodo enim et blandit laoreet. Fusce elit sem, semper in dapibus ut, consequat eu turpis."
    },
    {
      name: "The Great Depression", // unique identifier
      pic: "https://png.pngtree.com/png-clipart/20200225/original/pngtree-terrible-explosion-icon-isolated-png-image_5260704.jpg", // give default photo link
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam finibus ex felis, ut mollis diam porttitor sed. Aliquam ultrices dignissim egestas. Morbi mi diam, mattis maximus hendrerit ultricies, hendrerit vel neque. Suspendisse potenti. Morbi in pulvinar justo, eget rutrum quam. Vestibulum tincidunt, dolor ut porta iaculis, orci massa semper nunc, sodales ultricies enim sapien nec magna. Nullam commodo enim et blandit laoreet. Fusce elit sem, semper in dapibus ut, consequat eu turpis."
    },
    {
      name: "The Great Depression", // unique identifier
      pic: "https://png.pngtree.com/png-clipart/20200225/original/pngtree-terrible-explosion-icon-isolated-png-image_5260704.jpg", // give default photo link
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam finibus ex felis, ut mollis diam porttitor sed. Aliquam ultrices dignissim egestas. Morbi mi diam, mattis maximus hendrerit ultricies, hendrerit vel neque. Suspendisse potenti. Morbi in pulvinar justo, eget rutrum quam. Vestibulum tincidunt, dolor ut porta iaculis, orci massa semper nunc, sodales ultricies enim sapien nec magna. Nullam commodo enim et blandit laoreet. Fusce elit sem, semper in dapibus ut, consequat eu turpis."
    },
    {
      name: "The Great Depression", // unique identifier
      pic: "https://png.pngtree.com/png-clipart/20200225/original/pngtree-terrible-explosion-icon-isolated-png-image_5260704.jpg", // give default photo link
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam finibus ex felis, ut mollis diam porttitor sed. Aliquam ultrices dignissim egestas. Morbi mi diam, mattis maximus hendrerit ultricies, hendrerit vel neque. Suspendisse potenti. Morbi in pulvinar justo, eget rutrum quam. Vestibulum tincidunt, dolor ut porta iaculis, orci massa semper nunc, sodales ultricies enim sapien nec magna. Nullam commodo enim et blandit laoreet. Fusce elit sem, semper in dapibus ut, consequat eu turpis."
    },
    {
      name: "The Great Depression", // unique identifier
      pic: "https://png.pngtree.com/png-clipart/20200225/original/pngtree-terrible-explosion-icon-isolated-png-image_5260704.jpg", // give default photo link
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam finibus ex felis, ut mollis diam porttitor sed. Aliquam ultrices dignissim egestas. Morbi mi diam, mattis maximus hendrerit ultricies, hendrerit vel neque. Suspendisse potenti. Morbi in pulvinar justo, eget rutrum quam. Vestibulum tincidunt, dolor ut porta iaculis, orci massa semper nunc, sodales ultricies enim sapien nec magna. Nullam commodo enim et blandit laoreet. Fusce elit sem, semper in dapibus ut, consequat eu turpis."
    },
    {
      name: "The Great Depression", // unique identifier
      pic: "https://png.pngtree.com/png-clipart/20200225/original/pngtree-terrible-explosion-icon-isolated-png-image_5260704.jpg", // give default photo link
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam finibus ex felis, ut mollis diam porttitor sed. Aliquam ultrices dignissim egestas. Morbi mi diam, mattis maximus hendrerit ultricies, hendrerit vel neque. Suspendisse potenti. Morbi in pulvinar justo, eget rutrum quam. Vestibulum tincidunt, dolor ut porta iaculis, orci massa semper nunc, sodales ultricies enim sapien nec magna. Nullam commodo enim et blandit laoreet. Fusce elit sem, semper in dapibus ut, consequat eu turpis."
    }
  ],
  social: [
    {
      username: "User Not Available",
      email: "User Not Available",
      valuation: 1920,
      pic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_0ZmqP9jMF1hOSUFwCJuMtD6mzAeD1awlDJMF0FbsQ92UEo8K&s",
    },
    {
      username: "User Not Available",
      email: "User Not Available",
      valuation: 1922,
      pic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_0ZmqP9jMF1hOSUFwCJuMtD6mzAeD1awlDJMF0FbsQ92UEo8K&s",
    },
    {
      username: "User Not Available",
      email: "User Not Available",
      valuation: 3220,
      pic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_0ZmqP9jMF1hOSUFwCJuMtD6mzAeD1awlDJMF0FbsQ92UEo8K&s",
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
          pic: action.data.pic
        },
      }
    case "LOAD_GAME":
      return {
        ...state,
        ...action.data
      }
    case "LOAN_MODAL":
      return {
        ...state,
        modals: {
          ...state.modals,
          loan: {
            ...state.modals.loan,
            open: action.data.bool,
            name: action.data.name
          }
        } 
      }
    case "STOCK_MODAL":
      return {
        ...state,
        modals: {
          ...state.modals,
          stock: {
            ...state.modals.stock,
            open: action.data.bool,
            name: action.data.name
          }
        } 
      }
    case "SUCCESS_MODAL":
      return {
        ...state,
        modals: {
          ...state.modals,
          success: {
            ...state.modals.success,
            open: action.data.bool,
            success: action.data.success
          }
        } 
      }
    case "EVENT_MODAL":
      return {
        ...state,
        modals: {
          ...state.modals,
          event: {
            ...state.modals.event,
            open: action.data.bool,
            index: action.data.index
          }
        } 
      }
    case "GET_LOAN":
      return {
        ...state,
        profile: {
          ...state.profile,
          bank_balance: action.data.bank_balance,
          loans: [
            ...state.profile.loans,
            action.data.loans
          ]
        }
      }
    case 'REPAY_LOAN':
      const loans = state.profile.loans.filter((l) => l.name != action.data.loan);
      return {
        ...state,
        profile: {
          ...state.profile,
          bank_balance: action.data.bank_balance,
          loans
        }
      }
    case "BUY_STOCK":
      return {
        ...state,
        profile: {
          ...state.profile,
          bank_balance: action.data.bank_balance,
          stocks: action.data.stocks
        }
      }
    case "SELL_STOCK":
      return {
        ...state,
        profile: {
          ...state.profile,
          bank_balance: action.data.bank_balance,
          stocks: action.data.stocks
        }
      }
    default:
      return state
  }
}

export function restartGame() {
  return (dispatch) => {
    const username = window.localStorage.getItem("username");
    const password = window.localStorage.getItem("password");
    axios({
      method: 'put',
      url: 'http://127.0.0.1:8085/api/restartGame',
      data: { username, password }
    })
      .then(function (res) {
        console.log(res);
        // if success
        window.location = '/'
      })
      .catch(function (error) {
        console.log(error);
      })
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
      method: 'post',
      url: 'http://127.0.0.1:8085/api/loadGame',
      data: { username, password }
    })
      .then(function (res) {
        console.log(res);
        // if success
        const { profile } = res.data;
        dispatch({ type: "LOAD_GAME", data: {
          profile: res.data.profile,
          stocks: res.data.stocks,
          loans: res.data.loans,
          events: res.data.events,
          user: {
            username,
            email: username,
            pic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_0ZmqP9jMF1hOSUFwCJuMtD6mzAeD1awlDJMF0FbsQ92UEo8K&s"
          }
        } });
        dispatch(toggleEventModal(true, getHours(profile.start_time)))
      })
      .catch(function (error) {
        console.log(error);
      })
  }
}

export function toggleLoanModal(bool, name="") {
  return (dispatch) => {
    dispatch({ type: "LOAN_MODAL", data: { bool, name } })
  }
}

export function toggleStockModal(bool, name="") {
  return (dispatch) => {
    dispatch({ type: "STOCK_MODAL", data: { bool, name } })
  }
}

export function toggleSuccessModal(bool, success=true) {
  return (dispatch) => {
    dispatch({ type: "SUCCESS_MODAL", data: { bool, success } })
  }
}

export function toggleEventModal(bool, index=0) {
  return (dispatch) => {
    dispatch({ type: "EVENT_MODAL", data: { bool, index } })
  }
}

export function getLoan(start_year, end_year, name, amount, balance) {
  return (dispatch) => {
    const username = window.localStorage.getItem("username");
    const password = window.localStorage.getItem("password");
    axios({
      method: 'post',
      url: 'http://127.0.0.1:8085/api/loans/applyLoan',
      data: {
        start: start_year,
        end: end_year,
        name,
        username: "test@email.com",
        amount: parseInt(amount)
      }
    })
      .then(function (res) {
        console.log(res);
        // if success
        dispatch({
          type: "GET_LOAN",
          data: {
            loan: { name, loan_amount: amount, start_year, end_year },
            bank_balance: balance
          }
        });
        dispatch(toggleSuccessModal(true, true));
      })
      .catch(function (error) {
        console.log(error);
        dispatch(toggleSuccessModal(true, false));
      })
  }
}

export function repayLoan(name, repayment_amount, balance) {
  return (dispatch) => {
    const username = window.localStorage.getItem("username");
    const password = window.localStorage.getItem("password");
    axios({
      method: 'post',
      url: 'http://127.0.0.1:8085/api/loans/repayLoan',
      data: { name, repayment_amount, username, password }
    })
      .then(function (res) {
        console.log(res);
        // if success
        dispatch({
          type: "REPAY_LOAN",
          data: {
            loan: name,
            bank_balance: balance
          }
        });
        dispatch(toggleSuccessModal(true, true));
      })
      .catch(function (error) {
        console.log(error);
        dispatch(toggleSuccessModal(true, false));
      })
  }
}


export function buyStock(shares, value, name, balance) {
  return (dispatch) => {
    const username = window.localStorage.getItem("username");
    const password = window.localStorage.getItem("password");
    axios({
      method: 'post',
      url: 'http://127.0.0.1:8085/api/stocks/buy',
      data: { shares, value, name, username, password }
    })
      .then(function (res) {
        console.log(res);
        // if success
        dispatch({
          type: "BUY_STOCK",
          data: {
            stocks: res.data,
            bank_balance: balance
          }
        });
        dispatch(toggleSuccessModal(true, true));
      })
      .catch(function (error) {
        console.log(error);
        dispatch(toggleSuccessModal(true, false));
      })
  }
}

export function sellStock(shares, value, name, balance) {
  return (dispatch) => {
    const username = window.localStorage.getItem("username");
    const password = window.localStorage.getItem("password");
    axios({
      method: 'post',
      url: 'http://127.0.0.1:8085/api/stocks/sell',
      data: { shares, value, name, username, password }
    })
      .then(function (res) {
        console.log(res);
        // if success
        dispatch({
          type: "SELL_STOCK",
          data: {
            stocks: res.data,
            bank_balance: balance
          }
        });
        dispatch(toggleSuccessModal(true, true));
      })
      .catch(function (error) {
        console.log(error);
        dispatch(toggleSuccessModal(true, false));
      })
  }
}

// export function historyPush(url) {
//   return (dispatch) => {
//     dispatch(push(url))
//   }
// }
