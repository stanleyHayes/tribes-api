# tribes-api

tribes api is an application containing JavaScript. The checked-in dependency manifests use Express, MongoDB via Mongoose. Source modules cover `authentication`, `jokes`, `comment`, `downvote`, `favorite`, `folklore`, `joke`, `tribe`, `upvote`, `user`.

## Repository layout

- `config/` — 1 tracked file(s).
- `controllers/` — 2 tracked file(s); source examples: `controllers/authentication.js`, `controllers/jokes.js`.
- `models/` — 8 tracked file(s); source examples: `models/comment.js`, `models/downvote.js`.
- `routes/` — 9 tracked file(s); source examples: `routes/authentication.js`, `routes/comments.js`.

## Local setup

Run each package setup block from the repository root. For workspace repositories, install dependencies at the root before running application-specific scripts.

Clone this repository and enter its directory:

```sh
git clone https://github.com/stanleyHayes/tribes-api.git
cd tribes-api
```

### Node package: `package.json`

Use Node.js and npm.

```sh
npm install
```

- `npm run dev` — runs the declared `dev` script (`nodemon`).
- `npm run start` — runs the declared `start` script (`node index.js`).
- The package test script is a placeholder and exits with an error; it does not run an automated test suite.

## Configuration

The application declares `dotenv`. Review environment-variable references in the source and supply your own local values before starting it. Keep credentials out of Git; do not reuse committed credentials.

## Source entry points

- [controllers/authentication.js](controllers/authentication.js)
- [controllers/jokes.js](controllers/jokes.js)
- [index.js](index.js)
- [models/comment.js](models/comment.js)
- [models/downvote.js](models/downvote.js)
- [models/favorite.js](models/favorite.js)
- [models/folklore.js](models/folklore.js)
- [models/joke.js](models/joke.js)

## Development notes

Commands above come from the tracked manifests and source layout. External services and runtime configuration may be required. Documentation updates do not establish that the application is deployed or that its tests pass.
