import bcrypt from 'bcryptjs'

export async function verifyAdminCredentials(
  username: string,
  password: string
): Promise<boolean> {
  const adminUsername = 'admin'
  const adminPasswordHash = '$2a$12$4yGGV9RB0RYSsahYMzLnEu7zRevcrv.CGk/LBqRyG/zPxq6V6TJ5u'

  if (username !== adminUsername) return false
  if (!adminPasswordHash) return false

  return bcrypt.compare(password, adminPasswordHash)
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}
