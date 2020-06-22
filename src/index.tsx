import 'asset/css/normalize.less'
import 'asset/font-family/font/brands.less'
import { startApp } from 'core'
import { ErrorHandler } from 'module/ErrorHandler'
import { MainComponent } from 'module/main'

startApp({
  componentType: MainComponent,
  errorListener: new ErrorHandler('error-handler', {}),
})
