// 开发模式
const execFileSync = require('child_process').execFileSync
const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')

const envConfig = dotenv.parse(fs.readFileSync(path.join(path.dirname(__dirname), '.env.development')))
for(let key in envConfig){
  process.env[key] = envConfig[key]
}

const runDev = function(){
  execFileSync('vue-cli-service', ['serve'], {
    stdio: ['inherit', 'inherit', 'inherit']
  })
}


if(!process.env.BUILD_PAGE){
  const inquirer = require('inquirer')
  const pages = require('../pages-conf')
  inquirer.prompt([{
    type: 'rawlist',
    name: 'module',
    message: '请选择页面?',
    choices: ['all', ...Object.keys(pages)],
    default: true
  }]).then((answers) => {
    let module = answers.module
    if(module === 'all') module = ''
    process.env.BUILD_PAGE = module
    runDev()
  })
}else{
  runDev()
}
