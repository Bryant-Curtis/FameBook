# Phase 4: CRUD Photos (1.5 days)

* Api::PhotosController (create, destroy, index, show, update)

### Views
* photos/index.json.jbuilder
* photos/show.json.jbuilder

## Flux
### Views (React Components)
* PhotosIndex
  - PhotoIndexItem
* PhotoForm
* SearchIndex

### Stores
* Photo

### Actions
* ApiActions.receiveAllPhotos -> triggered by ApiUtil
* ApiActions.receiveSinglePhoto
* ApiActions.deletePhoto
* PhotoActions.fetchAllPhotos -> triggers ApiUtil
* PhotoActions.fetchSinglePhoto
* PhotoActions.createPhoto
* PhotoActions.editPhoto
* PhotoActions.destroyPhoto

### ApiUtil
* ApiUtil.fetchAllPhotos
* ApiUtil.fetchSinglePhoto
* ApiUtil.createPhoto
* ApiUtil.editPhoto
* ApiUtil.destroyPhoto

## Gems/Libraries
