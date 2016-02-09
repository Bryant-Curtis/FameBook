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

  createFriendship: function (friendRequestId, requestorId, requesteeId) {
    ApiUtil.createFriendship(requestorId, requesteeId);
    ApiUtil.deleteFriendRequest(friendRequestId, requestorId, requesteeId);
    ApiUtil.createFriendship(requesteeId, requestorId);
  },

  declineFriendRequest: function (friendRequestId, requestorId, requesteeId, event) {
    ApiUtil.declineFriendRequest(friendRequestId, requestorId, requesteeId);
  },

  // Make sure to add link to each name! --> <a href={"#/users/" + user.id}>
  // also remember to add hover - underline effect

  render: function () {
    var username = "",
        friendCount = "",
        confirmFriends = [];
    if (this.state.user && this.state.user.length !== 0) {
      if (this.state.user.id === window.currentUserId) {
        if (this.state.user.friend_requests) {
          var friendRequestor;
          UserStore.all().map(function(user) {
            this.state.user.friend_requests.map(function(friend_request) {
              if (user.id === friend_request.requestor_id && friend_request.declined === false) {
                friendRequestor = user.first_name + ' ' + user.last_name;
                confirmFriends.unshift(
                  <li key={friend_request.id} className="confirm-friend-box-info">
                    <figure className="confirm-friend-photo"></figure>
                    <section className="confirm-friend-info group">
                      <p className="confirm-friend-name"><a href={"#/users/" + user.id}>{ friendRequestor }</a></p>
                      <button className="accept-friend-button" onClick={this.createFriendship.bind(this, friend_request.id, user.id, window.currentUserId)}>Accept</button>
                      <button className="decline-friend-button" onClick={this.declineFriendRequest.bind(this, friend_request.id, user.id, window.currentUserId)}>Decline</button>
                    </section>
                  </li>
                );
              }
            }.bind(this));
          }.bind(this));
        }
      }
      username = this.state.user.first_name + " " + this.state.user.last_name;
      friendCount = this.state.user.friendships.length;
    }

    return(
      <div className="friends-main">
        <Header user={this.state.user} />
        <section className="confirm-friends group">
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
