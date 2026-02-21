#!/usr/bin/env node

/**
 * Run: node scripts/hash-password.js yourpassword
 * Then paste the hash into your .env.local ADMIN_PASSWORD_HASH
 */

const bcrypt = require('bcryptjs')

const password = process.argv[2]

if (!password) {
  console.error('Usage: node scripts/hash-password.js <password>')
  process.exit(1)
}

bcrypt.hash(password, 12).then((hash) => {
  console.log('\nPassword hash (add to ADMIN_PASSWORD_HASH in .env.local):\n')
  console.log(hash)
  console.log()
})
