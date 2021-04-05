@app
movie-tracker

@static

@http
get /
get /login
post /logout
post /watched

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
