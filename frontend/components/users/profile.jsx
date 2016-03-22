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
    ApiUtil.fetchAllUsers();

    // this.postToken = PostStore.addListener(this._onPostsChange);
    // ApiUtil.fetchAllPosts(parseInt(this.props.params.id));
  },

  componentWillUnmount: function () {
    this.userToken.remove();
    // this.postToken.remove();
  },

  componentWillReceiveProps: function (newProps) {
    ApiUtil.fetchAllUsers();
    this.setState({ user: UserStore.find(parseInt(newProps.params.id)) });
  },

  deletePost: function (post) {
    ApiUtil.deletePost(post);

    // FUTURE REFACTOR => CHANGE POSTS IN USER PROFILE TO HAVE PROFILE_TIMELINE COMPONENT AND REMOVE THIS
    ApiUtil.fetchAllUsers();

  },

  render: function () {
    var username = "",
        userPosts = [],
        deleteButton,
        postForm = "",
        noPostsMessage = "",
        firstPostMessage = "",
        intro = "",
        birthday = "";
    if (this.state.user && this.state.user.length !== 0) {

      // SET BIRTHDAY TEXT FORMAT
      debugger
      // strftime("b%"")


      if (this.state.user.birthday) {
        birthday = this.state.user.birthday_month + " " + this.state.user.birthday.slice(8, 10);

        // if (this.state.user.birthday.slice(5, 7) === "01"){
        //   birthday = "January " + this.state.user.birthday.slice(8, 10)
        // } else if (this.state.user.birthday.slice(5, 7) === "02"){
        //   birthday = "February " + this.state.user.birthday.slice(8, 10)
        // } else if (this.state.user.birthday.slice(5, 7) === "03"){
        //   birthday = "March " + this.state.user.birthday.slice(8, 10)
        // } else if (this.state.user.birthday.slice(5, 7) === "04"){
        //   birthday = "April " + this.state.user.birthday.slice(8, 10)
        // } else if (this.state.user.birthday.slice(5, 7) === "05"){
        //   birthday = "May " + this.state.user.birthday.slice(8, 10)
        // } else if (this.state.user.birthday.slice(5, 7) === "06"){
        //   birthday = "June " + this.state.user.birthday.slice(8, 10)
        // } else if (this.state.user.birthday.slice(5, 7) === "07"){
        //   birthday = "July " + this.state.user.birthday.slice(8, 10)
        // } else if (this.state.user.birthday.slice(5, 7) === "08"){
        //   birthday = "August " + this.state.user.birthday.slice(8, 10)
        // } else if (this.state.user.birthday.slice(5, 7) === "09"){
        //   birthday = "September " + this.state.user.birthday.slice(8, 10)
        // } else if (this.state.user.birthday.slice(5, 7) === "10"){
        //   birthday = "October " + this.state.user.birthday.slice(8, 10)
        // } else if (this.state.user.birthday.slice(5, 7) === "11"){
        //   birthday = "November " + this.state.user.birthday.slice(8, 10)
        // } else if (this.state.user.birthday.slice(5, 7) === "12"){
        //   birthday = "December " + this.state.user.birthday.slice(8, 10)
        // }
      }

      if (birthday === "") { birthday = "Birthday not set yet!"}
      if (this.state.user.gender === null) { this.state.user.gender = "Gender not set yet!"}

      // MAKE THE INTRO BOX FOR THE USER

      intro = <section className="intro">
                <header className="intro-header group">
                  <i className="fa fa-globe"></i>
                  <p>Intro</p>
                </header>
                <section className="intro-content group">
                  <ul className="intro-birthday group">
                    <li><i className="fa fa-birthday-cake group"></i></li>
                    <li><p>{ birthday }</p></li>
                  </ul>
                  <ul className="intro-gender group">
                    <li><i className="fa fa-user"></i></li>
                    <li><p>{ this.state.user.gender }</p></li>
                  </ul>
                </section>
              </section>

      if (this.state.user.id === window.currentUserId) {
        postForm = <PostForm />;
      }

      // CREATE NO POSTS MESSAGE

      if (this.state.user.posts.length === 0) {
        noPostsMessage = <p className="no-posts-message">No posts to show</p>
      }

      // CREATE FIRST POST MESSAGE

      if (this.state.user.posts.length > 0) {
        firstPostMessage = (
          <section className="first-post-message">
            <i className="fa fa-clock-o"></i>
            <p className="first-post-message-text">Posts from {this.state.user.posts[0].created_at.slice(0,4)}</p>
          </section>
        )
      }

      // FIND USERNAME OF USER

      username = this.state.user.first_name + " " + this.state.user.last_name;

      // CREATE ALL USER POSTS

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
      <div className="profile">
        <Header user={this.state.user} />
        <section className="profile-content group">
          <section className="profile-content-left">
            { intro }
            <footer className="profile-content-left-footer">
              <a href="https://github.com/Bryant-Curtis/Famebook/blob/master/README.md">About</a>
              <p className="profile-copyright">Famebook © 2016</p>
            </footer>
          </section>
          <section className="profile-content-right">
            { postForm }
            { noPostsMessage }
            <ul>
              <ReactCSSTransitionGroup
                transitionName="posts"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={600}>
                { userPosts }
              </ReactCSSTransitionGroup>
            </ul>
            { firstPostMessage }
            <footer className="profile-content-right-footer">
              <i className="fa fa-circle"></i>
            </footer>
          </section>
        </section>
      </div>
    );
  },

  // CANNOT DO BELOW. NEED TO MOVE PROFILE POSTS OR TIMELINE INTO
  // ANOTHER JSX COMPONENT THAT IS A CHILD OF THE HEADER/USER.
  // REASON: BECAUSE CAN ONLY HAVE ONE STATE PER JSX FILE. (I THINK...)

  // _onPostsChange: function () {
  //   // ApiUtil.fetchAllPosts();
  //   this.setState({ posts: PostStore.all() });
  // },

  _onChange: function () {
    this.setState({ user: UserStore.find(parseInt(this.props.params.id)) });
  }

});

// {this.props.children} This goes between the <Header/> and {postForm}.
module.exports = UserProfile;
