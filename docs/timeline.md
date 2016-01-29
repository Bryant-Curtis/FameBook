## Minimum Viable Product

FameBook is a web application inspired by FaceBook built using Ruby on Rails
and React.js. FameBook allows users to:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [ ] Create an account　
- [ ] Log in / Log out
- [ ] View their own account information

- [ ] Create, read, edit, and delete posts
- [ ] View all self made posts

- [ ] Request and accept friend requests
- [ ] View all friends
- [ ] View the posts of friends
- [ ] Tag friends in posts

- [ ] Create, view, update and delete photos with descriptions
- [ ] View photos of friends
- [ ] Add a main photo
- [ ] Add a background photo
- [ ] View all photos

- [ ] Comment on all posts
- [ ] Comment on all photos

- [ ] Vote up and take down votes on friends' posts

- [ ] Instant message with friends

<!--
(If have time later)
- [ ] Search for friends

- [ ] Set accounts' privacy level (Public, friends only and self only)

- [ ] Create, edit and delete groups
- [ ] Invite friends to join groups
- [ ] Accept and decline group invitations
- [ ] View all group members
- [ ] Create, read, edit and delete posts only viewable by group members
- [ ] Comment on group posts

- [ ] Create, view, edit and delete events
- [ ] Send event invitations to friends
- [ ] Accept and decline event invitations

- [ ] Create, view, update and delete photo albums

- [ ] Checkin their current location

- [ ] Tag friends in photos
 -->

## Design Docs
* [View Wireframes][view]
* [DB schema][schema]

[view]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication and Home page/User settings page design (1.5 days)

In Phase 1, I will begin by implementing user signup and authentication (using
BCrypt). There will be a basic landing page after signup that will eventually
contain the container for the application's root React component. The Sign up
and Log in page will be consolidated onto the website's home page.

[Details][phase-one]

### Phase 2: Flux Architecture and Post CRUD (2 days)

Phase 2 is focused on setting up Flux, the React Router, and the React view
structure for the main application. After the basic Flux architecture has been
set up, a Post store will be implemented and a set of actions corresponding to
the needed CRUD functionality created. Once this is done, I will create React
views for the Posts `Index` and `Form`. At the end of Phase 2, Posts can be
created, read and destroyed in the browser. I will use CSS to design the
Posts index page.

[Details][phase-two]

### Phase 3: Add/Accept Friends and Tagging (1.5 days)

Phase 3 is focussed on friend functionality. I will create database relationships
between users to setup friend functionality. I will also create two new models
namely Tag and Tagging to set up the ability for users to tag friends in their
posts.

[Details][phase-three]

### Phase 4: CRUD Photos (1.5 days)

Phase 4 is about Photos. I will create React views for the Photo `Form`, `Index`
and `Show`. There will also be functionality for each user to set a main and
background photo.

[Details][phase-four]

### Phase 5: Comments and Votes functionality (1.5 days)

Phase 5 introduces comments. I will create React views for a Comment `Form` and
`Show`. There will be a deletion function as well. Users will be able to comment
on all Posts and Photos.

[Details][phase-five]

### Phase 6: Instant Messaging (1 day)

Phase 6 is about messaging. I will create React views for the `Form` and `Show`
of messages. There will be an instant message box that will allow users to send
messages to each other in real time.

[Details][phase-six]

### Bonus Features (TBD)
- [ ] Search for friends
- [ ] Set account privacy level (Public, friends only and self only)

- [ ] Create, edit and delete groups
- [ ] Invite friends to join groups
- [ ] Accept and decline group invitations
- [ ] View all group members
- [ ] Create, read, edit and delete posts only viewable by group members
- [ ] Comment on group posts

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
[phase-six]: ./docs/phases/phase6.md
