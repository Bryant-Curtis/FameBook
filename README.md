# Famebook

Famebook is a web application for connecting with famous people. It was inspired by Facebook and built using Ruby on Rails and React on a Flux architecture.

Explore and connect at [famebook.website][famebook]

[famebook]: http://www.famebook.website/

### Welcome View:

![welcome]

### Profile View:

![profile]

### Technical Details:

* Famebook incorporates user posts, friendships and photo uploads to make the user experience that much more enjoyable. Some of the trickiest logic of Famebook involved displaying correct friend request buttons. I set checks in place to differentiate user relationships, accounting for crossover friend requests between users by displaying supplementary buttons, in order to create a seamless User Experience.

```

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

```

### Features:

* Sign up/in with email
* Create/Delete posts
* View posts in feed/profile in most recent order
* Send/Accept/Decline friend requests from other users
* Unfriend friends
* Upload cropped profile, cover and catalog photos

### To-Do:

* [] Profile and cover photo upload/update
* [] Set profile photo next to user names on posts
* [] View full photo
* [] Delete photos
* [] Friend search
* [] Infinite Scroll
* [] Opinions (Comments)
* [] Votes (Likes)
* [] Email format validation
* [] Email confirmation validation
* [] Privacy settings for posts/photos

[welcome]: .docs/images/welcome.png
[profile]: .docs/images/profile.png
