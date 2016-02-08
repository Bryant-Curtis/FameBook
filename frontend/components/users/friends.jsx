var React = require('react'),
    ApiUtil = require('../../util/apiUtil'),
    FamebookConstants = require('../../constants/famebookConstants'),
    UserStore = require('../../stores/userStore'),
    PostStore = require('../../stores/postStore'),
    Header = require('./header'),
    PostForm = require('../posts/form'),
    ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var Friends = React.createClass({
  getInitialState: function () {
    return { user: UserStore.find(parseInt(this.props.params.id)) };
  },

  componentDidMount: function () {
    this.userToken = UserStore.addListener(this._onChange);
    // ApiUtil.fetchOneUser(parseInt(this.props.params.id));

    ApiUtil.fetchAllUsers();
    // this.postToken = PostStore.addListener(this._onPostsChange);
    // ApiUtil.fetchPosts(parseInt(this.props.params.id));
  },

  componentWillUnmount: function () {
    this.userToken.remove();
    // this.postToken.remove();
  },

  componentWillReceiveProps: function (newProps) {
    // ApiUtil.fetchOneUser(parseInt(this.props.params.id));
    ApiUtil.fetchAllUsers();

    this.setState({ user: UserStore.find(parseInt(newProps.params.id)) });
  },

  createFriendship: function (requestorId, requesteeId) {
    ApiUtil.createFriendship(requestorId, requesteeId);
    ApiUtil.createFriendship(requesteeId, requestorId);
  },

  render: function () {
    var username = "",
        friendCount = "",
        confirmFriends;
    if (this.state.user && this.state.user.length !== 0) {
      if (this.state.user.id === window.currentUserId) {
        if (this.state.user.friend_request_id) {
          var friendRequestor;
          UserStore.all().forEach(function(user) {
            if (user.id === this.state.user.friend_request_id) {
              friendRequestor = user.first_name + ' ' + user.last_name;
              confirmFriends = (
                <section className="confirm-friend-box-info group">
                  <figure className="confirm-friend-photo"></figure>
                  <section className="confirm-friend-info group">
                    <p className="confirm-friend-name">{ friendRequestor }</p>
                    <button className="accept-friend-button" onClick={this.createFriendship.bind(this, user.id, window.currentUserId)}>Accept</button>
                    <button className="decline-friend-button" onClick={this.declineFriendship}>Decline</button>
                  </section>
                </section>
              );
            }
          }.bind(this));
        }
      }
      username = this.state.user.first_name + " " + this.state.user.last_name;
      friendCount = this.state.user.friendships.length;
    }

    var ConfirmFriends;

    return(
      <div className="friends-main">
        <Header user={this.state.user} />
        <section className="confirm-friends">
          <header className="confirm-friends-list-header">Friend Requests</header>
            { confirmFriends }
          <section className="confirm-friends-list-main">
            <section className="confirm-friend-box group">

            </section>
          </section>
        </section>

        <section className="friends-list">
          <header className="friends-list-header">Friends</header>
          <section className="friends-list-main">
            <section className="friend-box group">
              <section className="friend-box-info group">
                <figure className="friend-photo"></figure>
                <section className="friend-info">
                  <p className="friend-name">{ username }</p>
                  <h6 className="friend-friend-count">{ friendCount } friends</h6>
                </section>
            </section>
            </section>
          </section>
        </section>
      </div>
    );
  },

  _onChange: function () {
    this.setState({ user: UserStore.find(parseInt(this.props.params.id)) });
  }

});

module.exports = Friends;
