let arc = require("@architect/functions")

async function route(req) {
  return `praise cage`
}


exports.handler = arc.http.async(route)