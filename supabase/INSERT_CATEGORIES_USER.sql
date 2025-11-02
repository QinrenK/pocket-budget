-- ============================================================================
-- INSERT COMPREHENSIVE CATEGORIES FOR USER
-- User ID: a1e08c94-165e-43e7-852e-0954406df694
-- ============================================================================

-- Optional: Clear existing categories first (uncomment if you want fresh start)
-- DELETE FROM categories WHERE user_id = 'a1e08c94-165e-43e7-852e-0954406df694';

-- ============================================================================
-- FOOD & DINING
-- ============================================================================

-- Grocery
INSERT INTO categories (user_id, name, keywords_en, keywords_zh, icon, color, is_system)
VALUES (
  'a1e08c94-165e-43e7-852e-0954406df694',
  'Grocery',
  ARRAY['grocery', 'groceries', 'supermarket', 'market', 'food', 'beef', 'chicken', 'pork', 'fish', 'salmon', 'shrimp', 'meat', 'carrot', 'tomato', 'potato', 'onion', 'garlic', 'vegetable', 'vegetables', 'fruit', 'fruits', 'apple', 'banana', 'orange', 'milk', 'cheese', 'yogurt', 'butter', 'egg', 'eggs', 'bread', 'rice', 'pasta', 'noodle', 'noodles', 'cereal', 'snack', 'snacks', 'costco', 'walmart', 'target', 'whole foods', 'trader joe', 'safeway', 'kroger', 'publix', 'aldi', 'lidl', 'no frills', 'loblaws', 'metro', 'sobeys', 'freshco', 'food basics', 't&t', 'h mart'],
  ARRAY['超市', '食品', '杂货', '菜市场', '市场', '牛肉', '鸡肉', '猪肉', '鱼', '三文鱼', '虾', '肉', '胡萝卜', '西红柿', '土豆', '洋葱', '大蒜', '蔬菜', '水果', '苹果', '香蕉', '橙子', '牛奶', '奶酪', '酸奶', '黄油', '鸡蛋', '面包', '米饭', '意大利面', '面条', '麦片', '零食', '好市多', '沃尔玛', '大统华'],
  '🛒',
  '#00D68F',
  true
) ON CONFLICT (user_id, name) DO UPDATE SET
  keywords_en = EXCLUDED.keywords_en,
  keywords_zh = EXCLUDED.keywords_zh;

-- Dining / Restaurants
INSERT INTO categories (user_id, name, keywords_en, keywords_zh, icon, color, is_system)
VALUES (
  'a1e08c94-165e-43e7-852e-0954406df694',
  'Dining',
  ARRAY['restaurant', 'dining', 'dinner', 'lunch', 'breakfast', 'brunch', 'cafe', 'coffee', 'latte', 'cappuccino', 'espresso', 'tea', 'bubble tea', 'boba', 'pizza', 'burger', 'sushi', 'ramen', 'noodles', 'thai', 'chinese', 'japanese', 'korean', 'indian', 'italian', 'mexican', 'vietnamese', 'mcdonald', 'mcdonalds', 'burger king', 'wendy', 'kfc', 'subway', 'starbucks', 'tim hortons', 'dunkin', 'panda express', 'chipotle', 'taco bell', 'domino', 'pizza hut', 'boston pizza', 'anju', 'korean bbq', 'hotpot', 'dim sum', 'takeout', 'delivery', 'uber eats', 'doordash', 'skip', 'grubhub'],
  ARRAY['餐厅', '饭店', '吃饭', '午餐', '晚餐', '早餐', '咖啡', '咖啡厅', '拿铁', '披萨', '汉堡', '寿司', '拉面', '面条', '泰国菜', '中餐', '日料', '韩餐', '韩国烧烤', '火锅', '点心', '外卖', '星巴克', '麦当劳', '肯德基', '必胜客', '安州', 'anju', '韩餐'],
  '🍽️',
  '#FFB800',
  true
) ON CONFLICT (user_id, name) DO UPDATE SET
  keywords_en = EXCLUDED.keywords_en,
  keywords_zh = EXCLUDED.keywords_zh;

-- Fast Food
INSERT INTO categories (user_id, name, keywords_en, keywords_zh, icon, color, is_system)
VALUES (
  'a1e08c94-165e-43e7-852e-0954406df694',
  'Fast Food',
  ARRAY['mcdonald', 'mcdonalds', 'burger king', 'wendys', 'kfc', 'subway', 'taco bell', 'chipotle', 'five guys', 'in-n-out', 'shake shack', 'popeyes', 'chick-fil-a', 'arbys', 'sonic', 'jack in the box', 'carl jr', 'hardee', 'white castle', 'a&w', 'dairy queen', 'fast food', 'drive thru', 'drive through'],
  ARRAY['快餐', '麦当劳', '肯德基', '汉堡王', '赛百味', '得来速'],
  '🍔',
  '#E67E22',
  false
) ON CONFLICT (user_id, name) DO UPDATE SET
  keywords_en = EXCLUDED.keywords_en,
  keywords_zh = EXCLUDED.keywords_zh;

-- ============================================================================
-- TRANSPORTATION
-- ============================================================================

-- Transport
INSERT INTO categories (user_id, name, keywords_en, keywords_zh, icon, color, is_system)
VALUES (
  'a1e08c94-165e-43e7-852e-0954406df694',
  'Transport',
  ARRAY['uber', 'lyft', 'taxi', 'cab', 'bus', 'subway', 'metro', 'train', 'transit', 'ttc', 'translink', 'presto', 'compass', 'gas', 'gasoline', 'petrol', 'fuel', 'shell', 'esso', 'petro-canada', 'chevron', 'bp', 'exxon', 'mobil', 'parking', 'toll', 'ferry', 'bike', 'scooter', 'lime', 'bird', 'car wash', 'oil change', 'tire', 'maintenance'],
  ARRAY['出租车', '的士', '滴滴', '公交', '公交车', '地铁', '火车', '交通', '油费', '汽油', '加油', '停车费', '过路费', '渡轮', '自行车', '共享单车', '洗车', '换油', '轮胎', '保养'],
  '🚗',
  '#FF5A5F',
  true
) ON CONFLICT (user_id, name) DO UPDATE SET
  keywords_en = EXCLUDED.keywords_en,
  keywords_zh = EXCLUDED.keywords_zh;

-- ============================================================================
-- SHOPPING
-- ============================================================================

-- Shopping
INSERT INTO categories (user_id, name, keywords_en, keywords_zh, icon, color, is_system)
VALUES (
  'a1e08c94-165e-43e7-852e-0954406df694',
  'Shopping',
  ARRAY['amazon', 'ebay', 'etsy', 'aliexpress', 'alibaba', 'taobao', 'clothing', 'clothes', 'shirt', 'pants', 'dress', 'shoes', 'sneakers', 'boots', 'jacket', 'coat', 'hat', 'accessories', 'jewelry', 'watch', 'bag', 'purse', 'wallet', 'electronics', 'phone', 'laptop', 'computer', 'tablet', 'headphone', 'camera', 'tv', 'furniture', 'ikea', 'home depot', 'lowes', 'bed bath', 'decor', 'appliance', 'tool', 'tools', 'hardware', 'zara', 'h&m', 'uniqlo', 'gap', 'old navy', 'nike', 'adidas', 'best buy', 'apple store', 'mall', 'outlet', 'online shopping'],
  ARRAY['购物', '淘宝', '天猫', '京东', '拼多多', '亚马逊', '衣服', '裤子', '裙子', '鞋子', '运动鞋', '靴子', '夹克', '外套', '帽子', '配饰', '珠宝', '手表', '包', '钱包', '电子产品', '手机', '电脑', '平板', '耳机', '相机', '电视', '家具', '家居', '电器', '工具', '五金', '商场', '网购'],
  '🛍️',
  '#9B59B6',
  true
) ON CONFLICT (user_id, name) DO UPDATE SET
  keywords_en = EXCLUDED.keywords_en,
  keywords_zh = EXCLUDED.keywords_zh;

-- ============================================================================
-- BILLS & UTILITIES
-- ============================================================================

-- Bills
INSERT INTO categories (user_id, name, keywords_en, keywords_zh, icon, color, is_system)
VALUES (
  'a1e08c94-165e-43e7-852e-0954406df694',
  'Bills',
  ARRAY['rent', 'mortgage', 'utilities', 'utility', 'electricity', 'electric', 'hydro', 'water', 'gas bill', 'heating', 'internet', 'wifi', 'broadband', 'phone', 'mobile', 'cell', 'cellular', 'rogers', 'bell', 'telus', 'fido', 'koodo', 'at&t', 'verizon', 't-mobile', 'sprint', 'insurance', 'health insurance', 'car insurance', 'home insurance', 'life insurance', 'property tax', 'hoa', 'condo fee', 'strata', 'subscription', 'membership', 'bill', 'payment'],
  ARRAY['房租', '租金', '贷款', '水费', '电费', '煤气费', '暖气费', '网费', '宽带', '手机费', '话费', '保险', '医疗保险', '车险', '房屋保险', '人寿保险', '物业费', '管理费', '订阅', '会员费', '账单', '缴费'],
  '📄',
  '#3498DB',
  true
) ON CONFLICT (user_id, name) DO UPDATE SET
  keywords_en = EXCLUDED.keywords_en,
  keywords_zh = EXCLUDED.keywords_zh;

-- ============================================================================
-- ENTERTAINMENT
-- ============================================================================

-- Entertainment
INSERT INTO categories (user_id, name, keywords_en, keywords_zh, icon, color, is_system)
VALUES (
  'a1e08c94-165e-43e7-852e-0954406df694',
  'Entertainment',
  ARRAY['movie', 'movies', 'cinema', 'theater', 'theatre', 'netflix', 'disney', 'hulu', 'hbo', 'amazon prime', 'spotify', 'apple music', 'youtube', 'game', 'games', 'gaming', 'playstation', 'xbox', 'nintendo', 'steam', 'concert', 'show', 'festival', 'event', 'ticket', 'tickets', 'amusement park', 'theme park', 'zoo', 'museum', 'aquarium', 'bowling', 'arcade', 'karaoke', 'ktv', 'bar', 'club', 'nightclub', 'casino', 'lottery', 'book', 'books', 'bookstore', 'kindle', 'audible', 'magazine', 'hobby', 'craft', 'art supplies'],
  ARRAY['电影', '影院', '视频', '游戏', '音乐', '演唱会', '音乐会', '展览', '门票', '游乐园', '主题公园', '动物园', '博物馆', '水族馆', '保龄球', '游戏厅', 'KTV', '卡拉OK', '酒吧', '夜店', '彩票', '书', '书店', '杂志', '爱好', '手工', '美术用品', '娱乐'],
  '🎬',
  '#E67E22',
  true
) ON CONFLICT (user_id, name) DO UPDATE SET
  keywords_en = EXCLUDED.keywords_en,
  keywords_zh = EXCLUDED.keywords_zh;

-- ============================================================================
-- HEALTH & FITNESS
-- ============================================================================

-- Health
INSERT INTO categories (user_id, name, keywords_en, keywords_zh, icon, color, is_system)
VALUES (
  'a1e08c94-165e-43e7-852e-0954406df694',
  'Health',
  ARRAY['doctor', 'physician', 'hospital', 'clinic', 'medical', 'medicine', 'pharmacy', 'drugstore', 'cvs', 'walgreens', 'rite aid', 'shoppers', 'rexall', 'prescription', 'dental', 'dentist', 'teeth', 'orthodontist', 'optometrist', 'eye', 'glasses', 'vision', 'gym', 'fitness', 'workout', 'yoga', 'pilates', 'crossfit', 'planet fitness', 'la fitness', 'goodlife', 'personal trainer', 'massage', 'spa', 'therapy', 'physical therapy', 'chiropractor', 'acupuncture', 'vitamin', 'supplement', 'protein', 'health', 'wellness', 'mental health', 'counseling', 'psychologist'],
  ARRAY['医生', '医院', '诊所', '药店', '药房', '药', '处方', '牙医', '牙科', '牙齿', '眼科', '眼镜', '视力', '健身房', '健身', '锻炼', '瑜伽', '私教', '按摩', '水疗', 'spa', '理疗', '针灸', '维生素', '保健品', '蛋白粉', '健康', '心理咨询'],
  '⚕️',
  '#1ABC9C',
  true
) ON CONFLICT (user_id, name) DO UPDATE SET
  keywords_en = EXCLUDED.keywords_en,
  keywords_zh = EXCLUDED.keywords_zh;

-- ============================================================================
-- PERSONAL CARE
-- ============================================================================

-- Personal Care
INSERT INTO categories (user_id, name, keywords_en, keywords_zh, icon, color, is_system)
VALUES (
  'a1e08c94-165e-43e7-852e-0954406df694',
  'Personal Care',
  ARRAY['haircut', 'hair', 'salon', 'barber', 'hairdresser', 'beauty', 'nail', 'nails', 'manicure', 'pedicure', 'facial', 'wax', 'waxing', 'shampoo', 'conditioner', 'soap', 'shaving', 'razor', 'toothpaste', 'toothbrush', 'deodorant', 'perfume', 'cologne', 'makeup', 'cosmetics', 'skincare', 'lotion', 'cream', 'sunscreen', 'laundry', 'dry cleaning', 'tailor', 'sephora', 'ulta', 'bath & body works'],
  ARRAY['理发', '美发', '发廊', '美容', '美甲', '面部护理', '脱毛', '洗发水', '护发素', '肥皂', '剃须', '牙膏', '牙刷', '除臭剂', '香水', '化妆品', '护肤品', '乳液', '面霜', '防晒霜', '洗衣', '干洗', '裁缝'],
  '💇',
  '#F39C12',
  false
) ON CONFLICT (user_id, name) DO UPDATE SET
  keywords_en = EXCLUDED.keywords_en,
  keywords_zh = EXCLUDED.keywords_zh;

-- ============================================================================
-- EDUCATION
-- ============================================================================

-- Education
INSERT INTO categories (user_id, name, keywords_en, keywords_zh, icon, color, is_system)
VALUES (
  'a1e08c94-165e-43e7-852e-0954406df694',
  'Education',
  ARRAY['tuition', 'school', 'college', 'university', 'education', 'course', 'class', 'lesson', 'textbook', 'book', 'supplies', 'stationery', 'pen', 'pencil', 'notebook', 'binder', 'backpack', 'student', 'online course', 'udemy', 'coursera', 'skillshare', 'masterclass', 'language', 'english', 'chinese', 'tutoring', 'tutor', 'exam', 'test', 'certification', 'training', 'workshop', 'seminar', 'conference'],
  ARRAY['学费', '学校', '大学', '教育', '课程', '培训', '教科书', '文具', '笔', '本子', '书包', '在线课程', '语言', '英语', '中文', '家教', '补习', '考试', '认证', '研讨会'],
  '📚',
  '#2C3E50',
  false
) ON CONFLICT (user_id, name) DO UPDATE SET
  keywords_en = EXCLUDED.keywords_en,
  keywords_zh = EXCLUDED.keywords_zh;

-- ============================================================================
-- PETS
-- ============================================================================

-- Pets
INSERT INTO categories (user_id, name, keywords_en, keywords_zh, icon, color, is_system)
VALUES (
  'a1e08c94-165e-43e7-852e-0954406df694',
  'Pets',
  ARRAY['pet', 'pets', 'dog', 'cat', 'puppy', 'kitten', 'vet', 'veterinary', 'veterinarian', 'pet food', 'dog food', 'cat food', 'pet store', 'petsmart', 'petco', 'grooming', 'pet grooming', 'pet supplies', 'litter', 'toy', 'leash', 'collar', 'cage', 'aquarium', 'bird', 'fish', 'hamster', 'rabbit'],
  ARRAY['宠物', '狗', '猫', '小狗', '小猫', '兽医', '宠物食品', '狗粮', '猫粮', '宠物店', '宠物美容', '宠物用品', '猫砂', '玩具', '牵引绳', '项圈', '笼子', '鱼缸', '鸟', '鱼', '仓鼠', '兔子'],
  '🐾',
  '#8E44AD',
  false
) ON CONFLICT (user_id, name) DO UPDATE SET
  keywords_en = EXCLUDED.keywords_en,
  keywords_zh = EXCLUDED.keywords_zh;

-- ============================================================================
-- GIFTS & DONATIONS
-- ============================================================================

-- Gifts
INSERT INTO categories (user_id, name, keywords_en, keywords_zh, icon, color, is_system)
VALUES (
  'a1e08c94-165e-43e7-852e-0954406df694',
  'Gifts',
  ARRAY['gift', 'gifts', 'present', 'birthday', 'anniversary', 'wedding', 'christmas', 'holiday', 'valentine', 'mother day', 'father day', 'card', 'greeting card', 'flowers', 'chocolate', 'donation', 'charity', 'nonprofit', 'fundraiser', 'crowdfunding', 'gofundme', 'patreon', 'tip', 'gratuity'],
  ARRAY['礼物', '礼品', '生日', '周年', '婚礼', '圣诞', '节日', '情人节', '母亲节', '父亲节', '贺卡', '鲜花', '巧克力', '捐款', '慈善', '小费'],
  '🎁',
  '#E91E63',
  false
) ON CONFLICT (user_id, name) DO UPDATE SET
  keywords_en = EXCLUDED.keywords_en,
  keywords_zh = EXCLUDED.keywords_zh;

-- ============================================================================
-- TRAVEL
-- ============================================================================

-- Travel
INSERT INTO categories (user_id, name, keywords_en, keywords_zh, icon, color, is_system)
VALUES (
  'a1e08c94-165e-43e7-852e-0954406df694',
  'Travel',
  ARRAY['travel', 'trip', 'vacation', 'holiday', 'flight', 'airline', 'plane', 'airport', 'hotel', 'motel', 'hostel', 'airbnb', 'booking', 'expedia', 'hotels.com', 'rental car', 'car rental', 'hertz', 'enterprise', 'budget', 'avis', 'cruise', 'tour', 'sightseeing', 'attraction', 'visa', 'passport', 'luggage', 'suitcase', 'travel insurance', 'souvenir'],
  ARRAY['旅行', '旅游', '度假', '假期', '机票', '航班', '飞机', '机场', '酒店', '旅馆', '民宿', '爱彼迎', '租车', '游轮', '旅游团', '观光', '景点', '签证', '护照', '行李', '旅行箱', '旅游保险', '纪念品'],
  '✈️',
  '#16A085',
  false
) ON CONFLICT (user_id, name) DO UPDATE SET
  keywords_en = EXCLUDED.keywords_en,
  keywords_zh = EXCLUDED.keywords_zh;

-- ============================================================================
-- KIDS & FAMILY
-- ============================================================================

-- Kids
INSERT INTO categories (user_id, name, keywords_en, keywords_zh, icon, color, is_system)
VALUES (
  'a1e08c94-165e-43e7-852e-0954406df694',
  'Kids',
  ARRAY['kids', 'children', 'child', 'baby', 'infant', 'toddler', 'daycare', 'childcare', 'babysitter', 'nanny', 'diaper', 'diapers', 'formula', 'baby food', 'toy', 'toys', 'playground', 'kids clothing', 'stroller', 'car seat', 'crib', 'nursery', 'pediatrician'],
  ARRAY['儿童', '孩子', '小孩', '宝宝', '婴儿', '幼儿', '托儿所', '保姆', '尿布', '奶粉', '婴儿食品', '玩具', '游乐场', '童装', '婴儿车', '儿童座椅', '婴儿床', '儿科'],
  '👶',
  '#F368E0',
  false
) ON CONFLICT (user_id, name) DO UPDATE SET
  keywords_en = EXCLUDED.keywords_en,
  keywords_zh = EXCLUDED.keywords_zh;

-- ============================================================================
-- PROFESSIONAL
-- ============================================================================

-- Professional
INSERT INTO categories (user_id, name, keywords_en, keywords_zh, icon, color, is_system)
VALUES (
  'a1e08c94-165e-43e7-852e-0954406df694',
  'Professional',
  ARRAY['office', 'office supplies', 'business', 'work', 'professional', 'suit', 'briefcase', 'professional development', 'conference', 'networking', 'business card', 'printer', 'ink', 'toner', 'software', 'license', 'microsoft', 'adobe', 'zoom', 'slack', 'dropbox', 'google workspace', 'linkedin', 'accounting', 'legal', 'lawyer', 'attorney', 'consultant', 'contractor'],
  ARRAY['办公', '办公用品', '商务', '工作', '职业', '西装', '公文包', '职业发展', '会议', '社交', '名片', '打印机', '墨水', '软件', '许可证', '会计', '法律', '律师', '顾问', '承包商'],
  '💼',
  '#34495E',
  false
) ON CONFLICT (user_id, name) DO UPDATE SET
  keywords_en = EXCLUDED.keywords_en,
  keywords_zh = EXCLUDED.keywords_zh;

-- ============================================================================
-- OTHER / FALLBACK
-- ============================================================================

-- Other
INSERT INTO categories (user_id, name, keywords_en, keywords_zh, icon, color, is_system)
VALUES (
  'a1e08c94-165e-43e7-852e-0954406df694',
  'Other',
  ARRAY[]::text[],
  ARRAY[]::text[],
  '📦',
  '#8A8A8A',
  true
) ON CONFLICT (user_id, name) DO UPDATE SET
  keywords_en = EXCLUDED.keywords_en,
  keywords_zh = EXCLUDED.keywords_zh;

-- ============================================================================
-- FIX YOUR EXISTING TRANSACTIONS
-- ============================================================================

-- Update your existing transactions to have proper categories
-- Run these after inserting categories above

-- Fix beef transaction
UPDATE transactions 
SET category_id = (SELECT id FROM categories WHERE name = 'Grocery' AND user_id = 'a1e08c94-165e-43e7-852e-0954406df694')
WHERE id = 3 AND user_id = 'a1e08c94-165e-43e7-852e-0954406df694';

-- Fix fish transaction
UPDATE transactions 
SET category_id = (SELECT id FROM categories WHERE name = 'Grocery' AND user_id = 'a1e08c94-165e-43e7-852e-0954406df694')
WHERE id = 2 AND user_id = 'a1e08c94-165e-43e7-852e-0954406df694';

-- Fix anju韩餐 transaction
UPDATE transactions 
SET category_id = (SELECT id FROM categories WHERE name = 'Dining' AND user_id = 'a1e08c94-165e-43e7-852e-0954406df694')
WHERE id = 1 AND user_id = 'a1e08c94-165e-43e7-852e-0954406df694';

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- 1. Check categories were inserted (should return 16 rows)
SELECT name, icon, 
  array_length(keywords_en, 1) as en_count, 
  array_length(keywords_zh, 1) as zh_count 
FROM categories 
WHERE user_id = 'a1e08c94-165e-43e7-852e-0954406df694'
ORDER BY name;

-- 2. Check your transactions now have categories
SELECT id, raw_text, amount, 
  (SELECT name FROM categories WHERE id = transactions.category_id) as category_name
FROM transactions 
WHERE user_id = 'a1e08c94-165e-43e7-852e-0954406df694'
ORDER BY ts DESC;

-- 3. Test categorization for 'anju' keyword
SELECT name, 'anju' = ANY(keywords_en) as has_anju_en, 'anju' = ANY(keywords_zh) as has_anju_zh
FROM categories 
WHERE user_id = 'a1e08c94-165e-43e7-852e-0954406df694' AND name = 'Dining';

