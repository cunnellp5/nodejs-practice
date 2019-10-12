# TODO:
#### (stealing check list from cj)

## STRETCH

* [ ] Store date of note in DB
 * [ ] Sort notes by date created.
* [ ] View user profile
* [ ] Users can mark notes as public
 * [ ] Notes show up on profile

## Admin Page:

* [X] Admin page that lists all users
 * [ ] admin table with user_id
 * [ ] de-activate users
* [ ] Admin can see any page on site
* [ ] Rate limiting
 * [ ] Prevent brute force logins
  * [ ] Lock out account after too many login attempts
* [ ] Password strength meter!
* [ ] reCaptcha for signup/login
* [ ] Password reset with email
* [ ] Forgot password
 * [ ] Reset with email
 * [ ] Reset by answering security questions
* [X] Testing...

## To deploy everything to the same heroku instance 

* [x] Move the server package.json to the root of the folder
* [x] Update start script for server to be a relative path
* [ ] post-deploy script to server that will build Vue.js
* [x] Add a static serve to the server that serves '../client/dist'
* [x] Environment variable for DB connection and token secret
* [ ] Update calls in client from localhost:5000 to be your-app.herokuapp.com