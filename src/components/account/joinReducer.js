const JoinReducer = (state, action) => {
  switch (action.type) {
    case 'JOIN_SUBMIT':
      console.log(state);
      return state
    case 'CHANGE_DATA':
      const propData = Object.assign({}, state[action.prop], { value: action.value })
      const newState = Object.assign({}, state, { [action.prop]: propData })
      return newState
    default:
      throw new Error();
  }
}

export default JoinReducer