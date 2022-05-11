import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import { ModeratorPage } from './pages/ModeratorPage'
import Layout from './components/Layout'
import Home from './pages/Home'
import { SignInPage, SignUpPage } from './pages/SignPage'
import PeoplePage from './pages/People/PeoplePage'
import EventsList from './pages/EventsList'
import PersonalArea from './pages/PersonalArea/PersonalArea'

const App = () => {
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="people" element={<PeoplePage />} />
          <Route path="events/:city" element={<EventsList />} />
          <Route path="personal-area" element={<PersonalArea />} />
        </Route>
        <Route path="moderator" element={<ModeratorPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
      </Routes>
    </AnimatePresence>
  )
}

export default App
