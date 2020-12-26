import React from 'react'
import axios from "axios";
import queryString from 'query-string'

export default class User extends React.Component{
  constructor(props){
    super(props)
    this.state={
      posts:[],
      id:null
    }
    this.postsIds = []
    this.posts = []
    this.user = {}
    this.test = {}
    this.apiCall=this.apiCall.bind(this)
    this.fetchUser = this.fetchUser.bind(this)
    this.fetchUserPosts = this.fetchUserPosts.bind(this)
    this.fetchPost = this.fetchPost.bind(this)
  }

  apiCall(){
    const {id} = queryString.parse(this.props.location.search)
    return axios
      .get(`https://hacker-news.firebaseio.com/v0/user/${id}.json?print=pretty`)
      .then(result => {
        if (!result.data){
          throw new Error(result.message)
        }
        return result.data
      })
  }



  async fetchUser(){
    this.user = await this.apiCall()
    // console.log(this.user)
    this.postsIds = this.user.submitted
    await this.fetchUserPosts(this.postsIds)
    console.log(this.posts)
  }

  fetchUserPosts(ids){
    return ids.map(id=>{
      // this.test = this.fetchPost(id)
      // console.log(this.test)
      // return this.test

      this.posts.push(this.fetchPost(id))
      // return this.fetchPost(id)
    })
    // return this.posts
  }

  fetchPost(id){
    return axios
      .get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
      .then(result => {
        if (!result.data){
          throw new Error(result.message)
        }
        return result.data
      })
  }

  componentDidMount(){
    this.fetchUser()
  }


  render(){

    return(
      <React.Fragment>
        hello
      </React.Fragment>

    )
  }

}
