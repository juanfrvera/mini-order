import { CatalogRepo } from "@/typings/catalog";

export class MemoryCatalog implements CatalogRepo {
  private catalogs: Record<string, { items: any; phone: string }> = {};

  public async saveCatalogForShop(shopUrl: string, items: any, phone: string) {
    // Save the catalog in memory
    this.catalogs[shopUrl] = { items, phone };
  }

  public async getCatalogForShop(shopUrl: string) {
    return this.catalogs[shopUrl];
  }
}
