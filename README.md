# USOF-BACKEND

# How to run

> run npm install

> Create .env file with corresponding environment data. Sample is given in .env.dist

End Points

# Auth Module

### Register

POST ```/api/auth/register```

Body parameters:

- "login"
- "password"
- "fname"
- "lname"
- "email"

### Login

POST ```/api/auth/login```

Body parameters:

- "login"
- "password"

### Verification

POST ```/api/auth/register/verification```

Body parameters:

- "confirmCode"
- "token"

### Reset password

PATCH ```/api/auth/password-reset```
Body parameters:

- "confirmCode"
- "password"

# Users Module

### Get all users

GET ```/api/users/```

### Get user by id

GET ```/api/users/:id```

### Upload avatar

PATCH ```/api/users/avatar```

Body parameters:

- "file" : img-file

### Update user

PATCH ```/api/users/me```
Body parameters:

- "login"
- "fname"
- "lname"
- "email"

### Delete user

DELETE ```/api/users/:id```

- "password"
- "fname"
- "email"
- "lname"

# Post Module

### Get all posts

GET```/api/posts/```

### Get post by id

GET```/api/posts/:id```

### Get all comments under post

GET```api/posts/:id/comments```

### Get all categories for post

GET```/api/posts/:id/categories```

### Create post

POST```/api/posts```

You can create new post, body parameters:

- title
- content
- author_id
- categories

### Create like under post

POST```api/posts/:id/like```

- entity_id
- entity_type - ["post", "comment"]
- type

### Create comment under post

POST```/api/posts/:id/comments```

- content
- parent


# README IS NOT FULL ALL BASIC IS COMPLETED. SOME FEATURES IS ADDED TOO.
