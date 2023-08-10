/* eslint-disable class-methods-use-this */
import { QueryFailedError } from 'typeorm';
import { Request, Response } from 'express';
import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import ErrorResponse from '../../Models/Response/ErrorResponse';
import { CustomLogger } from './CustomLogger';

@Catch(QueryFailedError)
export class QueryFailedErrorFilter implements ExceptionFilter {
    constructor(private readonly _logger: CustomLogger) {}

    catch(exception: QueryFailedError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response: Response = ctx.getResponse<Response>();
        const request: Request = ctx.getRequest<Request>();
        const { message } = exception;
        const { name } = exception;
        const body: string = JSON.stringify(message);
        const headers: string = JSON.stringify(request.headers);
        const errorResponse: ErrorResponse = ErrorResponse.create(HttpStatus.UNPROCESSABLE_ENTITY, 'Internal server error', name);
        this._logger.error(`Error Query ${exception.query}`);
        this._logger.error(`Message Query error: ${exception.message}`);
        this._logger.error(`StatusCode: ${response.statusCode}. Body: ${body}. Headers: ${headers}`);
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
}
