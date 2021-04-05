let arc = require('@architect/functions')
let data = require('@begin/data')

async function route(req) {
  console.log('post-watched:', req.body)
  let account = req.session.account.id

  if(req.body.watched) {
    await data.set({
      table: `${account}-movies`,
      key: req.body.movieId,
      movies: {
        movieId: req.body.movie,
        watched: true
      }
    })
  } else {
    await data.set({
      table: `${account}-movies`,
      key: req.body.movieId,
      movies: {
        movieId: req.body.movie,
        watched: false
      }
    })
  }




  return {
    location: '/'
  }
}

exports.handler = arc.http.async(route)