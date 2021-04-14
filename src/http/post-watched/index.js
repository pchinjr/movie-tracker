const arc = require('@architect/functions')
const data = require('@begin/data')

exports.handler = arc.http.async(route)

async function route(req) {
  
  let account = req.session.account.id

  if (req.body.watched) {
    await data.set({
      table: `${account}-movies`,
      key: req.body.movieId,
      review: req.body.review,
      rating: req.body.rating
    })
  } else {
    await data.destroy({
      table: `${account}-movies`,
      key: req.body.movieId
    })
  }

  return {
    location: '/'
  }
}
