const pages = require('./pages-conf')

const getPage = function(pageName){
  if(!pageName) return pages
  return {
    [pageName]: Object.assign(pages[pageName], {filename: 'index.html'})
  }
}

const config = {
  outputDir: process.env.NODE_ENV === 'production' && process.env.BUILD_MODE === 'separate' ? `dist/${process.env.BUILD_PAGE}` : 'dist',
  assetsDir: 'static',
  pages: getPage(process.env.BUILD_PAGE)
}
module.exports = config
