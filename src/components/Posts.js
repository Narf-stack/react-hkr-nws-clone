import axios from "axios";
import React from 'react';


export class StoriesIds extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      posts: [],
      links:[]
    }
    this.getLinks = this.getLinks.bind(this)
    // this.getPosts = this.getPosts.bind(this)
    // this.getAPost = this.getAPost.bind(this)
    this.initialize = this.initialize.bind(this)
    this.posts_object=[]
  }

  componentDidMount(){
    this.initialize()
    this.setState({
      posts: this.posts_object
    })
  }

  async initialize(){
    try {
        const p = await this.getLinks();
        // await this.getPosts(this.state.links);
        console.log(p)


      } catch (error) {
        console.error(error);
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



  getLinks() {
    // const posts_object = []
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
      .then(links =>

        links.forEach(link =>
          axios.get(link)
              .then(result => result.data)
              .then(post => this.posts_object.push(post))
        )

      )
      .catch(err => {
        console.warn(err);
      });
      return this.posts_object
  }



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

  render(){
    return(
      <React.Fragment>
        <ul>
          { this.state.posts.map((post, index)=>{
              return <li key={index}>{post.title}</li>
            })
          }
        </ul>
      </React.Fragment>
    )
  }
}
