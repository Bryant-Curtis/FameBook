## Minimum Viable Product

FameBook is a web application inspired by FaceBook built using Ruby on Rails and React.js. FameBook allows users to:

- [x] Sign up
- [x] Log in/out
- [ ] User settings
- [x] Create, read, edit, and delete posts
- [x] Request, accept and decline friend requests
- [ ] Tag friends in posts
- [ ] Create, view, update and delete photos with descriptions
- [ ] Add profile and cover photos
- [ ] Comment on posts and photos
- [ ] Vote up and take down votes on friends' posts
- [ ] Instant message with friends

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

Pages: Homepage (sign up/log in), User settings

[Details][phase-one]

### Phase 2: Flux Architecture and Post CRUD (2.5 days)

Phase 2 is focused on setting up Flux, the React Router, and the React view
structure for the main application. After the basic Flux architecture has been
set up, a Post store will be implemented and a set of actions corresponding to
the needed CRUD functionality created. Once this is done, I will create React
views for the Posts `Index` and `Form`. At the end of Phase 2, Posts can be
created, read and destroyed in the browser. I will use CSS to design the
Posts index page.

Pages: Posts index(root page), Self Posts(user page)

[Details][phase-two]

### Phase 3: Add Friends (1 day)

Phase 3 is focussed on friend functionality. I will create database relationships
between users to setup friend functionality. I will also create a new model
friendships which will each user to only see the posts of their friends
on the root page they go to after signing in.

Pages: Friends index

[Details][phase-three]

### Phase 4: CRUD Photos (1.5 days)

Phase 4 is about Photos. I will create React views for the Photo `Form`, `Index`
and `Show`. I will add the ability for each user to be able to upload
their own photos and view them immediately. From their uploaded photos they will
each be able to set a profile and background photo.

Pages: Photos Index, Photo Show

[Details][phase-four]

### Phase 5: Add guest log in with tour of site, add and remove Votes (1.5 days)

Phase 5 introduces votes. I will create React views for a Vote button to
to display on each post and photo. The user will be able to see whether they
have voted on a post/photo by the change in the vote image. A number displaying
the number of votes each post/photo received will also show immediately after
being clicked. The users will also be able to rescind votes.

Views: Guest login button on Homepage, Tour message bubbles/buttons,
        Vote image changing functionality

[Details][phase-five]

### Phase 6: Improve website design, add instant messaging, update guest login (1 day)

Phase 6 is about messaging. I will create React views for the `Form` and `Show`
of messages. There will be an instant message box that will allow users to send
messages to friends in real time. The messages will appear in the view box
immediately after being sent.

Views: Update HTML and CSS to look more aesthetically pleasing, Instant messaging box

[Details][phase-six]

### Bonus Features (TBD)
- [ ] Friend search
- [ ] Set account privacy levels (Public, friends only and self only)
- [ ] Create, edit and delete groups
- [ ] Send, accept and decline group invitations
- [ ] Create group member list
- [ ] Create, read, edit and delete group posts/comments
- [ ] OAuth
- [ ] Infinite Scroll

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
[phase-six]: ./docs/phases/phase6.md
