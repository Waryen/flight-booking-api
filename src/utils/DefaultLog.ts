/**
 * @description Default logging method of the server
 * @param {number} status code
 * @param {string} message message to log in the console
 */
export function getDefaultLog(status: number, message: string) {
  const date = new Date().toISOString();
  console.log(`[${date}]: ${status} - ${message}`);
}
