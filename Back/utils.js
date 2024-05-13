const {
  DynamoDBClient,
  QueryCommand,
  ScanCommand,
} = require('@aws-sdk/client-dynamodb');

const bcrypt = require('bcryptjs');

const tableName = process.env.DYNAMODB_TABLE;

async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

async function verifyPassword(plainTextPassword, hashedPassword) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
}

async function getUser(value) {
  const client = new DynamoDBClient({ region: 'us-east-1' });

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

    const user = await client.send(new QueryCommand(userParams));

    //console.log('user', user);
    //console.log('user.Count', user.Count);

    if (user.Count > 0) {
      return user.Items[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error al verificar usuario existente:', error);
    throw error;
  }
}

async function getAll() {
  const client = new DynamoDBClient({ region: 'us-east-1' });

  try {
    const queryParams = {
      TableName: tableName,
    };

    const result = await client.send(new ScanCommand(queryParams));

    if (result.Count > 0) {
      return result.Items;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error al obtener todos los registros:', error);
    throw error;
  }
}

module.exports = { hashPassword, verifyPassword, getUser, getAll };
