const path = require('path')
const execFileSync = require('child_process').execFileSync
const chalk = require('chalk')
const ora = require('ora')
const rm = require('rimraf')
const buildFile = path.join(__dirname, 'build.js')
const pagesConfig = require('../pages-conf')

const spinner = ora('开始打包...')
spinner.start()
rm(path.join('dist'), err=>{
  if (err) throw err
  spinner.stop()
  Object.keys(pagesConfig).map(pageName=>{
    console.log(chalk.yellow(`正在打包: ${pageName}`))
    // 异步执行构建文件，并传入两个参数，module：当前打包模块，separate：当前打包模式（分开打包）
    execFileSync( 'node', [buildFile, pageName, 'separate'], {})
    console.log(chalk.green(`页面${pageName}打包完成`))
  })
})
