/**
 * @description Default logging method of the server
 * @param message string to log in the console
 */
export function getDefaultLog(message: string) {
  const date = new Date().toISOString();
  console.log(`[${date}]: ${message}`);
}
