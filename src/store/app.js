import { createSlice } from '@reduxjs/toolkit'
import { setSystemData } from './systems'
import { getPlayer, getReport, getSystems } from './server'
import { setRaceData } from './race'
import { setReportData } from './report'
import { selectSystem } from './select'
import { combineEpics, ofType } from 'redux-observable'
import { map, mergeMap, of } from 'rxjs'

const initialState = {}

const appSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    initialize: () => {},
    loadTurn: () => {}
  }
})

export const epics = combineEpics(
  (action$, state$) =>
    action$.pipe(
      ofType(initialize.type),
      map(action => ({ player: action.payload, report: getReport(state$.value, action.payload) })),
      mergeMap(({ player, report }) =>
        of(setRaceData(getPlayer(state$.value, player)), setReportData(report), setSystemData(getSystems(state$.value)))
      )
    ),
  (action$, state$) =>
    action$.pipe(
      ofType(loadTurn.type),
      map(action => ({ player: action.payload, report: getReport(state$.value, action.payload) })),
      map(({ player, report }) => ({
        player,
        home: report.systems[0],
        report: getReport(state$.value, player)
      })),
      mergeMap(({ player, home, report }) =>
        of(setRaceData(getPlayer(state$.value, player)), setReportData(report), selectSystem({ system: home.id }))
      )
    )
)

export const { initialize, loadTurn } = appSlice.actions
export default appSlice.reducer
