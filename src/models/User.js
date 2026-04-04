const prisma = require("../config/prisma");
const bcrypt = require("bcryptjs");

class User {
  static async findByEmail(email) {
    return prisma.user.findUnique({ where: { email } });
  }

  static async findById(id) {
    return prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true, role: true, created_at: true, updated_at: true },
    });
  }

  static async findAll() {
    return prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, created_at: true, updated_at: true },
    });
  }

  static async create({ name, email, password, role = "user" }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return prisma.user.create({
      data: { name, email, password: hashedPassword, role },
      select: { id: true, name: true, email: true, role: true },
    });
  }

  static async comparePassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = User;