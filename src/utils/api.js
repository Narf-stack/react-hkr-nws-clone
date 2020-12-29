function getLinks() {
  const type = this.props.type
  // console.log(type)
  axios
    .get(`https://hacker-news.firebaseio.com/v0/${type}stories.json`)
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

function getPosts(tab){
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
