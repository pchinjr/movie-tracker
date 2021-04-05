@app
movie-tracker

@static

@http
get /
get /login
get /auth
post /logout

post /watched

@tables
data
  scopeID *String
  dataID **String
  ttl TTL

# @aws
# profile default
# region us-west-1
