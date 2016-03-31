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
      ApiUtil.deleteFriendRequest(friendRequestId);
    }
  },

  render: function () {
    var text = undefined, // Reset the friend request button text on
                          // each render to determine the proper label
                          // to update to.
        username = "",
        friendRequestButton = "",
        acceptRequestButton = "",
        userId,
        friendshipId,
        friendRequestId,
        userBackImage = "",
        userImage = "";
    if (this.props.user && this.props.user.first_name !== undefined) {

      username = this.props.user.first_name + " " + this.props.user.last_name;
      userId = this.props.user.id;

      // Find current User for later use

      var currentUser;
      UserStore.all().forEach(function(user) {
        if (user.id === window.currentUserId) {
          currentUser = user;
        }
      });

      // Determine picture of each Seed User

      if (this.props.user.first_name === "Alexander") {
        userImage = <img src={window.alexMain}></img>;
        userBackImage = <img src={window.alexBack}></img>;
      } else if (this.props.user.first_name === "George") {
        userImage = <img src={window.georgeMain}></img>;
        userBackImage = <img src={window.georgeBack}></img>;
      } else if (this.props.user.first_name === "Oprah") {
        userImage = <img src={window.oprahMain}></img>;
        userBackImage = <img src={window.oprahBack}></img>;
      } else if (this.props.user.first_name === "Robert") {
        userImage = <img src={window.robertMain}></img>;
        userBackImage = <img src={window.robertBack}></img>;
      } else if (this.props.user.first_name === "Julius") {
        userImage = <img src={window.juliusMain}></img>;
        userBackImage = <img src={window.juliusBack}></img>;
      }

      // Set friendship buttons according to friendship status of current
      // user and user being viewed

      // Set button text for case of existing friendship

      if (text === undefined) {
        this.props.user.friendships.forEach(function(friendship) {
          if (friendship.friend_id === window.currentUserId) {
            text = "Unfriend";
          }
        }.bind(this));
      }

      // Set button text for case of sent friend request

      if (text === undefined) {
        this.props.user.received_friend_requests.forEach(function(friend_request) {
          if (friend_request.requestor_id === window.currentUserId) {
            text = "Pending";
          }
        });
      }

      // Create extra Accept button for case of received friend request

      if (text === undefined) {

        currentUser.received_friend_requests.forEach(function(friend_request) {
          if (friend_request.requestor_id === this.props.user.id) {
            text = "Decline";
            friendRequestId = friend_request.id;
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
      }

      // Set text for case of no existing friendship and no friend requests
      // sent nor received

      if (text === undefined) {
        text = "Befriend";
      }

      // Find the friendship id of the current user and the user being
      // viewed for the AJAX request

      // Maybe REFACTOR this to be in the Unfriend text setting loop
      // as a one line "friendshipId = friendship.id;". Test
      // thoroughly to make sure it works.

      this.props.user.friendships.forEach(function (friendship) {
        if (friendship.self_id === this.props.user.id &&
              friendship.friend_id === window.currentUserId) {
                friendshipId = friendship.id;
              }
      }.bind(this));

    }

    if (this.props.user.id && parseInt(this.props.user.id) !== window.currentUserId) {

      // Create the friend request button and input the proper text
      // as designated above

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
        <figure className="profile-header-photo">{ userBackImage }</figure>
        <figure className="profile-user-photo">{ userImage }</figure>
        <figure className="profile-username">{ username }</figure>
        { acceptRequestButton}
        { friendRequestButton }
        <nav className="profile-nav">
          <ul className="group">
            <li className="profile-nav-timeline"><a href={"#/users/" + userId}>Timeline</a></li>
            <li className="profile-nav-friends"><a href={"#/users/" + userId + "/friendships"}>Friends</a></li>
            <li className="profile-nav-photos"><a href={"#/users/" + userId + "/photos"}>Photos</a></li>
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
