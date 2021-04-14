let forms = document.querySelectorAll("form[action='/watched']")

for (let f of forms) {

  // hide all submit buttons
  f.querySelector('button').style.display = 'none'

  // get a ref to the form checkbox
  let check = f.querySelector('input[type="checkbox"]')

  // get a ref to the form radios
  let radios = f.querySelectorAll('input[type="radio"]')

  // get a ref to the form text
  let text = f.querySelector('input[type="text"]')

  // mutates state
  function changed (e) {

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
  }

  // listen to checkbox changes
  check.addEventListener('change', changed, false)

  // listen to radio buttons getting hit
  for (let r of radios) {
    r.addEventListener('input', changed, false)
  }

  // listen to changes to review text
  text.addEventListener('input', changed, false)
}
