# Posts Api README

## Routes

**Users Route**

**Sign up**:
_Method_ - POST
_Route_ - `/users/sign-up`
_Body_ - {
&emsp; `username`: string
&emsp; `password`: string
&emsp; `first_name`: string
&emsp; `last_name`: string
&emsp; `birth_date`: date
&emsp; `age`: number
}

**Login**:
_Method_ - POST
_Route_ - `/users/login`
_Body_ {
&emsp; `username`: string
&emsp; `password`: string
}

**Logout**:
_Method_ - GET
_Route_ - `/users/logout`

---

**Posts Route**

**Get all posts**:
_Method_: GET
_Route_: `/posts/posts`

**Get one post**
_Method_ - GET
_Route_ - `/posts/post/:id`

**Add post**:
_Method_ - POST
_Route_ - `/posts/post`
_body_ - {
&emsp; `title`: string
&emsp; `body`: string
}

**Edit post**:
_Method_ - PUT
_Route_ - `/posts/post/:id`
_Body_ - {
&emsp; `title`: string
&emsp; `body`: string
}

**Delete post**:
_Method_ - DELETE
_Route_ - `/posts/post/:id`
