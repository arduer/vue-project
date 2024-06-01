import { createServer, Response } from 'miragejs'

import type { Course, User, ResultVO } from '@/type'

const server = createServer({})
server.namespace = 'api'

server.post('login', (_schema, request) => {
    // 从请求对象中获取参数，反序列化为JS对象。解构
    const { username, password } = JSON.parse(request.requestBody)
  
    const resultVO: ResultVO<{}> = { code: 200, data: {} }
    if ((username == 'admin' || username == 'user') && password == '123456') {
      resultVO.data = { role: '243f45a3ce', user: { title: '讲师' } }
      return new Response(
        200,
        {
          token:
            '744193c872b677aab12a0ced447882f4cf9fca92a09d428a26ed145ed2ed2eec665c8824ebc353042ba2be136efcb5c6'
        },
        resultVO
      )
    }
    resultVO.code = 401
    resultVO.message = '用户名密码错误'
    return resultVO
  })