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
  debugger
  _posts.unshift(post);
};

PostStore.deletePost = function (post) {
  var index = _posts.indexOf(post); // will NOT work as the two posts are not the same objects in memory.
  debugger
  for (var i = 0; i < _post.length; i++) {
    if (_post[i] === post) {

    }
  }
};

PostStore.__onDispatch = function (payload) {
  if (payload.actionType === FamebookConstants.POSTS_RECEIVED) {
    PostStore.resetPosts(payload.posts);
    PostStore.__emitChange();
  } else if (payload.actionType === FamebookConstants.NEW_POST_RECEIVED) {
    PostStore.addPost(payload.post);
    PostStore.__emitChange();
  } else if (payload.actionType === FamebookConstants.DELETED_POST_RECEIVED) {
    PostStore.deletePost(payload.post);
    PostStore.__emitChange();
  }
};

PostStore.updateOnMount = function () {
  ApiUtil.fetchAllPosts();
};

module.exports = PostStore;

// Is the state going to be everything that the store has?
