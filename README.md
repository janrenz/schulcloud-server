# SchulCloud

![Travis Status](https://travis-ci.org/schulcloud/schulcloud-server.svg?branch=develop)

When running the server locally, a Swagger UI API documentation is served at [http://localhost:3030/swagger-ui/](http://localhost:3030/swagger-ui/).
# Requirements

* node.js
* mongoDB

## Setup

1. Clone directory into local folder
2. Go into the cloned folder and enter `npm install`

## Run

1. Go into project folder
2. run `mongod`
2. run `npm start`

## How to name your branch

1. Take the last part of the url of your Trello ticket (e.g. "8-setup-feather-js")
2. Name the branch "yourname/trelloid" (e.g. "nico/8-setup-feather-js")

## Testing

### Run tests

1. Go into project folder
2. run `npm run test`

### Create tests

1. Create a folder for the "service" you're working on in "/test/services"
2. Create a file "user.test.js" for frontend tests (e.g. clicking a link or check if url is available)
3. Create a file "unit.test.js" for backend tests (e.g. calculating a number)

*Try to cover as many methods as possible unit test wise - goal is 100% of course, so one test per method.*

## Commiting

Default branch: develop

1. Go into project folder
2. Run the tests (see above)
3. Commit with a meanigful commit message(!) even at 4 a.m. and not stuff like "dfsdfsf"
4. Checkout to master branch
5. Run `git pull`
6. Checkout to the branch you want to upload
7. run `git rebase -p develop` (not `git merge`!) and solve merge conflicts if needed
8. run `git push`
