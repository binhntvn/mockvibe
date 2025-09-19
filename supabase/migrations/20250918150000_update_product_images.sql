-- Update product images with real shoe photos from Unsplash
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=600&h=400&fit=crop' 
WHERE name = 'Classic Runner';

UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1541781774459-2b9d8f9c8c5e?w=600&h=400&fit=crop' 
WHERE name = 'Urban Walker';

UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1606890658317-7d14490b76fd?w=600&h=400&fit=crop' 
WHERE name = 'Trail Blazer';

UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=400&fit=crop' 
WHERE name = 'High-Top Pro';

UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1566122082650-6b5e6d4b8b5e?w=600&h=400&fit=crop' 
WHERE name = 'Summer Sandal';

UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=400&fit=crop' 
WHERE name = 'Winter Boot';