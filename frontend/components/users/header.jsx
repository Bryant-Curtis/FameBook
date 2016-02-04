var React = require('react'),
    ApiUtil = require('../../util/apiUtil');

var Header = React.createClass({
  sendId: function (requestorId, text) {
    if (text === "Befriend") {
      ApiUtil.giveUserId(this.props.user.id, requestorId);
      text = "Pending"; // AND Make the button unclickable!!
    } else if (text === "Unfriend") {
      // Add unfriend functionality here -> ApiUtil.deleteFriendship();
    }
  },

  render: function () {
    var text;
    var username = "",
        friendRequestButton = "";
    if (this.props.user.first_name !== undefined) {
      username = this.props.user.first_name + " " + this.props.user.last_name;
      if (text === undefined) {
        if (this.props.user.friend_request_id === window.currentUserId) {
          text = "Pending";
        } else if (this.props.user.friendships.length !== 0){
          this.props.user.friendships.forEach(function(friendship) {
            if (friendship.friend_id === window.currentUserId) {
              text = "Unfriend";
            } else if (text === undefined) {
              text = "Befriend";
            }
          }.bind(this));
        } else {
          text = "Befriend";
        }
      }
    }
    if (parseInt(this.props.user.id) !== window.currentUserId) {
      friendRequestButton = <button className="profile-friend-request-button" onClick={this.sendId.bind(this, window.currentUserId, text)}>{text}</button>;
    }
    return(
      <header className="profile-header">
        <figure className="profile-header-photo"></figure>
        <figure className="profile-user-photo"></figure>
        <figure className="profile-username">{ username }</figure>
        { friendRequestButton }
        <nav className="profile-nav">
          <ul className="group">
            <li className="profile-nav-timeline">Timeline</li>
            <li className="profile-nav-about">About</li>
            <li className="profile-nav-friends">Friends</li>
            <li className="profile-nav-photos">Photos</li>
          </ul>
        </nav>
      </header>
    );
  }
});

module.exports = Header;

// 1. How can I make the button unclickable after it has been clicked on once?
