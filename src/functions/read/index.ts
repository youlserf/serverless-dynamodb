import { handlerPath } from '@libs/handler-resolver';

export default {
  getRecipeById: {
    handler: `${handlerPath(__dirname)}/handler.getByIdFuc`,
    events: [
      {
        http: {
          method: 'get',
          path: 'recipe/{id}',
          cors: true
        },
      },
    ],
  },
  getAllRecipes: {
    handler: `${handlerPath(__dirname)}/handler.getAllFunc`,
    events: [
      {
        http: {
          method: 'get',
          path: 'recipe',
          cors: true
        },
      },
    ],
  },
};



