import { createSlice } from '@reduxjs/toolkit'
import _ from 'underscore'

export const getCurrent = state => state.messages.current
export const getCurrentMessage = state => state.messages.byId[state.messages.current]
export const getMessageCount = state => _.keys(state.messages.byId).length

const initialState = {
  current: 1,
  byId: {
    1: { id: 1, type: 'info', text: 'You are ready to explore the stars!' },
    2: {
      id: 2,
      type: 'info',
      text: "Armed Probe #1's ram scoops have produced 1mg of fuel from interstellar hydrogen."
    }
  }
}

const messagesSlice = createSlice({
  name: 'messages',
  initialState: initialState,
  reducers: {
    selectPrevious: state => {
      state.current = state.current - 1 >= 1 ? state.current - 1 : state.current
    },
    selectNext: state => {
      state.current = state.current + 1 <= _.keys(state.byId).length ? state.current + 1 : state.current
    }
  }
})

export const { selectPrevious, selectNext } = messagesSlice.actions
export default messagesSlice.reducer
