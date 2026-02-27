import bcrypt from 'bcryptjs'

export async function verifyAdminCredentials(
  username: string,
  password: string
): Promise<boolean> {
  const adminUsername = 'admin'
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH

  console.log('Hash exists:', !!adminPasswordHash)
  console.log('Hash preview:', adminPasswordHash?.slice(0, 7)) // safe, just shows $2a$12

  if (username !== adminUsername) return false
  if (!adminPasswordHash) return false

  return bcrypt.compare(password, adminPasswordHash)
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}
