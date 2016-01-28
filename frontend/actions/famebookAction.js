var Dispatcher = require('../dispatcher/dispatcher'),
    FamebookConstants = require('../constants/famebookConstants');

var ApiActions = {
  receiveAllPosts: function(posts) {
    Dispatcher.dispatch({
      actionType: FamebookConstants.POSTS_RECEIVED,
      posts: posts
    });
  }
};

module.exports = ApiActions;
