-- Create categories table
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  hero_text TEXT,
  highlights TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  image TEXT,
  features TEXT[],
  specifications JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Categories are viewable by everyone" 
ON public.categories 
FOR SELECT 
USING (true);

CREATE POLICY "Products are viewable by everyone" 
ON public.products 
FOR SELECT 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON public.categories
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample categories
INSERT INTO public.categories (title, description, icon, hero_text, highlights) VALUES
('Công tắc thông minh', 'Điều khiển đèn và thiết bị điện từ xa với công nghệ Wi-Fi', '💡', 'Biến ngôi nhà của bạn thành smart home với các công tắc thông minh hiện đại', ARRAY['Điều khiển từ xa qua smartphone', 'Hẹn giờ tự động', 'Tiết kiệm điện năng', 'Dễ dàng lắp đặt']),
('Đèn thông minh', 'Hệ thống chiếu sáng thông minh với khả năng điều chỉnh màu sắc và độ sáng', '🏮', 'Tạo không gian sống hoàn hảo với ánh sáng thông minh', ARRAY['16 triệu màu sắc', 'Điều chỉnh độ sáng', 'Đồng bộ với âm nhạc', 'Tiết kiệm năng lượng']),
('An ninh thông minh', 'Giải pháp bảo mật toàn diện cho ngôi nhà của bạn', '🔒', 'Bảo vệ ngôi nhà 24/7 với công nghệ AI tiên tiến', ARRAY['Camera AI nhận diện', 'Cảnh báo real-time', 'Lưu trữ cloud', 'Xem từ xa mọi lúc']),
('Giám sát thông minh', 'Theo dõi môi trường sống với các cảm biến thông minh', '📊', 'Kiểm soát chất lượng không khí và môi trường sống', ARRAY['Đo nhiệt độ, độ ẩm', 'Phát hiện khí gas', 'Cảnh báo sớm', 'Báo cáo chi tiết']);

-- Insert sample products
INSERT INTO public.products (category_id, name, description, price, image, features, specifications) VALUES
((SELECT id FROM public.categories WHERE title = 'Công tắc thông minh' LIMIT 1), 'Smart Switch Pro', 'Công tắc thông minh cao cấp với khả năng điều khiển từ xa', 299000, '/placeholder.svg', ARRAY['Wi-Fi 2.4GHz', 'Ứng dụng di động', 'Hẹn giờ thông minh', 'Tương thích Alexa'], '{"voltage": "220V", "power": "2200W", "protocol": "Wi-Fi", "warranty": "2 years"}'),
((SELECT id FROM public.categories WHERE title = 'Công tắc thông minh' LIMIT 1), 'Smart Switch Basic', 'Công tắc thông minh cơ bản phù hợp cho mọi gia đình', 199000, '/placeholder.svg', ARRAY['Wi-Fi 2.4GHz', 'Ứng dụng di động', 'Điều khiển từ xa'], '{"voltage": "220V", "power": "1500W", "protocol": "Wi-Fi", "warranty": "1 year"}'),
((SELECT id FROM public.categories WHERE title = 'Đèn thông minh' LIMIT 1), 'RGB Smart Bulb', 'Bóng đèn thông minh với 16 triệu màu sắc', 199000, '/placeholder.svg', ARRAY['16 triệu màu', 'Điều chỉnh độ sáng', 'Đồng bộ âm nhạc', 'Voice control'], '{"power": "9W", "lumens": "800lm", "colors": "16M", "lifespan": "25000h"}'),
((SELECT id FROM public.categories WHERE title = 'An ninh thông minh' LIMIT 1), 'AI Security Camera', 'Camera an ninh thông minh với AI nhận diện', 799000, '/placeholder.svg', ARRAY['4K Ultra HD', 'AI face detection', 'Night vision', 'Cloud storage'], '{"resolution": "4K", "storage": "Cloud/Local", "connectivity": "Wi-Fi 6", "field_of_view": "110°"}');