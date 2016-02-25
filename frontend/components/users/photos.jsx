var React = require('react'),
    ApiUtil = require('../../util/apiUtil'),
    UserStore = require('../../stores/userStore'),
    Header = require('./header'),
    ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var Photos = React.createClass({
  getInitialState: function () {
    return { user: UserStore.find(parseInt(this.props.params.id)), imageUrl: "", imageFile: null };
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

  // addPhoto: function () {
  //   ApiUtil.createPhoto();
  // },

  render: function () {
    var username = "",
        photoList = [],
        noPhotosMessage = "",
        currentPageUser = "";

    if (this.state.user && this.state.user.length !== 0) {
      currentPageUser = this.state.user;

      // NO PHOTOS MESSAGE

      if (this.state.user.photos && this.state.user.photos.length === 0) {
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

    }

    return(
      <div className="photos-main">
        <Header user={this.state.user} />

        <section className="photos-list">

          <header className="photos-list-header group">
            <i className="fa fa-camera-retro"></i>
            <a href={"#/users/" + this.state.user.id + "/photos"}>Photos</a>

            <form onSubmit={this.handleSubmit}>

              <label>
                <input type="file" onChange={this.changeFile} />
              </label>

              <img className="preview-image" src={this.state.imageUrl}/>
              <button>Submit</button>

            </form>
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

  changeFile: function(e) {
    var reader = new FileReader();
    var file = e.currentTarget.files[0];

    reader.onloadend = function () {
      this.setState({imageFile: file, imageUrl: reader.result});
    }.bind(this);

    if (file) {
      reader.readAsDataURL(file); // will trigger a load end event when it completes, and invoke reader.onloadend
    } else {
      this.setState({imageFile: null, imageUrl: ""});
    }
  },

  handleSubmit: function(e) {
    e.preventDefault();

    var formData = new FormData();

    formData.append("photo[photoable_id]", this.props.params.id);
    formData.append("photo[photograph]", this.state.imageFile);

    ApiUtil.createPhoto(formData, this.resetForm);
  },


  _onChange: function () {
    this.setState({ user: UserStore.find(parseInt(this.props.params.id)) });
  }

});

module.exports = Photos;

// <button onClick={this.addPhoto}>Add Photos</button>
