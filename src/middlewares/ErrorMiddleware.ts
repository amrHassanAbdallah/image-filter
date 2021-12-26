import { NextFunction, Request, Response } from 'express';
import HttpException from '../errors/HttpException';

function errorMiddleware(error: Error | HttpException, request: Request, response: Response, next: NextFunction) {
  console.log(error)

  const status = error instanceof HttpException? error.status : 500;
  const message = error instanceof HttpException?error.message :'Something went wrong';
    response
      .status(status)
      .send({
        message,
      })
  next()

}

export default errorMiddleware;