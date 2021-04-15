const path = require('path')
const execFileSync = require('child_process').execFileSync
const chalk = require('chalk')
const ora = require('ora')
const rm = require('rimraf')
const buildFile = path.join(__dirname, 'build.js')
const pagesConfig = require('../pages-conf')

if(process.argv.length > 2){
  process.env.BUILD_MODE = process.argv[2]
}

const spinner = ora('开始打包...')
spinner.start()
rm(path.join('dist'), err=>{
  if (err) throw err
  spinner.stop()
  Object.keys(pagesConfig).map(pageName=>{
    // 异步执行构建文件，并传入两个参数，module：当前打包模块，separate：当前打包模式（分开打包）
    execFileSync( 'node', [buildFile, pageName, process.env.BUILD_MODE || 'separate'], {
      stdio: ['inherit', 'inherit', 'inherit']
    })
  })
})
