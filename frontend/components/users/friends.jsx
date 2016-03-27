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
    ApiUtil.createFriendship(requesteeId, requestorId);
    ApiUtil.deleteFriendRequest(friendRequestId);
  },

  declineFriendRequest: function (friendRequestId, event) {
    ApiUtil.deleteFriendRequest(friendRequestId);
  },

  render: function () {
    var username = "",
        friendCount = "",
        friendRequestsList = [],
        friendList = [],
        noFriendsMessage = "",
        noFriendRequestsMessage = "",
        currentPageUser = "";
    if (this.state.user && this.state.user.length !== 0) {
      currentPageUser = this.state.user;

      // FRIENDS LIST

      if (this.state.user.friends.length === 0) {
        noFriendsMessage = <p className="no-friends-message">No friends to show</p>
      }
      if (this.state.user.received_friend_requests.length === 0) {
        noFriendRequestsMessage = <p className="no-friend-requests-message">No new requests</p>
      }

      if (this.state.user.friends) {
        this.state.user.friends.forEach(function(friend) {
          username = friend.first_name + " " + friend.last_name;
          friendCount = friend.friendships.length;
          friendList.unshift(
            <li key={friend.id} className="friend-box-info group">
              <figure className="friend-photo"></figure>
              <section className="friend-info">
                <p className="friend-name"><a href={"#/users/" + friend.id}>{ username }</a></p>
                <h6 className="friend-friend-count">{ friendCount } friends</h6>
              </section>
            </li>
          );
        });
      }

      if (this.state.user.id === window.currentUserId) {

        // FRIEND REQUESTS

        if (this.state.user.received_friend_requests) {
          var friendRequestor;
          UserStore.all().map(function(user) {
            this.state.user.received_friend_requests.map(function(friend_request) {
              if (user.id === friend_request.requestor_id) {
                friendRequestor = user.first_name + ' ' + user.last_name;
                friendRequestsList.unshift(
                  <li key={friend_request.id} className="confirm-friend-box-info">
                    <figure className="confirm-friend-photo"></figure>
                    <section className="confirm-friend-info group">
                      <p className="confirm-friend-name"><a href={"#/users/" + user.id}>{ friendRequestor }</a></p>

                      <button className="accept-friend-button"
                        onClick={
                          this.createFriendship.bind(
                            this,
                            friend_request.id,
                            user.id,
                            window.currentUserId
                          )
                        }>Accept</button>

                      <button className="decline-friend-button"
                        onClick={
                          this.declineFriendRequest.bind(this, friend_request.id)
                        }>Decline</button>

                    </section>
                  </li>
                );
              }
            }.bind(this));
          }.bind(this));
        }

        var FriendRequestBox = (
          <section className="confirm-friends group">
            <header className="confirm-friends-list-header"><i className="fa fa-user-plus"></i><a href={"#/users/" + this.state.user.id + "/friendships"}>Friend Requests</a></header>
            <section className="confirm-friends-list-main group">
              { noFriendRequestsMessage }
              { friendRequestsList }
              <section className="confirm-friend-box group">
              </section>
            </section>
          </section>
        )

      }
    }

    return(
      <div className="friends-main">
        <Header user={this.state.user} />
        { FriendRequestBox }

        <section className="friends-list">

          <header className="friends-list-header"><i className="fa fa-users"></i><a href={"#/users/" + this.state.user.id + "/friendships"}>Friends</a></header>
          <ul className="friends-list-main group">
            { noFriendsMessage }
            { friendList }
          </ul>
        </section>
        <footer className="profile-footer">
          <a href="https://github.com/Bryant-Curtis/Famebook/blob/master/README.md">About</a>
          <p className="profile-copyright">Famebook © 2016</p>
        </footer>
      </div>
    );
  },

  _onChange: function () {
    this.setState({ user: UserStore.find(parseInt(this.props.params.id)) });
  }

});

module.exports = Friends;
