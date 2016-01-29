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

PostStore.addPost = function (post) {
  _posts.unshift(post);
};

PostStore.__onDispatch = function (payload) {
  if (payload.actionType === FamebookConstants.POSTS_RECEIVED) {
    PostStore.resetPosts(payload.posts);
    PostStore.__emitChange();
  } else if (payload.actionType === FamebookConstants.NEW_POST_RECEIVED) {
    PostStore.resetPosts(payload.post);
    PostStore.__emitChange();
  }
};

PostStore.updateOnMount = function () {
  ApiUtil.fetchAllPosts();
};

module.exports = PostStore;

// Is the state going to be everything that the store has?
