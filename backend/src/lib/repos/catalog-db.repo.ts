import { DbRepo } from "../db-repo";
import { Catalog, CatalogRepo } from "@/typings/catalog";

export class DbCatalog implements CatalogRepo {
  private readonly collection = "catalogs";

  public async saveCatalogForShop(shopUrl: string, items: any, phone: string) {
    const collection = await this.getCollection();
    const existing = await this.getCatalogForShop(shopUrl);
    if (existing) {
      await collection.updateOne({ shopUrl }, { $set: { items, phone } });
    } else {
      await collection.insertOne({ shopUrl, items, phone });
    }
  }

  public async getCatalogForShop(shopUrl: string) {
    const collection = await this.getCollection();
    return collection.findOne<Catalog>({ shopUrl });
  }

  private async getCollection() {
    const db = await DbRepo.getDb();
    return db.collection(this.collection);
  }
}
