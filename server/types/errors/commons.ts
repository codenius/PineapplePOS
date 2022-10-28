export type ErrorSource = "internal" | "database" | "user" | "unknown";

export enum ErrorCodes {
    "internal" = 500,
    "database" = 500,
    "user" = 422,
    "unknown" = 418
}

export interface ErrorJson {
    type: string,
    source: ErrorSource,
    msg: string
}