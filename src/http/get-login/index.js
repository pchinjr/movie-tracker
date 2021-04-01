const arc = require('@architect/functions')
const github = require('./github')

async function login(req) {
  let account
  if (req.query.code) {
    try {
      account = await github(req)
    } catch (err) {
      return {
        statusCode: err.code,
        body: err.message
      }
    }
    return {
      session: { account },
      location: '/'
    }
  } else {
    return {
      location: '/'
    }
  }
}

exports.handler = arc.http.async(login)