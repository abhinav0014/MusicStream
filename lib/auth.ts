import bcrypt from 'bcryptjs'

export async function verifyAdminCredentials(
  username: string,
  password: string
): Promise<boolean> {
  const adminUsername = process.env.ADMIN_USERNAME || 'admin'
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH || ''

  if (username !== adminUsername) return false
  if (!adminPasswordHash) return false

  return bcrypt.compare(password, adminPasswordHash)
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}
