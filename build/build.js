const execFileSync = require('child_process').execFileSync
const chalk = require('chalk')
const pagesConfig = require('../pages-conf')

process.env.NODE_ENV = 'production'

// BUILD_MODE用来记录当前打包的模式，total代表整体打包（静态资源在同一个目录下，可以复用重复的文件），separate代表分开打包（静态资源按模块名称分别独立打包，不能复用重复的文件）
if (process.argv.length > 3) {
  process.env.BUILD_MODE = process.argv[3]
}

const buildPage = function(pageName) {
  if (!(pageName in pagesConfig)) {
    console.log(chalk.red('该页面不在pages-conf.js文件中，请检查配置。'))
    process.exit(1)
  }
  console.log(chalk.yellow(`正在打包: ${ pageName }`))
  process.env.BUILD_PAGE = pageName
  execFileSync('vue-cli-service', ['build'], {
    stdio: ['inherit', 'inherit', 'inherit']
  })
  console.log(chalk.green(`页面${ pageName }打包完成`))
}


// BUILD_PAGE用来记录当前打包的模块名称
if (process.argv.length <= 2) {
  const inquirer = require('inquirer')
  inquirer.prompt([{
    type: 'checkbox',
    name: 'modules',
    message: '请选择要打包的页面?',
    choices: [...Object.keys(pagesConfig)],
    default: true
  }]).then((answers) => {
    let modules = answers.modules
    if (!modules.length) {
      console.log(chalk.red('请输入或选择要打包的页面名称作为第三个参数，多个页面用逗号(英文)隔开'))
      process.exit(1)
    }
    modules.map(pageName => {
      buildPage(pageName)
    })
  })
} else {
  const pages = process.argv[2].split(',')
  if (pages.length === 1) {
    // 只打包一个模块
    buildPage(pages[0])
  } else {
    // 打包多个模块
    pages.map(pageName => {
      buildPage(pageName)
    })
  }
}
