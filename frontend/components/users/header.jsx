var React = require('react'),
    ApiUtil = require('../../util/apiUtil');

var Header = React.createClass({
  sendUserId: function (requestorId, requesteeId, friendshipId, text) {
    if (text === "Befriend") {
      ApiUtil.createFriendRequest(requestorId, requesteeId);
      text = "Pending"; // AND Make the button unclickable!!
    } else if (text === "Unfriend") {
      ApiUtil.deleteFriendship(friendshipId, requestorId, requesteeId);
    }
  },

  render: function () {
    var text = undefined, // Need to reset the text each render to determine which one to update to.
        username = "",
        friendRequestButton = "",
        userId,
        friendshipId;
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
          if (friend_request.requestor_id === window.currentUserId) {
            text = "Pending";
            return text;
          }
        });
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
    if (this.props.user && parseInt(this.props.user.id) !== window.currentUserId) {
      friendRequestButton = <button
                              className="profile-friend-request-button"
                              onClick={
                                this.sendUserId.bind(
                                  this,
                                  window.currentUserId,
                                  this.props.user.id,
                                  friendshipId,
                                  text
                                )
                              }
                            >{text}</button>;
    }
    return(
      <header className="profile-header">
        <figure className="profile-header-photo"></figure>
        <figure className="profile-user-photo"></figure>
        <figure className="profile-username">{ username }</figure>
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
