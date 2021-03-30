import {Request} from 'express';
import { UserDto } from '../auth/auth-dto/user.dto';

export interface CustomRequest extends Request
{
    user: UserDto;
}