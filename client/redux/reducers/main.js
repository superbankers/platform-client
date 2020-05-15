/* eslint-disable */

const ADD_TO_DO_ITEM = 'ADD_TO_DO_ITEM'
const DELETE_TO_DO_ITEM = 'DELETE_TO_DO_ITEM'

// Time moves at 1 year = 1 hr
// All arrays (valuation and interest_rates) starts in the year 2000
const initialState = {
  user: {
    sid: "",
    username: "",
    email: "",
    pic: "",
  },
  profile: {
    salary: 0,
    bank_balance: 0,
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
      pic: "", // give default photo link
      risk_assessment: 8, // scale of 1 to 10, 10 being the highest
      industry: "Technology",
      valuation: [
        500000, 600000, 800000, 900000, 800000, 700000, 300000 // annual valuation rate (index 0 is current interest)
      ],
      total_shares: 500000,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam finibus ex felis, ut mollis diam porttitor sed. Aliquam ultrices dignissim egestas. Morbi mi diam, mattis maximus hendrerit ultricies, hendrerit vel neque. Suspendisse potenti. Morbi in pulvinar justo, eget rutrum quam. Vestibulum tincidunt, dolor ut porta iaculis, orci massa semper nunc, sodales ultricies enim sapien nec magna. Nullam commodo enim et blandit laoreet. Fusce elit sem, semper in dapibus ut, consequat eu turpis.",
    }
  ],
  loans: [
    {
      name: "Sample Loan", // unique identifier
      pic: "", // give default bank photo link
      bank: "",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam finibus ex felis, ut mollis diam porttitor sed. Aliquam ultrices dignissim egestas. Morbi mi diam, mattis maximus hendrerit ultricies, hendrerit vel neque. Suspendisse potenti. Morbi in pulvinar justo, eget rutrum quam. Vestibulum tincidunt, dolor ut porta iaculis, orci massa semper nunc, sodales ultricies enim sapien nec magna. Nullam commodo enim et blandit laoreet. Fusce elit sem, semper in dapibus ut, consequat eu turpis.",
      interest_rates: [9, 8, 7, 6, 5, 4, 3, 2, 1.3] // annual interest rate (index 0 is current interest)
    }
  ],
  events: [
    {
      name: "The Great Depression", // unique identifier
      pic: "", // give default photo link
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam finibus ex felis, ut mollis diam porttitor sed. Aliquam ultrices dignissim egestas. Morbi mi diam, mattis maximus hendrerit ultricies, hendrerit vel neque. Suspendisse potenti. Morbi in pulvinar justo, eget rutrum quam. Vestibulum tincidunt, dolor ut porta iaculis, orci massa semper nunc, sodales ultricies enim sapien nec magna. Nullam commodo enim et blandit laoreet. Fusce elit sem, semper in dapibus ut, consequat eu turpis."
    }
  ]
}

/* eslint-disable no-case-declarations */

export default (state = initialState, action) => {
  switch (action.type) {
    // case ADD_TO_DO_ITEM:
    //   return {
    //     ...state,
    //     todo: [
    //       ...state.todo,
    //       action.data
    //     ]
    //   }
    // case DELETE_TO_DO_ITEM:
    //   const todoArray = state.todo;
    //   todoArray.splice(action.data, 1)
    //   return {
    //     ...state,
    //     todo: todoArray
    //   }
    default:
      return state
  }
}

// export function addTodo(name) {
//   return (dispatch) => {
//     dispatch({ type: ADD_TO_DO_ITEM, data: { name } })
//   }
// }
// export function deleteTodo(index) {
//   return (dispatch) => {
//     dispatch({ type: DELETE_TO_DO_ITEM, data: index })
//     dispatch(push('/todo'))
//   }
// }

// export function historyPush(url) {
//   return (dispatch) => {
//     dispatch(push(url))
//   }
// }
