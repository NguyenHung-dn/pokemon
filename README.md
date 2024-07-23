# pokemon-frontend

## Repository rules

1. Every new feature should be developped on a new branch pulled from the current used branch. ex: current branch is develop:

```bash
git checkout develop
git pull origin develop
git checkout -b <new branch>
```

2. The name of the new branch should be named after the ticket name. ex: Ticket - PKDX-0000 => Branch name: PKDX-0000
3. Commit message convention:

```bash
git commit -m "<name of branch>: <message>"
# ex:
git commit -m "PKDX-0000: added header"
```

4. Code review should be done before any merge request
5. In case of code conflit follow these steps:

```
- Go on your local and checkout to the target branch
- Update the local target branch
- Pull your branch onto it
- Resolve conflicts
- Push
```

```bash
git checkout develop
git pull origin develop
git pull origin PKDX-0000
# resolve conflicts
git add <files>
git commit
git push
```

6. Merge request needs to be approved by all members
7. All members are required to review merge request

## API

### Pokémon database

GET: https://pokeapi.co/api/v2/pokemon?offset=0&limit=151
Receive a list of the 151 first pokemon

### Custom database

URL: https://pokemon-api-phi-nine.vercel.app

#### Endpoints

1. POST: /signup
   BODY:

```json
{
  "email": "string",
  "password": "string"
}
```

RESPONSE:
400 Email and password are required: No email/password in body
201 Account created successfully

2. POST: /login
   BODY:

```json
{
  "email": "string",
  "password": "string"
}
```

RESPONSE:
400 Invalid email or password
200 return user object

```json
{
  "user": {
    "token": {
      "value": "e1cfb707384d5d00613d6998014fdab860a479203bedd35551b6ff718cbe82bb",
      "expired": "2024-07-24T07:49:57.509Z"
    },
    "_id": "66976db3d973af0429855946",
    "email": "lala@gmail.com",
    "salt": "$2b$10$wX2WVawVgHS0DhK7oMrI4u",
    "hash": "$2b$10$wX2WVawVgHS0DhK7oMrI4u7auHXYghPXYMr9zLMpVrdJ3l.548X0m",
    "teams": [
      {
        "team": [
          {
            "name": "bulbasaur",
            "ability": "overgrow",
            "moves": ["1", "2", "4"],
            "_id": "669772c37bbce215c4f73405"
          },
          {
            "name": "charmander",
            "ability": "blop",
            "moves": ["1"],
            "_id": "669772c37bbce215c4f73406"
          }
        ],
        "_id": "66976dc2d973af042985594b",
        "__v": 7
      }
    ],
    "__v": 1
  }
}
```

3. POST: /team/create
   BODY:

```json
{
 "token": "string"
 "team":[
      {
         "name":"bulbasaur",
         "ability":"overgrow",
         "moves":[
            "1",
            "2",
            "4"
         ]
      },
      {
         "name":"charmander",
         "ability":"blop",
         "moves":[
            "1"
         ]
      }
   ]
}
```

RESPONSE:
401 No token provided
401 Invalid or expired token
404 User not found
422 wrong body format, received object...
200 Team added/updated successfully return user object

4. POST: /team/update
   BODY:

```json
{
  "token": "e1cfb707384d5d00613d6998014fdab860a479203bedd35551b6ff718cbe82bb",
  "team": {
    "_id": "66976dc2d973af042985594b",
    "team": [
      {
        "name": "bulbasaur",
        "ability": "overgrow",
        "moves": ["1", "2", "4"]
      },
      {
        "name": "charmander",
        "ability": "blop",
        "moves": ["1"]
      }
    ]
  }
}
```

REPONSE:
401 No token provided
401 Invalid or expired token
404 User not found
404 Team does not exist
404 Team id does not exist
200 Team updated successfully return user object
