# Phase 5: Comments and Votes functionality (1.5 days)

## Rails
### Models
* Comment
* Vote

### Controllers
* CommentsController (create, destroy)
* VotesController (create, destroy)

### Views

## Flux
### Views (React Components)
* Comment Form
* Comment Show
* Vote Button
* Vote Show

### Stores
* Comment
* Votes

### Actions
* ApiActions.receiveAllComments -> triggered by ApiUtil
* ApiActions.receiveSingleComment
* ApiActions.deleteComment
* CommentActions.fetchAllComments -> triggers ApiUtil
* CommentActions.fetchSingleComment
* CommentActions.createComment
* CommentActions.destroyComment

* ApiActions.receiveAllVotes -> triggered by ApiUtil
* ApiActions.receiveSingleVote
* ApiActions.deleteVote
* VoteActions.fetchAllVotes -> triggers ApiUtil
* VoteActions.fetchSingleVote
* VoteActions.createVote
* VoteActions.destroyVote


### ApiUtil
* ApiUtil.fetchAllComments
* ApiUtil.fetchSingleComment
* ApiUtil.createComment
* ApiUtil.destroyComment

* ApiUtil.fetchAllVotes
* ApiUtil.fetchSingleVote
* ApiUtil.createVote
* ApiUtil.destroyVote

## Gems/Libraries
