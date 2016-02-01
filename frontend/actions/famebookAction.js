var Dispatcher = require('../dispatcher/dispatcher'),
    FamebookConstants = require('../constants/famebookConstants');

var ApiActions = {
  receiveAllPosts: function(posts) {
    Dispatcher.dispatch({
      actionType: FamebookConstants.POSTS_RECEIVED,
      posts: posts
    });
  },
  getNewPost: function(post) {
    Dispatcher.dispatch({
      actionType: FamebookConstants.NEW_POST_RECEIVED,
      post: post
    });
  },
  getDeletedPost: function(post) {
    Dispatcher.dispatch({
      actionType: FamebookConstants.DELETED_POST_RECEIVED,
      post: post
    });
  }
};

module.exports = ApiActions;
