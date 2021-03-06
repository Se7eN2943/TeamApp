import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './App'
import store from './redux/store'

const app = (
  <Router>
    <Provider store={store()}>
      <App />
    </Provider>
  </Router>
)

render(app, document.getElementById('root'))
