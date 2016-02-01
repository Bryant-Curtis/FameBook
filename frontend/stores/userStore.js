var Store = require('flux/utils').Store,
    Dispatcher = require('../dispatcher/dispatcher'),
    React = require('react'),
    ApiUtil = require('../util/apiUtil'),
    FamebookConstants = require('../constants/famebookConstants'),
    UserStore = new Store(Dispatcher),
    _users = [],
    _user = [];

UserStore.find = function () {
  debugger
  return _user;
};

UserStore.resetUser = function (user) {
  _user = user;
};

UserStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case FamebookConstants.USER_RECEIVED:
      this.resetUser(payload.user);
      UserStore.__emitChange();
      break;
  }
};

module.exports = UserStore;
