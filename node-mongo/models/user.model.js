const { MongoClient, ObjectId } = require('mongodb');
require('dotenv/config')

const uri = process.env.MYURI;
const client = new MongoClient(uri, { useUnifiedTopology: true });

class UserModel {
  static async connect() {
    if (!UserModel.collection) {
      await client.connect();
      const db = client.db('tickets');
      UserModel.collection = db.collection('user');
    }
  }

  static async create({ firstName, lastName, email, phone, password }) {
    await UserModel.connect();
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await UserModel.collection.insertOne({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
    });
    return result.insertedId;
  }

  static async findOneByEmail(email) {
    await UserModel.connect();
    const result = await UserModel.collection.findOne({ email });
    return result;
  }

  static async findOneById(id) {
    await UserModel.connect();
    const result = await UserModel.collection.findOne({ _id: ObjectId(id) });
    return result;
  }
}

module.exports = UserModel;
