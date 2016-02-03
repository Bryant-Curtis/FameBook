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
  _posts = posts.reverse();
};

PostStore.addPost = function (post) {
  _posts.unshift(post);
};

PostStore.deletePost = function (post) {
  for (var i = 0; i < _posts.length; i++) {
    if (_posts[i].id === post.id) {
      _posts.splice(i, 1);
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

module.exports = PostStore;

// Is the state going to be everything that the store has?
