var React = require('react');

var Header = React.createClass({
  updateText: function () {
    this.text = "Pending"; // AND Make the button unclickable!!
  },

  render: function () {
    var username = "";
    if (this.props.user.first_name !== undefined) {
      username = this.props.user.first_name + " " + this.props.user.last_name;
      if (this.text === undefined) {
        if (this.props.user.friend_request_id === window.currentUserId) {
          this.text = "Pending";
        }
        this.text = "Befriend";
      }
    }
    return(
      <header className="profile-header">
        <figure className="profile-header-photo"></figure>
        <figure className="profile-user-photo"></figure>
        <figure className="profile-username">{ username }</figure>
        <button className="profile-friend-request-button" onClick={this.updateText}>{this.text}</button>
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
