import axios from "axios";
import React from 'react';


export class StoriesIds extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      posts: [1,2],
      links:[],
      test: 'test'
    }
    this.getLinks = this.getLinks.bind(this)
    this.getPosts = this.getPosts.bind(this)
    // this.getAPost = this.getAPost.bind(this)
    this.initialize = this.initialize.bind(this)
    this.posts_object=[]
    this.linksTab =[]
    this.updatePosts = this.updatePosts.bind(this)
    this.handleTest = this.handleTest.bind(this)
  }

  componentDidMount(){
    this.initialize()
    // this.getPosts(this.linksTab)
    // this.updatePosts(this.posts_object)
  }

  updatePosts(posts) {
    this.setState({ posts: posts }, () => {
      console.log(this.state.posts, 'posts');
    });
    // await this.setState({ test: 'update' }, () => {
    //   console.log(this.state.test, 'test');
    // });
    // this.setState({ posts: posts });
  }


  getLinks() {
    axios
      .get("https://hacker-news.firebaseio.com/v0/topstories.json")
      .then(result => {
        if (!result.data){
          throw new Error(result.message)
        }
        return result.data.map(id=>{
                return `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
              })

      })
      .then(links => {
        return links.flat()
      })
      .then(tab =>{
        return this.getPosts(tab)
      })
      .then(posts => {
        this.updatePosts(posts)
      })
      .catch(err => {
        console.warn(err);
      });
  }

  getPosts(tab){
    tab.forEach(link =>
      fetch(link)
          .then(result => result.json())
          .then(post => this.posts_object.push(post))
      .catch(err => {
        console.warn(err);
      })
    )
    return this.posts_object
  }

  handleTest(){
    this.setState({
      test: 'done'
    })
    console.log(this.state.posts[0], 'posts dans test');
  }


  async initialize(){
    try {
        await this.getLinks()
      } catch (error) {
        console.error(error);
      }
  }

  render(){
    return(
      <React.Fragment>
          hehehe
          <h1>{this.state.test}</h1>
          <button onClick={this.handleTest}></button>
          {this.state.posts}
        <ul>
          {this.state.posts.map((post,index) =>(
            <li key={index}>{post.title}</li>
              )
            )
          }
        </ul>
      </React.Fragment>
    )
  }
}





















  // getLinks() {
  //   axios
  //     .get("https://hacker-news.firebaseio.com/v0/topstories.json")
  //     .then(result => {
  //       if (!result.data){
  //         throw new Error(result.message)
  //       }
  //       this.setState({
  //         links: result.data.map(id=>{
  //               return `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
  //             })
  //       })
  //     })
  //     .catch(err => {
  //       console.warn(err);
  //     });
  // }

  // getLinks() {
  //   axios
  //     .get("https://hacker-news.firebaseio.com/v0/topstories.json")
  //     .then(result => {
  //       if (!result.data){
  //         throw new Error(result.message)
  //       }
  //       return result.data.map(id=>{
  //               return `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
  //             })
  //     })
  //     .then(links =>
  //       {
  //       links.slice(0,3).forEach(link =>
  //         fetch(link)
  //             .then(result => result.json())
  //             .then(post => this.posts_object.push(post))
  //       )}

  //     )
  //     .catch(err => {
  //       console.warn(err);
  //     });
  //     return this.posts_object
  // }




  // getPosts(links) {
  //     console.log(links)
  //   links.map(link=>{
  //     axios
  //       .get(link)
  //       .then(result => {
  //         if (!result.data){
  //           throw new Error(result.message)
  //         }
  //         console.log(result.data)
  //       })
  //       .catch(err => {
  //         console.warn(err);
  //       });
  //   })

  // }

  // createLink(ids) {
  //   return ids.map(id=>{
  //               return `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
  //             })

  // }
