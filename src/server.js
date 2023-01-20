const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: 'localhost',
    // prevent cross-origin denied
    routes: {
      cors: {
        origin: ['*'], // allow data to be consumed by all origin
      },
    },
  });

  server.route(routes);

  await server.start();
  console.log(`server runs on ${server.info.uri}`);
};

init();
