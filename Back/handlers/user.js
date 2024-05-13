// user.js
const { getUser } = require('../utils');

module.exports.handleUser = async (event) => {
  try {
    const userId = event?.pathParameters?.id;

    const user = await getUser(userId);

    if (user) {
      const sanitizedRecord = {};
      for (const key in user) {
        if (key !== 'password') {
          sanitizedRecord[key] = user[key].S || user[key].SS;
        }
      }

      return {
        statusCode: 400,
        body: JSON.stringify({
          data: sanitizedRecord,
        }),
      };
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'No se encuentra el usuario',
        }),
      };
    }

    
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error al obtener información del usuario',
        data: error,
      }),
    };
  }
};
