# Phase 6: Instant Messaging (1 day)

## Rails
### Models
* Message

### Controllers
* MessagesController (create, destroy)

### Views

## Flux
### Views (React Components)
* MessagesIndex
  - MessageIndexItem
* MessageForm

### Stores
* Message

### Actions
* ApiActions.receiveAllMessages -> triggered by ApiUtil
* ApiActions.receiveSingleMessage
* ApiActions.deleteMessage
* MessageActions.fetchAllMessages -> triggers ApiUtil
* MessageActions.fetchSingleMessage
* MessageActions.createMessage
* MessageActions.destroyMessage

### ApiUtil
* ApiUtil.fetchAllMessages
* ApiUtil.fetchSingleMessage
* ApiUtil.createMessage
* ApiUtil.destroyMessage

## Gems/Libraries
