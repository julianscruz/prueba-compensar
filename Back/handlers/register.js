// register.js

const {
  DynamoDBClient,
  QueryCommand,
  PutItemCommand,
} = require('@aws-sdk/client-dynamodb');
const { marshall } = require('@aws-sdk/util-dynamodb');
//const { v4: uuidv4 } = require('uuid');
const { hashPassword } = require('../utils');

const client = new DynamoDBClient({ region: 'us-east-1' });
const tableName = process.env.DYNAMODB_TABLE;

module.exports.handleRegister = async (event) => {
  try {
    const requestBody = JSON.parse(event.body);
    //{ email: 'correo@mail.com', user: 'nombre-usuario', phone: '123456789', password: 'prueba' }

    const check = await checkExistingUser(requestBody.email, requestBody.user);

    if (check?.exists) {
      let errorMessage = '';

      if (check.conflict.email && check.conflict.username) {
        errorMessage =
          'El nombre de usuario y el correo ya se encuentran registrados.';
      } else if (check.conflict.username) {
        errorMessage = 'El nombre de usuario ya está en uso.';
      } else if (check.conflict.email) {
        errorMessage = 'El correo ya se encuentra registrado.';
      }

      return {
        statusCode: 200,
        body: JSON.stringify({ message: errorMessage }),
      };
    } else {
      const hashedPassword = await hashPassword(requestBody.password);
      const params = {
        TableName: tableName,
        Item: marshall(
          {
            mail: requestBody.email,
            user: requestBody.user,
            password: hashedPassword,
            phone: requestBody.phone,
            survey: "", // new Set()
          },
          { removeUndefinedValues: true/*, convertEmptyValues: true*/ }
        ),
      };

      await client.send(new PutItemCommand(params));

      return {
        statusCode: 201,
        body: JSON.stringify({
          message: 'Registro exitoso',
          data: {
            mail: requestBody.email,
            user: requestBody.user,
            phone: requestBody.phone,
          },
        }),
      };
    }
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error al registrar usuario',
        data: error,
      }),
    };
  }
};

async function checkExistingUser(email, username) {
  try {
    const emailParams = {
      TableName: tableName,
      IndexName: 'mail-user-index',
      KeyConditionExpression: '#ml = :m',
      ProjectionExpression: '#ml',
      ExpressionAttributeNames: {
        '#ml': 'mail',
      },
      ExpressionAttributeValues: {
        ':m': { S: email },
      },
    };

    const usernameParams = {
      TableName: tableName,
      KeyConditionExpression: '#usr = :username',
      ProjectionExpression: '#usr',
      ExpressionAttributeNames: {
        '#usr': 'user',
      },
      ExpressionAttributeValues: {
        ':username': { S: username },
      },
    };

    const emailResult = await client.send(new QueryCommand(emailParams));
    const usernameResult = await client.send(new QueryCommand(usernameParams));

    const emailExists = emailResult.Items.length > 0;
    const usernameExists = usernameResult.Items.length > 0;

    return {
      exists: emailExists || usernameExists,
      conflict: { email: emailExists, username: usernameExists },
    };
  } catch (error) {
    console.error('Error al verificar usuario existente:', error);
    throw error;
  }
}
