export function getDefaultLog(message: string) {
  const date = new Date().toISOString();
  console.log(`[${date}]: ${message}`);
}
