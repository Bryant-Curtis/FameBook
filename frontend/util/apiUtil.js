var ApiActions = require('../actions/famebookAction');

var ApiUtil = {
  fetchAllPosts: function () {
    $.ajax({
      method:   "GET",
      url:      "/api/posts",
      success: function (data) {
        ApiActions.receiveAllPosts(data);
      },
      error: function () {
        return "Were not able to get the posts! :`)";
      }
    });
  },

  createPost: function (post) {
    $.ajax({
      method:   "POST",
      url:      "api/posts",
      dataType: "json", // What is the dataType to create it? Note: this is the dataType of the object I am sending to the DB.
      data:     {post: post}, // What goes in data?, Why do we send in the form of a hash?
      success: function (data) {
        ApiActions.getNewPost(data);
      },
      error: function () {
        return "We were not able to create your post! :`)";
      }
    });
  },

  deletePost: function (post) {
    $.ajax({
      method:   "DELETE",
      url:      "api/posts/" + post.id,
      dataType: "json", // What is the dataType to create it? Note: this is the dataType of the object I am sending to the DB.
      data:     {post: post}, // What goes in data?, Why do we send in the form of a hash?
      success: function (data) {
        ApiActions.getDeletedPost(data);
      },
      error: function () {
        return "We were not able to remove your post! :`)";
      }
    });
  },

  fetchAllUsers: function () {
    $.ajax({
      method:   "GET",
      url:      "api/users",
      success: function (data) {
        ApiActions.receiveAllUsers(data);
      },
      error: function () {
        return "Was not able to access the users! :`)";
      }
    });
  },

  fetchOneUser: function (userId) {
    $.ajax({
      method: "GET",
      url:    "/api/users/" + userId,
      success: function (data) {
        ApiActions.receiveOneUser(data);
      },
      error: function () {
        return "Was not able to access the user's information! :`)";
      }
    });
  },

  giveUserId: function (requesteeId, requestorId) {
    $.ajax({
      method:   "PATCH",
      url:      "/api/users/" + requesteeId,
      dataType: "json",
      data:     { user: {friend_request_id: requestorId} },
      successful: function (data) {
        ApiActions.receiveRequestee(data);
      },
      error: function () {
        return "Was not able to request for friend! :`)";
      }
    });
  },

  // createFriendship: function () {
  //   $.ajax({
  //
  //   })
  // },

  deleteFriendship: function (friendshipId, self_id, friend_id) {
    debugger
    $.ajax({
      method:   "DELETE",
      url:      "api/friendships/" + friendshipId,
      dataType: "json",
      data:     { friendships: { friend_id: friend_id, self_id: self_id} },
      success: function (data) {
        debugger
        ApiActions.receiveFriendship(data);
      },
      error: function () {
        return "Was not able to delete friend! :`)";
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
