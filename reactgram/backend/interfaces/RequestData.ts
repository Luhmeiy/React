import { Request } from "express";

export interface RequestData extends Request {
	user?: any;
}
