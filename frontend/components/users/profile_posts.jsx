var React = require('react');

var ProfilePosts = React.createClass({
  render: function () {
    return(
      { postform }
      <ul>
        <ReactCSSTransitionGroup transitionName="posts" transitionEnterTimeout={500} transitionLeaveTimeout={600}>
          { userPosts }
        </ReactCSSTransitionGroup>
      </ul>
    )
  }
});

// Add this in future refactor
