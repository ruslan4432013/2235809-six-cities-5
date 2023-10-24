import { LoginUserDto } from './dto/login-user.dto.js';
import { RequestBody, RequestParams } from '../../libs/rest/index.js';
import { Request } from 'express';

export type LoginUserRequest = Request<RequestParams, RequestBody, LoginUserDto>;
