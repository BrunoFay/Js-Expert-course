import { expect, describe, test, jest, beforeEach } from '@jest/globals'

import { InjectHttpInterceptor } from './agent.js'
import { Server } from 'http'

const originalHttp = jest.createMockFromModule('http')

describe('HTTP Interceptor Agent', () => {
  const EVENT_NAME = 'request'
  const request = null

  beforeEach(() => {
    jest.clearAllMocks
  })

  test('should not change header', () => {
    const response = {
      setHeader: jest.fn().mockReturnThis()
    }
    const serverInstance = new originalHttp.Server()
    serverInstance.emit(EVENT_NAME, request, response)

    expect(response.setHeader).not.toHaveBeenCalled()
  })

  test('should activate header Interceptor', () => {
    InjectHttpInterceptor()
    const response = {
      setHeader: jest.fn().mockReturnThis()
    }

    const serverInstance = new Server()
    serverInstance.emit(EVENT_NAME, request, response)
    expect(response.setHeader).toHaveBeenCalledWith('X-Instrumented-By', 'Bruno fay')

  })
})
