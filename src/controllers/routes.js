'use strict'

const requestUtil = require('five-bells-shared/utils/request')
const routingTables = require('../services/routing-tables')
const routeBroadcaster = require('../services/route-broadcaster')
const knownConnectors = {}

exports.post = function * () {
  const routes = yield requestUtil.validateBody(this, 'Routes')

  // TODO verify that POSTer of these routes matches route.connector.
  for (const route of routes) {
    routingTables.addRoute(route)
  }

  const connector = routes[0] && routes[0].connector
  if (connector && !knownConnectors[connector]) {
    yield routeBroadcaster.broadcast()
    knownConnectors[connector] = true
  }

  this.status = 200
}
