import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { initialStateData } from "../interfaces/initialStateData";

export type AppDispatch = ThunkDispatch<initialStateData, {}, AnyAction>;
