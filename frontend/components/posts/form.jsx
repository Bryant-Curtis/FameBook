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
    console.log(event.currentTarget)
    console.log(event.this.state)
    post.body = event.currentTarget.value;
    ApiUtil.createPost(post);
  },

  render: function () {
    return(
      <form className="create-post" onSubmit={this.createPost}>
        <div className="create-post-input-box">
          <input className="create-post-input"
            type="text"
            name="post[body]"
            placeholder="How are you feeling?"/>
        </div>
        <button className="create-post-button">Post</button>
      </form>
    );
  }
});

module.exports = PostForm;
