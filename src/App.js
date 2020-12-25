// import logo from './logo.svg';
import './App.css';
// import {StoriesIds} from './components/Posts'
import Loading from './components/Loading'
import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'


const topPosts = React.lazy(() => import('./components/Posts'))
const newPosts = React.lazy(() => import('./components/Posts'))
const test = React.lazy(() => import('./Test'))




function App() {
  return (
     <Router>
        <div>
          <ul>
            <li><Link to='/'>New</Link></li>
            <li><Link to='/top'>Top</Link></li>
          </ul>
          <hr />
          <React.Suspense fallback={<Loading />}>
            <Route exact path='/' component={newPosts} />
            <Route path='/top' component={topPosts} />
            <Route render={()=><h1>404</h1>} />
         </React.Suspense>
      </div>
      </Router>

    // <div className="App">
    //   <StoriesIds />

    // </div>
  );
}

export default App;


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//         <StoriesIds />
//       </header>
//     </div>
//   );
// }
