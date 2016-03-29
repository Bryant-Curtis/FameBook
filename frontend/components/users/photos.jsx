var React = require('react'),
    ApiUtil = require('../../util/apiUtil'),
    UserStore = require('../../stores/userStore'),
    Header = require('./header'),
    ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var Photos = React.createClass({
  getInitialState: function () {
    return { user: UserStore.find(parseInt(this.props.params.id)), imageUrl: "", imageFile: null, modalIsOpen: false, modalClass: "photo-list-hide" };
  },

  // REFACTOR - DO I NEED modalIsOpen???

  openModal: function () {
    this.setState({modalIsOpen: true});
    this.setState({modalClass: "photo-list-display" })
  },

  closeModal: function () {
    this.setState({modalIsOpen: false});
    this.setState({modalClass: "photo-list-hide" })
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

    // NOTE THE formData.append does not LOOK LIKE it adds anything
    // to the formData variable when seen in the debugger console.
    // HOWEVER, it actually DOES APPEND the data. It's just hidden.

    formData.append("photo[photoable_id]", this.props.params.id);
    formData.append("photo[photoable_type]", "User");
    formData.append("photo[photograph]", this.state.imageFile);

    ApiUtil.createPhoto(formData, this.resetForm);
  },

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
            <li key={photo.id} className="photo group"><img src={photo.url}/></li>
          );
        });
      }

    }

    return(
      <div className="photos-main">
        <Header user={this.state.user} />

        <section className="photos-list">

          <header id="hi" className="photos-list-header group">

              <i className="fa fa-camera-retro"></i>
              <a href={"#/users/" + this.state.user.id + "/photos"} className="photo-list-title">Photos</a>

              <section onClick={this.openModal} className="open-photo-list-upload-link-box">
                <p className="open-photo-list-upload-link">Add Photo</p>
              </section>

              <section id="open-photo-list-upload" className={this.state.modalClass}>

                <section>

                  <form onSubmit={this.handleSubmit} className="photo-list-upload-form">
                    <section>
                      <p onClick={this.closeModal}>x</p>
                    </section>
                    <input type="file" onChange={this.changeFile} className="photo-list-upload-form-input"/>
                    <img className="photo-list-upload-form-image-preview" src={this.state.imageUrl}/>
                    <button onClick={this.closeModal}>Post</button>
                  </form>

                </section>

              </section>

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

// <button onClick={this.addPhoto}>Add Photos</button>
