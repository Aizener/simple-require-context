const fs = require('fs')
const resolve = require('path').resolve

const readDirSync = dirPath => {
  const result = [], dirs = []
  const files = fs.readdirSync(dirPath)
  files.forEach(file => {
    const stat = fs.statSync(resolve(dirPath, file))
    stat.isDirectory() ? dirs.push(file) : result.push(resolve(dirPath, file))
  })
  dirs.forEach(dir => result.push(...readDirSync(resolve(dirPath, dir))))
  return result
}

const requireContext = (dirPath, deep = false, reg) => {
  dirPath = resolve(process.cwd(), dirPath)

  let files = deep ? readDirSync(dirPath) : fs.readdirSync(dirPath).filter(file => !fs.statSync(resolve(dirPath, file)).isDirectory())

  if (reg instanceof RegExp) {
    files = files.filter(file => reg.test(file))
  }

  const context = file => require(file)
  context.keys = () => files.map(file => resolve(dirPath, file))

  return context
}

module.exports = requireContext
