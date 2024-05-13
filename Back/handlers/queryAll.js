// user.js
const { getAll } = require('../utils');

module.exports.handleQuery = async (event) => {
  try {
    const data = await getAll();

    console.log(data);

    const cleanedData = data.map((item) => ({
      user: item.user.S,
      mail: item.mail.S,
      survey: item.survey.S === '' ? null : JSON.parse(item.survey.S),
      phone: item.phone.S,
    }));

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Consulta Exitosa',
        data: cleanedData,
      }),
    };
    
    
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
