import { ClientSession, Db, MongoClient } from "mongodb";

export class DbRepo {
  private static db?: Db;
  private static client?: MongoClient;
  private static session?: ClientSession;

  public static async getDb() {
    if (!this.db) {
      this.db = (await this.connect()).db;
    }
    return this.db;
  }

  public static async getClient(): Promise<MongoClient> {
    if (!this.client) {
      this.client = (await this.connect()).client;
    }
    return this.client;
  }

  public static async startTransaction() {
    const session = await this.getSession();
    session.startTransaction();
  }

  public static async commitTransaction() {
    const session = await this.getSession();
    await session.commitTransaction();
    await session.endSession();
  }

  public static async abortTransaction() {
    const session = await this.getSession();
    await session.abortTransaction();
    await session.endSession();
  }

  private static async getSession() {
    if (!this.session) this.session = (await this.getClient()).startSession();
    return this.session;
  }

  private static async connect() {
    try {
      const connectionString = process.env.CONNECTION_STRING ?? "";
      const client = new MongoClient(connectionString);
      const conn = await client.connect();
      return {
        db: conn.db(process.env.CONNECTION_DB),
        client,
      };
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
