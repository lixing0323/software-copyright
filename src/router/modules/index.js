import manageRouter from './manage'
import configRouter from './config'
import recoveryRouter from './recovery'
import showRouter from './show'
import logRouter from './log'
import dataRouter from './data'
import userRouter from './user'

const asyncRoutes = [
  manageRouter,
  configRouter,
  recoveryRouter,
  showRouter,
  logRouter,
  dataRouter,
  userRouter
]

export default asyncRoutes
