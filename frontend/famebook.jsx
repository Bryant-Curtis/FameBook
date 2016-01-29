var React = require('react'),
    ReactDOM = require('react-dom'),
    Router = require('react-router').Router,
    Route = require('react-router').Route,
    IndexRoute = require('react-router').IndexRoute,
    Posts = require('./components/post');

// var NavBar = React.createClass({
//   render: function () {
//     return(
      // <header class="settings-header">
      //   <nav class="header-nav group">
      //
      //     <figure class="logo-box">
      //       <p class="logo-letter-f">f</p>
      //       <p class="logo-letter-m">m</p>
      //     </figure>
      //
      //     <form class="button" action="<%= session_url %>" method="post">
      //       <%= auth_token_form %>
      //       <input type="hidden" name="_method" value="delete">
      //       <button>Log out</button>
      //     </form>
      //
      //   </nav>
      // </header>
//     )
//   }
// });


// How can I implement a header bar with a log out button as a React component?

// var App = React.createClass({
//   render: function () {
//     return(
//
//
var routes = (
  <Route path="/">
    <IndexRoute component={Posts} />
  </Route>
);
      // <div>
      //   <NavBar />
      //   <Posts />
      // </div>
//     );
//   }
// });

document.addEventListener("DOMContentLoaded", function (event) {
  ReactDOM.render(<Router>{ routes }</Router>, document.getElementById('root'));
});
