export interface ImportedProductData {
  title: string;
  description: string;
  price?: number;
  currency?: string;
  platform: string;
  url: string;
  imageUrl?: string;
}

export abstract class PlatformAdapter {
  abstract match(url: string): boolean;
  abstract parse(url: string, html: string): Promise<ImportedProductData>;
}
