var React = require('react'),
    ApiUtil = require('../../util/apiUtil'),
    PostStore = require('../../stores/postStore');

var PostForm = React.createClass({
  getInitialState: function () {
    return { body: "" };
  },

  handleInput: function (event) {
    this.setState({ body: event.currentTarget.value});
  },

  createPost: function () {
    event.preventDefault();
    ApiUtil.createPost(this.state);
  },

  render: function () {
    return(
      <form className="create-post" onSubmit={this.createPost}>
        <div className="create-post-input-box">
          <input
            className="create-post-input"
            onChange={this.handleInput}
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
