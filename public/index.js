let forms = document.querySelectorAll("form[action='/watched']")

for (let f of forms) {
  f.querySelector('button').style.display = 'none'
  let check = f.querySelector('input[type="checkbox"]')
  check.addEventListener('change', function (e) {

    let movieId = e.target.dataset.movieid
    let payload = { movieId }
    let watched = e.target.checked
    if (watched) payload.watched = 'on'
    payload.review = f.querySelectorAll('input[name="review"]')[0].value
    let rating = f.querySelectorAll('input[name="rating"]:checked')
    payload.rating = rating.length === 1 ? rating[0].value : ''
    //make an HTTP post with fetch
    fetch('/watched', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-nick-cage': 'fetch'
      },
      body: JSON.stringify(payload)
    }).catch(function fail(err) {
      console.log('failed', err)
    })
    console.log(payload)
  }, false)
}
