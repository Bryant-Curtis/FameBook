var Store = require('flux/utils').Store,
    Dispatcher = require('../dispatcher/dispatcher'),
    React = require('react'),
    ApiUtil = require('../util/apiUtil'),
    FamebookConstants = require('../constants/famebookConstants'),
    UserStore = new Store(Dispatcher),
    _users = [],
    _user = [];

UserStore.all = function () {
  return _users;
};

UserStore.find = function (userId) {
  if (_users.length > 0) {
    var profileUser;
    _users.forEach(function(user) {
      if (user.id === userId) {
        profileUser = user;
      }
    });
    if (profileUser !== undefined) {
      return profileUser;
    }
  } else {
    return [];
  }
};

UserStore.resetUsers = function (users) {
  _users = users;
};

UserStore.resetUser = function (userNow) {
  var index = 0;
  _users.forEach(function(user, i) {
    if (user.id === userNow.id) {
      index = i;
    }
  });
  _users[index] = userNow;
};

UserStore.updateUser = function (requestee) {
  _users.forEach(function(user) {
    if (user.id === requestee.id) {
      user = requestee;
    }
  });
};

UserStore.addPost = function (post) {
  _users.forEach(function(user) {
    if (user.id === post.author_id) {
      user.posts.push(post);
    }
  });
};

UserStore.updateFriendships = function (destroyedFriendship) {
  _users.forEach(function(user) {
    user.friendships.forEach(function(friendship) {
      // below, self is the this.props.user, NOT THE currentUser.
      if (friendship.friend_id === destroyedFriendship.self.friend_id &&
            user.id === destroyedFriendship.self.self_id) {
        var index = user.friendships.indexOf(friendship)
        user.friendships.splice(index, 1)
      }
    })
  });
};

UserStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case FamebookConstants.ALL_USERS_RECEIVED:
      this.resetUsers(payload.users);
      UserStore.__emitChange();
      break;
    case FamebookConstants.USER_RECEIVED:
      this.resetUser(payload.user);
      UserStore.__emitChange();
      break;
    case FamebookConstants.REQUESTEE_RECEIVED:
      this.updateUser(payload.requestee);
      UserStore.__emitChange();
      break;
    case FamebookConstants.NEW_POST_RECEIVED:
      this.addPost(payload.post);
      UserStore.__emitChange();
      break;
    case FamebookConstants.FRIENDSHIPS_RECEIVED:
      this.updateFriendships(payload.friendships);
      UserStore.__emitChange();
      break;
  }
};

module.exports = UserStore;
