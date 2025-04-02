import { CatalogRepo } from "@/typings/catalog";
import { DbCatalog } from "./repos/catalog-db.repo";
import { MemoryCatalog } from "./repos/catalog-memory.repo";

export class RepoCoordinator {
  private catalog: CatalogRepo;

  constructor(mode = process.env.REPO_MODE as "db" | "memory") {
    if (mode === "db") {
      this.catalog = new DbCatalog();
    } else {
      this.catalog = new MemoryCatalog();
    }
  }

  public getCatalogRepo(): CatalogRepo {
    return this.catalog;
  }
}
