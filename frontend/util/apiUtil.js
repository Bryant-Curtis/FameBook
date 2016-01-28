var ApiUtil = {
  fetchAllPosts: function () {
    $.ajax({
      method: "GET",
      url: 'api/posts',
      success: function (data) {
        console.log(data);
      }
    });
  }
};

module.exports = ApiUtil;
