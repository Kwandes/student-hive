export const environment = {
  production: true,
  envName: 'production',

  apiUrl: (window as any)['env']
    ? (window as never)['env']['apiUrl']
    : 'http://localhost:3333',
};
