var React = require('react'),
    ApiUtil = require('../util/apiUtil'),
    FamebookConstants = require('../constants/famebookConstants'),
    PostStore = require('../stores/postStore');

var Posts = React.createClass({
  getInitialState: function () {
    return { posts: PostStore.all() };
  },

  componentDidMount: function () {
    PostStore.addListener(this._onChange);
    ApiUtil.fetchAllPosts();
  },

  render: function () {
    var posts = this.state.posts.map(function(post){
      return <li key={post.id}>{ post.body }</li>;
    });
    return(
      <ul>{ posts }</ul>
    );
  },

  _onChange: function () {
    this.setState({ posts: PostStore.all() });
  }

});

module.exports = Posts;
