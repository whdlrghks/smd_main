var async = require('async'),
  express = require('express');
var router = express.Router();
const request = require('request');
var sendrest = require('../app_modules/util/sendrest');
function getEN(name){

  var category = [
    {
      'name' : '스킨/토너',
      'value' : 'Toners'
    },
  // :,
  { 'name' : '로션', 'value' : 'Lotions'},
  { 'name' : '크림', 'value' : 'Creams'},
  { 'name' : '에센스/세럼/페이스오일', 'value' : 'Essences/Serums/Face Oils'},
  { 'name' : '아이/넥/립케어', 'value' : 'Eye/Neck/Lip Care'},
  { 'name' : '미스트', 'value' : 'Face Mists'},
  { 'name' : '팩/마스크팩', 'value' : 'Face & Sheet Masks'},
  { 'name' : '스페셜케어/뷰티기기', 'value' : 'Special Care/Beauty Equipments'},
  { 'name' : '기초케어세트', 'value' : 'Skin Care Sets'},
  { 'name' : '로션/크림/젤', 'value' : 'Lotions/Creams/Gels'},
  { 'name' : '파우더/스틱/스프레이', 'value' : 'Powders/Sticks/Sprays'},
  { 'name' : '쿠션/팩트/애프터선케어/태닝/세트', 'value' : 'Cousions/Pacts/After Sun Care/Tanners/Sets'},
  { 'name' : '클렌징로션/크림/오일/젤', 'value' : 'Cleansing Lotions/Creams/Oils/Gels'},
  { 'name' : '클렌징폼/티슈', 'value' : 'Cleansing Forms/Tissues'},
  { 'name' : '립/아이리무버', 'value' : 'Lip/Eye Removers'},
  { 'name' : '필링/스크럽/피부관리용품/클렌징기기', 'value' : 'Peelings/Scrubs/Cleansing Tools'},
  { 'name' : '스킨/토너', 'value' : 'Toners'},
  { 'name' : '로션/에멀젼/세럼/크림/에센스', 'value' : 'Lotions/Emulsions/Serums/Creams/Essences'},
  { 'name' : '아이/립/넥케어', 'value' : 'Eye/Lip/Neck Care'},
  { 'name' : '미스트/마스크/팩', 'value' : 'Mists/Face & Sheet Masks'},
  { 'name' : '쉐이빙/애프터쉐이브', 'value' : 'Shave Creams/Aftershaves'},
  { 'name' : '클렌징', 'value' : 'Cleansers'},
  { 'name' : '선케어/메이크업', 'value' : 'Sun Care/Makeup'},
  { 'name' : '바디/헤어케어', 'value' : 'Body/Hair Care'},
  { 'name' : '스페셜케어/기초케어세트', 'value' : 'Special Care/Skin Care Sets'},
  { 'name' : '기초케어', 'value' : 'Skin Care'},
  { 'name' : '헤어/바디케어', 'value' : 'Hair/Body Care'},
  { 'name' : '스페셜케어/기초케어세트', 'value' : 'Special Care/Sets'},
  { 'name' : '베이스/프라이머', 'value' : 'Bases/Primers'},
  { 'name' : 'BB/CC크림', 'value' : 'BB/CC Creams'},
  { 'name' : '파운데이션', 'value' : 'Foundation'},
  { 'name' : '쿠션팩트/파우더/트윈케익/컴팩트', 'value' : 'Cushions/Powders/Compacts'},
  { 'name' : '컨실러', 'value' : 'Concealers'},
  { 'name' : '블러셔/하이라이터/쉐딩', 'value' : 'Blush/Hightlighter/Contour'},
  { 'name' : '아이섀도우', 'value' : 'Eyebrow'},
  { 'name' : '아이라이너', 'value' : 'Eyeshadow'},
  { 'name' : '아이브로우', 'value' : 'Eyeliner'},
  { 'name' : '마스카라', 'value' : 'Mascara'},
  { 'name' : '립스틱', 'value' : 'Lipsticks'},
  { 'name' : '립글로스/립틴트', 'value' : 'Lip Gloss/Lip tints'},
  { 'name' : '립펜슬/립크레용/립라이너', 'value' : 'Lip pensils/Lip crayons/Lip Liners'},
  { 'name' : '립케어', 'value' : 'Lip Care'},
  { 'name' : '매니큐어/네일컬러', 'value' : 'Maincure/Nail color'},
  { 'name' : '네일케어/리무버/세트', 'value' : 'Nail Care/Nail Polish Removers/Nail Sets'},
  { 'name' : '세트', 'value' : 'Makeup Sets'},
  { 'name' : '팔레트', 'value' : 'Palettes'},
  { 'name' : '화장솜/퍼프/스펀지/기름종이', 'value' : 'Facial Cottion/Sponges/Blotting'},
  { 'name' : '케이스/손거울', 'value' : 'Cases/Mirrors'},
  { 'name' : '브러쉬', 'value' : 'Makeup Brushes'},
  { 'name' : '뷰러/기타도구', 'value' : 'Eyelash Curlers/Tools'},
  { 'name' : '바디워시', 'value' : 'Body Wash'},
  { 'name' : '바디스크럽/바디솔트/입욕제', 'value' : 'Body Scrubs/Body Salts/Bath Preparation'},
  { 'name' : '바디로션/크림', 'value' : 'Body Lotion/Creams'},
  { 'name' : '바디오일/미스트', 'value' : 'Body Oils/Sprays'},
  { 'name' : '바디슬리밍', 'value' : 'Body Slimming Treatments'},
  { 'name' : '썬케어/데오드란트/제모용품', 'value' : 'Sun Care/Deodorant/Shaving Tools'},
  { 'name' : '핸드/풋케어', 'value' : 'Hand/Foot care'},
  { 'name' : '구강케어/바디케어세트', 'value' : 'Oral Care/Body Care Sets'},
  { 'name' : '샴푸/바스', 'value' : 'Shampoos'},
  { 'name' : '린스/트리트먼트', 'value' : 'Conditioners/Treatments'},
  { 'name' : '에센스/팩', 'value' : 'Essences/Packs'},
  { 'name' : '미스트/오일', 'value' : 'Hair Mists/Oils'},
  { 'name' : '헤어스타일링', 'value' : 'Hair Styling Products'},
  { 'name' : '헤어케어세트', 'value' : 'hair Care Sets'},
  { 'name' : '여성향수', 'value' : 'Women'},
  { 'name' : '남성향수', 'value' : 'Men'},
  { 'name' : '세트/기타', 'value' : 'Sets'},
  { 'name' : '토트/숄더/크로스백', 'value' : 'Totes/Shoulder Bags/Crossbody Bags'},
  { 'name' : '클러치백/파우치', 'value' : 'Clutches/Pouches'},
  { 'name' : '백팩', 'value' : 'Paper/Laptop Bags'},
  { 'name' : '서류/노트북가방', 'value' : 'Backpacks'},
  { 'name' : '여행용가방', 'value' : 'Carry-Ons'},
  { 'name' : '액세서리', 'value' : 'Accessories'},
  { 'name' : '기타', 'value' : 'Others'},
  { 'name' : '장지갑', 'value' : 'Long Wallets'},
  { 'name' : '중/반지갑', 'value' : 'Bifold Wallet'},
  { 'name' : '머니클립', 'value' : 'Money Clips'},
  { 'name' : '카드/명합/키/동전지갑', 'value' : 'Card Cases/Key Holders/Coin Purses'},
  { 'name' : '여행/여권지갑', 'value' : 'Travel Pouch'},
  { 'name' : '럭셔리', 'value' : 'Luxury Watches'},
  { 'name' : '패션/캐주얼', 'value' : 'Fashion/Casual Watches'},
  { 'name' : '스포츠', 'value' : 'Sports Watche'},
  { 'name' : '아동', 'value' : 'kids Watche'},
  { 'name' : '귀걸이', 'value' : 'Earrings'},
  { 'name' : '목걸이/펜던트', 'value' : 'Necklaces/Pendant'},
  { 'name' : '팔찌/발찌/참', 'value' : 'Bracelets/Anklets/Charms'},
  { 'name' : '반지', 'value' : 'Rings'},
  { 'name' : '브로치/부토니에/기타', 'value' : 'Brooches/Pins/Other'},
  { 'name' : '헤어액세서리', 'value' : 'Hair Accessories'},
  { 'name' : '기타액세서리', 'value' : 'Other Accessories'},
  { 'name' : '패션선글라스', 'value' : 'Designer Sunglasses'},
  { 'name' : '스포츠선글라스', 'value' : 'Sports Sunglasses'},
  { 'name' : '안경테/아동선글라스/기타', 'value' : 'Eyewear Frames/kids Sunglasses/Eyewear Accessories'},
  { 'name' : '상/하의/원피스', 'value' : 'Clothing'},
  { 'name' : '언더웨어', 'value' : 'Underwear'},
  { 'name' : '양말/스타킹/레깅스', 'value' : 'Socks/Stockings/Leggings'},
  { 'name' : '벨트', 'value' : 'Belts'},
  { 'name' : '넥타이', 'value' : 'Neckties'},
  { 'name' : '스카프/머플러', 'value' : 'Scarves'},
  { 'name' : '모자/장갑', 'value' : 'Hats/Gloves'},
  { 'name' : '만년필/볼펜/다이어리', 'value' : 'Fountain Pens/Ball-poing Pens/Schedulers'},
  { 'name' : '라이터/소품', 'value' : 'Lighters/Props'},
  { 'name' : '기타잡화', 'value' : 'Other Accessories'},
  { 'name' : '구두/샌들/슬리퍼', 'value' : 'Sandals/Slippers'},
  { 'name' : '캐주얼/스니커즈운동화', 'value' : 'Casual Shoes/Sneakers'},
  { 'name' : '아동/기타신발', 'value' : 'Kid Shoes/Others'},
  { 'name' : '유아동패션', 'value' : 'kids Fashion'},
  { 'name' : '스포츠/레저', 'value' : 'Sports/Leisure'},
  { 'name' : 'DSLR/디지털/즉석카메라', 'value' : 'Digital SLRs/Digital Cameras/Instant Cameras'},
  { 'name' : '캠코더', 'value' : 'Camcoders'},
  { 'name' : '카메라용품/렌즈', 'value' : 'Lenses/Accessories'},
  { 'name' : '노트북', 'value' : 'Laptops'},
  { 'name' : '태블릿', 'value' : 'Tablets'},
  { 'name' : '스마트폰/스마트워치/밴드', 'value' : 'Smart Phone/Smart Watches/Smart Bands'},
  { 'name' : '스마트폰악세서리/용품', 'value' : 'Smart Phone Accessories/Attachments'},
  { 'name' : '전기면도기/면도기', 'value' : 'Electric Razors/Razors'},
  { 'name' : '전동칫솔/칫솔', 'value' : 'Eletric Toothbrushes/Toothbrushes'},
  { 'name' : '주방가전', 'value' : 'Kitchen Appliances'},
  { 'name' : '소형가전/미용/마사지기', 'value' : 'Small Appliances/Beauty/Massage Equipments'},
  { 'name' : '이어폰/헤드폰', 'value' : 'Earphones/Headphones'},
  { 'name' : '스피커/기타 음향기기', 'value' : 'Speakers/Audio Equipments'},
  { 'name' : '기타영상기기', 'value' : 'Video Equipments'},
  { 'name' : '홍삼/인삼', 'value' : 'Red Ginseng/Ginseng'},
  { 'name' : '비타민제/영양제', 'value' : 'Multivitamins/Nutrients'},
  { 'name' : '다이어트/미용보조식품', 'value' : 'Diet Formulas/Beauty Supplements'},
  { 'name' : '유아동건강식품/기타건강식품', 'value' : 'Kids Health Food/Other Health Foods'},
  { 'name' : '초콜릿/캔디/스낵', 'value' : 'Chocolate/Cnady/Snack'},
  { 'name' : '커피/차', 'value' : 'Coffee/Tea'},
  { 'name' : '김/고추장/기타', 'value' : 'Dried Seaweed/Chile Paste/Others'},
  { 'name' : '주방/생활용품', 'value' : 'Kitchen/Household Goods'},
  { 'name' : '인테리어/소품', 'value' : 'Interior/Props'},
  { 'name' : "스킨케어", 'value' : "Skincare"},
  { 'name' : "메이크업", 'value' : "Makeup"},
  { 'name' : "바디/헤어/향수", 'value' : "Perfumes/Body/Hair"},
  { 'name' : "가방/지갑", 'value' : "Bags/Wallets"},
  { 'name' : "시계/주얼리", 'value' : "Watches/jewelry"},
  { 'name' : "패션/잡화", 'value' : "Fashion/Accessories"},
  { 'name' : "디지털", 'value' : "Electronics"},
  { 'name' : "식품/리빙", 'value' : "Grocery/Living"},
  { 'name' : "기초케어", 'value' : "BASIC CARE"},
  { 'name' : "선케어", 'value' : "SUN CARE"},
  { 'name' : "클렌징", 'value' : "CLEANSERS"},
  { 'name' : "남성용", 'value' : "MEN'S SKIN CARE"},
  { 'name' : "아동용", 'value' : "BABY SKIN CARE"},
  { 'name' : "페이스", 'value' : "FACE"},
  { 'name' : "아이", 'value' : "EYES"},
  { 'name' : "립", 'value' : "LIPS"},
  { 'name' : "네일", 'value' : "NAILS"},
  { 'name' : "세트/팔레트", 'value' : "MAKEUP SETS/PALETTES"},
  { 'name' : "바디케어", 'value' : "BODY CARE"},
  { 'name' : "헤어케어", 'value' : "HAIR CARE"},
  { 'name' : "향수", 'value' : "PERFUMES"},
  { 'name' : "백팩/비즈니스가방", 'value' : "BACKPACKS/BUSINESS BAGS"},
  { 'name' : "여행용가방", 'value' : "TRAVEL BAGS"},
  { 'name' : "액세서리및기타", 'value' : "ACCESSORIES"},
  { 'name' : "지갑", 'value' : "WALLETS"},
  { 'name' : "시계", 'value' : "WATCHES"},
  { 'name' : "주얼리", 'value' : "JEWELRY"},
  { 'name' : "액세서리", 'value' : "ACCESSORIES"},
  { 'name' : "선글라스/안경", 'value' : "SUNGLASSES/GLASSES"},
  { 'name' : "의류", 'value' : "CLOTHING"},
  { 'name' : "패션잡화", 'value' : "FASHION ACCESSORIES"},
  { 'name' : "신발", 'value' : "SHOES"},
  { 'name' : "유아동/스포츠", 'value' : "KID/SPORTS"},
  { 'name' : "노트북/태블릿", 'value' : "LAPTOPS/TABLETS"},
  { 'name' : "스마트기기", 'value' : "SMART DEVICES"},
  { 'name' : "면도기/칫솔", 'value' : "RAZORS/TOOTHBRUSHES"},
  { 'name' : "생활/소형가전", 'value' : "HOME&SMALL APPLIANCES"},
  { 'name' : "영상/음향가전", 'value' : "VIDEO/AUDIO"},
  { 'name' : "건강식품", 'value' : "HEALTH FOOD"},
  { 'name' : "일반식품", 'value' : "FOOD"},
  { 'name' : "리빙용품", 'value' : "LIVING"}
]

  for(var cate in category){
    if(category[cate].name==name){

      return category[cate].value;
    }
  }

}
/* GET 첫번째 페이지. */
router.get('/', function(req, res) {
  var u_name;
  console.log("req.user is " + req.user);
  console.log(req.query);
  var depth1 = req.query.depth1;
  var depth2 = req.query.depth2;
  var depth3 = req.query.depth3;

  if (req.query.startpage == undefined) {
    var start = 0;
  } else {
    var start = req.query.startpage;
  }
  var limit = 16;
  sendrest.getproductlist(depth1, depth2, depth3, start, limit, function(productlist) {
    console.log("totalcount : ", productlist[0]);
    console.log("startpage : ", productlist[2]);
    depth1 = getEN(req.query.depth1);
    depth2 = getEN(req.query.depth2);
    depth3 = getEN(req.query.depth3);
    if (req.user == undefined) {
      u_name = '';
      res.render('shop_grid_full_width', {
        total : productlist[3],
        username: u_name,
        totalcount: productlist[0],
        productlist: productlist[1],
        startpage: productlist[2],
        depth1: depth1,
        depth2: depth2,
        depth3: depth3
      });
    } else {
      u_name = req.user.Username
      res.render('shop_grid_full_width', {
        total : productlist[3],
        username: u_name,
        totalcount: productlist[0],
        productlist: productlist[1],
        startpage: productlist[2],
        depth1: depth1,
        depth2: depth2,
        depth3: depth3
      });
    }
  })
});

router.get('/single/', function(req, res) {
  //로그인 되어있는지 안되어있는지 구분하기 위한 값
  var u_name;
  var user_id;
  // console.log(req.session);
  var product_id = req.query.id;
  var user_id;
  if (req.user != undefined) {
    user_id=req.user._id;
    username= req.user.User_id.split(", 'value' : ")[1].replace("]","");
    u_name = req.user.Username;
  } else {
    username= "";
    user_id = '';
    u_name = '';
  }

  var timestamp2 = new Date().getTime();

  sendrest.getproductdetail(product_id, user_id, function(productlist) {
    console.log(productlist);
    console.log('Finish upload Product data in ', new Date().getTime() - timestamp2, 'ms');
    console.log(req.user);
    console.log("user_id"+user_id);
    var depth1 = getEN(productlist[0][0].prd_1st);
    var depth2 = getEN(productlist[0][0].prd_2nd);
    var depth3 = getEN(productlist[0][0].prd_3rd);
    if (req.user == undefined) {
      res.render('single_product', {
        user_id : user_id,
        username: username,
        product: productlist[0][0],
        SL_reserved: '0',
        LT_reserved: '0',
        SSG_reserved: '0',
        depth1: depth1,
        depth2: depth2,
        depth3: depth3
      });
    } else {
      res.render('single_product', {
        user_id : user_id,
        username: username,
        product: productlist[0][0],
        SL_reserved: productlist[1][0].SL_reserved,
        LT_reserved: productlist[1][0].LT_reserved,
        SSG_reserved: productlist[1][0].SSG_reserved,
        depth1: depth1,
        depth2: depth2,
        depth3: depth3
      });
    }
  })

});

router.post('/single/getinfo', function(req, res) {
  var result = [];
  console.log(req.body);
  async.parallel([
      function(callback) {
        if (req.body.SL_URL != "42") {
          var prd_sl_url = req.body.SL_URL;
          sendrest.getSLproduct(prd_sl_url, req.body.SL_reserved, function(sl_info) {
            console.log(sl_info);
            result[0] = sl_info;
            callback(null, null);
          })
        } else {
          console.log("[NO SL_URL]");
          result[0] = "";
          callback(null, null);
        }

      },
      function(callback) {
        if (req.body.LT_URL != "42") {
          var prd_lt_url = req.body.LT_URL;
          sendrest.getLTproduct(prd_lt_url, req.body.LT_reserved, function(lt_info) {
            console.log(lt_info);
            result[1] = lt_info;
            callback(null, null);
          })
        } else {
          console.log("[NO LT_URL]");
          result[1] = "";
          callback(null, null);
        }

      },
      function(callback) {
        if (req.body.SSG_URL != "42") {
          var prd_ssg_url = req.body.SSG_URL;
          sendrest.getSSGproduct(prd_ssg_url, req.body.SSG_reserved, function(ssg_info) {
            console.log(ssg_info);
            result[2] = ssg_info;
            callback(null, null);
          })
        } else {
          console.log("[NO SSG_URL]");
          result[2] = "";
          callback(null, null);
        }

      },
      function(callback) {
        var prd_name = req.body.prd_name;
        //브랜드+상품이름 같이 검색
        sendrest.getPostproduct(prd_name, function(post_info) {
          console.log(post_info);
          result[3] = post_info;
          callback(null, null);
        })
      }
    ],
    function(err, results) {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    })
})


// 개별 요청
// router.post('/single/SL', function(req, res) {
//   console.log("req.user is "+req.user);
//   var prd_url = req.body.SL_URL;
//   sendrest.getSLproduct(prd_url, function(sl_info){
//     console.log(sl_info);
//     res.json(sl_info);
//   })
// });
// router.post('/single/LT', function(req, res) {
//   console.log("req.user is "+req.user);
//   var prd_url = req.body.LT_URL;
//   sendrest.getLTproduct(prd_url, function(lt_info){
//     console.log(lt_info);
//     res.json(lt_info);
//   })
// });
// router.post('/single/SSG', function(req, res) {
//   console.log("req.user is "+req.user);
//   var prd_url = req.body.SSG_URL;
//   sendrest.getSSGproduct(prd_url, function(ssg_info){
//     console.log(ssg_info);
//     res.json(ssg_info);
//   })
// });
// router.post('/single/post', function(req, res) {
//   console.log("req.user is "+req.user);
//   var prd_url = req.body.prd_name;
//   sendrest.getPostproduct(prd_name, function(post_info){
//     console.log(post_info);
//     // res.json(post_info);
//   })
// });


router.get('/search/', function(req, res) {
  //로그인 되어있는지 안되어있는지 구분하기 위한 값
  var u_name;
  console.log("req.user is " + req.user);
  console.log("[SEARCH] SEARCH API IS REQUESTED ABOUT", req.query.searchbox);
  var depth1 = '';
  var depth2 = '';
  var depth3 = '';
  if (req.query.startpage == undefined) {
    var start = 0;
  } else {
    var start = req.query.startpage;
  }
  var limit = 16;
  sendrest.getSearch(req.query.searchcategory, req.query.searchbox, start, limit, function(productlist) {
    console.log("totalcount : ", productlist[0]);
    console.log("startpage : ", productlist[2]);
    if (req.user == undefined) {
      u_name = '';
      if (productlist == "no result") {
        res.render('index', {
          username: u_name
        });
      } else {
        res.render('shop_grid_full_width', {
          username: u_name,
          total: productlist[3],
          totalcount: productlist[0],
          productlist: productlist[1],
          startpage: productlist[2],
          depth1: depth1,
          depth2: depth2,
          depth3: depth3
        });
      }
    } else {
      u_name = req.user.Username
      if (productlist == "no result") {
        res.render('index', {
          username: u_name
        });
      } else {
        res.render('shop_grid_full_width', {
          username: u_name,
          total: productlist[3],
          totalcount: productlist[0],
          productlist: productlist[1],
          startpage: productlist[2],
          depth1: depth1,
          depth2: depth2,
          depth3: depth3
        });
      }

    }
  })

});

router.post('/addCart', function(req, res) {
  var prd_id = req.body.prd_id;
  var user_id = req.user._id;
  var duty_category = req.body.duty_category;
  var storage = req.body.storage; //boolean
  var percent = req.body.percent;
  var price = req.body.price;
  var img_url = req.body.img_url;
  var prd_url = req.body.prd_url;
  var prd_name = req.body.prd_name;
  sendrest.addCart(prd_id, user_id, duty_category, img_url, storage, price, percent, prd_url, prd_name, function(result){
    res.json(result);
  })
});

router.post('/deleteCart', function(req, res) {
  var prd_id = req.body._id;
  sendrest.deleteCart(prd_id, function(result){
    res.json(result);
  })
});



module.exports = router;
