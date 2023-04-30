CREATE TABLE order_product (
  id SERIAL PRIMARY KEY,
  order_id INT,
  product_id INT,
  quantity INTEGER,
  FOREIGN KEY (order_id) REFERENCES Orders(id),
  FOREIGN KEY (product_id) REFERENCES Products(id)
);