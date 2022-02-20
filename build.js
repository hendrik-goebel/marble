const fs = require('fs')
const basePath = './src/html/'
const indexFilePath = basePath + 'index.html'
const pagePath = basePath + 'pages/'
const controlsPath = basePath + 'controls/'
const publicPath = './public/'

async function readFile(filePath) {
  return await fs.promises.readFile(filePath, 'utf8')
}

async function writeFile(filePath, content) {
  return await fs.promises.writeFile(filePath, content, err => {
    if (err) {
      console.error(err)
      return
    }
  })
}

function getPageVariables(fileContent) {
  return fileContent.match(/\{\{page\..*\}\}/g)
}

function getPagePathsFromPageVariables(pageVariables) {
  let pagePaths = {}
  for (let key in pageVariables) {
    let variable = pageVariables[key].replace(/\{|\}/g, '')
    let path = pagePath + variable + '.html'
    var shortKey = variable.split('\.')[1]
    pagePaths[shortKey] = path
  }
  return pagePaths
}

function print(content) {
  console.log(content)
}

async function getPageTemplates(pageFilePaths) {
  let templates = {}
  for (let key in pageFilePaths) {
    let promise = readFile(pageFilePaths[key])
    let content = await promise
    templates[key] = content
  }
  return templates
}

async function loadControls() {
  let filenames = await fs.promises.readdir(controlsPath)
  let result = {}
  for (let filename of filenames) {
    let content = await readFile(controlsPath + filename)
    let controlname = filename.split('.')[0]
    result[controlname] = content
  }
  return result
}

async function insertControls(pageTemplates) {
  let controls = await loadControls()
  for (let control in controls) {
    for (let key in pageTemplates) {
      const pattern = new RegExp('\{\{controls\.' + control + '\}\}', 'g')
      pageTemplates[key] = pageTemplates[key].replace(pattern, controls[control])
    }
  }
  return pageTemplates
}

async function insertPages(pageTemplates) {
  let indexFile = await readFile(indexFilePath)
  for (let key in pageTemplates) {
    indexFile = indexFile.replace(new RegExp('\{\{page\.' + key + '\}\}', 'g'), pageTemplates[key])
  }
  return indexFile
}

async function writePages(pages) {
  for (let key in pages) {
  }
  return []
}

readFile(indexFilePath)
  .then(result => getPageVariables(result))
  .then(pageVariables => getPagePathsFromPageVariables(pageVariables))
  .then(pagePaths => getPageTemplates(pagePaths))
  .then(pageTemplates => insertControls(pageTemplates))
  .then(result => insertPages(result))
  .then(result => writeFile(publicPath + 'index.html', result))
  //.then(result => print(result))