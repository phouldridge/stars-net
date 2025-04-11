import React from 'react'
import { Provider } from 'react-redux'
import './index.css'
import store from './store'
import App from './components/App'
import { initialize, loadTurn } from 'store/app'
import { createRoot } from 'react-dom/client'

const root = createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
)

store.dispatch(initialize('Humanoid'))
store.dispatch(loadTurn('Humanoid'))
