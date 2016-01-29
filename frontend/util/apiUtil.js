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

  createPost: function (post) {
    $.ajax({
      method: "POST",
      url: "api/posts",
      dataType: "json", // What is the dataType to create it? Note: this is the dataType of the object I am sending to the DB.
      data: {post: post}, // What goes in data?, Why do we send in the form of a hash?
      success: function (data) {
        ApiActions.getNewPost(data);
      }
    });
  }

  // logOut: function (callback) {
  //   $.ajax({
  //     method: "DELETE",
  //     url: '/session',
  //     success: function (data) {
  //       callback && callback();
  //     }
  //   });
  // }
};

module.exports = ApiUtil;
