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
  },

  receiveAllUsers: function(users) {
    Dispatcher.dispatch({
      actionType: FamebookConstants.ALL_USERS_RECEIVED,
      users: users
    });
  },

  receiveOneUser: function(user) {
    Dispatcher.dispatch({
      actionType: FamebookConstants.USER_RECEIVED,
      user: user
    });
  },

  receiveRequestee: function(requestorId) {
    Dispatcher.dispatch({
      actionType: FamebookConstants.REQUESTEE_RECEIVED,
      requestee: requestee
    });
  },

  receiveFriendship: function(friendships) {
    Dispatcher.dispatch({
      actionType: FamebookConstants.FRIENDSHIPS_RECEIVED,
      friendships: friendships
    });
  },


};

module.exports = ApiActions;
