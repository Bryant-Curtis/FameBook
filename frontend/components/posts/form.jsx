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

  createPost: function (e) {
    e.preventDefault();
    ApiUtil.createPost(this.state);
    ApiUtil.fetchAllUsers();
    this.setState({ body: "" });
  },

  render: function () {
    return(
      <form key={0} className="create-post group" onSubmit={this.createPost}>
        <div className="create-post-input-box">
          <input
            className="create-post-input"
            onChange={this.handleInput}
            type="text"
            name="post[body]"
            placeholder="What's on your mind?"
            value={this.state.body}/>
        </div>
        <button className="create-post-button">Post</button>
      </form>
    );
  }
});

module.exports = PostForm;
