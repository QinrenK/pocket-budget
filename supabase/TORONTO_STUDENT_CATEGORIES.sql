-- ============================================================================
-- TORONTO INTERNATIONAL STUDENT CATEGORIES
-- Hyper-specialized for international students in Toronto, Canada
-- User ID: a1e08c94-165e-43e7-852e-0954406df694
-- ============================================================================
--
-- This comprehensive system covers:
-- - Toronto-specific locations (UofT, York, Ryerson, etc.)
-- - Student discounts and deals
-- - International student needs (visa, immigration, remittance)
-- - Popular student hangouts and restaurants
-- - Transit (TTC, GO Transit, Presto)
-- - Textbooks and course materials
-- - Asian supermarkets and restaurants (very popular with international students)
-- - Entertainment venues students frequent
-- - Housing near universities
-- ============================================================================

-- OPTIONAL: Clear existing categories for fresh start
-- DELETE FROM categories WHERE user_id = 'a1e08c94-165e-43e7-852e-0954406df694';

-- ============================================================================
-- 1. FOOD & DINING - TORONTO STUDENT EDITION
-- ============================================================================

-- 1.1 Groceries - Asian Markets Prominent
INSERT INTO categories (user_id, name, keywords_en, keywords_zh, icon, color, is_system)
VALUES (
  'a1e08c94-165e-43e7-852e-0954406df694',
  'Groceries',
  ARRAY[
    -- General
    'grocery', 'groceries', 'supermarket', 'market', 'food', 'shopping',
    -- Toronto Chains
    'loblaws', 'no frills', 'metro', 'sobeys', 'food basics', 'freshco', 'valumart', 'independent', 'fortinos', 'zehrs',
    'farm boy', 'whole foods', 'organic garage', 'fiesta farms', 'kitchen table',
    -- Discount Grocers (Student Budget!)
    'no frills', 'food basics', 'freshco', 'walmart', 'dollarama', 'dollar tree', 'giant tiger',
    -- Asian Supermarkets (HUGE for international students)
    't&t', 't&t supermarket', 'tnت', 'h mart', 'hmart', 'p.a.t', 'pat', 'pat central', 'galleria', 'c&c', 'lucky moose',
    'kai wei', 'first choice', 'oceans', 'honest weight', 'yuan ming', 'crown', 'foody mart', 'sunny foodmart',
    'nations', 'nations fresh', 'skyview oriental', 'pacific fresh', 'new sky', 'bestco', 'marche adonis',
    -- Chinatown Specific
    'chinatown', 'spadina', 'dundas', 'chinese supermarket', 'asian market', 'korean market', 'japanese market',
    -- Items Students Buy
    'instant noodles', 'ramen', 'rice', 'frozen dumplings', 'kimchi', 'tofu', 'soy sauce', 'sesame oil',
    'ramyeon', 'miso paste', 'seaweed', 'rice cooker', 'snacks', 'pocky', 'bubble tea powder', 'tea', 'coffee',
    -- Specific Locations
    'kensington market', 'st lawrence market', 'market lane', 'st lawrence',
    -- Meal Prep Sunday
    'meal prep', 'bulk', 'costco', 'costco business centre',
    -- International Foods
    '中超', '韩亚龙', '大统华', '华人超市', '亚洲超市', '韩国超市', '日本超市', '方便面', '拉面', '泡菜', '豆腐', '饺子'
  ],
  ARRAY[
    -- General Chinese
    '超市', '食品', '杂货', '菜市场', '买菜', '购物',
    -- Toronto Chinese Names
    '大统华', 'T&T', '韩亚龙', 'H Mart', 'PAT', 'Galleria', '好运超市', '凯威', '第一选择', '海洋超市', '元明', '皇冠', '福迪', '阳光超市',
    'Nations', '天景', 'Pacific Fresh', '新天地', 'Bestco', '马奇阿多尼斯',
    -- Discount  
    'No Frills', 'Food Basics', 'FreshCo', 'Walmart', '沃尔玛', 'Dollarama', 'Dollar Tree', 'Giant Tiger',
    -- Other Chains
    'Loblaws', 'Metro', 'Sobeys', '农场男孩', 'Whole Foods', '全食超市',
    -- Items
    '方便面', '拉面', '速食面', '米饭', '大米', '速冻饺子', '泡菜', '豆腐', '酱油', '麻油', '辛拉面', '味增', '海苔', '电饭煲', '零食', '百奇', '奶茶粉', '茶', '咖啡',
    -- Locations
    '唐人街', 'Spadina', 'Dundas', '中国超市', '亚洲超市', '韩国超市', '日本超市', 'Kensington Market', 'St Lawrence Market',
    -- Student Life
    '备餐', '大宗购买', 'Costco', '好市多'
  ],
  '🛒',
  '#00D68F',
  true
) ON CONFLICT (user_id, name) DO UPDATE SET
  keywords_en = EXCLUDED.keywords_en,
  keywords_zh = EXCLUDED.keywords_zh;

-- 1.2 Restaurants - Student Hotspots
INSERT INTO categories (user_id, name, keywords_en, keywords_zh, icon, color, is_system)
VALUES (
  'a1e08c94-165e-43e7-852e-0954406df694',
  'Restaurants & Dining',
  ARRAY[
    -- General
    'restaurant', 'dining', 'dinner', 'lunch', 'eat out', 'takeout',
    
    -- ===== KOREAN (Huge with students!) =====
    'korean', 'korean bbq', 'kbbq', 'ktown', 'koreatown',
    -- Korean Restaurants Toronto
    'anju', 'ajuker', 'chako', 'daldongnae', 'anh coffee', 'seoul', 'gangnam style', 'kingyo', 'gyu-kaku',
    'sura', 'daldongnae korean bbq', 'owl of minerva', 'owl minerva', 'hanmoto', 'pai', 'jatoba', 'mother india',
    'kimchi house', 'korean grill house', 'arirang', 'dumplings house', 'myung ga', 'seoul house',
    -- Korean Dishes
    'bibimbap', 'bulgogi', 'galbi', 'samgyeopsal', 'kimchi jjigae', 'sundubu', 'tteokbokki', 'kimbap', 'korean fried chicken',
    
    -- ===== CHINESE =====
    'chinese', 'chinese food', 'cantonese', 'szechuan', 'sichuan', 'hunan', 'shanghai', 'beijing',
    -- Chinese Restaurants
    'mother\'s dumplings', 'dumpling house', 'juicy dumpling', 'rol san', 'king\'s noodle', 'swatow', 'congee queen',
    'asian legend', 'yang\'s', 'mom\'s kitchen', 'la mien', 'new sky', 'pearl court', 'crown princess',
    'spring villa', 'yueh tung', 'lichee garden', 'kim moon', 'lai wah heen', 'lee chen',
    -- Dishes
    'dim sum', 'hotpot', 'hot pot', 'malatang', 'lanzhou noodles', 'hand pulled noodles', 'peking duck',
    'xiaolongbao', 'soup dumplings', 'fried rice', 'chow mein', 'sweet and sour', 'kung pao', 'mapo tofu',
    
    -- ===== JAPANESE =====
    'japanese', 'sushi', 'ramen', 'izakaya',
    'ajisen', 'kinton', 'santouka', 'sansotei', 'momofuku', 'kinka', 'guu', 'manpuku', 'konjiki',
    'tachi', 'raijin', 'hokkaido ramen santouka', 'hanmoto', 'imanishi',
    'all you can eat sushi', 'ayce sushi', 'toshi sushi', 'mikado',
    
    -- ===== VIETNAMESE & THAI =====
    'pho', 'vietnamese', 'banh mi', 'thai',
    'pho hung', 'golden turtle', 'saigon', 'pho pasteur', 'bahn mi boys', 'pai', 'khao san road',
    'salad king', 'nana', 'sukhothai', 'mengrai thai',
    
    -- ===== INDIAN & PAKISTANI =====
    'indian', 'pakistani', 'curry', 'biryani',
    'udupi palace', 'banjara', 'lahore tikka house', 'hakka legend', 'mother india', 'indian rice factory',
    'butter chicken', 'tikka masala', 'naan', 'samosa', 'chaat',
    
    -- ===== MIDDLE EASTERN =====
    'shawarma', 'kebab', 'falafel', 'middle eastern',
    'osmow\'s', 'paramount', 'ghazale', 'jerusalem', 'the ace', 'mr zagros',
    
    -- ===== PIZZA & ITALIAN =====
    'pizza', 'pizzeria', 'italian',
    'pizzaiolo', 'north of brooklyn', 'lambo\'s', 'maker pizza', 'pizza pizza', 'dominó', 'pizza nova',
    'terroni', 'sotto sotto', 'buca',
    
    -- ===== STUDENT CAFES & CHEAP EATS =====
    'food court', 'eaton centre', 'cf toronto eaton centre', 'yorkdale', 'square one',
    'chipotle', 'quesada', 'burrito boyz', 'fat bastard burrito', 'mucho burrito',
    'freshii', 'pita pit', 'extreme pita', 'subway', 'mr sub',
    
    -- ===== BUBBLE TEA (Essential!) =====
    'bubble tea', 'boba', 'milk tea',
    'chatime', 'coco', 'gongcha', 'gong cha', 'tiger sugar', 'the alley', 'onezo', 'tbar', 'ten ren',
    'share tea', 'presotea', 'yifang', 'vivi', 'kung fu tea', 'urban tea', 'machi machi',
    
    -- ===== LATE NIGHT (Students!) =====
    'late night', 'open late', '24 hours', '24hr', 'after hours',
    'sneaky dee\'s', 'the pint', 'fran\'s', 'the lakeview',
    
    -- ===== CAMPUS SPECIFIC =====
    'uoft', 'u of t', 'university', 'campus', 'robarts', 'sid smith', 'bahen',
    'york', 'york lanes', 'ryerson', 'rye high', 'utm', 'utsc', 'scarborough campus',
    
    -- Chinese Terms
    '餐厅', '饭店', '韩餐', '韩国烧烤', '韩烤', '中餐', '中国菜', '日料', '日本料理', '越南菜', '泰国菜', '印度菜',
    '火锅', '麻辣烫', '兰州拉面', '手擀面', '北京烤鸭', '小笼包', '汤包', '炒饭', '炒面', '糖醋', '宫保', '麻婆豆腐',
    '寿司', '拉面', '烧鸟', '河粉', '越南河粉', '米粉', '咖喱', '印度饭', '沙威玛', '烤肉串', '披萨', '意大利菜',
    '奶茶', '珍珠奶茶', '波霸', '深夜', '24小时', '校园', '大学', '多大', '约克', '瑞尔森'
  ],
  ARRAY[
    '餐厅', '饭店', '吃饭', '晚餐', '午餐', '外出就餐', '外卖',
    -- Korean
    '韩餐', '韩国料理', '韩国烧烤', 'KBBQ', 'K-Town', '韩国城', 'Anju', 'Ajuker', 'Chako', 'Daldongnae', 'Anh Coffee', 'Seoul', 'Gangnam Style',
    'Sura', '猫头鹰矿泉', 'Hanmoto', 'Pai', 'Jatoba', 'Mother India', '泡菜屋', 'Arirang', 'Myung Ga', 'Seoul House',
    '石锅拌饭', '烤肉', '排骨', '五花肉', '泡菜汤', '嫩豆腐', '年糕', '紫菜包饭', '韩国炸鸡',
    -- Chinese
    '中餐', '中国菜', '粤菜', '川菜', '四川菜', '湘菜', '上海菜', '北京菜',
    'Mother\'s Dumplings', '饺子馆', 'Juicy Dumpling', 'Rol San', 'King\'s Noodle', 'Swatow', '粥后', 'Congee Queen',
    'Asian Legend', 'Yang\'s', 'Mom\'s Kitchen', '拉面', 'New Sky', 'Pearl Court', 'Crown Princess',
    'Spring Villa', 'Yueh Tung', 'Lichee Garden', 'Kim Moon', 'Lai Wah Heen', 'Lee Chen',
    '点心', '火锅', '麻辣烫', '兰州拉面', '手擀面', '北京烤鸭', '小笼包', '汤包', '炒饭', '炒面', '糖醋', '宫保鸡丁', '麻婆豆腐',
    -- Japanese
    '日料', '日本料理', '寿司', '拉面', '居酒屋',
    'Ajisen', 'Kinton', 'Santouka', 'Sansotei', 'Momofuku', 'Kinka', 'Guu', 'Manpuku', 'Konjiki',
    'Tachi', 'Raijin', 'Hanmoto', 'Imanishi', '自助寿司', 'AYCE寿司', 'Toshi Sushi', 'Mikado',
    -- Vietnamese & Thai
    '越南菜', '河粉', '越南三明治', '泰国菜',
    'Pho Hung', 'Golden Turtle', 'Saigon', 'Pho Pasteur', 'Banh Mi Boys', 'Pai', 'Khao San Road',
    'Salad King', 'Nana', 'Sukhothai', 'Mengrai Thai',
    -- Indian & Pakistani
    '印度菜', '巴基斯坦菜', '咖喱', '印度饭',
    'Udupi Palace', 'Banjara', 'Lahore Tikka House', 'Hakka Legend', 'Mother India', '印度米厂',
    '黄油鸡', '坦都里咖喱', '馕', '咖喱角', 'Chaat',
    -- Middle Eastern
    '沙威玛', '烤肉串', '沙拉三明治', '中东菜',
    'Osmow\'s', 'Paramount', 'Ghazale', 'Jerusalem', 'The Ace', 'Mr Zagros',
    -- Pizza
    '披萨', '意大利菜', 'Pizzaiolo', 'North of Brooklyn', 'Lambo\'s', 'Maker Pizza', 'Pizza Pizza', 'Domino\'s', 'Pizza Nova',
    'Terroni', 'Sotto Sotto', 'Buca',
    -- Student Cafes
    '美食广场', '伊顿中心', 'Eaton Centre', 'Yorkdale', 'Square One',
    'Chipotle', 'Quesada', 'Burrito Boyz', 'Fat Bastard Burrito', 'Mucho Burrito',
    'Freshii', 'Pita Pit', 'Extreme Pita', 'Subway', 'Mr Sub',
    -- Bubble Tea
    '奶茶', '珍珠奶茶', '波霸', 'Chatime', '日出茶太', 'CoCo', '都可', 'Gong Cha', '贡茶', 'Tiger Sugar', '老虎堂',
    'The Alley', '鹿角巷', 'Onezo', 'TBar', 'Ten Ren', '天仁', 'Share Tea', '分享茶', 'Presotea', 'Yifang', 'Vivi', 'Kung Fu Tea', 'Urban Tea', 'Machi Machi',
    -- Late Night
    '深夜', '营业到很晚', '24小时', '深夜后', 'Sneaky Dee\'s', 'The Pint', 'Fran\'s', 'The Lakeview',
    -- Campus
    '多大', 'U of T', '大学', '校园', 'Robarts', 'Sid Smith', 'Bahen', '约克', 'York Lanes', '瑞尔森', 'Rye High', 'UTM', 'UTSC', '斯卡伯勒校区'
  ],
  '🍽️',
  '#FFB800',
  true
) ON CONFLICT (user_id, name) DO UPDATE SET
  keywords_en = EXCLUDED.keywords_en,
  keywords_zh = EXCLUDED.keywords_zh;

-- 1.3 Coffee & Cafes - Study Spots!
INSERT INTO categories (user_id, name, keywords_en, keywords_zh, icon, color, is_system)
VALUES (
  'a1e08c94-165e-43e7-852e-0954406df694',
  'Coffee & Study Cafes',
  ARRAY[
    -- Major Chains
    'starbucks', 'sbux', 'tim hortons', 'tims', 'second cup', 'balzac', 'timothy', 'country style',
    'mcdonald coffee', 'mcdonalds coffee',
    -- Toronto Indie Cafes (Study Hotspots!)
    'sam james', 'dark horse', 'mercury espresso', 'pilot', 'te aro', 'early bird', 'propeller', 'fahrenheit',
    'merchants of green coffee', 'butter avenue', 'rooster', 'fika', 'cafe diplomatico', 'jimmy coffee',
    'jet fuel', 'moonbean', 'cafe pamenar', 'green beanery', 'fahrenheit coffee', 'quantum coffee',
    -- Study Cafes (Good WiFi!)
    'study cafe', 'wifi cafe', 'laptop friendly', 'study spot', 'library cafe',
    -- Korean Cafes (Popular!)
    'cafe bora', 'the dessert kitchen', 'cafe maru', 'cafe bene', 'sul & beans', 'snowy village', 'milky bee',
    -- Asian Cafes
    'coco fresh tea', 'ten ren', 'happy lemon', 'gong cha', 'chatime',
    -- Campus Cafes
    'uoft cafe', 'robarts cafe', 'sid smith cafe', 'bahen cafe', 'kelly library cafe',
    'york lanes cafe', 'ryerson cafe', 'student centre',
    -- Dessert Cafes
    'sulbing', 'sweet jesus', 'bakerbots', 'petit four', 'nadège'
  ],
  ARRAY[
    -- Chains
    '星巴克', 'Starbucks', 'Tim Hortons', '提姆霍顿斯', 'Second Cup', 'Balzac\'s', 'Timothy\'s', 'Country Style',
    '麦当劳咖啡',
    -- Indie
    'Sam James', 'Dark Horse', 'Mercury Espresso', 'Pilot', 'Te Aro', 'Early Bird', 'Propeller', 'Fahrenheit',
    'Merchants of Green Coffee', 'Butter Avenue', 'Rooster', 'Fika', 'Cafe Diplomatico', 'Jimmy\'s Coffee',
    'Jet Fuel', 'Moonbean', 'Cafe Pamenar', 'Green Beanery', 'Quantum Coffee',
    -- Study
    '自习咖啡厅', 'WiFi咖啡厅', '笔记本友好', '学习地点', '图书馆咖啡厅',
    -- Korean
    'Cafe Bora', 'The Dessert Kitchen', 'Cafe Maru', 'Cafe Bene', 'Sul & Beans', 'Snowy Village', 'Milky Bee',
    -- Asian
    'Coco Fresh Tea', 'Ten Ren', '天仁', 'Happy Lemon', '快乐柠檬', 'Gong Cha', '贡茶', 'Chatime', '日出茶太',
    -- Campus
    '多大咖啡厅', 'Robarts咖啡厅', 'Sid Smith咖啡厅', 'Bahen咖啡厅', 'Kelly Library咖啡厅',
    'York Lanes咖啡厅', 'Ryerson咖啡厅', '学生中心',
    -- Dessert
    'Sulbing', '雪冰', 'Sweet Jesus', 'Bakerbots', 'Petit Four', 'Nadège'
  ],
  '☕',
  '#6F4E37',
  false
) ON CONFLICT (user_id, name) DO UPDATE SET
  keywords_en = EXCLUDED.keywords_en,
  keywords_zh = EXCLUDED.keywords_zh;

-- ============================================================================
-- 2. TORONTO TRANSIT (Essential for Students!)
-- ============================================================================

INSERT INTO categories (user_id, name, keywords_en, keywords_zh, icon, color, is_system)
VALUES (
  'a1e08c94-165e-43e7-852e-0954406df694',
  'TTC & Transit',
  ARRAY[
    -- TTC Specific
    'ttc', 'toronto transit', 'subway', 'streetcar', 'bus', 'transit',
    'presto', 'presto card', 'token', 'metropass', 'day pass', 'weekly pass', 'monthly pass',
    'ttc fare', 'ttc ticket', 'ttc pass', 'student fare', 'post-secondary pass', 'student id',
    -- Lines
    'line 1', 'line 2', 'yonge line', 'bloor line', 'sheppard line', 'scarborough rt',
    -- Stations Near Universities
    'st george', 'museum', 'queens park', 'spadina', 'bathurst', 'christie', 'ossington',
    'finch', 'york university', 'vaughan', 'highway 407', 'kennedy', 'scarborough centre',
    'college', 'dundas', 'queen', 'king', 'union station', 'bloor-yonge',
    -- GO Transit (For Suburbs!)
    'go transit', 'go train', 'go bus', 'lakeshore west', 'lakeshore east', 'milton line',
    'kitchener line', 'barrie line', 'stouffville line', 'richmond hill line',
    'union station', 'exhibition', 'danforth', 'rouge hill', 'pickering', 'ajax', 'whitby', 'oshawa',
    'burlington', 'oakville', 'port credit', 'clarkson', 'mississauga', 'brampton',
    -- UP Express (Airport!)
    'up express', 'union pearson', 'pearson airport', 'airport train',
    -- MiWay (Mississauga)
    'miway', 'mississauga transit', 'square one',
    -- York Region Transit
    'yrt', 'viva', 'york region transit',
    -- Student Deals
    'student discount', 'post-secondary', 'student presto', 'student metropass'
  ],
  ARRAY[
    -- TTC
    'TTC', '多伦多交通', '地铁', '有轨电车', '公交', '公交车', '交通',
    'Presto', 'Presto卡', '代币', '月票', '日票', '周票', '月票',
    'TTC票价', 'TTC车票', 'TTC通行证', '学生票', '大专通行证', '学生证',
    -- Lines
    '1号线', '2号线', 'Yonge线', 'Bloor线', 'Sheppard线', 'Scarborough RT',
    -- Stations
    'St George', 'Museum', 'Queen\'s Park', 'Spadina', 'Bathurst', 'Christie', 'Ossington',
    'Finch', 'York University', '约克大学', 'Vaughan', 'Highway 407', 'Kennedy', 'Scarborough Centre',
    'College', 'Dundas', 'Queen', 'King', 'Union Station', '联合车站', 'Bloor-Yonge',
    -- GO Transit
    'GO Transit', 'GO列车', 'GO巴士', 'Lakeshore West', 'Lakeshore East', 'Milton Line',
    'Kitchener Line', 'Barrie Line', 'Stouffville Line', 'Richmond Hill Line',
    'Union Station', 'Exhibition', 'Danforth', 'Rouge Hill', 'Pickering', 'Ajax', 'Whitby', 'Oshawa',
    'Burlington', 'Oakville', 'Port Credit', 'Clarkson', 'Mississauga', '密西沙加', 'Brampton', '布兰普顿',
    -- UP Express
    'UP Express', 'Union Pearson', 'Pearson Airport', '皮尔逊机场', '机场火车',
    -- MiWay
    'MiWay', 'Mississauga Transit', 'Square One',
    -- YRT
    'YRT', 'Viva', 'York Region Transit', '约克地区交通',
    -- Student
    '学生折扣', '大专', '学生Presto', '学生月票'
  ],
  '🚇',
  '#D10A3C',
  true
) ON CONFLICT (user_id, name) DO UPDATE SET
  keywords_en = EXCLUDED.keywords_en,
  keywords_zh = EXCLUDED.keywords_zh;

-- ============================================================================
-- 3. EDUCATION & STUDENT LIFE
-- ============================================================================

INSERT INTO categories (user_id, name, keywords_en, keywords_zh, icon, color, is_system)
VALUES (
  'a1e08c94-165e-43e7-852e-0954406df694',
  'Tuition & Education',
  ARRAY[
    -- Tuition
    'tuition', 'tuition fee', 'tuition payment', 'school fee', 'university fee', 'college fee',
    'course fee', 'program fee', 'international student fee', 'domestic fee',
    'deposit', 'enrollment', 'registration fee', 'student fees', 'ancillary fees',
    -- Universities
    'university of toronto', 'uoft', 'u of t', 'york university', 'ryerson', 'toront metropolitan', 'tmu',
    'utsc', 'scarborough campus', 'utm', 'mississauga campus', 'utsg', 'st george campus',
    'humber', 'seneca', 'george brown', 'centennial', 'sheridan', 'mohawk', 'durham college',
    -- Textbooks & Supplies
    'textbook', 'course pack', 'textbooks', 'coursebook', 'study guide', 'lab manual',
    'uoft bookstore', 'campus bookstore', 'bookstore', 'book store',
    'amazon textbook', 'chegg', 'slugbooks', 'abe books', 'better world books',
    -- Supplies
    'notebooks', 'binder', 'pens', 'pencils', 'highlighters', 'calculator', 'scientific calculator',
    'lab coat', 'safety goggles', 'course materials', 'art supplies',
    'staples', 'grand & toy', 'bureau en gros', 'office depot', 'dollarama', 'dollar store',
    -- Online Learning
    'coursera', 'udemy', 'skillshare', 'linkedin learning', 'khan academy', 'udacity',
    'chegg study', 'course hero', 'grammarly', 'quizlet', 'duolingo', 'rosetta stone',
    -- Software & Subscriptions
    'microsoft office', 'office 365', 'adobe', 'matlab', 'wolfram alpha', 'mathematica',
    'overleaf', 'latex', 'github', 'github student', 'jetbrains',
    -- Language Learning (International Students!)
    'english class', 'esl', 'ielts', 'toefl', 'language school', 'english course',
    'ilac', 'ilsc', 'oxford seminars', 'kaplan', 'berlitz'
  ],
  ARRAY[
    -- Tuition
    '学费', '学杂费', '学费支付', '学校费用', '大学费用', '学院费用',
    '课程费', '项目费', '国际学生费', '本地费',
    '押金', '注册', '注册费', '学生费', '辅助费',
    -- Universities
    '多伦多大学', 'UofT', 'U of T', '约克大学', '瑞尔森', '多伦多都会大学', 'TMU',
    'UTSC', 'Scarborough校区', 'UTM', 'Mississauga校区', 'UTSG', 'St George校区',
    'Humber', 'Seneca', 'George Brown', 'Centennial', 'Sheridan', 'Mohawk', 'Durham College',
    -- Textbooks
    '教科书', '课程包', '教材', '课本', '学习指南', '实验手册',
    '多大书店', '校园书店', '书店',
    'Amazon教材', 'Chegg', 'Slugbooks', 'ABE Books', 'Better World Books',
    -- Supplies
    '笔记本', '活页夹', '钢笔', '铅笔', '荧光笔', '计算器', '科学计算器',
    '实验服', '安全护目镜', '课程材料', '美术用品',
    'Staples', 'Grand & Toy', 'Bureau en Gros', 'Office Depot', 'Dollarama', 'Dollar Store',
    -- Online
    'Coursera', 'Udemy', 'Skillshare', 'LinkedIn Learning', 'Khan Academy', 'Udacity',
    'Chegg Study', 'Course Hero', 'Grammarly', 'Quizlet', 'Duolingo', 'Rosetta Stone',
    -- Software
    'Microsoft Office', 'Office 365', 'Adobe', 'MATLAB', 'Wolfram Alpha', 'Mathematica',
    'Overleaf', 'LaTeX', 'GitHub', 'GitHub Student', 'JetBrains',
    -- Language
    '英语课', 'ESL', 'IELTS', '雅思', 'TOEFL', '托福', '语言学校', '英语课程',
    'ILAC', 'ILSC', 'Oxford Seminars', 'Kaplan', 'Berlitz'
  ],
  '📚',
  '#2C3E50',
  true
) ON CONFLICT (user_id, name) DO UPDATE SET
  keywords_en = EXCLUDED.keywords_en,
  keywords_zh = EXCLUDED.keywords_zh;

-- ============================================================================
-- 4. INTERNATIONAL STUDENT SPECIFIC
-- ============================================================================

INSERT INTO categories (user_id, name, keywords_en, keywords_zh, icon, color, is_system)
VALUES (
  'a1e08c94-165e-43e7-852e-0954406df694',
  'Immigration & Visa',
  ARRAY[
    -- Immigration Services
    'immigration', 'visa', 'study permit', 'work permit', 'pgwp', 'post-graduation work permit',
    'visitor visa', 'trv', 'temporary resident visa', 'pr', 'permanent residence', 'express entry',
    'cic', 'ircc', 'service canada', 'citizenship', 'naturalization',
    -- Biometrics & Documents
    'biometrics', 'fingerprints', 'photos', 'passport photo', 'visa photo', 'application fee',
    'medical exam', 'immigration medical', 'panel physician', 'police clearance', 'background check',
    -- Immigration Lawyers & Consultants
    'immigration lawyer', 'immigration consultant', 'rcic', 'notary', 'commissioner of oaths',
    'legal aid', 'paralegal', 'consultation fee',
    -- Translation
    'translation', 'certified translation', 'notarized translation', 'document translation',
    'transcript translation', 'degree evaluation', 'wes', 'icas', 'iqas',
    -- Insurance (Required for Study Permit!)
    'uhip', 'university health insurance', 'guard.me', 'studentguard', 'international student insurance',
    'travel insurance', 'visitor insurance', 'super visa insurance',
    -- SIN & Health Card
    'sin', 'social insurance number', 'service canada', 'ohip', 'health card', 'ontario health card'
  ],
  ARRAY[
    -- Immigration
    '移民', '签证', '学习许可', '工作许可', 'PGWP', '毕业后工作许可',
    '访客签证', 'TRV', '临时居民签证', 'PR', '永久居民', '快速通道',
    'CIC', 'IRCC', '加拿大服务', '公民身份', '入籍',
    -- Documents
    '生物识别', '指纹', '照片', '护照照片', '签证照片', '申请费',
    '体检', '移民体检', '指定医师', '无犯罪证明', '背景调查',
    -- Lawyers
    '移民律师', '移民顾问', 'RCIC', '公证人', '宣誓委员',
    '法律援助', '律师助理', '咨询费',
    -- Translation
    '翻译', '认证翻译', '公证翻译', '文件翻译',
    '成绩单翻译', '学位评估', 'WES', 'ICAS', 'IQAS',
    -- Insurance
    'UHIP', '大学健康保险', 'Guard.me', 'StudentGuard', '国际学生保险',
    '旅行保险', '访客保险', '超级签证保险',
    -- SIN & Health
    'SIN', '社会保险号', '加拿大服务', 'OHIP', '健康卡', '安大略健康卡'
  ],
  '🛂',
  '#E67E22',
  true
) ON CONFLICT (user_id, name) DO UPDATE SET
  keywords_en = EXCLUDED.keywords_en,
  keywords_zh = EXCLUDED.keywords_zh;

INSERT INTO categories (user_id, name, keywords_en, keywords_zh, icon, color, is_system)
VALUES (
  'a1e08c94-165e-43e7-852e-0954406df694',
  'Money Transfer & Banking',
  ARRAY[
    -- Money Transfer (HUGE for international students!)
    'remittance', 'money transfer', 'wire transfer', 'send money', 'transfer money',
    'western union', 'moneygram', 'ria', 'xoom', 'worldremit', 'transfast', 'remitly',
    'wise', 'transferwise', 'xe', 'currencyfair', 'ofx', 'revolut',
    'alipay', 'wechat pay', 'wechat wallet', 'paypal', 'venmo', 'zelle',
    -- Chinese Services (Very popular!)
    'alipay', '支付宝', 'wechat pay', '微信支付', 'unionpay', '银联',
    'taobao', '淘宝', 'jd', '京东', 'pinduoduo', '拼多多',
    -- Banks
    'td', 'td bank', 'rbc', 'royal bank', 'scotiabank', 'bmo', 'bank of montreal', 'cibc',
    'tangerine', 'simplii', 'pc financial', 'eq bank', 'motive financial',
    'hsbc', 'icbc', 'bank of china', 'industrial commercial bank',
    -- Banking Fees
    'bank fee', 'transfer fee', 'atm fee', 'overdraft', 'monthly fee', 'account fee',
    'exchange rate', 'conversion fee', 'foreign transaction fee',
    -- Student Banking
    'student account', 'student banking', 'no fee account', 'free banking'
  ],
  ARRAY[
    -- Transfer
    '汇款', '转账', '电汇', '汇钱', '转钱',
    'Western Union', '西联', 'MoneyGram', 'Ria', 'Xoom', 'WorldRemit', 'Transfast', 'Remitly',
    'Wise', 'TransferWise', 'XE', 'CurrencyFair', 'OFX', 'Revolut',
    '支付宝', 'Alipay', '微信支付', 'WeChat Pay', '微信钱包', 'PayPal', 'Venmo', 'Zelle',
    -- Chinese
    '支付宝', '微信支付', '银联', 'UnionPay',
    '淘宝', 'Taobao', '京东', 'JD', '拼多多', 'Pinduoduo',
    -- Banks
    'TD', 'TD Bank', 'RBC', 'Royal Bank', '皇家银行', 'Scotiabank', '丰业银行', 'BMO', 'Bank of Montreal', '蒙特利尔银行', 'CIBC',
    'Tangerine', 'Simplii', 'PC Financial', 'EQ Bank', 'Motive Financial',
    'HSBC', '汇丰', 'ICBC', '工商银行', 'Bank of China', '中国银行',
    -- Fees
    '银行费', '转账费', 'ATM费', '透支', '月费', '账户费',
    '汇率', '兑换费', '外国交易费',
    -- Student
    '学生账户', '学生银行', '免费账户', '免费银行'
  ],
  '💸',
  '#27AE60',
  false
) ON CONFLICT (user_id, name) DO UPDATE SET
  keywords_en = EXCLUDED.keywords_en,
  keywords_zh = EXCLUDED.keywords_zh;

-- ============================================================================
-- 5. STUDENT HOUSING
-- ============================================================================

INSERT INTO categories (user_id, name, keywords_en, keywords_zh, icon, color, is_system)
VALUES (
  'a1e08c94-165e-43e7-852e-0954406df694',
  'Housing & Rent',
  ARRAY[
    -- Rent
    'rent', 'rental', 'apartment', 'condo', 'room', 'roommate', 'sublet', 'sublease',
    'lease', 'tenancy', 'landlord', 'property management',
    -- Student Housing
    'student housing', 'residence', 'dorm', 'dormitory', 'res', 'residence hall',
    'chestnut', 'new college', 'innis', 'trinity', 'victoria', 'st michael', 'university college',
    'grad house', 'graduate house', 'family housing', 'married housing',
    -- Off-Campus
    'annex', 'the annex', 'harbord village', 'chinatown', 'kensington', 'little italy',
    'koreatown', 'christie pits', 'bloor west', 'high park', 'junction', 'parkdale',
    'downtown toronto', 'city place', 'liberty village', 'king west', 'entertainment district',
    'scarborough', 'north york', 'etobicoke', 'east york', 'york', 'mississauga', 'brampton',
    -- Rental Platforms
    'kijiji', 'viewit', 'padmapper', 'rentals.ca', 'zumper', 'toronto housing', 'housing group',
    'facebook marketplace', 'bunz home zone', 'places4students',
    -- Utilities & Bills
    'hydro', 'electricity', 'water', 'gas', 'heat', 'heating', 'utilities', 'internet', 'wifi',
    'rogers', 'bell', 'fido', 'freedom mobile', 'virgin mobile', 'koodo', 'telus',
    'teksavvy', 'start.ca', 'beanfield', 'carrytel', 'vmedia',
    -- Fees
    'first and last', 'damage deposit', 'security deposit', 'key deposit', 'parking spot',
    'storage locker', 'condo fee', 'maintenance fee'
  ],
  ARRAY[
    -- Rent
    '租金', '房租', '公寓', '共管公寓', '房间', '室友', '转租', '分租',
    '租约', '租赁', '房东', '物业管理',
    -- Student Housing
    '学生宿舍', '宿舍', '学生公寓', '学生住房',
    'Chestnut', 'New College', 'Innis', 'Trinity', 'Victoria', 'St Michael\'s', 'University College',
    '研究生宿舍', '家庭住房', '已婚住房',
    -- Areas
    'Annex', '附件区', 'Harbord Village', '唐人街', 'Chinatown', 'Kensington', 'Little Italy', '小意大利',
    'Koreatown', '韩国城', 'Christie Pits', 'Bloor West', 'High Park', 'Junction', 'Parkdale',
    '多伦多市中心', 'City Place', 'Liberty Village', 'King West', '娱乐区',
    'Scarborough', '士嘉堡', 'North York', '北约克', 'Etobicoke', 'East York', 'York', 'Mississauga', '密西沙加', 'Brampton', '布兰普顿',
    -- Platforms
    'Kijiji', 'ViewIt', 'PadMapper', 'Rentals.ca', 'Zumper', '多伦多住房', '住房群',
    'Facebook Marketplace', 'Bunz Home Zone', 'Places4Students',
    -- Utilities
    '水电', '电费', '水费', '煤气费', '暖气', '暖气费', '公用事业', '互联网', 'WiFi',
    'Rogers', 'Bell', 'Fido', 'Freedom Mobile', 'Virgin Mobile', 'Koodo', 'Telus',
    'TekSavvy', 'Start.ca', 'Beanfield', 'Carrytel', 'VMedia',
    -- Fees
    '首月和末月', '损坏押金', '保证金', '钥匙押金', '停车位',
    '储物柜', '公寓费', '维护费'
  ],
  '🏡',
  '#E74C3C',
  true
) ON CONFLICT (user_id, name) DO UPDATE SET
  keywords_en = EXCLUDED.keywords_en,
  keywords_zh = EXCLUDED.keywords_zh;

-- ============================================================================
-- 6. ENTERTAINMENT & STUDENT LIFE
-- ============================================================================

INSERT INTO categories (user_id, name, keywords_en, keywords_zh, icon, color, is_system)
VALUES (
  'a1e08c94-165e-43e7-852e-0954406df694',
  'Entertainment & Activities',
  ARRAY[
    -- Movies & Cinema
    'cineplex', 'scotiabank theatre', 'yonge & dundas', 'varsity', 'cinesphere', 'tiff bell lightbox',
    'landmark cinemas', 'imagine cinemas', 'movie ticket', 'cinema',
    -- Bars & Clubs (Student Spots!)
    'madison', 'the madison', 'sneaky dee', 'el furniture warehouse', 'the pint', 'the duke', 'duke of york',
    'rebel', 'toybox', 'cake', 'uniun', 'nest', 'coda', 'cube', 'fiction', 'orchid',
    'regulars', 'dance cave', 'crews & tangos', 'glad day', 'woody', 'the fox',
    -- Student Bars
    'campus bar', 'hart house', 'grad house bar', 'hart house pub',
    -- Events & Festivals
    'nxne', 'pride', 'pride week', 'caribana', 'taste of', 'luminato', 'tiff', 'toronto film festival',
    'frosh week', 'orientation', 'homecoming', 'o-week',
    -- Sports & Fitness
    'goodlife', 'la fitness', 'planet fitness', 'fit4less', 'movati', 'anytime fitness', 'world gym',
    'hart house gym', 'athletic centre', 'ac', 'goldring', 'varsity centre',
    'rock climbing', 'bouldering', 'joe rockhead', 'hub climbing', 'true north',
    'yoga', 'spin class', 'yoga tree', 'moksha', 'yyoga',
    -- Music & Concerts
    'danforth music hall', 'horseshoe tavern', 'phoenix concert theatre', 'opera house', 'mod club',
    'scotiabank arena', 'budweiser stage', 'history', 'velvet underground', 'cameron house',
    'ticketmaster', 'stubhub', 'see tickets', 'eventbrite',
    -- Gaming & Esports
    'snakes & lattes', 'storm crow manor', 'rec room', 'playdium', 'round one',
    'netboom', 'esports lounge', 'lan cafe', 'pc bang',
    -- Museums & Attractions
    'rom', 'royal ontario museum', 'ago', 'art gallery ontario', 'science centre',
    'cn tower', 'toronto zoo', 'aquarium', 'ripley aquarium', 'casa loma', 'distillery district',
    -- Streaming Subscriptions
    'netflix', 'spotify', 'apple music', 'youtube premium', 'disney+', 'amazon prime',
    'hbo', 'crave', 'paramount+', 'peacock'
  ],
  ARRAY[
    -- Movies
    'Cineplex', 'Scotiabank Theatre', 'Yonge & Dundas', 'Varsity', 'Cinesphere', 'TIFF Bell Lightbox',
    'Landmark Cinemas', 'Imagine Cinemas', '电影票', '电影院',
    -- Bars & Clubs
    'The Madison', 'Sneaky Dee\'s', 'El Furniture Warehouse', 'The Pint', 'The Duke', 'Duke of York',
    'Rebel', 'Toybox', 'Cake', 'Uniun', 'Nest', 'Coda', 'Cube', 'Fiction', 'Orchid',
    'Regulars', 'Dance Cave', 'Crews & Tangos', 'Glad Day', 'Woody\'s', 'The Fox',
    -- Student
    '校园酒吧', 'Hart House', 'Grad House Bar', 'Hart House Pub',
    -- Events
    'NXNE', 'Pride', '骄傲周', 'Caribana', 'Taste of', 'Luminato', 'TIFF', '多伦多电影节',
    'Frosh Week', '新生周', 'Orientation', '迎新', 'Homecoming', 'O-Week',
    -- Fitness
    'GoodLife', 'LA Fitness', 'Planet Fitness', 'Fit4Less', 'Movati', 'Anytime Fitness', 'World Gym',
    'Hart House Gym', 'Athletic Centre', 'AC', 'Goldring', 'Varsity Centre',
    '攀岩', '抱石', 'Joe Rockhead\'s', 'Hub Climbing', 'True North',
    '瑜伽', '动感单车', 'Yoga Tree', 'Moksha', 'YYoga',
    -- Music
    'Danforth Music Hall', 'Horseshoe Tavern', 'Phoenix Concert Theatre', 'Opera House', 'Mod Club',
    'Scotiabank Arena', 'Budweiser Stage', 'History', 'Velvet Underground', 'Cameron House',
    'Ticketmaster', 'StubHub', 'See Tickets', 'Eventbrite',
    -- Gaming
    'Snakes & Lattes', 'Storm Crow Manor', 'Rec Room', 'Playdium', 'Round One',
    'Netboom', '电竞休息室', 'LAN咖啡厅', 'PC房',
    -- Attractions
    'ROM', '皇家安大略博物馆', 'AGO', '安大略美术馆', '科学中心',
    'CN Tower', 'CN塔', '多伦多动物园', '水族馆', 'Ripley\'s Aquarium', 'Casa Loma', '酿酒厂区',
    -- Streaming
    'Netflix', 'Spotify', 'Apple Music', 'YouTube Premium', 'Disney+', 'Amazon Prime',
    'HBO', 'Crave', 'Paramount+', 'Peacock'
  ],
  '🎬',
  '#9B59B6',
  false
) ON CONFLICT (user_id, name) DO UPDATE SET
  keywords_en = EXCLUDED.keywords_en,
  keywords_zh = EXCLUDED.keywords_zh;

-- ============================================================================
-- 7. HEALTH & WELLNESS
-- ============================================================================

INSERT INTO categories (user_id, name, keywords_en, keywords_zh, icon, color, is_system)
VALUES (
  'a1e08c94-165e-43e7-852e-0954406df694',
  'Healthcare & Pharmacy',
  ARRAY[
    -- Walk-in Clinics
    'walk in', 'walk-in clinic', 'medical clinic', 'doctor', 'physician', 'gp',
    'medicentre', 'rexall medicentre', 'maple leaf medical', 'appletree', 'medi collective',
    -- University Health Services
    'uoft health', 'health & wellness', 'health and wellness centre', 'student health',
    'hart house health', 'koffler', 'koffler student services', 'wellness centre',
    'york health services', 'ryerson medical centre',
    -- Pharmacies
    'shoppers', 'shoppers drug mart', 'rexall', 'pharmasave', 'guardian pharmacy',
    'costco pharmacy', 'walmart pharmacy', 'loblaws pharmacy', 'metro pharmacy',
    -- Prescriptions
    'prescription', 'medication', 'medicine', 'drug', 'pills', 'refill',
    -- Mental Health (Important!)
    'counselling', 'counseling', 'therapy', 'therapist', 'psychologist', 'psychiatrist',
    'mental health', 'crisis line', 'distress centre', 'good2talk', 'my ssp',
    'mindbeacon', 'inkblot therapy', 'betterhelp', 'talkspace',
    -- Dental (Often need to pay out of pocket!)
    'dentist', 'dental', 'teeth cleaning', 'dental checkup', 'cavity', 'filling',
    'tooth', 'wisdom teeth', 'orthodontist', 'braces',
    -- Vision
    'optometrist', 'eye exam', 'glasses', 'contact lenses', 'contacts',
    'clearly', 'clearly contacts', 'warby parker', 'lenscrafter', 'lenscrafters',
    -- COVID Testing
    'covid', 'covid test', 'pcr', 'rapid test', 'antigen test', 'vaccine', 'vaccination'
  ],
  ARRAY[
    -- Clinics
    '诊所', '步入式诊所', '医疗诊所', '医生', '医师', '全科医生',
    'Medicentre', 'Rexall Medicentre', 'Maple Leaf Medical', 'Appletree', 'Medi Collective',
    -- University
    '多大健康', '健康与保健', '健康与保健中心', '学生健康',
    'Hart House Health', 'Koffler', 'Koffler Student Services', '保健中心',
    'York Health Services', 'Ryerson Medical Centre',
    -- Pharmacies
    'Shoppers', 'Shoppers Drug Mart', 'Rexall', 'Pharmasave', 'Guardian Pharmacy',
    'Costco Pharmacy', 'Walmart Pharmacy', 'Loblaws Pharmacy', 'Metro Pharmacy',
    -- Prescriptions
    '处方', '药物', '药', '药品', '药丸', '续方',
    -- Mental Health
    '咨询', '治疗', '治疗师', '心理学家', '精神科医生',
    '心理健康', '危机热线', '危机中心', 'Good2Talk', 'My SSP',
    'MindBeacon', 'Inkblot Therapy', 'BetterHelp', 'Talkspace',
    -- Dental
    '牙医', '牙科', '洗牙', '牙科检查', '蛀牙', '补牙',
    '牙齿', '智齿', '正畸医生', '牙套',
    -- Vision
    '验光师', '眼科检查', '眼镜', '隐形眼镜', '美瞳',
    'Clearly', 'Clearly Contacts', 'Warby Parker', 'LensCrafters',
    -- COVID
    '新冠', 'COVID测试', 'PCR', '快速测试', '抗原测试', '疫苗', '接种疫苗'
  ],
  '⚕️',
  '#1ABC9C',
  true
) ON CONFLICT (user_id, name) DO UPDATE SET
  keywords_en = EXCLUDED.keywords_en,
  keywords_zh = EXCLUDED.keywords_zh;

-- ============================================================================
-- VERIFICATION & CLEANUP
-- ============================================================================

-- Update existing transactions with new categorization
UPDATE transactions 
SET category_id = (
  SELECT c.id 
  FROM categories c 
  WHERE c.user_id = 'a1e08c94-165e-43e7-852e-0954406df694'
  AND (
    EXISTS (
      SELECT 1 
      FROM unnest(c.keywords_en) AS keyword 
      WHERE LOWER(transactions.raw_text) LIKE '%' || LOWER(keyword) || '%'
    )
    OR
    EXISTS (
      SELECT 1 
      FROM unnest(c.keywords_zh) AS keyword 
      WHERE transactions.raw_text LIKE '%' || keyword || '%'
    )
  )
  ORDER BY 
    CASE 
      WHEN LOWER(transactions.raw_text) = ANY(SELECT LOWER(unnest(c.keywords_en))) THEN 1
      WHEN transactions.raw_text = ANY(SELECT unnest(c.keywords_zh)) THEN 1
      ELSE 2
    END,
    (
      SELECT COUNT(*) 
      FROM unnest(c.keywords_en) AS keyword 
      WHERE LOWER(transactions.raw_text) LIKE '%' || LOWER(keyword) || '%'
    ) + (
      SELECT COUNT(*) 
      FROM unnest(c.keywords_zh) AS keyword 
      WHERE transactions.raw_text LIKE '%' || keyword || '%'
    ) DESC
  LIMIT 1
)
WHERE user_id = 'a1e08c94-165e-43e7-852e-0954406df694';

-- Verification Query
SELECT 
  name, 
  icon,
  array_length(keywords_en, 1) as en_keywords,
  array_length(keywords_zh, 1) as zh_keywords,
  color,
  is_system
FROM categories 
WHERE user_id = 'a1e08c94-165e-43e7-852e-0954406df694'
ORDER BY 
  CASE 
    WHEN name LIKE '%TTC%' OR name LIKE '%Transit%' THEN 1
    WHEN name LIKE '%Groc%' OR name LIKE '%Restaurant%' THEN 2
    WHEN name LIKE '%Education%' OR name LIKE '%Immigration%' THEN 3
    WHEN name LIKE '%Housing%' THEN 4
    ELSE 5
  END,
  name;

-- Test Queries for Toronto Student Transactions
SELECT 'Testing Toronto-specific categorization:' as test;

-- Test 1: T&T Supermarket
SELECT 't&t beef' as transaction, 
  (SELECT name FROM categories WHERE 't&t' = ANY(keywords_en) OR 'T&T' = ANY(keywords_zh) LIMIT 1) as category;

-- Test 2: Anju Restaurant
SELECT 'anju 韩餐' as transaction,
  (SELECT name FROM categories WHERE 'anju' = ANY(keywords_en) OR '韩餐' = ANY(keywords_zh) LIMIT 1) as category;

-- Test 3: TTC Presto
SELECT 'presto card reload' as transaction,
  (SELECT name FROM categories WHERE 'presto' = ANY(keywords_en) LIMIT 1) as category;

-- Test 4: UofT Tuition
SELECT 'university of toronto tuition' as transaction,
  (SELECT name FROM categories WHERE 'tuition' = ANY(keywords_en) LIMIT 1) as category;

-- Success message
SELECT '🎉 Toronto International Student Categories Installed Successfully! 🎓' as message;
SELECT 'Optimized for: UofT, York, Ryerson students' as details;
SELECT 'Coverage: Asian markets, student restaurants, TTC, immigration, housing, and more!' as coverage;

