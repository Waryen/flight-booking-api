const keyLength = 60;
const charset =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';
let key = '';

for (let i = 0; i < keyLength; i++) {
  const randomIndex = Math.floor(Math.random() * charset.length);
  key += charset[randomIndex];
}

console.log(key);
