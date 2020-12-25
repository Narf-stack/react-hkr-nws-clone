import React from 'react'
// import Posts from './Posts'
import {NavLink} from 'react-router-dom'



export default function Nav(){
  return(
    <nav className='row space-between'>
      <ul className='row nav'>
        <li>
          <NavLink
            to='/'
            exact
            activeStyle={activeStyle}
            className='nav-link'
            >Popular</NavLink>
        </li>
        <li>
          <NavLink
            to='/battle'
            activeStyle={activeStyle}
            className='nav-link'
            >Battle</NavLink>
        </li>
      </ul>
      <button
        style={{fontSize: 30}}
        className='btn-clear'
        onClick={toggleTheme}
      >

      </button>
    </nav>

  )
}
