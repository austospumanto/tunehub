var path = require('path')
var argv = require('yargs')
  .default('test', false)
  .default('environment', 'production')
  .argv

if (argv.test) {
  require('electron-compile').init()
  var TestApplication = require('electron-jasmine').TestApplication
  new TestApplication({specDirectory: './spec'})
}
else {
  console.log('In development mode')
  require('electron-compile').init()

  var Application = require('./src/main/application')
  new Application


}
