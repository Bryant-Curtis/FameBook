var React = require('react'),
    ApiUtil = require('../../util/apiUtil'),
    FamebookConstants = require('../../constants/famebookConstants'),
    UserStore = require('../../stores/userStore'),
    PostStore = require('../../stores/postStore'),
    Header = require('./header');

var UserProfile = React.createClass({
  getInitialState: function () {
    return { user: UserStore.find() };
  },

  componentDidMount: function () {
    UserStore.addListener(this._onChange);
    ApiUtil.fetchOneUser(parseInt(this.props.params.id));
    ApiUtil.fetchAllPosts();
  },

  deletePost: function (post) {
    ApiUtil.deletePost(post);
  },

  render: function () {
    var username = this.state.user.first_name + " " + this.state.user.last_name,
        userPosts = [];
    if (this.state.user.length !== 0) {
      userPosts = this.state.user.posts.map(function(post) {
        if (post.author_id === parseInt(this.props.params.id)) {
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
              <button onClick={this.deletePost.bind(this, post.id)} className="delete-post-button">Delete</button>
            </li>
          );
        }
      },this);
    }
    return(
      <div className="profile-main">
        <Header user={this.state.user} />
        <ul>{ userPosts }</ul>
      </div>
    );
  },

  _onChange: function () {
    this.setState({ user: UserStore.find() });
  }

});

module.exports = UserProfile;
