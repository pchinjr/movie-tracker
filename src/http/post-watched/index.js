let arc = require('@architect/functions')
let data = require('@begin/data')

async function route(req) {
  console.log('post-watched:', req.body)
  let account = req.session.account.id

  if (req.body.watched) {
    console.log('about to write')
    await data.set({
      table: `${account}-movies`,
      key: req.body.movieId
    })
  } else {
    console.log('about to destroy')
    await data.destroy({
      table: `${account}-movies`,
      key: req.body.movieId
    })
  }

  return {
    location: '/'
  }
}

exports.handler = arc.http.async(route)
