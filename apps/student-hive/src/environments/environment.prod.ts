export const environment = {
  production: true,
  envName: 'production',

  apiUrl: window['env'] ? window['env']['apiUrl'] : 'http://localhost:3333',
};
