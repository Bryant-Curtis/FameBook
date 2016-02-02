var React = require('react'),
    ApiUtil = require('../../util/apiUtil'),
    FamebookConstants = require('../../constants/famebookConstants'),
    PostStore = require('../../stores/postStore'),
    PostForm = require('./form'),
    ReactCSSTransitionGroup = require('react-addons-css-transition-group');


var Posts = React.createClass({
  getInitialState: function () {
    return { posts: PostStore.all() };
  },

  componentDidMount: function () {
    PostStore.addListener(this._onChange);
    PostStore.updateOnMount();
  },

  deletePost: function (post_id) {
    var post;
    for (var i = 0; i < this.state.posts.length; i++) {
      if (this.state.posts[i].id === post_id) {
        post = this.state.posts[i];
      }
    }
    ApiUtil.deletePost(post);
  },

  render: function () {
    var deleteButton;
    var posts = this.state.posts.map(function(post){
      if ((parseInt(post.author_id)) === (parseInt(window.currentUserId))) {
        deleteButton = <button onClick={this.deletePost.bind(this, post.id)} className="delete-post-button">Delete</button>;
      } else {
        deleteButton = "";
      }
      return(
        <li key={post.id} className="post group">
          <header className="post-header">
            <section className="post-header-name">
              <a className="post-author-name" href={"#/users/" + post.author_id}>
                { post.author.name }
              </a>
            </section>
          </header>
          <article className="post-body">{ post.body }</article>
          { deleteButton }
        </li>
      );
    }.bind(this));
    return(
      <div key={1} className="root-page-posts-and-form">
        <PostForm />
        <ul>
          <ReactCSSTransitionGroup transitionName="posts" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
            { posts }
          </ReactCSSTransitionGroup>
        </ul>
      </div>
    );
  },

  _onChange: function () {
    this.setState({ posts: PostStore.all() });
  }

});

module.exports = Posts;
