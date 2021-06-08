import React from 'react'
import { Route } from 'react-router-dom'
import HomePage from '../HomePage'
import './styles.scss'

const App = () => (
  <div className="app-container">
    <main>
      <Route exact path="/" component={HomePage} />
    </main>
  </div>
)

export default App
