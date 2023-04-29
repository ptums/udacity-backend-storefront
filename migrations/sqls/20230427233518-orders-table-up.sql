CREATE TABLE Orders (
  id SERIAL PRIMARY KEY,
  product_id INT,
  quantity INT,
  user_id INT,
  status VARCHAR(255),
  FOREIGN KEY (product_id) REFERENCES Products(id),
  FOREIGN KEY (user_id) REFERENCES Users(id)
);
