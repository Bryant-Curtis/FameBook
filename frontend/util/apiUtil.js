var ApiActions = require('../actions/famebookAction');

var ApiUtil = {
  fetchAllPosts: function () {
    $.ajax({
      method: "GET",
      url: '/api/posts',
      success: function (data) {
        console.log(data);
        ApiActions.receiveAllPosts(data);
      },
      error: function () {
        return "Were not able to get the posts! : )";
      }
    });
  },

  logOut: function (callback) {
    $.ajax({
      method: "DELETE",
      url: '/session',
      success: function (data) {
        callback && callback();
      }
    });
  }
};

module.exports = ApiUtil;
