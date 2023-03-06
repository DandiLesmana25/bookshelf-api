const Hapi = require('@hapi/hapi')

const init = async () => {
  const server = new Hapi.Server({
    port: 5000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*']
      }
    }
  })
  server.route(require('./routes'))

  await server.start()
  console.log(`Server berjalan pada ${server.info.uri}`)
}

init()
