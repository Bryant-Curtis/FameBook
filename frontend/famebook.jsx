var React = require('react'),
    ReactDOM = require('react-dom'),
    ApiUtil = require('./util/apiUtil'),
    Dispatcher = require('./dispatcher/dispatcher'),
    FamebookConstants = require('./constants/famebookConstants'),
    PostStore = require('./stores/postStore'),
    Posts = require('./components/post');

var App = React.createClass({
  render: function () {
    return(
      <Posts />
    );
  }
});

document.addEventListener("DOMContentLoaded", function (event) {
  ReactDOM.render(<App />, document.getElementById('root'));
});
