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

UserStore.resetUser = function (user) {
  _user = user;
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
  }
};

module.exports = UserStore;
