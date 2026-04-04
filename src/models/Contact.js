const prisma = require("../config/prisma");

class Contact {
  static async findAllByUser(userId) {
    return prisma.contact.findMany({
      where: { user_id: userId },
      orderBy: { name: "asc" },
    });
  }

  static async findById(id) {
    return prisma.contact.findUnique({ where: { id } });
  }

  static async create({ user_id, name, phone, email, address, notes }) {
    return prisma.contact.create({
      data: { user_id, name, phone, email, address, notes },
    });
  }

  static async update(id, { name, phone, email, address, notes }) {
    return prisma.contact.update({
      where: { id },
      data: { name, phone, email, address, notes },
    });
  }

  static async delete(id) {
    return prisma.contact.delete({ where: { id } });
  }
}

module.exports = Contact;