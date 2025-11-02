-- Seed Data for Default Categories
-- Run this after creating a user account
-- Replace 'YOUR_USER_ID' with actual user UUID from auth.users

-- Note: This is a template. In production, we'll seed categories automatically
-- via the handle_new_user trigger or API call after signup.

-- Example seed for development (replace USER_ID):
-- DO $$
-- DECLARE
--   user_id_var uuid := 'YOUR_USER_ID_HERE';
-- BEGIN

-- Grocery Category
INSERT INTO public.categories (user_id, name, keywords_en, keywords_zh, icon, color, is_system)
VALUES (
  'YOUR_USER_ID',
  'Grocery',
  ARRAY['beef', 'chicken', 'carrot', 'milk', 'bread', 'egg', 'vegetable', 'fruit', 'costco', 'no frills', 'walmart', 'supermarket', 'grocery'],
  ARRAY['牛肉', '鸡肉', '胡萝卜', '牛奶', '面包', '鸡蛋', '蔬菜', '水果', '超市', '食品'],
  '🛒',
  '#00D68F',
  true
) ON CONFLICT (user_id, name) DO NOTHING;

-- Dining Category
INSERT INTO public.categories (user_id, name, keywords_en, keywords_zh, icon, color, is_system)
VALUES (
  'YOUR_USER_ID',
  'Dining',
  ARRAY['coffee', 'latte', 'restaurant', 'cafe', 'lunch', 'dinner', 'breakfast', 'starbucks', 'mcdonald', 'tim hortons', 'pizza', 'sushi'],
  ARRAY['咖啡', '拿铁', '餐厅', '午餐', '晚餐', '早餐', '星巴克', '麦当劳', '披萨', '寿司'],
  '🍽️',
  '#FFB800',
  true
) ON CONFLICT (user_id, name) DO NOTHING;

-- Transport Category
INSERT INTO public.categories (user_id, name, keywords_en, keywords_zh, icon, color, is_system)
VALUES (
  'YOUR_USER_ID',
  'Transport',
  ARRAY['uber', 'lyft', 'taxi', 'bus', 'subway', 'metro', 'gas', 'gasoline', 'parking', 'transit', 'ttc'],
  ARRAY['出租车', '滴滴', '公交', '地铁', '油费', '汽油', '停车费', '交通'],
  '🚗',
  '#FF5A5F',
  true
) ON CONFLICT (user_id, name) DO NOTHING;

-- Shopping Category
INSERT INTO public.categories (user_id, name, keywords_en, keywords_zh, icon, color, is_system)
VALUES (
  'YOUR_USER_ID',
  'Shopping',
  ARRAY['amazon', 'clothing', 'clothes', 'shoes', 'electronics', 'book', 'online', 'mall', 'store'],
  ARRAY['淘宝', '亚马逊', '衣服', '鞋子', '电子', '书籍', '商场', '购物'],
  '🛍️',
  '#9B59B6',
  true
) ON CONFLICT (user_id, name) DO NOTHING;

-- Bills Category
INSERT INTO public.categories (user_id, name, keywords_en, keywords_zh, icon, color, is_system)
VALUES (
  'YOUR_USER_ID',
  'Bills',
  ARRAY['rent', 'utilities', 'electricity', 'water', 'internet', 'phone', 'mobile', 'insurance', 'hydro', 'bill'],
  ARRAY['房租', '水费', '电费', '网费', '手机费', '保险', '账单'],
  '📄',
  '#3498DB',
  true
) ON CONFLICT (user_id, name) DO NOTHING;

-- Entertainment Category
INSERT INTO public.categories (user_id, name, keywords_en, keywords_zh, icon, color, is_system)
VALUES (
  'YOUR_USER_ID',
  'Entertainment',
  ARRAY['movie', 'cinema', 'netflix', 'spotify', 'game', 'concert', 'theater', 'entertainment'],
  ARRAY['电影', '游戏', '音乐', '演唱会', '娱乐'],
  '🎬',
  '#E67E22',
  true
) ON CONFLICT (user_id, name) DO NOTHING;

-- Health Category
INSERT INTO public.categories (user_id, name, keywords_en, keywords_zh, icon, color, is_system)
VALUES (
  'YOUR_USER_ID',
  'Health',
  ARRAY['doctor', 'pharmacy', 'medicine', 'hospital', 'clinic', 'dental', 'gym', 'fitness', 'health'],
  ARRAY['医生', '药店', '医院', '诊所', '牙医', '健身房', '健康'],
  '⚕️',
  '#1ABC9C',
  true
) ON CONFLICT (user_id, name) DO NOTHING;

-- Other/Uncategorized
INSERT INTO public.categories (user_id, name, keywords_en, keywords_zh, icon, color, is_system)
VALUES (
  'YOUR_USER_ID',
  'Other',
  ARRAY[]::text[],
  ARRAY[]::text[],
  '📦',
  '#8A8A8A',
  true
) ON CONFLICT (user_id, name) DO NOTHING;

-- END;
-- $$;

-- ============================================================================
-- Seed Function (Auto-seed on user creation)
-- ============================================================================

CREATE OR REPLACE FUNCTION public.seed_user_categories(target_user_id uuid)
RETURNS void AS $$
BEGIN
  -- Grocery
  INSERT INTO public.categories (user_id, name, keywords_en, keywords_zh, icon, color, is_system)
  VALUES (
    target_user_id, 'Grocery',
    ARRAY['beef', 'chicken', 'carrot', 'milk', 'bread', 'egg', 'vegetable', 'fruit', 'costco', 'no frills', 'walmart', 'supermarket', 'grocery'],
    ARRAY['牛肉', '鸡肉', '胡萝卜', '牛奶', '面包', '鸡蛋', '蔬菜', '水果', '超市', '食品'],
    '🛒', '#00D68F', true
  ) ON CONFLICT (user_id, name) DO NOTHING;

  -- Dining
  INSERT INTO public.categories (user_id, name, keywords_en, keywords_zh, icon, color, is_system)
  VALUES (
    target_user_id, 'Dining',
    ARRAY['coffee', 'latte', 'restaurant', 'cafe', 'lunch', 'dinner', 'breakfast', 'starbucks', 'mcdonald', 'tim hortons', 'pizza', 'sushi'],
    ARRAY['咖啡', '拿铁', '餐厅', '午餐', '晚餐', '早餐', '星巴克', '麦当劳', '披萨', '寿司'],
    '🍽️', '#FFB800', true
  ) ON CONFLICT (user_id, name) DO NOTHING;

  -- Transport
  INSERT INTO public.categories (user_id, name, keywords_en, keywords_zh, icon, color, is_system)
  VALUES (
    target_user_id, 'Transport',
    ARRAY['uber', 'lyft', 'taxi', 'bus', 'subway', 'metro', 'gas', 'gasoline', 'parking', 'transit', 'ttc'],
    ARRAY['出租车', '滴滴', '公交', '地铁', '油费', '汽油', '停车费', '交通'],
    '🚗', '#FF5A5F', true
  ) ON CONFLICT (user_id, name) DO NOTHING;

  -- Shopping
  INSERT INTO public.categories (user_id, name, keywords_en, keywords_zh, icon, color, is_system)
  VALUES (
    target_user_id, 'Shopping',
    ARRAY['amazon', 'clothing', 'clothes', 'shoes', 'electronics', 'book', 'online', 'mall', 'store'],
    ARRAY['淘宝', '亚马逊', '衣服', '鞋子', '电子', '书籍', '商场', '购物'],
    '🛍️', '#9B59B6', true
  ) ON CONFLICT (user_id, name) DO NOTHING;

  -- Bills
  INSERT INTO public.categories (user_id, name, keywords_en, keywords_zh, icon, color, is_system)
  VALUES (
    target_user_id, 'Bills',
    ARRAY['rent', 'utilities', 'electricity', 'water', 'internet', 'phone', 'mobile', 'insurance', 'hydro', 'bill'],
    ARRAY['房租', '水费', '电费', '网费', '手机费', '保险', '账单'],
    '📄', '#3498DB', true
  ) ON CONFLICT (user_id, name) DO NOTHING;

  -- Entertainment
  INSERT INTO public.categories (user_id, name, keywords_en, keywords_zh, icon, color, is_system)
  VALUES (
    target_user_id, 'Entertainment',
    ARRAY['movie', 'cinema', 'netflix', 'spotify', 'game', 'concert', 'theater', 'entertainment'],
    ARRAY['电影', '游戏', '音乐', '演唱会', '娱乐'],
    '🎬', '#E67E22', true
  ) ON CONFLICT (user_id, name) DO NOTHING;

  -- Health
  INSERT INTO public.categories (user_id, name, keywords_en, keywords_zh, icon, color, is_system)
  VALUES (
    target_user_id, 'Health',
    ARRAY['doctor', 'pharmacy', 'medicine', 'hospital', 'clinic', 'dental', 'gym', 'fitness', 'health'],
    ARRAY['医生', '药店', '医院', '诊所', '牙医', '健身房', '健康'],
    '⚕️', '#1ABC9C', true
  ) ON CONFLICT (user_id, name) DO NOTHING;

  -- Other
  INSERT INTO public.categories (user_id, name, keywords_en, keywords_zh, icon, color, is_system)
  VALUES (
    target_user_id, 'Other',
    ARRAY[]::text[], ARRAY[]::text[],
    '📦', '#8A8A8A', true
  ) ON CONFLICT (user_id, name) DO NOTHING;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update handle_new_user to seed categories
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  -- Create profile
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (new.id, new.email);
  
  -- Seed default categories
  PERFORM public.seed_user_categories(new.id);
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

