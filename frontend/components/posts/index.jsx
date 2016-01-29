var React = require('react'),
    ApiUtil = require('../../util/apiUtil'),
    FamebookConstants = require('../../constants/famebookConstants'),
    PostStore = require('../../stores/postStore');

var Posts = React.createClass({
  getInitialState: function () {
    return { posts: PostStore.all() };
  },

  componentDidMount: function () {
    PostStore.addListener(this._onChange);
    PostStore.updateOnMount();
  },

  render: function () {
    var posts = this.state.posts.map(function(post){
      return(
        <li key={post.id} className="post">
          <header className="post-header">
            <section className="post-header-name">
              { post.author.name }
            </section>
          </header>
          <article className="post-body">{ post.body }</article>
        </li>
      );
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
