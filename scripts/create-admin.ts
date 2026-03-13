import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { users } from '../lib/db/schema';
import bcrypt from 'bcryptjs';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema: { users } });

async function createAdmin() {
  const email = 'admin@artesana.com';
  const password = 'artesana2025'; // Change after first login!
  const name = 'Administradora';

  console.log('🔐 Creating admin user...');

  // Check if user exists
  const [existing] = await sql`
    SELECT * FROM users WHERE email = ${email}
  `;

  if (existing) {
    console.log('⚠️  Admin user already exists. Skipping creation.');
    return;
  }

  // Hash password
  const passwordHash = await bcrypt.hash(password, 10);

  // Create user
  await db.insert(users).values({
    email,
    passwordHash,
    name,
    role: 'admin',
  });

  console.log('✅ Admin user created successfully!');
  console.log('');
  console.log('📋 Login credentials:');
  console.log('   Email:', email);
  console.log('   Password:', password);
  console.log('');
  console.log('⚠️  Please change the password after first login!');
}

createAdmin().catch(console.error);
