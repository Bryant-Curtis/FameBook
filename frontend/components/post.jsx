var React = require('react'),
    ApiUtil = require('../util/apiUtil'),
    FamebookConstants = require('../constants/famebookConstants'),
    PostStore = require('../stores/postStore');

var Posts = React.createClass({
  getInitialState: function () {
    return { posts: PostStore.all };
  },

  render: function () {
    return(
      <div>
        <div>Hi!</div>
      </div>
    );
  }
});

module.exports = Posts;
