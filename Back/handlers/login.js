// login.js

const {
  DynamoDBClient,
  QueryCommand,
  PutItemCommand,
} = require('@aws-sdk/client-dynamodb');
const { marshall } = require('@aws-sdk/util-dynamodb');
const { verifyPassword } = require('../utils');

const client = new DynamoDBClient({ region: 'us-east-1' });
const tableName = process.env.DYNAMODB_TABLE;

module.exports.handleLogin = async (event) => {
  try {
    const requestBody = JSON.parse(event.body);
    //{ emailOrUser: 'correo@mail.com', password: 'prueba' }

    const check = await checkExistingUser(requestBody.emailOrUser);

    if (check.exists) {
      const record = check.record;
      //console.log('record', record);

      const match = await verifyPassword(
        requestBody.password,
        record.password.S
      );

      if (match) {
        const sanitizedRecord = {};
        for (const key in record) {
          if (key !== 'password') {
            if (key === 'survey' && record[key].S && record[key].S.length > 0) {
              sanitizedRecord[key] = JSON.parse(record[key].S);
            } else {
              sanitizedRecord[key] = record[key].S || record[key].SS;
            }
          }
        }

        return {
          statusCode: 200,
          body: JSON.stringify({
            message: 'Inicio de sesión exitoso',
            data: sanitizedRecord,
          }),
        };
      } else {
        return {
          statusCode: 401,
          body: JSON.stringify({ message: 'Contraseña incorrecta' }),
        };
      }
    } else {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: 'Usuario no registrado' }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error al iniciar sesión', data: error }),
    };
  }
};

async function checkExistingUser(value) {
  try {
    const userParams = {
      TableName: tableName,
      KeyConditionExpression: '#usr = :val',
      ExpressionAttributeNames: {
        '#usr': 'user',
      },
      ExpressionAttributeValues: {
        ':val': { S: value },
      },
      ConsistentRead: true,
    };

    const mailParams = {
      TableName: tableName,
      IndexName: 'mail-user-index',
      KeyConditionExpression: '#ml = :val',
      ExpressionAttributeNames: {
        '#ml': 'mail',
      },
      ExpressionAttributeValues: {
        ':val': { S: value },
      },
    };

    const [userResult, mailResult] = await Promise.all([
      client.send(new QueryCommand(userParams)),
      client.send(new QueryCommand(mailParams)),
    ]);

    //console.log('userResult', userResult.Items);
    //console.log('mailResult', mailResult.Items);

    if (userResult.Count > 0) {
      return {
        exists: true,
        record: userResult.Items[0],
      };
    } else if (mailResult.Count > 0) {
      return {
        exists: true,
        record: mailResult.Items[0],
      };
    } else {
      return {
        exists: false,
        record: null,
      };
    }
  } catch (error) {
    console.error('Error al verificar usuario existente:', error);
    throw error;
  }
}
