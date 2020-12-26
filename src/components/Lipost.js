import React from 'react'
import { Link } from 'react-router-dom'
import User from './User'

function ScoreLink(props){
  return(
    <Link to='/'>{this.props.score}</Link>
  )
}

function ByLink(props){
  return(
    <Link to='/'>{this.props.by}</Link>
  )
}

export default function Lipost({by,descendants,id,score,time,title,type,url}){
  return(
    <React.Fragment>
      <Link to={url} >{title}</Link>
      <h3>by <Link to={`/user?id=${by}`}>{by}</Link> on with <Link to='/'>{score}</Link> comments</h3>
    </React.Fragment>
  )
}
