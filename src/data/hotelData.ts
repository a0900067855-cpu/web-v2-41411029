import { Room, Offer, Restaurant, Facility } from '../types/hotel';

// Generated high-fidelity asset paths
export const HOTEL_IMAGES = {
  hero: '/src/assets/images/hero_hotel_exterior_1790663235283.jpg',
  suite: '/src/assets/images/room_executive_suite_1790663249373.jpg',
  dining: '/src/assets/images/dining_luxury_buffet_1790663261310.jpg',
  pool: '/src/assets/images/facilities_indoor_pool_1790663273773.jpg',
};

export const ROOMS_DATA: Room[] = [
  {
    id: 'deluxe-king',
    name: '豪華客房 (一大床)',
    nameEn: 'Deluxe King Room',
    category: 'room',
    description: '寬敞舒適的現代典雅空間，配備頂級獨立筒名床與羽絨寢具，大片落地窗引入城市綠意與璀璨天際線，提供極致放鬆的下榻享受。',
    size: 38,
    sizePing: 11.5,
    bedType: '特大雙人床 King Bed (200x200cm)',
    capacity: { adults: 2, children: 1 },
    price: 4800,
    originalPrice: 6200,
    image: HOTEL_IMAGES.suite,
    view: '城市都會景觀 / 綠意中庭',
    highlights: ['席夢思頂級天夢之床', '乾濕分離大理石衛浴', '獨立深泡浴缸', '4K高畫質智慧電視'],
    amenities: [
      '高速光纖 WiFi (500M)',
      '乾濕分離衛浴與全自動免治馬桶',
      '獨立深浸式浴缸及植萃沐浴備品',
      'Nespresso 膠囊咖啡機與精選茶包',
      '55吋 4K 智慧液晶電視 (支援AirPlay)',
      '電子保險箱與雙層隔音氣密窗',
      '頂級浴袍與純棉厚磅拖鞋',
      '每日專屬房務開床服務'
    ]
  },
  {
    id: 'deluxe-twin',
    name: '豪華客房 (兩小床)',
    nameEn: 'Deluxe Twin Room',
    category: 'room',
    description: '配備兩張加寬舒適單人名床，適合商務出差、好友同遊或家庭出遊，明亮沉穩的木質調設計，打造溫潤靜謐的休憩時光。',
    size: 40,
    sizePing: 12.1,
    bedType: '兩小床 Twin Beds (135x200cm x 2)',
    capacity: { adults: 2, children: 2 },
    price: 5200,
    originalPrice: 6600,
    image: HOTEL_IMAGES.suite,
    view: '城市林蔭大道景觀',
    highlights: ['兩張加寬特製名床', '雙洗手台大理石浴室', '商務符合人體工學書桌', '靜音雙溫冷藏冰箱'],
    amenities: [
      '高速光纖 WiFi (500M)',
      '加寬加大獨立筒單人床',
      '乾濕分離衛浴與全自動免治馬桶',
      '獨立深浸式浴缸',
      'Nespresso 頂級義式膠囊咖啡機',
      '符合人體工學皮革商務工作椅',
      '多功能萬國插座及高速USB-C充電埠',
      '客製化枕頭選單 (乳膠/羽絨/蕎麥)'
    ]
  },
  {
    id: 'executive-premier',
    name: '行政尊貴客房',
    nameEn: 'Executive Premier King Room',
    category: 'executive',
    description: '座落於高樓層視野極佳，尊享 20F 行政貴賓廳禮遇，包括專屬快速辦理入住與退房、全天候精緻茶點與歡樂時光雞尾酒暢飲。',
    size: 45,
    sizePing: 13.6,
    bedType: '特大雙人床 King Bed (200x200cm)',
    capacity: { adults: 2, children: 1 },
    price: 6800,
    originalPrice: 8800,
    image: HOTEL_IMAGES.suite,
    view: '高樓層竹北天際線全景',
    highlights: ['享 20F 行政酒廊全天禮遇', 'Happy Hour 雞尾酒輕食暢飲', 'Dyson 頂級吹風機', '高樓層無遮蔽夜景'],
    amenities: [
      '20F 行政貴賓廳尊榮專屬使用權',
      '行政酒廊 Happy Hour 紅白酒及精緻冷熱食暢享',
      'Dyson Supersonic 頂級吹風機',
      'Bose 藍牙音響系統',
      '全套天然精油奢華沐浴組',
      '尊享免費熨燙衣物服務 (每日2件)',
      '下午 14:00 延遲退房禮遇 (視當日房況)',
      '房內 Mini-bar 迎賓軟性飲料免費'
    ]
  },
  {
    id: 'family-deluxe-suite',
    name: '家庭景觀雅緻房',
    nameEn: 'Family Scenic Deluxe Room',
    category: 'room',
    description: '專為家庭旅人打造的寬敞空間，配置兩張寬闊雙人床與獨立起居小沙發區，兼具溫馨與奢華，並提供專屬兒童主題備品。',
    size: 48,
    sizePing: 14.5,
    bedType: '兩大床 Queen Beds (150x200cm x 2)',
    capacity: { adults: 4, children: 2 },
    price: 7600,
    originalPrice: 9800,
    image: HOTEL_IMAGES.suite,
    view: '城市開闊日夜景致',
    highlights: ['兩大舒適雙人床', '附設兒童專屬無毒沐浴組', '贈送喜波波樂園入場券', '溫馨獨立起居沙發'],
    amenities: [
      '高速光纖 WiFi',
      '兩張雙人加厚名床',
      '兒童專屬牙刷、沐浴露及小拖鞋',
      '可免費預約嬰兒床、消毒鍋與澡盆',
      '乾濕分離雙洗臉台衛浴',
      '55吋 4K 智慧電視 (支援卡通頻道/YouTube)',
      '靜音冰箱與迎賓手工餅乾水果',
      '免預約喜波波童樂天地免費暢玩'
    ]
  },
  {
    id: 'bfh-signature-suite',
    name: 'BFH 尊榮行政套房',
    nameEn: 'BFH Signature Executive Suite',
    category: 'suite',
    description: '一房一廳獨立隔間設計，擁有寬闊雅緻的客廳會客區、頂級大理石吧檯、獨立更衣間與雙洗手台奢華衛浴，詮釋頂級商旅的生活美學。',
    size: 72,
    sizePing: 21.8,
    bedType: '特大加寬奢華雙人床 (220x200cm)',
    capacity: { adults: 2, children: 2 },
    price: 11800,
    originalPrice: 15800,
    image: HOTEL_IMAGES.suite,
    view: '雙面採光 270 度壯闊全景',
    highlights: ['獨立會客廳與主臥房分區', '獨立專屬步入式更衣間', '尊享全套行政酒廊禮遇', '頂級 Jacuzzi 按摩氣泡浴缸'],
    amenities: [
      '獨立起居會客室與工作用餐區',
      '頂級 Jacuzzi 雙人水療按摩浴缸',
      '全套 Dyson 造型美髮組',
      'B&O 便攜式藍牙揚聲器',
      '20F 行政貴賓廳全日通行權',
      '高鐵新竹站專車免費來回接駁',
      '首晚 Mini Bar 全部飲品與進口零食免費',
      '專屬管家客製化抵達服務'
    ]
  },
  {
    id: 'presidential-sky-suite',
    name: '寰宇總統套房',
    nameEn: 'BFH Presidential Sky Suite',
    category: 'suite',
    description: '酒店頂層旗艦代表作，佔地逾 40 坪，坐擁全景環景落地窗、氣派宴客大廳、8人座尊榮宴會餐桌、私人廚房吧檯與主人尊榮奢華寢居。',
    size: 135,
    sizePing: 40.8,
    bedType: '手工訂製特大加寬 King Bed',
    capacity: { adults: 4, children: 2 },
    price: 28800,
    originalPrice: 38800,
    image: HOTEL_IMAGES.suite,
    view: '頂層 360 度無敵天際線與山嵐景緻',
    highlights: ['私人頂級專屬宴席廳', '24H 私人管家隨伺服務', '專屬獨立電梯刷卡直達', '奢華大理石蒸氣衛浴空間'],
    amenities: [
      '獨立主臥、隨扈房、宴客廳及用餐長桌',
      '私人配餐室與全套進口廚具配備',
      '大理石私人蒸氣室與景觀雙人水療池',
      '24小時專屬資深禮賓管家服務',
      '全棟設施最優先預約保留特權',
      '頂級香檳迎賓禮遇與當季手作迎賓甜點',
      '賓士 S-Class 雙趟專屬禮賓接送',
      '每日特調客房香氛系統'
    ]
  }
];

export const OFFERS_DATA: Offer[] = [
  {
    id: 'offer-half-board',
    title: '「星級饌饗」一泊二食奢華假期',
    subtitle: '入住豪華客房 享翌日雙人自助早餐 + 盛宴自助百匯晚餐',
    tag: '熱門首選',
    validUntil: '2026-12-31',
    priceFrom: 5880,
    image: HOTEL_IMAGES.dining,
    description: '卸下日常疲憊，沉浸在極致舒適的客房時光，晚間品嚐盛宴餐廳嚴選當季海鮮、現切爐烤牛排與精緻甜點百匯，享受視覺與味覺的雙重饗宴。',
    included: [
      '豪華客房住宿一晚',
      '盛宴自助餐廳翌日雙人豐盛早餐',
      '盛宴自助餐廳當晚雙人奢華自助百匯晚餐',
      '免費使用室內溫水游泳池、三溫暖與健身房',
      '免費高鐵站預約接駁服務'
    ]
  },
  {
    id: 'offer-executive-privilege',
    title: '「商務尊崇」行政高樓層尊貴假期',
    subtitle: '升等高樓層行政房型 尊享 20F 行政酒廊全天候禮遇',
    tag: '商務菁英',
    validUntil: '2026-11-30',
    priceFrom: 6800,
    image: HOTEL_IMAGES.hero,
    description: '專為高階商務與注重品味的旅人設計。專屬行政酒廊 Happy Hour 雞尾酒與輕食佐暮色美景，助您運籌帷幄、休閒兼得。',
    included: [
      '行政尊貴客房住宿一晚',
      '20F 行政貴賓廳全日茶點與軟飲',
      '黃金 Happy Hour 紅白酒及特調無限暢飲',
      '享延遲退房至 14:00 (視當日房況)',
      '客房 Mini Bar 迎賓軟性飲料免費招待'
    ]
  },
  {
    id: 'offer-family-fun',
    title: '「波波童樂」親子歡樂探索專案',
    subtitle: '家庭雅緻客房 + 喜波波童樂天地無限暢玩 + 專屬兒童禮物包',
    tag: '親子家庭',
    validUntil: '2026-12-31',
    priceFrom: 7800,
    image: HOTEL_IMAGES.pool,
    description: '打造大人放鬆、小孩瘋狂的完美假期！全台最受歡迎的飯店室內樂園，配備超大型波波球池與闖關設施，創造珍貴家庭回憶。',
    included: [
      '家庭景觀雅緻房 (兩大床) 住宿一晚',
      '依房型人數贈送盛宴自助早餐 (2大2小)',
      '喜波波童樂天地入住期間無限次暢玩手環',
      '專屬喜波波原創吉祥物冒險玩偶禮盒',
      '兒童專屬天然洗沐旅行組'
    ]
  },
  {
    id: 'offer-early-bird',
    title: '「早鳥先機」提前14天預付享 85 折',
    subtitle: '彈性行程首選 官網獨家最優惠房價保證',
    tag: '限時特惠',
    validUntil: '2026-10-31',
    priceFrom: 4080,
    image: HOTEL_IMAGES.suite,
    description: '提早為您的假期做足準備，凡提早14天於官網預定指定房型，即可享有每日浮動房價85折尊榮禮遇與優先高樓層安排。',
    included: [
      '全系列客房套房享專案折扣價',
      '免費全館高速光纖無線網路',
      '免費使用館內三溫暖冷熱泉池及蒸氣室',
      '全館餐廳用餐享 9 折房客優惠'
    ]
  }
];

export const RESTAURANTS_DATA: Restaurant[] = [
  {
    id: 'feast-buffet',
    name: '盛宴自助餐廳',
    nameEn: 'Feast All Day Dining',
    cuisine: '環球國際百匯自助餐',
    floor: '2F',
    hours: '早餐 06:00-10:00 / 午餐 11:30-14:00 / 晚餐 17:30-21:00',
    phone: '+886-3-620-6091',
    description: '以開放式中島廚房為特色，匯聚各國美饌。嚴選當令生鮮海味、美國特選肋眼牛排、手工現拉麵食與法國頂級手作甜品。',
    signatures: ['現開當季生蠔與天使紅蝦', '低溫慢烤美國特選肋眼牛排', '主廚現場炙燒握壽司', '主廚現作法式舒芙蕾'],
    image: HOTEL_IMAGES.dining
  },
  {
    id: 'yue-chinese',
    name: '采悅軒中餐廳',
    nameEn: 'Yue Chinese Restaurant',
    cuisine: '正宗粵式佳餚 & 港式手工點心',
    floor: '3F',
    hours: '午餐 11:30-14:30 / 晚餐 17:30-21:30',
    phone: '+886-3-620-6093',
    description: '榮獲多年美食評鑑推薦，主廚團隊堅持古法明爐吊烤，以招牌脆皮烤鴨三吃聞名遐邇，兼具經典傳統與當代創意演繹。',
    signatures: ['采悅軒招牌明爐片皮鴨三吃', '魚子醬鮮蝦手工燒賣皇', '古法濃湯金湯花膠土雞煲', '楊枝甘露佐雪花燕窩'],
    image: HOTEL_IMAGES.dining
  },
  {
    id: 'moon-court',
    name: '迎月庭日式料理',
    nameEn: 'Moon Court Japanese Restaurant',
    cuisine: '頂級鐵板燒 & 懷石料理',
    floor: '2F',
    hours: '午餐 11:30-14:00 / 晚餐 17:30-21:30',
    phone: '+886-3-620-6095',
    description: '極致日式禪意氛圍，選用日本直輸 A5 頂級黑毛和牛與基隆崁仔頂鮮魚，由星級名廚現場鐵板精湛展演。',
    signatures: ['日本鹿兒島 A5 黑毛和牛牛排', '活波士頓龍蝦佐海膽醬', '旬季特選生魚片盛合', '手作松露茶碗蒸'],
    image: HOTEL_IMAGES.dining
  },
  {
    id: 'lobby-lounge',
    name: '光廊大廳酒吧',
    nameEn: 'Lobby Lounge & Bar',
    cuisine: '經典調酒、精品咖啡 & 奢華英式下午茶',
    floor: '1F',
    hours: '每日 10:00 - 24:00 (夜間音樂演出 20:30-22:30)',
    phone: '+886-3-620-6092',
    description: '挑高八米的優雅光影空間，午後提供三層法式英式下午茶，夜幕降臨時化身時髦酒吧，特調佐爵士樂聲，讓夜晚格外微醺迷人。',
    signatures: ['四季精品雙人英式下午茶', 'BFH 專屬特調「微光竹塹」', '嚴選單一麥芽蘇格蘭威士忌', '手工現作栗子蒙布朗'],
    image: HOTEL_IMAGES.hero
  }
];

export const FACILITIES_DATA: Facility[] = [
  {
    id: 'pool',
    name: '室內溫水游泳池',
    nameEn: 'Heated Indoor Swimming Pool',
    floor: '5F',
    hours: '每日 06:30 - 22:00',
    description: '長 25 公尺恆溫水域，採光明亮的玻璃天頂引入自然暖陽，並設有兒童戲水池與池畔日光躺椅，四季皆宜享受暢游之樂。',
    features: ['25m 恆溫水域', '兒童淺水防滑戲水區', '水療衝擊按摩區', '池畔柚木躺椅放鬆區'],
    image: HOTEL_IMAGES.pool
  },
  {
    id: 'fitness',
    name: '尊榮健身中心',
    nameEn: '24-Hour Fitness Centre',
    floor: '5F',
    hours: '24 小時全天候開放 (房卡感應入場)',
    description: '配備全套義大利進口 Technogym 頂級心肺與重訓設備，寬敞開闊的視野讓運動時光充滿動力與能量。',
    features: ['Technogym 跑步機與滑步機', '全套自由重量啞鈴組', '多功能核心訓練區', '提供乾淨毛巾與低溫飲用水'],
    image: HOTEL_IMAGES.suite
  },
  {
    id: 'bobo-wonderland',
    name: '喜波波童樂天地',
    nameEn: 'BoBo Kids Wonderland',
    floor: '5F',
    hours: '09:00 - 12:00 / 13:00 - 21:00 (定期消毒清場)',
    description: '深受親子家庭讚譽的大型室內兒童樂園，設有巨型無毒安全球池、立體攀爬網、巨型溜滑梯與益智手作積木區。',
    features: ['百萬無毒繽紛球池', '安全攀爬冒險網塔', '樂高互動積木創作牆', '每日定時親子手作體驗課程'],
    image: HOTEL_IMAGES.pool
  },
  {
    id: 'spa-sauna',
    name: '奢華三溫暖與水療中心',
    nameEn: 'Luxury Sauna & Hydrotherapy',
    floor: '5F',
    hours: '每日 07:00 - 22:00 (清潔時段 12:00-13:00)',
    description: '男女分區的尊貴三溫暖空間，配備冷熱按摩水池、芬蘭進口檜木烤箱、草本芳香蒸氣室與靜謐休閒休息室。',
    features: ['天然草本熱水按摩池', '深層舒緩冰鎮冷水池', '頂級芬蘭香氣檜木烤箱', '芳香精油蒸氣室與休息躺椅'],
    image: HOTEL_IMAGES.pool
  }
];

export const HOTEL_INFO = {
  name: 'BFH Hotel',
  chineseName: '新竹 BFH 國際大飯店',
  starRating: 5,
  address: '新竹縣竹北市光明六路東一段265號 (近高鐵新竹站)',
  phone: '+886-3-620-6000',
  fax: '+886-3-620-6100',
  email: 'reservation@bfhhotel-hsinchu.com',
  checkInTime: '15:00',
  checkOutTime: '11:00',
  transportation: [
    { title: '台灣高鐵新竹站', detail: '車程約 5 分鐘，飯店提供免費定時預約接駁巴士' },
    { title: '國道一號竹北交流道', detail: '下交流道往高鐵方向約 2 分鐘即達，備有地下專屬坡道平面停車場' },
    { title: '新竹科學園區', detail: '車程約 10-15 分鐘，便利商務差旅洽公' },
    { title: '桃園國際機場 (TPE)', detail: '車程約 40 分鐘，可代為預約飯店尊榮禮賓賓士專車' }
  ]
};
