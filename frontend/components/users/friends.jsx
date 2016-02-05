var React = require('react'),
    ApiUtil = require('../../util/apiUtil'),
    FamebookConstants = require('../../constants/famebookConstants'),
    UserStore = require('../../stores/userStore'),
    PostStore = require('../../stores/postStore'),
    Header = require('./header'),
    PostForm = require('../posts/form'),
    ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var Friends = React.createClass({
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
        friendCount = "";
    if (this.state.user && this.state.user.length !== 0) {
      if (this.state.user.id === window.currentUserId) {
        var confirmFriends;
      }
      username = this.state.user.first_name + " " + this.state.user.last_name;
      friendCount = this.state.user.friendships.length;
    }

    var ConfirmFriends;

    return(
      <div className="friends-main">
        <Header user={this.state.user} />
        <section className="confirm-friends">
          <header className="confirm-friends-list-header">Friend Requests</header>

          <section className="confirm-friends-list-main">
            <section className="confirm-friend-box group">
              <section className="confirm-friend-box-info group">
                <figure className="confirm-friend-photo"></figure>
                <section className="confirm-friend-info group">
                  <p className="confirm-friend-name">{ username }</p>
                  <button className="accept-friend-button">Accept</button>
                  <button className="decline-friend-button">Decline</button>
                </section>
            </section>
            </section>
          </section>
        </section>

        <section className="friends-list">
          <header className="friends-list-header">Friends</header>
          <section className="friends-list-main">
            <section className="friend-box group">
              <section className="friend-box-info group">
                <figure className="friend-photo"></figure>
                <section className="friend-info">
                  <p className="friend-name">{ username }</p>
                  <h6 className="friend-friend-count">{ friendCount } friends</h6>
                </section>
            </section>
            </section>
          </section>
        </section>
      </div>
    );
  },

  _onChange: function () {
    this.setState({ user: UserStore.find(parseInt(this.props.params.id)) });
  }

});

module.exports = Friends;
