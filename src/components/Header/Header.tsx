import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import LayoutContainer from '../LayoutContainer'
import { RootState } from '../../redux/store'

import ButtonPanel from './ButtonPanel'
import AuthPanel from './AuthPanel/AuthPanel'
import Nav from './Nav'
import YourCity from './YourCity'
import headerStyle from './Header.module.scss'

const Header: FC = () => {
  const auth = useSelector((state: RootState) => state.servicesReducer.userAuth)

  return (
    <header className={headerStyle.header}>
      <LayoutContainer>
        <div className={headerStyle.inner}>
          <YourCity />
          <Link to={'/'} className={headerStyle.logo}>
            TeamUp Group
          </Link>
          <Nav />
          {auth ? <AuthPanel /> : <ButtonPanel />}
        </div>
      </LayoutContainer>
    </header>
  )
}

export default Header
