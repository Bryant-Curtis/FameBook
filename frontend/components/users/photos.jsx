var React = require('react'),
    ApiUtil = require('../../util/apiUtil'),
    UserStore = require('../../stores/userStore'),
    Header = require('./header'),
    ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var Photos = React.createClass({
  getInitialState: function () {
    return { user: UserStore.find(parseInt(this.props.params.id)) };
  },

  componentDidMount: function () {
    this.userToken = UserStore.addListener(this._onChange);
    // ApiUtil.fetchOneUser(parseInt(this.props.params.id));

    ApiUtil.fetchAllUsers();
  },

  componentWillUnmount: function () {
    this.userToken.remove();
  },

  componentWillReceiveProps: function (newProps) {
    // ApiUtil.fetchOneUser(parseInt(this.props.params.id));
    ApiUtil.fetchAllUsers();

    this.setState({ user: UserStore.find(parseInt(newProps.params.id)) });
  },

  createPhoto: function () {

  },

  render: function () {
    var username = "",
        photoList = [],
        noPhotosMessage = "",
        currentPageUser = "";

    if (this.state.user && this.state.user.length !== 0) {
      currentPageUser = this.state.user;

      // NO PHOTOS MESSAGE

      if (this.state.user.photos.length === 0) {
        noPhotosMessage = <p className="no-photos-message">No photos to show</p>
      }

      // PHOTOS LIST

      if (this.state.user.photos) {
        this.state.user.photos.forEach(function(photo) {
          photoList.unshift(
            <li key={photo.id} className="photo group"></li>
          );
        });
      }

      // if (this.state.user.id === window.currentUserId) {

        // FRIEND REQUESTS

        // if (this.state.user.received_friend_requests) {
        //   var friendRequestor;
        //   UserStore.all().map(function(user) {
        //     this.state.user.received_friend_requests.map(function(friend_request) {
        //       if (user.id === friend_request.requestor_id && friend_request.declined === false) {
        //         friendRequestor = user.first_name + ' ' + user.last_name;
        //         confirmFriends.unshift(
        //           <li key={friend_request.id} className="confirm-friend-box-info">
        //             <figure className="confirm-friend-photo"></figure>
        //             <section className="confirm-friend-info group">
        //               <p className="confirm-friend-name"><a href={"#/users/" + user.id}>{ friendRequestor }</a></p>
        //
        //               <button className="accept-friend-button"
        //                 onClick={
        //                   this.createFriendship.bind(
        //                     this,
        //                     friend_request.id,
        //                     user.id,
        //                     window.currentUserId
        //                   )
        //                 }>Accept</button>
        //
        //               <button className="decline-friend-button"
        //                 onClick={
        //                   this.declineFriendRequest.bind(
        //                     this,
        //                     friend_request.id,
        //                     user.id,
        //                     window.currentUserId
        //                   )
        //                 }>Decline</button>
        //
        //             </section>
        //           </li>
        //         );
        //       }
        //     }.bind(this));
        //   }.bind(this));
        // }

        // var FriendRequestBox = (
        //   <section className="confirm-friends group">
        //     <header className="confirm-friends-list-header"><i className="fa fa-user-plus"></i><a href={"#/users/" + this.state.user.id + "/friendships"}>Friend Requests</a></header>
        //     <section className="confirm-friends-list-main group">
        //       { confirmFriends }
        //       <section className="confirm-friend-box group">
        //       </section>
        //     </section>
        //   </section>
        // )

      // }
    }

    return(
      <div className="photos-main">
        <Header user={this.state.user} />

        <section className="photos-list">

          <header className="photos-list-header group">
            <i className="fa fa-users"></i>
            <a href={"#/users/" + this.state.user.id + "/photos"}>Photos</a>
            <button>Add Photos</button>
          </header>

          <ul className="photos-list-main group">
            { noPhotosMessage }
            { photoList }
          </ul>
        </section>

        <footer className="profile-footer">
          <a href="https://github.com/Bryant-Curtis/Famebook/blob/master/README.md">About</a>
          <p className="profile-copyright">Famebook © 2016</p>
        </footer>

      </div>
    );
  },

  _onChange: function () {
    this.setState({ user: UserStore.find(parseInt(this.props.params.id)) });
  }

});

module.exports = Photos;
