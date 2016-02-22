var React = require('react'),
    ApiUtil = require('../../util/apiUtil'),
    UserStore = require('../../stores/userStore');

var Header = React.createClass({
  sendUserId: function (requestorId, requesteeId, friendshipId, text, friendRequestId) {
    if (text === "Befriend") {

      ApiUtil.createFriendRequest(requestorId, requesteeId);
    } else if (text === "Unfriend") {
      ApiUtil.deleteFriendship(friendshipId, requestorId, requesteeId);
    } else if (text === "Accept") {
      ApiUtil.createFriendship(requestorId, requesteeId);
      ApiUtil.createFriendship(requesteeId, requestorId);
      ApiUtil.deleteFriendRequest(friendRequestId, requestorId, requesteeId);
    } else if (text === "Decline") {
      ApiUtil.declineFriendRequest(friendRequestId, requestorId, requesteeId);
    }
  },

  render: function () {
    var text = undefined, // Need to reset the text each render to determine which one to update to.
        username = "",
        friendRequestButton = "",
        acceptRequestButton = "",
        userId,
        friendshipId,
        friendRequestId;
    if (this.props.user && this.props.user.first_name !== undefined) {
      username = this.props.user.first_name + " " + this.props.user.last_name;
      userId = this.props.user.id;

      if (text === undefined) {
        // if (this.props.user.friendships.length !== 0) { // Why did I put this line here?
        this.props.user.friendships.forEach(function(friendship) {
          if (friendship.friend_id === window.currentUserId) {
            text = "Unfriend";
          }
        }.bind(this));
        // }
      }

      if (text === undefined) {
        this.props.user.friend_requests.forEach(function(friend_request) {
          if (friend_request.requestor_id === window.currentUserId && !friend_request.declined) {
            text = "Pending";
          }
        });
      }

      if (text === undefined) {

        // Find current User

        var currentUser;
        UserStore.all().forEach(function(user) {
          if (user.id === window.currentUserId) {
            currentUser = user;
          }
        });

        currentUser.friend_requests.forEach(function(friend_request) {
          if (friend_request.requestor_id === this.props.user.id && friend_request.declined) {
            text = "Accept";
          }
        }.bind(this));
      }

      if (text === undefined) {
        text = "Befriend";
      }

      this.props.user.friendships.forEach(function (friendship) {
        if (friendship.self_id === this.props.user.id &&
              friendship.friend_id === window.currentUserId) {
                friendshipId = friendship.id;
              }
      }.bind(this));
    }
    if (this.props.user.id && parseInt(this.props.user.id) !== window.currentUserId) {

      // Create extra Accept & Decline button if user profile sent friend request to current user

      // Create extra button and label both buttons' text

      currentUser.friend_requests.forEach(function(friend_request) {
        if (friend_request.requestor_id === this.props.user.id && !friend_request.declined) {
          text = "Decline"; // change the sendUserId method to include a case for "Decline";
          friendRequestId = friend_request.id
          acceptRequestButton = <button
            className="profile-accept-friend-request-button"
            onClick={
              this.sendUserId.bind(
                this,
                window.currentUserId,
                this.props.user.id,
                friendshipId,
                "Accept",
                friendRequestId
              )
            }
          >Accept</button>;
        }
      }.bind(this));

      friendRequestButton = <button
                              className="profile-friend-request-button"
                              onClick={
                                this.sendUserId.bind(
                                  this,
                                  window.currentUserId,
                                  this.props.user.id,
                                  friendshipId,
                                  text,
                                  friendRequestId
                                )
                              }
                            >{text}</button>;
    }
    return(
      <header className="profile-header">
        <figure className="profile-header-photo"></figure>
        <figure className="profile-user-photo"></figure>
        <figure className="profile-username">{ username }</figure>
        { acceptRequestButton}
        { friendRequestButton }
        <nav className="profile-nav">
          <ul className="group">
            <li className="profile-nav-timeline"><a href={"#/users/" + userId}>Timeline</a></li>
            <li className="profile-nav-photos"><a href={"#/users/" + userId + "/friendships"}>Friends</a></li>
          </ul>
        </nav>
      </header>
    );
  }
});

module.exports = Header;

// <li className="profile-nav-about"><a>About</a></li> -> to be added in future when finish about page component
// href={"/users/" + userId + "/settings"} -> to be used in the about a tag.
// <li className="profile-nav-friends">Friends</li>
// 1. How can I make the button unclickable after it has been clicked on once?
