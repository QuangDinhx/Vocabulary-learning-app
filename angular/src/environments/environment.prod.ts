import { Config } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';
const apiUrl = 'https://localhost:44340';
export const environment = {
  production: true,
  application: {
    baseUrl,
    name: 'Quizlet_Fake',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: apiUrl,
    redirectUri: baseUrl,
    clientId: 'Quizlet_Fake_App',
    responseType: 'code',
    scope: 'offline_access Quizlet_Fake',
  },
  apis: {
    default: {
      url: apiUrl,
      rootNamespace: 'Quizlet_Fake',
    },
  },
} as Config.Environment;
