// start-stg.js
process.env.NODE_ENV = 'staging';
const { exec } = require('child_process');

exec('nuxi dev', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }

  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }

  console.log(`Stdout: ${stdout}`);
});