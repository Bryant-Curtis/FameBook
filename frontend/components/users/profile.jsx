var React = require('react'),
    ApiUtil = require('../../util/apiUtil'),
    FamebookConstants = require('../../constants/famebookConstants'),
    UserStore = require('../../stores/userStore'),
    PostStore = require('../../stores/postStore'),
    Header = require('./header'),
    PostForm = require('../posts/form'),
    ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var UserProfile = React.createClass({
  getInitialState: function () {
    return { user: UserStore.find(parseInt(this.props.params.id)) };
  },

  componentDidMount: function () {
    this.userToken = UserStore.addListener(this._onChange);
    ApiUtil.fetchOneUser(parseInt(this.props.params.id));

    // ApiUtil.fetchAllUsers();
    // this.postToken = PostStore.addListener(this._onPostsChange);
    // ApiUtil.fetchPosts(parseInt(this.props.params.id));
  },

  componentWillUnmount: function () {
    this.userToken.remove();
    // this.postToken.remove();
  },

  componentWillReceiveProps: function (newProps) {
    ApiUtil.fetchOneUser(parseInt(this.props.params.id));
    this.setState({ user: UserStore.find(parseInt(newProps.params.id)) });
  },

  deletePost: function (post) {
    ApiUtil.deletePost(post);
    ApiUtil.fetchOneUser(parseInt(this.props.params.id));
  },

  render: function () {
    var username = "",
        userPosts = [],
        deleteButton,
        postform = "";
    if (this.state.user.length !== 0) {
      if (this.state.user.id === window.currentUserId) {
        postform = <PostForm />;
      }
      username = this.state.user.first_name + " " + this.state.user.last_name;
      userPosts = this.state.user.posts.map(function(post) {
        if (post.author_id === parseInt(this.props.params.id)) {
          if ((parseInt(post.author_id)) === (parseInt(window.currentUserId))) {
            deleteButton = <button onClick={this.deletePost.bind(this, post)} className="delete-post-button">Delete</button>;
          } else {
            deleteButton = "";
          }
          return(
            <li key={post.id} className="post group">
              <header className="post-header">
                <section className="post-header-name">
                  <a className="post-author-name" href={"#/users/" + post.author_id}>
                    { username }
                  </a>
                </section>
              </header>
              <article className="post-body">{ post.body }</article>
              { deleteButton }
            </li>
          );
        }
      },this);
    }
    return(
      <div className="profile-main">
        <Header user={this.state.user} />
        { postform }
        <ul>
          <ReactCSSTransitionGroup transitionName="posts" transitionEnterTimeout={500} transitionLeaveTimeout={600}>
            { userPosts.reverse() }
          </ReactCSSTransitionGroup>
        </ul>
      </div>
    );
  },

  // _onPostsChange: function () {
  //   // ApiUtil.fetchAllPosts();
  //   this.setState({ posts: PostStore.all() });
  // },

  _onChange: function () {
    this.setState({ user: UserStore.find(parseInt(this.props.params.id)) });
  }

});

module.exports = UserProfile;
