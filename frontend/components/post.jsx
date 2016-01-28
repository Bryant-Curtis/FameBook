var React = require('react'),
    ApiUtil = require('../util/apiUtil'),
    FamebookConstants = require('../constants/famebookConstants'),
    PostStore = require('../stores/postStore');

var Posts = React.createClass({
  getInitialState: function () {
    return { posts: PostStore.all };
  },

  componentDidMount: function () {
    PostStore.addListener(this.__onChange);
    ApiUtil.fetchAllPosts();
  },

  render: function () {
    return(
      <div>
        <div>{ this.state.posts }</div>
      </div>
    );
  },

  __onChange: function () {
    // I feel like here I want to call the method PostStore.resetPosts!
    this.setState({ posts: PostStore.all });
  }

});

module.exports = Posts;
