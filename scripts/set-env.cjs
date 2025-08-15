// scripts/set-env.cjs
const { writeFileSync } = require('fs');
const { resolve } = require('path');
require('dotenv').config();

const targetPath = resolve(__dirname, '../src/environments/environment.ts');

const envConfigFile = `export const environment = {
  production: ${process.env.NODE_ENV === 'production'},
  apiUrl: '${process.env.API_URL || ''}',
};
`;

writeFileSync(targetPath, envConfigFile);
console.log(`✅ Arquivo environment.ts gerado com sucesso!`);
