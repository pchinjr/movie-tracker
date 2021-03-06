const arc = require('@architect/functions')
const data = require('@begin/data')

exports.handler = arc.http.async(http)

function authControl(account) {
  if (account && account.name) {
    return `
    Welcome back ${account.name}
    <form action=/logout method="post">
    <button>Logout</button>
    </form>`
  } else {
    let clientID = process.env.GITHUB_CLIENT_ID
    let redirectURL = process.env.GITHUB_REDIRECT
    let href = `https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_url=${redirectURL}`
    return `
    <a href='${href}'>Login with GitHub to see a list of movies</a>
    `
  }
}

function movie({ key, watched, title, rating, review }) {

  return `
<form action="/watched" method="post">
  <input type="hidden" name="movieId" value="${key}">
  <input type="checkbox" data-movieid="${key}" name=watched ${watched ? 'checked' : ''}>
  ${title}
  <input type="text" data-movieid="${key}" name="review" placeholder="leave a review here" value="${review || ''}">

  <input type="radio" name="rating" data-movieid="${key}" value="1" ${rating === '1' ? 'checked' : ''}>
  <input type="radio" name="rating" data-movieid="${key}" value="2" ${rating === '2' ? 'checked' : ''}>
  <input type="radio" name="rating" data-movieid="${key}" value="3" ${rating === '3' ? 'checked' : ''}>

  <button class=cage>Save</button>
  </form>`
}

async function getMovies(account) {
  let movies = [
    { key: '001', title: 'Raising Arizona' },
    { key: '002', title: 'Con Air' },
    { key: '003', title: 'National Treasure' },
  ]
  if (account) {
    let accountMovies = await data.get({
      table: `${account.id}-movies`
    })

    let result = ''
    for (let mov of movies) {
      let found = (accountMovies.find(m => m.key === mov.key))
      result += movie({
        key: mov.key,
        title: mov.title,
        watched: !!found,
        rating: found ? found.rating : '',
        review: found ? found.review : ''
      })
    }
    return result
  }
  return ''
}

async function http(req) {

  return {
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="/_static/index.css">
  <link rel="shortcut icon" href="#">
  <title>Praise Cage</title>
</head>
<body>
<h1>Praise Cage</h1>

${authControl(req.session.account)}
${await getMovies(req.session.account)}

<script src=/_static/index.js type=module></script>
</body>
</html>
`
  }
}
