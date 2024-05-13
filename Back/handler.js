'use strict';

const { handleLogin } = require('./handlers/login');
const { handleRegister } = require('./handlers/register');
const { handleSurvey } = require('./handlers/survey');
const { handleUser } = require('./handlers/user');
const { handleQuery } = require('./handlers/queryAll');

module.exports.main = async (event) => {
  const path = event.rawPath;
  const route = path.split('/')[1];

  switch (route) {
    case 'login':
      return await handleLogin(event);
    case 'register':
      return await handleRegister(event);
    case 'survey':
      return await handleSurvey(event);
    case 'user':
      return await handleUser(event);
    default:
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Ruta no encontrada' }),
      };
  }
};

module.exports.query = async (event) => {
  return await handleQuery(event);
};
