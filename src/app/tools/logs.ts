import chalk from "chalk";
import c from "../config";
const config = c();

/**
 * Logs a OK message
 * @param {string} endpoint - the endpoint to log
 */
export function ok (endpoint: string) {
    console.log(chalk.green(`[ ${new Date().toISOString()} | OK ] ${endpoint}`));
}

/**
 * Logs a incoming request
 * @param {string} endpoint - the endpoint of the request 
 * @param {string} ipAdress - the request user ip adress
 * @param {string} apiKey - the apikey used for the request
 */
export function request (endpoint: string, ipAdress: string, apiKey:string) {
    console.log(chalk.yellow(`[ ${new Date().toISOString()} | REQUEST ] INCOMING REQUEST \nEndpoint: ${endpoint}\n IPv4: ${ipAdress} \nApiKey: ${apiKey}`));
}

/**
 * Logs a failed message with details
 * @param {string} endpoint - the endpoint of the request
 * @param {string} ipAdress - the ipv4 of the request
 * @param {string} apiKey - the apikey used for the request
 * @param {boolean} data.ratelimit - Was the fail created by an ratelimit?
 * @param {boolean | string} data.error - If there was an error, enter the error. 
 */
export function failedRequest (endpoint: string, ipAdress: string, apiKey: string, data: { ratelimit: boolean, error: boolean | string}) {
    console.log(chalk.redBright(`[ ${new Date().toISOString()} | FAILED ] REQUEST FAILED \nEndpoint: ${endpoint}\n IPv4: ${ipAdress} \nApiKey: ${apiKey} \nRate Limit Error: ${data.ratelimit} \nError: ${data.error}`))
}

/**
 * Logs a startup message
 * @param {string | "ready" | "starting" | "fail"} type - The type of startup log
 * @param {null | string} message - the message to log
 */
export function startup (type: "ready" | "starting" | "fail" | string, message: null | string) {
    if (type === "ready") {
        console.log(chalk.blueBright(`[ ${new Date().toISOString()} | REQUEST ]`))
    }

    switch (type) {
        case "ready":
            console.log(chalk.blue(`[ ${new Date().toISOString()} | READY ] Server is ready and runs on http://localhost:${config.port}`));
        break;

        case "fail":
            console.log(chalk.red(`[ ${new Date().toISOString()} | FAIL ] ${message}`));
        break;

        case "starting":
            console.log(chalk.green(`[ ${new Date().toISOString()} | STARTING ] ${message}`));
        break;

        default:
            console.log(chalk.redBright(`[ ${new Date().toISOString()} | ${type} ] ${message}`));
    }
}