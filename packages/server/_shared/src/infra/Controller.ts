import express from 'express'

type IRequest = express.Request
type IResponse = express.Response

interface IJSONResponse {
  response: IResponse;
  code: number;
  message: string;
}

abstract class Controller {
  protected request: IRequest

  protected response: IResponse

  protected abstract executeImpl(): Promise<void | any>

  public execute (request: IRequest, response: IResponse): void {
    this.request = request
    this.response = response

    this.executeImpl()
  }

  public ok<T> (dto?: T): IResponse {
    if (dto) {
      return this.response.status(200).json(dto)
    }

    return this.response.sendStatus(200)
  }

  public created (): IResponse {
    return this.response.sendStatus(201)
  }

  public clientError (message?: string): IResponse {
    return Controller.jsonResponse({
      response: this.response,
      code: 400,
      message: message || 'Unauthorized'
    })
  }

  public unauthorized (message?: string): IResponse {
    return Controller.jsonResponse({
      response: this.response,
      code: 401,
      message: message || 'Unauthorized'
    })
  }

  public forbidden (message?: string): IResponse {
    return Controller.jsonResponse({
      response: this.response,
      code: 403,
      message: message || 'Forbidden'
    })
  }

  public notFound (message?: string): IResponse {
    return Controller.jsonResponse({
      response: this.response,
      code: 404,
      message: message || 'Not found'
    })
  }

  public conflict (message?: string): IResponse {
    return Controller.jsonResponse({
      response: this.response,
      code: 409,
      message: message || 'Conflict'
    })
  }

  public tooMany (message?: string): IResponse {
    return Controller.jsonResponse({
      response: this.response,
      code: 429,
      message: message || 'Too many requests'
    })
  }

  public fail (error: Error | string): IResponse {
    console.error('[Controller]', error)

    return Controller.jsonResponse({
      response: this.response,
      code: 500,
      message: error.toString()
    })
  }

  public static jsonResponse ({ response, code, message }: IJSONResponse): IResponse {
    return response.status(code).json({ message })
  }
}

export { Controller }
