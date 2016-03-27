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
    this.postToken = PostStore.addListener(this._onChange);
    ApiUtil.fetchAllPosts();
  },

  componentWillUnmount: function () {
    this.postToken.remove();
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
      <div key={1} className="feed group">

        <section className="feed-main group">

          <section className="feed-sidebar-left">
            <a href="http://www.bryantcurtis.com/Bolts">
              <section className="feed-sidebar-left-game group">
                <img className="feed-sidebar-left-game-image"></img>
                <p className="feed-sidebar-left-game-text">Bolts</p>
              </section>
            </a>
          </section>

          <section className="feed-center">
            <PostForm />
            <ul>
              <ReactCSSTransitionGroup transitionName="posts" transitionEnterTimeout={500} transitionLeaveTimeout={600}>
                { posts }
              </ReactCSSTransitionGroup>
            </ul>
          </section>

          <section className="feed-sidebar-right">

            <section className="feed-sidebar-right-ads">

              <p className="feed-sidebar-right-suggestion">SUGGESTED PAGES</p>

              <a href="http://www.bryantcurtis.com">
                <section className="ad-img group">
                  <img src={window.prof}></img>
                </section>
                <p>See the creator's profile</p>
                <p className="ad-url">www.bryantcurtis.com</p>
                <p className="ad-descriptions">A combination of projects and skills can be found here</p>
              </a>

              <a href="http://www.bryantcurtis.com/Bolts">
                <section className="ad-img group">
                  <img src={window.bolts}></img>
                </section>
                <p>Bolts - Try out the exciting game now</p>
                <p className="ad-url">www.bryantcurtis.com/Bolts</p>
                <p className="ad-descriptions">Wanna play a game? Click here to see how good your reflexes are! Watch out for the changing bolt speeds!</p>
              </a>

            </section>

            <footer className="feed-footer">
              <a href="https://github.com/Bryant-Curtis/Famebook/blob/master/README.md">About</a>
              <p className="profile-copyright">Famebook © 2016</p>
            </footer>

          </section>

        </section>

      </div>
    );
  },

  _onChange: function () {
    this.setState({ posts: PostStore.all() });
  }

});

module.exports = Posts;
