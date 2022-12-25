// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  storageUrl: 'http://127.0.0.1:10000/devstoreaccount1/tia/',
  uploadUrl: 'http://localhost:2159/api/Upload/UploadDocument',
  apiUrl: 'http://localhost:2159/'
};
