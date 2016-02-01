var React = require('react'),
    ApiUtil = require('../../util/apiUtil'),
    PostStore = require('../../stores/postStore');

var DeleteButton = React.createClass({
  // getInitialState: function () {
  //   return { body: "" };
  // },

  // handleInput: function (event) {
  //   this.setState({ body: event.currentTarget.value});
  // },
  //
  // deletePost: function () {
  //   event.preventDefault();
  //   ApiUtil.createPost(this.state);
  // },
  deletePost: function () {
    Api
  },

  render: function () {
    return(
      <form className="delete-post" onSubmit={this.deletePost}>
        <button className="delete-post-button">Delete</button>
      </form>
    );
  }
});

module.exports = DeleteButton;
