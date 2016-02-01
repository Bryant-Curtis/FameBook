var React = require('react'),
    ApiUtil = require('../../util/apiUtil'),
    FamebookConstants = require('../../constants/famebookConstants'),
    UserStore = require('../../stores/userStore');

var Header = React.createClass({
  render: function () {
    return(
      <header className="profile-header">
        <figure className="profile-header-photo"></figure>
        <figure className="profile-user-photo"></figure>
        <figure className="profile-username"></figure>
        <nav className="profile-nav">
          <ul className="group">
            <li className="profile-nav-timeline">Timeline</li>
            <li className="profile-nav-basic-info">Basic Info</li>
            <li className="profile-nav-friends">Friends</li>
          </ul>
        </nav>
      </header>
    );
  }
});

var UserProfile = React.createClass({
  getInitialState: function () {
    return { profile: UserStore.find() };
  },

  componentDidMount: function () {
    UserStore.addListener(this._onChange);
  },

  render: function () {
    return(
      <Header />
    );
  },

  _onChange: function () {
    this.setState({ profile: UserStore.find() });
  }

});

module.exports = UserProfile;
