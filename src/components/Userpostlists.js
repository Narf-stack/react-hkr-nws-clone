import React from 'react'
import { Link } from 'react-router-dom'
import {formatDate} from '../utils/helpers'

function ScoreLink(props){
  return(
    <Link to='/'>{this.props.score}</Link>
  )
}

function ByLink(props){
  return(
    <Link to='#'>{this.props.by}</Link>
  )
}

export default function UserPostLists({by,descendants,id,score,time,title,type,url}){
  // console.log(url)
  return (
    <React.Fragment>
      <Link to={url} >{title}</Link>
      <h3>writen the {  formatDate(time) }, already <Link to='/'>{score}</Link> comments</h3>
    </React.Fragment>
  )
}
