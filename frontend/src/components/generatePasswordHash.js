// generatePasswordHash.js
import bcrypt from 'bcryptjs';

const password = 'superadmin@123';  // Replace with the password you want to hash

(async () => {
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log('Hashed Password:', hashedPassword);
})();
