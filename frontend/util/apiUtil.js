var ApiActions = require('../actions/famebookAction');

var ApiUtil = {
  fetchAllPosts: function () {
    $.ajax({
      method: "GET",
      url: 'api/posts',
      success: function (data) {
        console.log(data);
        ApiActions.receiveAllPosts(data);
      },
      error: function () {
        return "Were not able to get the posts! : )";
      }
    });
  }
};

module.exports = ApiUtil;
