var Store = require('flux/utils').Store,
    Dispatcher = require('../dispatcher/dispatcher'),
    React = require('react'),
    ApiUtil = require('../util/apiUtil'),
    FamebookConstants = require('../constants/famebookConstants'),
    UserStore = new Store(Dispatcher),
    _users = [],
    _user = [];

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
  }
};

module.exports = UserStore;
