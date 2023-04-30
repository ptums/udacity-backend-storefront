CREATE TABLE Orders (
  id SERIAL PRIMARY KEY,
  quantity INT,
  user_id INT,
  status VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES Users(id)
);
