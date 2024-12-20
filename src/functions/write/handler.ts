import { DeleteCommand, GetCommand, PutCommand, UpdateCommand, UpdateCommandInput } from '@aws-sdk/lib-dynamodb';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { dynamoDBDocumentClient } from 'src/config/dbConfig';
import { v4 as uuid } from 'uuid';

const tableName = process.env.RECIPE_TABLE!;

const createRecipe: ValidatedEventAPIGatewayProxyEvent<null> = async (event: any) => {
  try {
    const { name, ingredients, instructions } = event.body;
    const id = uuid();
    const params = {
      TableName: tableName,
      Item: { id, name, ingredients, instructions },
    };

    await dynamoDBDocumentClient.send(new PutCommand(params));

    return formatJSONResponse({
      statusCode: 201,
      message: 'Receta creada con éxito!',
      data: params.Item,
    });
  } catch (error) {
    return formatJSONResponse({
      statusCode: 500,
      message: 'Error al crear receta',
      error: error.message,
    });
  }
};

const updateRecipe: ValidatedEventAPIGatewayProxyEvent<null> = async (event: any) => {
  try {
    const { id } = event.pathParameters!;
    const { name, ingredients, instructions } = event.body;

    const params: UpdateCommandInput = {
      TableName: tableName,
      Key: { id },
      UpdateExpression: 'SET #name = :name, ingredients = :ingredients, instructions = :instructions',
      ExpressionAttributeNames: { '#name': 'name' },
      ExpressionAttributeValues: {
        ':name': name,
        ':ingredients': ingredients,
        ':instructions': instructions,
      },
      ReturnValues: 'ALL_NEW',
    };

    const result = await dynamoDBDocumentClient.send(new UpdateCommand(params));

    return formatJSONResponse({
      statusCode: 200,
      message: 'Receta actualizada con éxito',
      data: result.Attributes, 
    });
  } catch (error) {
    return formatJSONResponse({
      statusCode: 500,
      message: 'Error al actualizar receta',
      error: error.message,
    });
  }
};

const deleteRecipe: ValidatedEventAPIGatewayProxyEvent<null> = async (event: any) => {
  try {
    const { id } = event.pathParameters!;

   
    const getParams = {
      TableName: tableName,
      Key: { id },
    };
    const existingItem = await dynamoDBDocumentClient.send(new GetCommand(getParams));

    if (!existingItem.Item) {
      return formatJSONResponse({
        statusCode: 404,
        message: 'Receta no encontrada',
      });
    }


    const deleteParams = {
      TableName: tableName,
      Key: { id },
    };

    await dynamoDBDocumentClient.send(new DeleteCommand(deleteParams));

    return formatJSONResponse({
      statusCode: 200,
      message: 'Receta eliminada con éxito',
      data: existingItem.Item,
    });
  } catch (error) {
    return formatJSONResponse({
      statusCode: 500,
      message: 'Error al eliminar receta',
      error: error.message,
    });
  }
};

export const createFunc = middyfy(createRecipe);
export const updateFunc = middyfy(updateRecipe);
export const deleteFunc = middyfy(deleteRecipe);
