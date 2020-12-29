import React from 'react'
import axios from "axios";
import queryString from 'query-string'
import UserPostLists from './Userpostlists'
import Loading from './Loading'
import {formatDate} from '../utils/helpers'


export default class User extends React.Component{
  constructor(props){
    super(props)
    this.state={
      posts:[],
      id:null,
      loading: true
    }

    this.postsIds = []
    this.posts = []
    this.story = []
    this.user = {}
    this.test = {}
    this.apiCall=this.apiCall.bind(this)
    this.fetchUser = this.fetchUser.bind(this)
    this.fetchUserPosts = this.fetchUserPosts.bind(this)
    this.fetchPost = this.fetchPost.bind(this)
    this.filterStory = this.filterStory.bind(this)
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

  fetchUserPosts(ids){
    return Promise.all(ids.map(this.fetchPost))
      .then(posts => posts)
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

  filterStory(posts){
    return posts.filter(post => post.type === 'story')
  }

  async fetchUser(){
    this.user = await this.apiCall()
    // console.log(this.user)
    this.postsIds = this.user.submitted
    this.posts = await this.fetchUserPosts(this.postsIds)
    this.story = await this.filterStory(this.posts)

    // console.log(this.story)
  }


  async componentDidMount(){
    await this.fetchUser()
    await this.setState({
      posts: this.story,
      loading: false
    })
  }

  // componentWillUnmount () {
  //  this.setState({posts:  []})
  // }

  render(){
    return(
      <React.Fragment>
        {this.state.loading === true && <Loading  text='Fetching info' speed='300' />}
        <div>
          <h2>{this.user.id}</h2>
          joined the {  formatDate(this.user.created) }
        </div>
        ----
        <h3>Posts</h3>
        <ul>
          {this.state.posts.map((post) =>{
            return(
            <li key={post.id}><UserPostLists
              by={post.by}
              descendants={post.descendants}
              id={post.id}
              score={post.score}
              time={post.time}
              title={post.title}
              type={post.type}
              url={post.url}
            /></li>
              )
            }
            )
          }
        </ul>
      </React.Fragment>
    )
  }

}
