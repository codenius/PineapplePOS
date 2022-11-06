/**
 * Defines different sources for errors to give a clear feedback
 */
export type ErrorSource =
    "internal" | // an internal error, that shouldn't happen.
    "database" | // a database error, all errors related to database problems (like incorrect filters)
    "user" |  // a user error, input errors, ... actually every error depending on user interaction
    "unknown"; // MYSTERY!

/**
 * ErrorCodes defines a http error code for each ErrorSource to send the errors
 */
export enum ErrorCodes {
    "internal" = 500, // internal server error
    "database" = 500, // internal server error
    "user" = 422, // Unprocessable Entity
    "unknown" = 418 // I'm a teapot (it's a joke :D)
}

/**
 * A typical error response from the api.
 */
export interface ErrorJson {
    type: string, // type is defined by the error name
    source: ErrorSource, // source is the source of the error
    msg: string // msg is a short message (in debug the whole error stack) to describe the error
}