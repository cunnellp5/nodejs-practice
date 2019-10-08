## Backend Admin

* [x] Route to list all users
    * GET /api/v1/users
* [x] Route to update a user
    * PATCH /api/v1/users/:id
* [x] Add a role property to users when created 
    * Role will default 'user'
* [x] Add a active property to users when created 
    * Active will default true
* [x] Seed the DB with an admin user
    * Insert user with role 'admin'
* [x] Restrict GET /api/v1/users to only users with admin role
    * List all users
* [x] Restrict PATCH /api/v1/users/:id to only users with admin role
    * Update a user
* [ ] Restrict POST /api/v1/users to only users with admin role
    * Create a user
* [x] Prevent inactive users from logging in