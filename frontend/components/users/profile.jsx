var React = require('react'),
    ApiUtil = require('../../util/apiUtil'),
    FamebookConstants = require('../../constants/famebookConstants'),
    UserStore = require('../../stores/userStore'),
    PostStore = require('../../stores/postStore'),
    Header = require('./header');

var UserProfile = React.createClass({
  getInitialState: function () {
    return { profile: UserStore.find() };
  },

  componentDidMount: function () {
    UserStore.addListener(this._onChange);
    ApiUtil.fetchOneUser(parseInt(this.props.params.id));
    ApiUtil.fetchAllPosts();
  },

  render: function () {
    var posts = PostStore.all(),
        userPosts = [],
        deleteButton;
    userPosts = posts.map(function(post) {
      if (post.author_id === parseInt(this.props.params.id)) {
        // if ((parseInt(post.author_id)) === (parseInt(window.currentUserId))) {
        //   deleteButton = <button onClick={this.deletePost.bind(this, post.id)} className="delete-post-button">Delete</button>;
        // } else {
        //   deleteButton = "";
        // }
        // return(<p>hi there</p>
        //   <li key={post.id} className="post group">
        //     <header className="post-header">
        //       <section className="post-header-name">
        //         <a className="post-author-name" href={"#/users/" + post.author_id}>
        //           { post.author.name }
        //         </a>
        //       </section>
        //     </header>
        //     <article className="post-body">{ post.body }</article>
        //     { deleteButton }
        //   </li>;
        // )
        return post.body;
      }
    }.bind(this));
    return(
      <div className="profile-main">
        <Header />
        <ul>{ userPosts }hi</ul>
      </div>
    );
  },

  _onChange: function () {
    this.setState({ profile: UserStore.find() });
  }

});

module.exports = UserProfile;
