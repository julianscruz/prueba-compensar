// survey.js

const {
  DynamoDBClient,
  UpdateItemCommand,
} = require('@aws-sdk/client-dynamodb');
const { getUser } = require('../utils');

const client = new DynamoDBClient({ region: 'us-east-1' });
const tableName = process.env.DYNAMODB_TABLE;

module.exports.handleSurvey = async (event) => {
  try {
    const requestBody = JSON.parse(event.body);
    const { user, survey } = requestBody;

    const surveyString = JSON.stringify(survey);
    const userData = await getUser(user);

    if (userData) {
      userData.survey = { S: surveyString };

      const params = {
        TableName: tableName,
        Key: {
          user: { S: userData.user.S },
          mail: { S: userData.mail.S },
        },
        UpdateExpression: 'SET survey = :survey',
        ExpressionAttributeValues: {
          ':survey': { S: surveyString },
        },
      };

      try {
        const command = new UpdateItemCommand(params);
        const data = await client.send(command);

        return {
          statusCode: 202,
          body: JSON.stringify({
            message: 'Encuesta completada exitosamente',
            data: data,
          }),
        };
      } catch (error) {
        throw error;
      }
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error al completar la encuesta',
        data: error,
      }),
    };
  }
};
