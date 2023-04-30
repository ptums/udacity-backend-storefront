import { Product, ProductStore } from '../../models/products';

const productStore = new ProductStore();

describe('ProductStore', () => {
  beforeAll(async () => {
    await productStore.create({
      price: 7,
      category: 'Toy',
      name: 'Racecar',
    });
  });

  afterAll(async () => {
    await productStore.dropProductRecords();
  });

  describe('product index method', () => {
    it('should return all products', async () => {
      const products: Product[] = await productStore.index();

      expect(products.length).toBeGreaterThan(0);
    });
  });

  describe('product show method', () => {
    it('should return a single product', async () => {
      const products: Product[] = await productStore.index();
      if (products.length > 0) {
        const product: Product = await productStore.show((products[0].id as unknown as number).toString());

        if (product) {
          expect(product).toBeTruthy();
        }
      }
    });
  });

  describe('product create method', () => {
    it('should create a new product', async () => {
      const createProduct: Product = await productStore.create({
        price: 6.5,
        category: 'Toy',
        name: 'Barbie',
      });

      if (createProduct) {
        const getNewProduct: Product = await productStore.show((createProduct.id as unknown as number).toString());

        expect(getNewProduct.name).toBe('Barbie');
      }
    });
  });
});
