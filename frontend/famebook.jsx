var React = require('react'),
    ReactDOM = require('react-dom'),
    Router = require('react-router').Router,
    Route = require('react-router').Route,
    IndexRoute = require('react-router').IndexRoute,
    Posts = require('./components/posts/index');

var NavBar = React.createClass({
  // logOut: function () {
  //   ApiUtil.logOut(function () {
  //     this.history.pushState(null, ) // needs to be finished
  //   });
  // },

  render: function () {
    return(
      <header className="settings-header">
        <nav className="header-nav group">

          <figure className="logo-box">
            <p className="logo-letter-f">f</p>
            <p className="logo-letter-m">m</p>
          </figure>

          <form className="button" action="/session" method="post">
            <input type="hidden" name="authenticity_token" value={ window.auth_token }/>
            <input type="hidden" name="_method" value="delete"/>
            <button>Log out</button>
          </form>

        </nav>
      </header>
    );
  }
});

var App = React.createClass({
  render: function () {
    return(
      <div>
        <NavBar />
        {this.props.children}
      </div>
    );
  }
});

var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Posts} />
  </Route>
);

document.addEventListener("DOMContentLoaded", function (event) {
  ReactDOM.render(<Router>{ routes }</Router>, document.getElementById('root'));
});
