export interface CatalogRepo {
  saveCatalogForShop(shopUrl: string, items: any, phone: string): Promise<void>;
  getCatalogForShop(shopUrl: string): Promise<Catalog | null>;
}

export interface Catalog {
  items: any;
  phone: string;
}
