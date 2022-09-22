import Server from './server.js'
import { config } from '../config/default.js'

function main(config, configcoors) {
  const server = new Server(config, configcoors)
  server.start()
}

main(config.api, config.coors)