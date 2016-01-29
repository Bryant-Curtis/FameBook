var React = require('react'),
    ApiUtil = require('../../util/apiUtil'),
    PostStore = require('../../stores/postStore');

var PostForm = React.createClass({
  getInitialState: function () {
    return { body: "" };
  },

  createPost: function (event) {
    event.preventDefault();
    var post = {};
    post.body = this.state.body;
    ApiUtil.createPost(post);
  },

  render: function () {
    return(
      <form className="create-post" onSubmit={this.createPost}>
        <input type="text" name="post[body]"/>
        <button className="create-post-button">Post</button>
      </form>
    );
  }
});

module.exports = PostForm;
