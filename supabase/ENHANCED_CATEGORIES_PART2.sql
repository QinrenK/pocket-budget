-- ============================================================================
-- ENHANCED CATEGORIES - PART 2
-- Remaining categories with extensive keywords
-- User ID: a1e08c94-165e-43e7-852e-0954406df694
-- ============================================================================

-- Run ENHANCED_CATEGORIES.sql FIRST, then run this file

-- 2.2 Ride Share & Taxis
INSERT INTO categories (user_id, name, keywords_en, keywords_zh, icon, color, is_system)
VALUES (
  'a1e08c94-165e-43e7-852e-0954406df694',
  'Ride Share',
  ARRAY[
    'uber', 'lyft', 'taxi', 'cab', 'ride share', 'rideshare', 'ride', 'via', 'juno', 'gett', 'curb', 'flywheel', 'grab', 'ola', 'didi', 'didi chuxing', 'bolt', 'free now', 'kapten', 'heetch', 'uber pool', 'lyft shared', 'uber x', 'uber xl', 'uber black', 'uber comfort', 'uber green', 'lyft lux', 'yellow cab', 'city taxi', 'airport taxi', 'private car', 'town car', 'limo', 'limousine', 'car service', 'driver', 'tip driver', 'surge'
  ],
  ARRAY[
    'Uber', '优步', 'Lyft', '来福车', '出租车', '的士', '打车', '叫车', '网约车', '顺风车', '拼车', 'Via', 'Juno', 'Gett', 'Curb', 'Flywheel', 'Grab', '格步', 'Ola', '滴滴', '滴滴出行', 'Bolt', 'Free Now', 'Kapten', 'Heetch', 'Uber Pool', 'Lyft共享', 'Uber X', 'Uber XL', 'Uber Black', 'Uber Comfort', 'Uber Green', 'Lyft Lux', '黄色出租车', '城市出租车', '机场出租车', '私家车', '豪华轿车', '专车', '司机', '小费', '高峰加价'
  ],
  '🚕',
  '#000000',
  false
) ON CONFLICT (user_id, name) DO UPDATE SET
  keywords_en = EXCLUDED.keywords_en,
  keywords_zh = EXCLUDED.keywords_zh;

-- 2.3 Gas & Fuel
INSERT INTO categories (user_id, name, keywords_en, keywords_zh, icon, color, is_system)
VALUES (
  'a1e08c94-165e-43e7-852e-0954406df694',
  'Gas & Fuel',
  ARRAY[
    'gas', 'gasoline', 'petrol', 'fuel', 'diesel', 'fill up', 'gas station', 'petro', 'shell', 'esso', 'petro-canada', 'petro canada', 'chevron', 'bp', 'british petroleum', 'exxon', 'mobil', 'exxonmobil', 'arco', 'ampm', '76', 'conoco', 'phillips 66', 'marathon', 'speedway', 'circle k', 'wawa', 'sheetz', 'pilot', 'flying j', 'loves', 'ta', 'travel america', 'costco gas', 'sam club gas', 'superstore gas', 'canadian tire gas', 'husky', 'ultramar', 'irving', 'couche-tard', 'circle k', '7-eleven gas', 'premium gas', 'regular gas', 'plus gas', 'mid-grade', 'unleaded', 'supreme', 'octane', 'gas pump', 'fuel pump', 'pay at pump', 'car wash gas'
  ],
  ARRAY[
    '汽油', '加油', '油费', '燃油', '柴油', '加满', '加油站', '油泵', 'Shell', '壳牌', 'Esso', 'Petro-Canada', '加拿大石油', 'Chevron', '雪佛龙', 'BP', '英国石油', 'Exxon', 'Mobil', '埃克森美孚', 'ARCO', 'AM/PM', '76', 'Conoco', 'Phillips 66', 'Marathon', 'Speedway', 'Circle K', 'Wawa', 'Sheetz', 'Pilot', 'Flying J', 'Love\'s', 'TA', '旅行美国', 'Costco加油', '山姆会员店加油', '超级商店加油', '加拿大轮胎加油', 'Husky', 'Ultramar', 'Irving', 'Couche-Tard', '7-Eleven加油', '高级汽油', '普通汽油', '中级汽油', '无铅', '至尊', '辛烷', '油泵', '自助加油', '洗车加油'
  ],
  '⛽',
  '#FF5A5F',
  false
) ON CONFLICT (user_id, name) DO UPDATE SET
  keywords_en = EXCLUDED.keywords_en,
  keywords_zh = EXCLUDED.keywords_zh;

-- 2.4 Parking
INSERT INTO categories (user_id, name, keywords_en, keywords_zh, icon, color, is_system)
VALUES (
  'a1e08c94-165e-43e7-852e-0954406df694',
  'Parking',
  ARRAY[
    'parking', 'parking fee', 'parking lot', 'parking garage', 'parkade', 'car park', 'valet', 'valet parking', 'park', 'meter', 'parking meter', 'pay and display', 'parking ticket', 'parking permit', 'monthly parking', 'hourly parking', 'daily parking', 'park n fly', 'airport parking', 'street parking', 'impark', 'indigo', 'easypark', 'honk', 'parkwhiz', 'spothero', 'parkopedia', 'passport parking', 'pay by phone', 'parking app', 'parkade', 'underground parking', 'surface lot', 'parking structure', 'parking validation'
  ],
  ARRAY[
    '停车', '停车费', '停车场', '停车库', '停车场所', '代客泊车', '停车', '停车计时器', '停车票', '停车许可', '月租停车', '小时停车', '日停车', 'Park\'n Fly', '机场停车', '路边停车', 'Impark', 'Indigo', 'EasyPark', 'Honk', 'ParkWhiz', 'SpotHero', 'Parkopedia', 'Passport停车', '电话付款', '停车应用', '地下停车', '地面停车场', '停车结构', '停车验证'
  ],
  '🅿️',
  '#95A5A6',
  false
) ON CONFLICT (user_id, name) DO UPDATE SET
  keywords_en = EXCLUDED.keywords_en,
  keywords_zh = EXCLUDED.keywords_zh;

-- 2.5 Auto Maintenance & Repairs
INSERT INTO categories (user_id, name, keywords_en, keywords_zh, icon, color, is_system)
VALUES (
  'a1e08c94-165e-43e7-852e-0954406df694',
  'Auto Maintenance',
  ARRAY[
    'car repair', 'auto repair', 'mechanic', 'garage', 'auto shop', 'car service', 'oil change', 'tune up', 'tune-up', 'brake', 'brakes', 'brake pad', 'rotor', 'tire', 'tires', 'wheel', 'alignment', 'tire rotation', 'balance', 'battery', 'car battery', 'alternator', 'starter', 'transmission', 'engine', 'muffler', 'exhaust', 'catalytic converter', 'spark plug', 'air filter', 'cabin filter', 'wiper', 'wiper blade', 'coolant', 'antifreeze', 'radiator', 'belt', 'hose', 'suspension', 'shock', 'strut', 'car wash', 'detailing', 'jiffy lube', 'valvoline', 'midas', 'meineke', 'pep boys', 'autozone', 'napa', 'canadian tire', 'mr lube', 'pennzoil', 'firestone', 'goodyear', 'michelin', 'bridgestone', 'costco tire', 'kal tire', 'fountain tire', 'active green ross', 'inspection', 'safety', 'emission', 'smog check'
  ],
  ARRAY[
    '汽车维修', '修车', '汽修', '机械师', '修理厂', '汽车店', '汽车服务', '换油', '调校', '刹车', '制动器', '刹车片', '转子', '轮胎', '车轮', '四轮定位', '轮胎换位', '平衡', '电池', '汽车电池', '交流发电机', '启动器', '变速箱', '发动机', '消音器', '排气', '催化转换器', '火花塞', '空气滤清器', '空调滤清器', '雨刷', '雨刷片', '冷却液', '防冻液', '散热器', '皮带', '软管', '悬挂', '减震器', '支柱', '洗车', '美容', 'Jiffy Lube', 'Valvoline', 'Midas', 'Meineke', 'Pep Boys', 'AutoZone', 'NAPA', '加拿大轮胎', 'Mr. Lube', 'Pennzoil', 'Firestone', 'Goodyear', 'Michelin', 'Bridgestone', 'Costco轮胎', 'Kal Tire', 'Fountain Tire', 'Active Green + Ross', '检查', '安全检查', '排放', '尾气检查'
  ],
  '🔧',
  '#E74C3C',
  false
) ON CONFLICT (user_id, name) DO UPDATE SET
  keywords_en = EXCLUDED.keywords_en,
  keywords_zh = EXCLUDED.keywords_zh;

-- Continue with more categories for space efficiency...

