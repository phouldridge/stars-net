import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import appReducer, { epics as appEpics } from './app'
import systemsReducer from './systems'
import racesReducer from './race'
import optionsReducer from './options'
import reportReducer from './report'
import selectReducer from './select'
import serverReducer from './server'
import messagesReducer from './messages'
import shipsReducer from './ships'

const rootReducer = combineReducers({
  app: appReducer,
  systems: systemsReducer,
  race: racesReducer,
  options: optionsReducer,
  report: reportReducer,
  select: selectReducer,
  server: serverReducer,
  messages: messagesReducer,
  ships: shipsReducer
})

const epicMiddleware = createEpicMiddleware()
const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(epicMiddleware)
})

const rootEpic = combineEpics(appEpics)

epicMiddleware.run(rootEpic)

// store.dispatch(initialize)

export default store
