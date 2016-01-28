var Store = require('flux/utils').Store,
    React = require('react'),
    ApiUtil = require('../util/apiUtil'),
    Dispatcher = require('../dispatcher/dispatcher'),
    FamebookConstants = require('../constants/famebookConstants'),
    PostStore = new Store(Dispatcher);

var _posts = [];

PostStore.all = function () {
  return _posts;
};

PostStore.resetPosts = function (posts) {
  _posts = posts;
};

PostStore.__onDispatch = function (payload) {
  if (payload.actionType === FamebookConstants.RECEIVED_POSTS) {
    PostStore.resetPosts(payload.posts);
    PostStore.__emitChange();
  }
};

module.exports = PostStore;

// Is the state going to be everything that the store has?
