// import logo from './logo.svg';
import './App.css';
import Posts from './components/Posts'
import Loading from './components/Loading'
import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'
// import User from './components/User'


const User = React.lazy(()=> import('./components/User'))



function App() {
  return (
     <Router>
        <div>
          <div className='row space-around'>
            <Link to='/'>New</Link>
            <Link to='/top'>Top</Link>
          </div>
          <hr />
          <React.Suspense fallback={<Loading />}>
            <Route exact path='/'  render={() => <Posts type='new'/>}  />
            <Route exact path='/top' render={() => <Posts type='top'/>}  />
            <Route exact path='/user' component={User} />
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
