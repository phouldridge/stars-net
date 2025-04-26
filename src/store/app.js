import { createSlice } from '@reduxjs/toolkit'
import { setSystemData } from './systems'
import { getPlayer, getReport, getSystems } from './server'
import { setRaceData } from './race'
import { setReportData } from './report'
import { selectSystem } from './select'
import { combineEpics, ofType } from 'redux-observable'
import { map, mergeMap, of, tap } from 'rxjs'

export const getActiveModal = state => state.app.activeModal

const initialState = { hullIndex: 0 }

const appSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    initialize: () => {},
    loadTurn: () => {},
    setActiveModal: (state, { payload }) => {
      state.activeModal = payload
    }
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
      map(({ player, report }) => ({ player, home: report.systems[0], report })),
      tap(() => console.log(' *** state:', state$.value)),
      mergeMap(({ player, home, report }) =>
        of(setRaceData(getPlayer(state$.value, player)), setReportData(report), selectSystem({ system: home.id }))
      )
    )
)

export const { initialize, loadTurn, setActiveModal } = appSlice.actions
export default appSlice.reducer
