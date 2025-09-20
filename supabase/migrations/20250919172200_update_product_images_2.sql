UPDATE products SET image_url = 'https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600' WHERE id = 1;
UPDATE products SET image_url = 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600' WHERE id = 2;
UPDATE products SET image_url = 'https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg?auto=compress&cs=tinysrgb&w=600' WHERE id = 3;
UPDATE products SET image_url = 'https://images.pexels.com/photos/267301/pexels-photo-267301.jpeg?auto=compress&cs=tinysrgb&w=600' WHERE id = 4;
UPDATE products SET image_url = 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=600' WHERE id = 5;
UPDATE products SET image_url = 'https://images.pexels.com/photos/1032110/pexels-photo-1032110.jpeg?auto=compress&cs=tinysrgb&w=600' WHERE id = 6;
INSERT INTO products (name, description, price, image_url, stock_quantity) VALUES
('Stylish Sneaker', 'A stylish sneaker for everyday wear.', 119.99, 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=600', 90),
('Running Pro', 'The ultimate shoe for professional runners.', 149.99, 'https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg?auto=compress&cs=tinysrgb&w=600', 40),
('Casual Loafer', 'A comfortable loafer for a casual look.', 79.99, 'https://images.pexels.com/photos/1407354/pexels-photo-1407354.jpeg?auto=compress&cs=tinysrgb&w=600', 110),
('Fashion Boot', 'A fashionable boot for a night out.', 199.99, 'https://images.pexels.com/photos/1661471/pexels-photo-1661471.jpeg?auto=compress&cs=tinysrgb&w=600', 30);