var React = require('react'),
    ReactDOM = require('react-dom'),
    ApiUtil = require('./util/apiUtil'),
    Router = require('react-router').Router,
    Route = require('react-router').Route,
    IndexRoute = require('react-router').IndexRoute,
    Posts = require('./components/posts/index'),
    PostForm = require('./components/posts/form'),
    UserProfile = require('./components/users/profile'),
    Friends = require('./components/users/friends'),
    Photos = require('./components/users/photos');

var NavBar = React.createClass({
  // logOut: function () {
  //   ApiUtil.logOut(function () {
  //     this.history.pushState(null, ) // needs to be finished
  //   });
  // },
  getUserProfile: function (userId) {
    ApiUtil.fetchOneUser(userId); // fix this to only get one user
    // id so I can use the profile component to be the same for all users.
  },

  render: function () {
    return(
      <header className="homepage-header">
        <nav className="header-nav group">

          <a href="/">
            <figure className="logo-box">
              <p className="logo-letter-f">f</p>
              <p className="logo-letter-m">m</p>
            </figure>
          </a>

          <ul className="home-header-links group">

            <li className="home-header-items">
              <a href={"#/users/" + window.currentUserId}>
                <figure className="home-header-profile-link-box">
                  <h6 className="home-header-profile-link">{ window.currentUserName }</h6>
                </figure>
              </a>
            </li>

            <li className="home-header-items">
              <form className="group" action="/session" method="post">
                <input type="hidden" name="authenticity_token" value={ window.auth_token }/>
                <input type="hidden" name="_method" value="delete"/>
                <button className="home-header-log-out-button">Log out</button>
              </form>
            </li>

          </ul>

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
    <Route path="users/:id" component={UserProfile} />
    <Route path="users/:id/friendships" component={Friends} />
    <Route path="users/:id/photos" component={Photos} />
  </Route>
);

document.addEventListener("DOMContentLoaded", function (event) {
  ReactDOM.render(<Router>{ routes }</Router>, document.getElementById('root'));
});
