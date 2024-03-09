import { Request, Response } from "express";
export interface IDecodedUser {
    userId: number;
}
export declare function validateUser(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function decryptToken(req: Request, res: Response): Promise<"" | undefined>;
export declare function searchUserById(id: number): Promise<any>;
export declare function getUser(req: Request, res: Response): Promise<void>;
export declare function createUser(req: Request, res: Response): Promise<void>;
export declare function createUserMessage(req: Request, res: Response): Promise<void>;
