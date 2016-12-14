const {readFileSync} = require('fs');
const {homedir} = require('os');
const {resolve, basename} = require('path');

const get = () => {
  try {
    const configPath = resolve(homedir(), '.hmrc');
    const config = readFileSync(configPath, 'utf8');
    return JSON.parse(config);
  } catch (e) {
    console.log('Yo! Seems like you\'ve missed a step, please run hm init before continuing!');
  }

  return;
}

module.exports = {
    get
}