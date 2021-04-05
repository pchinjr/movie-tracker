let arc = require('@architect/functions')
let data = require('@begin/data')

exports.handler = arc.http.async(http)

function authControl(session) {
  if(session.account) {
    return `
    Welcome back ${JSON.stringify(session.account.name)}
    <form action=/logout method="post">
    <button>Logout</button>
    </form>`
  } else {
    let clientID = process.env.GITHUB_CLIENT_ID
    let redirectURL = process.env.GITHUB_REDIRECT
    let href = `https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_url=${redirectURL}`
    return `
    <a href='${href}'>Login</a>
    `
  }
}

async function getMovies(session) {
  if (session.account) {
    //get movie data
    let account = session.account.id
    let movies = await data.get({
      table: `${account}-movies`
    })
    console.log("movies in db:", movies)

    return movies
  }
}

async function http (req) {

  return {
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Praise Cage</title>
</head>
<body>
<h1>Praise Cage</h1>

${authControl(req.session)}

<form action="/watched" method="post">
  <input type="hidden" name="movieId" value="001">
  <input type="checkbox" name="watched">
  Raising Arizona
  <button>Save</button>
</form>

<form action="/watched" method="post">
  <input type="hidden" name="movieId" value="002">
  <input type="checkbox" name="watched">
  Con Air
  <button>Save</button>
</form>

<form action="/watched" method="post">
  <input type="hidden" name="movieId" value="003">
  <input type="checkbox" name="watched">
  National Treasure
  <button>Save</button>
</form>

${getMovies(req.session)}

<script>

</script>

</body>
</html>
`
  }
}