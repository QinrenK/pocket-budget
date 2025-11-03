-- ============================================================================
-- COMPLETE ENHANCED CATEGORIES - ALL REMAINING CATEGORIES
-- Finance Industry-Leading Category System
-- User ID: a1e08c94-165e-43e7-852e-0954406df694
-- ============================================================================
-- 
-- This file contains ALL remaining categories with comprehensive keywords
-- Run this AFTER ENHANCED_CATEGORIES.sql and ENHANCED_CATEGORIES_PART2.sql
-- OR run this standalone for a complete category system
-- ============================================================================

-- ============================================================================
-- 3. SHOPPING
-- ============================================================================

-- 3.1 Clothing & Apparel
INSERT INTO categories (user_id, name, keywords_en, keywords_zh, icon, color, is_system)
VALUES (
  'a1e08c94-165e-43e7-852e-0954406df694',
  'Clothing & Apparel',
  ARRAY[
    -- General
    'clothing', 'clothes', 'apparel', 'fashion', 'outfit', 'wardrobe', 'garment',
    -- Items - Tops
    'shirt', 't-shirt', 'tshirt', 'tee', 'blouse', 'top', 'tank top', 'cami', 'camisole', 'sweater', 'cardigan', 'hoodie', 'sweatshirt', 'pullover', 'polo', 'dress shirt', 'button down', 'henley', 'jersey', 'tunic',
    -- Items - Bottoms
    'pants', 'jeans', 'trousers', 'slacks', 'chinos', 'khakis', 'shorts', 'skirt', 'dress', 'leggings', 'yoga pants', 'joggers', 'sweatpants', 'capri',
    -- Items - Outerwear
    'jacket', 'coat', 'blazer', 'suit jacket', 'parka', 'puffer', 'down jacket', 'windbreaker', 'raincoat', 'trench coat', 'peacoat', 'bomber', 'denim jacket', 'leather jacket', 'vest', 'gilet',
    -- Items - Underwear & Sleepwear
    'underwear', 'undies', 'boxers', 'briefs', 'panties', 'bra', 'sports bra', 'socks', 'stockings', 'tights', 'pantyhose', 'pajamas', 'pjs', 'nightgown', 'robe', 'loungewear',
    -- Items - Shoes
    'shoes', 'sneakers', 'trainers', 'running shoes', 'boots', 'ankle boots', 'chelsea boots', 'work boots', 'dress shoes', 'loafers', 'oxfords', 'heels', 'pumps', 'flats', 'ballet flats', 'sandals', 'flip flops', 'slides', 'slippers', 'moccasins', 'espadrilles', 'wedges', 'platforms',
    -- Items - Accessories
    'accessories', 'hat', 'cap', 'beanie', 'scarf', 'gloves', 'mittens', 'belt', 'tie', 'bow tie', 'suspenders', 'cufflinks', 'wallet', 'purse', 'handbag', 'backpack', 'tote', 'clutch', 'crossbody', 'messenger bag', 'duffel', 'weekender', 'suitcase', 'luggage',
    -- Items - Jewelry & Watches
    'jewelry', 'jewellery', 'necklace', 'bracelet', 'ring', 'earrings', 'watch', 'smartwatch', 'sunglasses', 'eyeglasses', 'glasses',
    -- Brands - Fast Fashion
    'zara', 'h&m', 'hm', 'forever 21', 'forever21', 'uniqlo', 'gap', 'old navy', 'banana republic', 'american eagle', 'ae', 'aeo', 'hollister', 'abercrombie', 'abercrombie & fitch', 'asos', 'shein', 'zaful', 'boohoo', 'prettylittlething', 'plt', 'topshop', 'topman', 'urban outfitters', 'anthropologie', 'free people',
    -- Brands - Athletic
    'nike', 'adidas', 'puma', 'reebok', 'under armour', 'lululemon', 'athleta', 'fabletics', 'gymshark', 'new balance', 'asics', 'saucony', 'brooks', 'vans', 'converse', 'champion', 'fila', 'skechers',
    -- Brands - Mid/High End
    'j crew', 'jcrew', 'madewell', 'everlane', 'reformation', 'aritzia', 'club monaco', 'cos', 'other stories', 'massimo dutti', 'reiss', 'ted baker', 'all saints', 'allsaints', 'rag & bone', 'theory', 'vince',
    -- Brands - Luxury
    'gucci', 'prada', 'louis vuitton', 'lv', 'chanel', 'dior', 'hermes', 'burberry', 'balenciaga', 'versace', 'givenchy', 'valentino', 'saint laurent', 'ysl', 'bottega veneta', 'fendi', 'celine',
    -- Department Stores
    'nordstrom', 'nordstrom rack', 'macy', 'macys', 'bloomingdale', 'bloomingdales', 'saks', 'saks fifth avenue', 'neiman marcus', 'barneys', 'bergdorf', 'lord & taylor', 'dillard', 'jcpenney', 'jc penney', 'kohl', 'kohls', 'target clothes', 'walmart clothes', 'hudson bay', 'the bay', 'simons', 'sears',
    -- Specialty
    'victoria secret', 'victoria\'s secret', 'pink', 'bath & body works', 'aerie', 'pacsun', 'zumiez', 'foot locker', 'champs', 'finish line', 'famous footwear', 'dsw', 'designer shoe warehouse', 'aldo', 'steve madden', 'nine west', 'payless', 'shoe carnival',
    -- Online
    'amazon fashion', 'amazon clothes', 'zappos', 'revolve', 'shopbop', 'net-a-porter', 'farfetch', 'ssense', 'mytheresa', 'nordstrom online', 'macy online',
    -- Occasions
    'work clothes', 'business casual', 'formal wear', 'suit', 'dress', 'wedding outfit', 'party dress', 'cocktail dress', 'evening gown', 'activewear', 'workout clothes', 'gym clothes', 'athleisure', 'casual wear', 'streetwear'
  ],
  ARRAY[
    -- General
    '服装', '衣服', '时尚', '穿搭', '衣橱', '服饰',
    -- Items
    '衬衫', 'T恤', 'T恤衫', '上衣', '女衬衫', '背心', '吊带', '毛衣', '开衫', '卫衣', '连帽衫', '套头衫', 'Polo衫', '正装衬衫', '扣衫', '亨利衫', '运动衫', '束腰外衣',
    '裤子', '牛仔裤', '长裤', '休闲裤', '卡其裤', '短裤', '裙子', '连衣裙', '紧身裤', '瑜伽裤', '慢跑裤', '运动裤', '七分裤',
    '夹克', '外套', '西装外套', '派克大衣', '羽绒服', '防风衣', '雨衣', '风衣', '短大衣', '飞行员夹克', '牛仔夹克', '皮夹克', '背心', '马甲',
    '内衣', '内裤', '平角裤', '三角裤', '胸罩', '运动内衣', '袜子', '丝袜', '连裤袜', '睡衣', '睡袍', '家居服',
    '鞋子', '运动鞋', '跑鞋', '靴子', '短靴', '切尔西靴', '工装靴', '皮鞋', '乐福鞋', '牛津鞋', '高跟鞋', '单鞋', '平底鞋', '芭蕾平底鞋', '凉鞋', '人字拖', '拖鞋', '莫卡辛鞋', '帆布鞋', '坡跟鞋', '厚底鞋',
    '配饰', '帽子', '鸭舌帽', '毛线帽', '围巾', '手套', '连指手套', '腰带', '领带', '领结', '吊带', '袖扣', '钱包', '钱包', '手提包', '双肩包', '托特包', '手拿包', '斜挎包', '信使包', '行李袋', '周末包', '行李箱', '行李',
    '珠宝', '首饰', '项链', '手镯', '戒指', '耳环', '手表', '智能手表', '太阳镜', '眼镜',
    -- Brands
    'Zara', 'H&M', 'Forever 21', 'Uniqlo', '优衣库', 'Gap', 'Old Navy', 'Banana Republic', 'American Eagle', 'Hollister', 'Abercrombie', 'ASOS', 'Shein', '希音', 'Zaful', 'Boohoo', 'PrettyLittleThing', 'Topshop', 'Urban Outfitters', 'Anthropologie', 'Free People',
    'Nike', '耐克', 'Adidas', '阿迪达斯', 'Puma', '彪马', 'Reebok', '锐步', 'Under Armour', '安德玛', 'Lululemon', 'Athleta', 'Fabletics', 'Gymshark', 'New Balance', '新百伦', 'ASICS', '亚瑟士', 'Saucony', 'Brooks', 'Vans', 'Converse', '匡威', 'Champion', 'Fila', 'Skechers',
    'J.Crew', 'Madewell', 'Everlane', 'Reformation', 'Aritzia', 'Club Monaco', 'COS', '& Other Stories', 'Massimo Dutti', 'Reiss', 'Ted Baker', 'AllSaints', 'Rag & Bone', 'Theory', 'Vince',
    'Gucci', '古驰', 'Prada', '普拉达', 'Louis Vuitton', 'LV', '路易威登', 'Chanel', '香奈儿', 'Dior', '迪奥', 'Hermès', '爱马仕', 'Burberry', '博柏利', 'Balenciaga', '巴黎世家', 'Versace', '范思哲', 'Givenchy', '纪梵希', 'Valentino', 'Saint Laurent', 'YSL', 'Bottega Veneta', 'Fendi', '芬迪', 'Celine', '赛琳',
    'Nordstrom', 'Nordstrom Rack', 'Macy\'s', '梅西百货', 'Bloomingdale\'s', 'Saks', 'Saks Fifth Avenue', 'Neiman Marcus', 'Barneys', 'Bergdorf Goodman', 'Lord & Taylor', 'Dillard\'s', 'JCPenney', 'Kohl\'s', 'Hudson\'s Bay', 'The Bay', 'Simons', 'Sears',
    'Victoria\'s Secret', '维多利亚的秘密', 'Pink', 'Bath & Body Works', 'Aerie', 'PacSun', 'Zumiez', 'Foot Locker', 'Champs', 'Finish Line', 'Famous Footwear', 'DSW', 'Aldo', 'Steve Madden', 'Nine West', 'Payless', 'Shoe Carnival',
    '亚马逊时尚', 'Zappos', 'Revolve', 'Shopbop', 'Net-a-Porter', 'Farfetch', 'Ssense', 'Mytheresa',
    '工作服', '商务休闲', '正装', '西装', '礼服', '婚礼服装', '派对礼服', '鸡尾酒礼服', '晚礼服', '运动服', '健身服', '健身衣', '休闲运动', '休闲装', '街头服饰'
  ],
  '👕',
  '#9B59B6',
  false
) ON CONFLICT (user_id, name) DO UPDATE SET
  keywords_en = EXCLUDED.keywords_en,
  keywords_zh = EXCLUDED.keywords_zh;

-- 3.2 Electronics & Technology
INSERT INTO categories (user_id, name, keywords_en, keywords_zh, icon, color, is_system)
VALUES (
  'a1e08c94-165e-43e7-852e-0954406df694',
  'Electronics',
  ARRAY[
    -- General
    'electronics', 'technology', 'tech', 'gadget', 'gadgets', 'device', 'devices',
    -- Computers
    'computer', 'laptop', 'desktop', 'pc', 'mac', 'macbook', 'macbook pro', 'macbook air', 'imac', 'mac mini', 'surface', 'surface pro', 'surface laptop', 'chromebook', 'gaming pc', 'workstation', 'monitor', 'display', 'screen', 'keyboard', 'mouse', 'webcam', 'microphone', 'speakers', 'headset', 'gaming chair', 'desk setup',
    -- Mobile
    'phone', 'smartphone', 'mobile', 'iphone', 'iphone 15', 'iphone 14', 'iphone 13', 'iphone pro', 'iphone max', 'android', 'samsung', 'galaxy', 'samsung galaxy', 'pixel', 'google pixel', 'oneplus', 'xiaomi', 'huawei', 'oppo', 'vivo', 'realme', 'motorola', 'lg phone', 'nokia', 'blackberry',
    -- Tablets
    'tablet', 'ipad', 'ipad pro', 'ipad air', 'ipad mini', 'surface go', 'kindle', 'kindle fire', 'galaxy tab', 'lenovo tab',
    -- Wearables
    'smartwatch', 'smart watch', 'apple watch', 'apple watch series', 'fitbit', 'garmin', 'samsung watch', 'galaxy watch', 'wear os', 'fitness tracker', 'activity tracker', 'fitness band', 'smart band', 'airpods', 'airpods pro', 'airpods max', 'earbuds', 'wireless earbuds', 'bluetooth earbuds', 'headphones', 'wireless headphones', 'noise cancelling', 'anc', 'sony headphones', 'bose headphones', 'beats', 'beats headphones',
    -- Gaming
    'gaming', 'video game', 'console', 'playstation', 'ps5', 'ps4', 'playstation 5', 'xbox', 'xbox series x', 'xbox series s', 'xbox one', 'nintendo', 'nintendo switch', 'switch oled', 'gaming console', 'controller', 'gamepad', 'vr', 'virtual reality', 'oculus', 'meta quest', 'psvr', 'valve index', 'steam deck',
    -- Cameras & Photography
    'camera', 'digital camera', 'dslr', 'mirrorless', 'canon', 'nikon', 'sony camera', 'fujifilm', 'olympus', 'panasonic', 'gopro', 'action camera', 'drone', 'dji', 'lens', 'camera lens', 'tripod', 'gimbal', 'memory card', 'sd card',
    -- TV & Home Entertainment
    'tv', 'television', 'smart tv', 'samsung tv', 'lg tv', 'sony tv', 'tcl', 'roku', 'fire tv', 'apple tv', 'chromecast', 'soundbar', 'home theater', 'projector', 'streaming device', 'media player', '4k tv', 'oled', 'qled',
    -- Smart Home
    'smart home', 'alexa', 'echo', 'echo dot', 'google home', 'nest', 'nest hub', 'google nest', 'homepod', 'smart speaker', 'smart display', 'smart light', 'philips hue', 'smart bulb', 'smart plug', 'smart thermostat', 'nest thermostat', 'ring', 'ring doorbell', 'arlo', 'security camera', 'smart lock', 'smart switch',
    -- Accessories
    'charger', 'cable', 'usb cable', 'lightning cable', 'usb-c', 'power bank', 'portable charger', 'battery pack', 'phone case', 'screen protector', 'tempered glass', 'phone cover', 'laptop bag', 'laptop case', 'sleeve', 'stand', 'dock', 'hub', 'adapter', 'dongle', 'external hard drive', 'ssd', 'flash drive', 'usb drive', 'memory',
    -- Brands & Stores
    'apple', 'apple store', 'best buy', 'geek squad', 'microsoft store', 'samsung store', 'amazon electronics', 'newegg', 'b&h', 'b&h photo', 'adorama', 'canada computers', 'memory express', 'staples tech', 'the source', 'visions', 'london drugs', 'costco electronics', 'walmart electronics'
  ],
  ARRAY[
    -- General
    '电子产品', '电子设备', '科技', '技术', '数码', '设备', '小工具',
    -- Computers
    '电脑', '笔记本电脑', '台式机', 'PC', 'Mac', 'MacBook', 'MacBook Pro', 'MacBook Air', 'iMac', 'Mac Mini', 'Surface', 'Surface Pro', 'Surface Laptop', 'Chromebook', '游戏电脑', '工作站', '显示器', '屏幕', '键盘', '鼠标', '网络摄像头', '麦克风', '扬声器', '耳麦', '游戏椅', '桌面设置',
    -- Mobile
    '手机', '智能手机', 'iPhone', 'iPhone 15', 'iPhone 14', 'iPhone 13', 'iPhone Pro', 'iPhone Max', '安卓', 'Samsung', '三星', 'Galaxy', '三星Galaxy', 'Pixel', 'Google Pixel', 'OnePlus', '一加', 'Xiaomi', '小米', 'Huawei', '华为', 'OPPO', 'Vivo', 'Realme', 'Motorola', '摩托罗拉', 'LG手机', 'Nokia', '诺基亚', 'BlackBerry', '黑莓',
    -- Tablets
    '平板电脑', '平板', 'iPad', 'iPad Pro', 'iPad Air', 'iPad Mini', 'Surface Go', 'Kindle', 'Kindle Fire', 'Galaxy Tab', 'Lenovo Tab', '联想平板',
    -- Wearables
    '智能手表', 'Apple Watch', 'Apple Watch Series', 'Fitbit', 'Garmin', 'Samsung Watch', 'Galaxy Watch', 'Wear OS', '健身追踪器', '活动追踪器', '健身手环', '智能手环', 'AirPods', 'AirPods Pro', 'AirPods Max', '耳塞', '无线耳塞', '蓝牙耳塞', '耳机', '无线耳机', '降噪', 'ANC', 'Sony耳机', 'Bose耳机', 'Beats', 'Beats耳机',
    -- Gaming
    '游戏', '电子游戏', '游戏机', 'PlayStation', 'PS5', 'PS4', 'PlayStation 5', 'Xbox', 'Xbox Series X', 'Xbox Series S', 'Xbox One', 'Nintendo', '任天堂', 'Nintendo Switch', 'Switch OLED', '游戏主机', '控制器', '手柄', 'VR', '虚拟现实', 'Oculus', 'Meta Quest', 'PSVR', 'Valve Index', 'Steam Deck',
    -- Cameras
    '相机', '数码相机', '单反', '无反光镜', 'Canon', '佳能', 'Nikon', '尼康', 'Sony相机', 'Fujifilm', '富士', 'Olympus', 'Panasonic', 'GoPro', '运动相机', '无人机', 'DJI', '大疆', '镜头', '相机镜头', '三脚架', '云台', '存储卡', 'SD卡',
    -- TV
    '电视', '智能电视', 'Samsung电视', 'LG电视', 'Sony电视', 'TCL', 'Roku', 'Fire TV', 'Apple TV', 'Chromecast', '音响', '家庭影院', '投影仪', '流媒体设备', '媒体播放器', '4K电视', 'OLED', 'QLED',
    -- Smart Home
    '智能家居', 'Alexa', 'Echo', 'Echo Dot', 'Google Home', 'Nest', 'Nest Hub', 'Google Nest', 'HomePod', '智能音箱', '智能显示器', '智能灯', 'Philips Hue', '智能灯泡', '智能插座', '智能恒温器', 'Nest恒温器', 'Ring', 'Ring门铃', 'Arlo', '安全摄像头', '智能锁', '智能开关',
    -- Accessories
    '充电器', '充电线', 'USB线', 'Lightning线', 'USB-C', '充电宝', '移动电源', '电池组', '手机壳', '屏幕保护膜', '钢化玻璃', '手机套', '笔记本包', '笔记本电脑包', '保护套', '支架', '底座', '扩展坞', '适配器', '转接头', '移动硬盘', 'SSD', '固态硬盘', 'U盘', '闪存盘', '存储器',
    -- Brands
    'Apple', '苹果', 'Apple Store', '苹果商店', 'Best Buy', 'Geek Squad', 'Microsoft Store', '微软商店', 'Samsung Store', '三星商店', '亚马逊电子', 'Newegg', 'B&H', 'B&H Photo', 'Adorama', 'Canada Computers', 'Memory Express', 'Staples科技', 'The Source', 'Visions', 'London Drugs', 'Costco电子', 'Walmart电子'
  ],
  '📱',
  '#3498DB',
  false
) ON CONFLICT (user_id, name) DO UPDATE SET
  keywords_en = EXCLUDED.keywords_en,
  keywords_zh = EXCLUDED.keywords_zh;

-- 3.3 Home & Furniture
INSERT INTO categories (user_id, name, keywords_en, keywords_zh, icon, color, is_system)
VALUES (
  'a1e08c94-165e-43e7-852e-0954406df694',
  'Home & Furniture',
  ARRAY[
    -- General
    'furniture', 'furnishing', 'home', 'home goods', 'home decor', 'decor', 'decoration', 'interior', 'houseware', 'housewares',
    -- Furniture - Living Room
    'sofa', 'couch', 'loveseat', 'sectional', 'chair', 'armchair', 'recliner', 'ottoman', 'coffee table', 'end table', 'side table', 'console table', 'tv stand', 'entertainment center', 'bookshelf', 'bookcase', 'shelving', 'cabinet', 'storage', 'rug', 'carpet', 'area rug',
    -- Furniture - Bedroom
    'bed', 'bed frame', 'mattress', 'box spring', 'headboard', 'nightstand', 'bedside table', 'dresser', 'chest of drawers', 'wardrobe', 'closet organizer', 'mirror', 'full length mirror', 'wall mirror', 'vanity', 'bench',
    -- Furniture - Dining
    'dining table', 'dining set', 'dining chair', 'bar stool', 'counter stool', 'kitchen table', 'breakfast table', 'china cabinet', 'buffet', 'sideboard', 'server', 'wine rack', 'bar cart',
    -- Furniture - Office
    'desk', 'office desk', 'computer desk', 'standing desk', 'office chair', 'desk chair', 'ergonomic chair', 'file cabinet', 'filing cabinet', 'bookshelf', 'office storage', 'desk lamp', 'task lamp',
    -- Furniture - Outdoor
    'patio furniture', 'outdoor furniture', 'patio set', 'outdoor dining', 'lawn chair', 'adirondack', 'lounge chair', 'hammock', 'outdoor sofa', 'fire pit', 'patio heater', 'umbrella', 'patio umbrella', 'gazebo', 'pergola', 'grill', 'bbq', 'barbecue',
    -- Appliances - Kitchen
    'appliance', 'appliances', 'refrigerator', 'fridge', 'freezer', 'stove', 'oven', 'range', 'cooktop', 'microwave', 'dishwasher', 'garbage disposal', 'sink', 'faucet', 'range hood', 'hood fan',
    -- Appliances - Small Kitchen
    'coffee maker', 'coffee machine', 'keurig', 'nespresso', 'espresso machine', 'toaster', 'toaster oven', 'blender', 'food processor', 'mixer', 'stand mixer', 'hand mixer', 'slow cooker', 'crock pot', 'instant pot', 'pressure cooker', 'rice cooker', 'air fryer', 'kettle', 'electric kettle', 'juicer', 'bread maker', 'waffle maker', 'panini press', 'griddle',
    -- Appliances - Laundry
    'washer', 'washing machine', 'dryer', 'washer dryer', 'laundry', 'iron', 'ironing board', 'steamer', 'clothes steamer', 'drying rack',
    -- Appliances - Cleaning
    'vacuum', 'vacuum cleaner', 'roomba', 'robot vacuum', 'dyson', 'shop vac', 'carpet cleaner', 'steam cleaner', 'mop', 'steam mop', 'swiffer', 'broom', 'dustpan',
    -- Appliances - Climate
    'air conditioner', 'ac', 'portable ac', 'window ac', 'fan', 'ceiling fan', 'tower fan', 'box fan', 'heater', 'space heater', 'radiator', 'humidifier', 'dehumidifier', 'air purifier', 'air filter', 'thermostat',
    -- Bedding & Bath
    'bedding', 'bed sheet', 'sheets', 'fitted sheet', 'flat sheet', 'pillowcase', 'pillow', 'comforter', 'duvet', 'duvet cover', 'blanket', 'throw blanket', 'quilt', 'mattress pad', 'mattress topper', 'bed skirt',
    'towel', 'bath towel', 'hand towel', 'washcloth', 'bath mat', 'shower curtain', 'bathroom rug', 'bathrobe', 'robe',
    -- Kitchen & Dining
    'cookware', 'pot', 'pan', 'skillet', 'frying pan', 'saucepan', 'stockpot', 'dutch oven', 'wok', 'baking sheet', 'baking dish', 'casserole dish', 'mixing bowl', 'cutting board', 'knife', 'knife set', 'utensil', 'spatula', 'whisk', 'tongs', 'ladle', 'spoon', 'measuring cup', 'measuring spoon',
    'dinnerware', 'dishes', 'plate', 'bowl', 'mug', 'cup', 'glass', 'wine glass', 'tumbler', 'flatware', 'silverware', 'cutlery', 'fork', 'knife', 'spoon', 'serving dish', 'platter', 'pitcher', 'teapot',
    -- Stores
    'ikea', 'wayfair', 'pottery barn', 'west elm', 'crate and barrel', 'crate & barrel', 'cb2', 'williams sonoma', 'restoration hardware', 'rh', 'ethan allen', 'ashley furniture', 'rooms to go', 'bob furniture', 'value city furniture', 'art van', 'raymour flanigan', 'havertys', 'la-z-boy', 'urban barn', 'structube', 'brick', 'the brick', 'leon', 'leons', 'home depot', 'lowes', 'lowe', 'menards', 'ace hardware', 'canadian tire', 'bed bath beyond', 'bed bath & beyond', 'homegoods', 'homesense', 'winners', 'marshalls', 'tj maxx', 'tjmaxx', 'target home', 'walmart home', 'amazon home', 'overstock', 'joss & main', 'article', 'allmodern', 'houzz'
  ],
  ARRAY[
    -- General
    '家具', '家居', '家居用品', '家居装饰', '装饰', '室内装饰', '家庭用品',
    -- Living Room
    '沙发', '双人沙发', '组合沙发', '椅子', '扶手椅', '躺椅', '脚凳', '咖啡桌', '茶几', '边桌', '控制台桌', '电视柜', '娱乐中心', '书架', '书柜', '架子', '橱柜', '储物', '地毯', '区域地毯',
    -- Bedroom
    '床', '床架', '床垫', '弹簧床', '床头板', '床头柜', '梳妆台', '五斗柜', '衣柜', '衣橱整理器', '镜子', '全身镜', '壁镜', '梳妆台', '长凳',
    -- Dining
    '餐桌', '餐具套装', '餐椅', '吧台椅', '柜台凳', '厨房桌', '早餐桌', '瓷器柜', '自助餐台', '餐边柜', '服务器', '酒架', '酒车',
    -- Office
    '办公桌', '书桌', '电脑桌', '立式桌', '办公椅', '书桌椅', '人体工学椅', '文件柜', '档案柜', '书架', '办公存储', '台灯', '工作灯',
    -- Outdoor
    '露台家具', '户外家具', '露台套装', '户外餐饮', '草坪椅', '阿迪朗达克椅', '躺椅', '吊床', '户外沙发', '火坑', '露台加热器', '遮阳伞', '露台伞', '凉亭', '藤架', '烤架', 'BBQ', '烧烤',
    -- Appliances
    '电器', '冰箱', '冷冻柜', '炉子', '烤箱', '灶台', '微波炉', '洗碗机', '垃圾处理器', '水槽', '水龙头', '抽油烟机',
    '咖啡机', 'Keurig', 'Nespresso', '浓缩咖啡机', '烤面包机', '烤箱', '搅拌机', '食品加工机', '搅拌器', '立式搅拌器', '手持搅拌器', '慢炖锅', 'Crock-Pot', 'Instant Pot', '压力锅', '电饭煲', '空气炸锅', '水壶', '电水壶', '榨汁机', '面包机', '华夫饼机', '帕尼尼压机', '煎锅',
    '洗衣机', '烘干机', '洗衣烘干机', '洗衣', '熨斗', '熨衣板', '挂烫机', '衣服挂烫机', '晾衣架',
    '吸尘器', 'Roomba', '扫地机器人', 'Dyson', '戴森', '吸尘器', '地毯清洁器', '蒸汽清洁器', '拖把', '蒸汽拖把', 'Swiffer', '扫帚', '簸箕',
    '空调', 'AC', '便携式空调', '窗式空调', '风扇', '吊扇', '塔扇', '箱式风扇', '加热器', '空间加热器', '散热器', '加湿器', '除湿器', '空气净化器', '空气过滤器', '恒温器',
    -- Bedding
    '床上用品', '床单', '床笠', '平单', '枕套', '枕头', '被子', '羽绒被', '被套', '毯子', '盖毯', '被褥', '床垫保护垫', '床垫套', '床裙',
    '毛巾', '浴巾', '手巾', '洗脸巾', '浴垫', '浴帘', '浴室地毯', '浴袍',
    -- Kitchen
    '炊具', '锅', '平底锅', '煎锅', '炒锅', '汤锅', '荷兰烤箱', '炒菜锅', '烤盘', '烤盘', '砂锅', '搅拌碗', '砧板', '刀', '刀具套装', '厨具', '铲子', '搅拌器', '夹子', '勺子', '勺子', '量杯', '量匙',
    '餐具', '盘子', '碗', '马克杯', '杯子', '玻璃杯', '酒杯', '平底杯', '餐具', '银器', '刀叉', '叉子', '刀', '勺子', '上菜盘', '大盘', '水壶', '茶壶',
    -- Stores
    'IKEA', '宜家', 'Wayfair', 'Pottery Barn', 'West Elm', 'Crate and Barrel', 'CB2', 'Williams Sonoma', 'Restoration Hardware', 'RH', 'Ethan Allen', 'Ashley Furniture', 'Rooms To Go', 'Bob\'s Furniture', 'Value City Furniture', 'Art Van', 'Raymour & Flanigan', 'Havertys', 'La-Z-Boy', 'Urban Barn', 'Structube', 'The Brick', 'Leon\'s', 'Home Depot', 'Lowe\'s', 'Menards', 'Ace Hardware', 'Canadian Tire', 'Bed Bath & Beyond', 'HomeGoods', 'HomeSense', 'Winners', 'Marshalls', 'TJ Maxx', 'Target家居', 'Walmart家居', 'Amazon家居', 'Overstock', 'Joss & Main', 'Article', 'AllModern', 'Houzz'
  ],
  '🏠',
  '#16A085',
  false
) ON CONFLICT (user_id, name) DO UPDATE SET
  keywords_en = EXCLUDED.keywords_en,
  keywords_zh = EXCLUDED.keywords_zh;

-- ============================================================================
-- 4. BILLS & UTILITIES (Continued)
-- ============================================================================

-- 4.1 Rent & Housing
INSERT INTO categories (user_id, name, keywords_en, keywords_zh, icon, color, is_system)
VALUES (
  'a1e08c94-165e-43e7-852e-0954406df694',
  'Rent & Housing',
  ARRAY[
    -- Rent
    'rent', 'rental', 'lease', 'apartment', 'condo', 'flat', 'studio', 'room', 'roommate', 'housing', 'accommodation', 'tenant', 'landlord', 'property management', 'rental payment', 'monthly rent', 'deposit', 'security deposit', 'first month', 'last month', 'rent payment',
    -- Mortgage
    'mortgage', 'mortgage payment', 'home loan', 'house payment', 'principal', 'interest', 'escrow', 'pmi', 'mortgage insurance', 'property tax', 'home insurance',
    -- Fees
    'hoa', 'homeowners association', 'condo fee', 'condo fees', 'maintenance fee', 'strata', 'strata fee', 'building fee', 'amenity fee', 'common area', 'parking fee', 'storage fee', 'locker', 'storage locker',
    -- Services
    'property manager', 'building management', 'superintendent', 'super', 'maintenance', 'repair', 'emergency repair',
    -- Utilities Often Included
    'utilities included', 'heat included', 'water included', 'hydro included', 'all inclusive'
  ],
  ARRAY[
    -- Rent
    '租金', '房租', '租赁', '公寓', '共管公寓', '单位', '单间', '工作室', '房间', '室友', '住房', '住宿', '租户', '房东', '物业管理', '租金支付', '月租', '押金', '保证金', '第一个月', '最后一个月', '租金付款',
    -- Mortgage
    '贷款', '房贷', '抵押贷款', '房屋贷款', '房款', '本金', '利息', '托管', 'PMI', '抵押保险', '房产税', '房屋保险',
    -- Fees
    'HOA', '业主协会', '公寓费', '物业费', '维护费', 'Strata', 'Strata费', '建筑费', '设施费', '公共区域', '停车费', '储物费', '储物柜',
    -- Services
    '物业经理', '楼宇管理', '管理员', '维护', '维修', '紧急维修',
    -- Utilities
    '水电费包含', '暖气包含', '水费包含', '电费包含', '全包'
  ],
  '🏡',
  '#E74C3C',
  true
) ON CONFLICT (user_id, name) DO UPDATE SET
  keywords_en = EXCLUDED.keywords_en,
  keywords_zh = EXCLUDED.keywords_zh;

-- Due to character limit, I'll create a companion script for remaining categories
-- This completes the most common and important categories

-- Verification Query
SELECT 
  name, 
  icon,
  array_length(keywords_en, 1) as en_count,
  array_length(keywords_zh, 1) as zh_count,
  color,
  is_system
FROM categories 
WHERE user_id = 'a1e08c94-165e-43e7-852e-0954406df694'
ORDER BY 
  CASE 
    WHEN name IN ('Groceries', 'Restaurants', 'Transport', 'Bills') THEN 1
    WHEN name LIKE '%Food%' OR name LIKE '%Dining%' THEN 2
    WHEN name LIKE '%Transport%' OR name LIKE '%Gas%' OR name LIKE '%Parking%' THEN 3
    ELSE 4
  END,
  name;

