/* Ưu đãi US$100 · 24 giờ — CHỈ web riêng vietnamweddinggown.com (chị Linh 17/10/2026)
   - Giảm US$100 khi ĐẶT CỌC 30% váy CÓ SẴN trong 24 giờ (không áp dụng may đo). Cọc = 30% × (giá váy − US$100).
   - 24 giờ đếm từ lần đầu khách vào web (localStorage), hết giờ thì không hiện nữa.
   - Không phủ đen, trang vẫn cuộn được.
     Máy tính: hiện sau 7 giây / cuộn 500px · thẻ góc phải, trên nút WhatsApp nổi (góc trái là chữ bìa trang chủ).
     Điện thoại: hiện sau 10 giây / cuộn nửa màn hình · thẻ gọn dưới đáy (2 ý gộp 1 dòng).
   - Đóng (hoặc điện thoại cuộn tiếp ~1 màn hình) → nhãn nhỏ trên nút WhatsApp nổi đếm giờ còn lại, bấm mở lại.
   - Nút "Book now" → khung đặt váy (chị chốt 17/10: khách điền thông tin → chuyển khoản thẳng STK, KHÔNG PayPal → nút cuối nhắn WhatsApp):
       B1 khách điền mã váy (sẵn mã trong giỏ) · tên · WhatsApp · email · ngày cưới · quốc gia → mail báo chị (MAIL_URL, như form đặt lịch)
       B2 tính tiền (giá − 100, cọc 30%) + STK ACB anh Cường (giống trang made-to-measure #pay) → "Send on WhatsApp" tin tiếng Anh có mã "US$100 OFF – 24H".
   - Còn hạn thì MỌI link WhatsApp khác (nút nổi, giỏ hàng "Order on WhatsApp", form) cũng tự kèm dòng mã + hạn → nhân viên nhận ra.
   - dung-web-vwg.py chèn file này vào các trang web riêng (trừ made-to-measure). Web chính dolinhanhbridal.com KHÔNG nạp.
   - Xem lại từ đầu: thêm ?uudai=0 vào link. */
(function(){
  var H = location.hostname;
  if(!/(^|\.)vietnamweddinggown\.com$/.test(H) && !/^(localhost|127\.0\.0\.1)$/.test(H)) return;  /* chặn web chính */
  if(window.__uu100) return; window.__uu100 = 1;

  var NGAY = 864e5, GIAM = 100, COC = 0.3, K_T0 = "vwg-uu100-t0", K_DONG = "vwg-uu100-dong";
  var WA = "84359950588", MA = "US$100 OFF – 24H";
  var MAIL_URL = "https://script.google.com/macros/s/AKfycbwlmpyoY3b-iCmO9ZoVeUhm0wYJb4CrQ6I9ezsadk4UhDx1JS3qAEN7MWNOL_DGgkiV/exec";
  var TK = [["ten", "DO XUAN CUONG"], ["so", "2288888"], ["nh", "ACB – Asia Commercial Bank"], ["swift", "ASCBVNVX"]];
  function lay(k){ try{ return localStorage.getItem(k); }catch(_){ return null; } }
  function dat(k, v){ try{ localStorage.setItem(k, v); }catch(_){} }
  function bo(k){ try{ localStorage.removeItem(k); }catch(_){} }
  try{ if(new URLSearchParams(location.search).get("uudai") === "0"){ bo(K_T0); bo(K_DONG); } }catch(_){}

  var t0 = +lay(K_T0) || 0, bay = Date.now();
  if(!t0 || t0 > bay){ t0 = bay; dat(K_T0, String(t0)); }
  var HET = t0 + NGAY;
  if(bay >= HET) return;

  var CHU = {
    en:{ nhan:"24-hour offer", tit:"<em>US$100</em> off your gown",
         y1:"Book within 24 hours", y1p:"30% deposit by bank transfer",
         y2:"Ready-to-wear gowns", y2p:"not for made-to-measure",
         gon:"<b>30% deposit within 24 hours</b> · <i>ready-to-wear only</i>",
         con:"Ends in", nut:"Book now", the:"US$100 off", dong:"Close",
         dEb:"US$100 off · ends in", dTit:"Book your gown", b1:"Your details", b2:"Deposit",
         fMs:"Gown code *", fMsPh:"e.g. MS 23", fTen:"Your name *", fWa:"WhatsApp number *", fWaPh:"+1 555 123 4567",
         fEm:"Email", fNgay:"Wedding date", fNuoc:"Country", fNuocPh:"e.g. Australia",
         tiep:"Continue", chiSan:"Ready-to-wear gowns only · not for made-to-measure",
         thieu:"Please fill in the gown code, your name and WhatsApp number.",
         uuDai:"24-hour offer", tong:"Total", coc:"Deposit 30%", hoiGia:"price on request", cocHoi:"confirmed on WhatsApp",
         ck:"Transfer to our bank in Vietnam", tkTen:"Account name", tkSo:"Account number", tkNh:"Bank", tkSwift:"SWIFT code", tkNd:"Reference",
         chep:"Copy", daChep:"Copied", cach:"Wise · SWIFT transfer · Remitly",
         c1:"Transfer within 24 hours", c1p:"to keep US$100 off",
         c2:"Send the receipt on WhatsApp", c2p:"we confirm and hold your gown",
         gui:"Send on WhatsApp", sua:"← Edit details" },
    vi:{ nhan:"Ưu đãi 24 giờ", tit:"Giảm <em>US$100</em> cho váy cưới",
         y1:"Đặt váy trong 24 giờ", y1p:"cọc 30% qua chuyển khoản",
         y2:"Váy có sẵn", y2p:"không áp dụng may đo",
         gon:"<b>Cọc 30% trong 24 giờ</b> · <i>chỉ váy có sẵn</i>",
         con:"Còn", nut:"Đặt váy ngay", the:"Giảm US$100", dong:"Đóng",
         dEb:"Giảm US$100 · còn", dTit:"Đặt váy", b1:"Thông tin", b2:"Đặt cọc",
         fMs:"Mã váy *", fMsPh:"VD: MS 23", fTen:"Họ tên *", fWa:"Số WhatsApp *", fWaPh:"+84 912 345 678",
         fEm:"Email", fNgay:"Ngày cưới", fNuoc:"Quốc gia", fNuocPh:"VD: Úc",
         tiep:"Tiếp tục", chiSan:"Chỉ váy có sẵn · không áp dụng may đo",
         thieu:"Vui lòng điền mã váy, họ tên và số WhatsApp.",
         uuDai:"Ưu đãi 24 giờ", tong:"Tổng", coc:"Cọc 30%", hoiGia:"giá liên hệ", cocHoi:"báo qua WhatsApp",
         ck:"Chuyển khoản vào tài khoản ở Việt Nam", tkTen:"Chủ tài khoản", tkSo:"Số tài khoản", tkNh:"Ngân hàng", tkSwift:"Mã SWIFT", tkNd:"Nội dung",
         chep:"Chép", daChep:"Đã chép", cach:"Wise · chuyển khoản SWIFT · Remitly",
         c1:"Chuyển khoản trong 24 giờ", c1p:"để giữ ưu đãi US$100",
         c2:"Gửi biên lai qua WhatsApp", c2p:"Dolinhanh xác nhận và giữ váy",
         gui:"Gửi qua WhatsApp", sua:"← Sửa thông tin" },
    zh:{ nhan:"24 小时限时优惠", tit:"婚纱立减 <em>US$100</em>",
         y1:"24 小时内预订", y1p:"银行转账支付 30% 定金",
         y2:"现货婚纱", y2p:"定制婚纱不适用",
         gon:"<b>24 小时内付 30% 定金</b> · <i>仅限现货婚纱</i>",
         con:"剩余", nut:"立即预订", the:"立减 US$100", dong:"关闭",
         dEb:"立减 US$100 · 剩余", dTit:"预订婚纱", b1:"您的信息", b2:"定金",
         fMs:"婚纱编号 *", fMsPh:"例如 MS 23", fTen:"姓名 *", fWa:"WhatsApp 号码 *", fWaPh:"+86 138 0000 0000",
         fEm:"邮箱", fNgay:"婚礼日期", fNuoc:"国家", fNuocPh:"例如 澳大利亚",
         tiep:"继续", chiSan:"仅限现货婚纱 · 定制不适用",
         thieu:"请填写婚纱编号、姓名和 WhatsApp 号码。",
         uuDai:"24 小时优惠", tong:"合计", coc:"定金 30%", hoiGia:"价格请咨询", cocHoi:"WhatsApp 确认",
         ck:"转账至我们的越南银行账户", tkTen:"账户名", tkSo:"账号", tkNh:"银行", tkSwift:"SWIFT 代码", tkNd:"转账备注",
         chep:"复制", daChep:"已复制", cach:"Wise · SWIFT 转账 · Remitly",
         c1:"24 小时内转账", c1p:"保留 US$100 优惠",
         c2:"通过 WhatsApp 发送转账凭证", c2p:"我们确认后为您保留婚纱",
         gui:"通过 WhatsApp 发送", sua:"← 修改信息" }
  };
  function ngu(){ var l = (document.documentElement.lang || "en").toLowerCase(); return l.indexOf("zh") === 0 ? "zh" : l.indexOf("vi") === 0 ? "vi" : "en"; }
  function c(){ return CHU[ngu()]; }

  var SERIF = "var(--serif,'Playfair Display',Georgia,serif)";
  var css = [
    ".uu-the,.uu-nhan,.uu-nen{--uu-ink:var(--ink,#1B1917);--uu-nau:var(--taupe-deep,#6E665C);--uu-kem:var(--champagne,#F5EFE7);--uu-vien:var(--line,#E7E3DD);--uu-ruou:#7A2638;",
    "  font-family:var(--sans,'Montserrat',Helvetica,Arial,sans-serif);color:var(--uu-ink)}",
    ".uu-the,.uu-nhan{position:fixed;right:clamp(12px,3vw,24px);bottom:calc(80px + env(safe-area-inset-bottom));z-index:130}",
    ".uu-the{width:372px;max-width:calc(100vw - 24px);box-sizing:border-box;padding:22px 24px 20px;background:var(--ivory,#FBF9F6);border:1px solid var(--uu-vien);box-shadow:0 18px 46px rgba(27,25,23,.2);",
    "  opacity:0;transform:translateY(18px);transition:opacity .35s ease,transform .35s ease}",
    ".uu-the.hien{opacity:1;transform:none}",
    ".uu-the[hidden],.uu-nhan[hidden],.uu-nen[hidden],.uu-dat [hidden]{display:none!important}",
    ".uu-dau{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:0 0 8px}",
    ".uu-eb{font-size:.6rem;font-weight:500;letter-spacing:.26em;text-transform:uppercase;color:var(--uu-nau)}",
    ".uu-x{flex:none;display:grid;place-items:center;width:34px;height:34px;margin:-10px -12px -10px 0;padding:0;border:0;background:none;color:var(--uu-nau);cursor:pointer;font-size:22px;line-height:1}",
    ".uu-x:hover{color:var(--uu-ink)}",
    ".uu-tit{margin:0 0 14px;font-family:" + SERIF + ";font-weight:400;font-size:1.62rem;line-height:1.15;letter-spacing:-.005em}",
    ".uu-tit em{font-style:italic;color:var(--uu-ruou)}",
    ".uu-ds{list-style:none;margin:0 0 16px;padding:12px 0 0;border-top:1px solid var(--uu-vien);display:grid;gap:9px}",
    ".uu-ds li{position:relative;padding-left:16px;line-height:1.3}",
    ".uu-ds li::before{content:'';position:absolute;left:0;top:.55em;width:6px;height:1px;background:var(--uu-ruou)}",
    ".uu-ds b{display:block;font-size:.8rem;font-weight:500;letter-spacing:.01em}",
    ".uu-gon{display:none}",
    ".uu-ds i{display:block;font-family:" + SERIF + ";font-size:.82rem;color:var(--uu-nau)}",
    ".uu-hang{display:flex;align-items:stretch;gap:10px}",
    ".uu-dem{flex:none;display:flex;flex-direction:column;justify-content:center;min-width:104px;padding:7px 12px;background:var(--uu-kem);text-align:center}",
    ".uu-dem small{font-size:.54rem;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:var(--uu-nau)}",
    ".uu-dem span{font-size:1.02rem;font-weight:500;letter-spacing:.06em;font-variant-numeric:tabular-nums;color:var(--uu-ruou)}",
    ".uu-nut{flex:1;display:inline-flex;align-items:center;justify-content:center;gap:9px;box-sizing:border-box;padding:12px 14px;border:0;background:var(--uu-ruou);color:#fff;text-decoration:none;cursor:pointer;",
    "  font-family:inherit;font-size:.64rem;font-weight:500;letter-spacing:.17em;text-transform:uppercase;text-align:center;line-height:1.35;transition:background .2s}",
    ".uu-nut:hover{background:#611E2D;color:#fff;opacity:1}",
    ".uu-nut svg{flex:none}",
    ".uu-nhan{display:inline-flex;align-items:center;gap:9px;height:48px;box-sizing:border-box;padding:0 16px 0 14px;border:1px solid var(--uu-vien);border-radius:999px;background:var(--ivory,#FBF9F6);",
    "  box-shadow:0 10px 26px rgba(27,25,23,.16);cursor:pointer;font-size:.62rem;font-weight:500;letter-spacing:.16em;text-transform:uppercase;white-space:nowrap}",
    ".uu-nhan svg{flex:none;color:var(--uu-ruou)}",
    ".uu-nhan span:last-child{color:var(--uu-ruou);font-variant-numeric:tabular-nums;letter-spacing:.08em}",
    /* khung đặt váy */
    ".uu-nen{position:fixed;inset:0;z-index:360;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(20,18,16,.5);opacity:0;transition:opacity .25s ease}",
    ".uu-nen.hien{opacity:1}",
    ".uu-dat{position:relative;width:min(480px,100%);max-height:calc(100vh - 40px);overflow-y:auto;-webkit-overflow-scrolling:touch;box-sizing:border-box;padding:30px 32px 28px;background:var(--paper,#fff);box-shadow:0 24px 60px rgba(0,0,0,.25)}",
    ".uu-dat .uu-x{position:absolute;top:14px;right:14px;margin:0}",
    ".uu-dat .uu-eb{color:var(--uu-ruou)}",
    ".uu-dat .uu-eb span{font-variant-numeric:tabular-nums;letter-spacing:.1em}",
    ".uu-dtit{margin:8px 0 14px;font-family:" + SERIF + ";font-weight:400;font-size:1.9rem;line-height:1.1}",
    ".uu-buoc{display:flex;gap:18px;margin:0 0 20px;padding-bottom:14px;border-bottom:1px solid var(--uu-vien);font-size:.6rem;font-weight:500;letter-spacing:.2em;text-transform:uppercase}",
    ".uu-buoc span{color:#B9AFA3}",
    ".uu-buoc span.on{color:var(--uu-ink)}",
    ".uu-f{display:grid;gap:16px}",
    ".uu-o{display:grid;gap:6px;min-width:0}",
    ".uu-o2{display:grid;grid-template-columns:1fr 1fr;gap:16px}",
    ".uu-o label{font-family:inherit;font-size:.6rem;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:var(--uu-nau)}",
    ".uu-o input{width:100%;min-width:0;box-sizing:border-box;font-family:inherit;font-weight:300;font-size:16px;color:var(--uu-ink);background:transparent;border:0;border-bottom:1px solid var(--uu-vien);border-radius:0;padding:9px 0;margin:0;-webkit-appearance:none;appearance:none}",
    ".uu-o input:focus{outline:none;border-bottom-color:var(--uu-ink)}",
    ".uu-o.loi input{border-bottom-color:var(--uu-ruou)}",
    ".uu-gia{margin:2px 0 0;font-size:.74rem;color:var(--uu-nau);line-height:1.5}",
    ".uu-loi{margin:0;font-size:.76rem;color:var(--uu-ruou)}",
    ".uu-dat .uu-nut{width:100%;padding:15px 14px;font-size:.66rem}",
    ".uu-phu{margin:10px 0 0;text-align:center;font-family:" + SERIF + ";font-style:italic;font-size:.82rem;color:var(--uu-nau)}",
    ".uu-bang{margin:0 0 18px;padding:14px 16px;background:var(--uu-kem)}",
    ".uu-bang div{display:flex;justify-content:space-between;gap:12px;padding:4px 0;font-size:.82rem}",
    ".uu-bang div span:last-child{font-variant-numeric:tabular-nums;white-space:nowrap}",
    ".uu-bang .tru span:last-child{color:var(--uu-ruou)}",
    ".uu-bang .tong{margin-top:4px;padding-top:9px;border-top:1px solid rgba(110,102,92,.25)}",
    ".uu-bang .coc{font-weight:500;font-size:.95rem}",
    ".uu-bang .coc span:last-child{color:var(--uu-ruou)}",
    ".uu-ck{margin:0 0 8px;font-size:.6rem;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:var(--uu-nau)}",
    ".uu-tk{margin:0 0 6px;padding:0}",
    ".uu-tk div{display:grid;grid-template-columns:118px 1fr auto;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--uu-vien)}",
    ".uu-tk dt{font-size:.62rem;letter-spacing:.06em;color:var(--uu-nau)}",
    ".uu-tk dd{margin:0;font-size:.86rem;font-weight:500;word-break:break-word}",
    ".uu-chep{padding:5px 10px;border:1px solid var(--uu-vien);border-radius:999px;background:none;font-family:inherit;font-size:.58rem;letter-spacing:.14em;text-transform:uppercase;color:var(--uu-ink);cursor:pointer}",
    ".uu-chep.ok{border-color:var(--uu-ruou);color:var(--uu-ruou)}",
    ".uu-cach{margin:0 0 16px;font-family:" + SERIF + ";font-style:italic;font-size:.82rem;color:var(--uu-nau)}",
    ".uu-dat .uu-ds{margin:0 0 18px}",
    ".uu-sua{display:block;margin:12px auto 0;padding:6px;border:0;background:none;font-family:inherit;font-size:.62rem;letter-spacing:.16em;text-transform:uppercase;color:var(--uu-nau);cursor:pointer}",
    "@media(max-width:640px){",
    "  .uu-the{left:12px;right:12px;bottom:calc(12px + env(safe-area-inset-bottom));width:auto;max-width:none;padding:16px 18px 16px}",
    "  .uu-dau{margin-bottom:6px}",
    "  .uu-tit{font-size:1.32rem;margin-bottom:7px}",
    "  .uu-the .uu-ds{display:none}",
    "  .uu-gon{display:block;margin:0 0 12px;font-size:.76rem;line-height:1.35}",
    "  .uu-gon b{font-weight:500}",
    "  .uu-gon i{font-family:" + SERIF + ";font-size:.84rem;color:var(--uu-nau)}",
    "  .uu-dem{min-width:96px;padding:6px 10px}",
    "  .uu-nut{padding:11px 10px;letter-spacing:.14em}",
    "  .uu-nhan{right:12px;bottom:calc(86px + env(safe-area-inset-bottom))}",
    "  .uu-nen{align-items:flex-end;padding:0}",
    "  .uu-dat{width:100%;max-height:94vh;max-height:94dvh;padding:24px 20px calc(22px + env(safe-area-inset-bottom))}",
    "  .uu-dtit{font-size:1.55rem}",
    "  .uu-tk div{grid-template-columns:96px 1fr auto}",
    "}",
    "@media(max-width:380px){.uu-o2{grid-template-columns:1fr}}",
    "@media(prefers-reduced-motion:reduce){.uu-the,.uu-nen{transition:none}}"
  ].join("\n");
  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  var ICON_WA = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>';
  var ICON_TAG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.5"/></svg>';

  /* ── thẻ ưu đãi + nhãn nhỏ ── */
  var the = document.createElement("div");
  the.className = "uu-the"; the.hidden = true;
  the.setAttribute("role", "dialog"); the.setAttribute("aria-live", "polite");
  the.innerHTML =
    '<div class="uu-dau"><span class="uu-eb"></span><button type="button" class="uu-x">&times;</button></div>' +
    '<p class="uu-tit"></p><p class="uu-gon"></p>' +
    '<ul class="uu-ds"><li><b class="uu-y1"></b><i class="uu-y1p"></i></li><li><b class="uu-y2"></b><i class="uu-y2p"></i></li></ul>' +
    '<div class="uu-hang"><div class="uu-dem"><small></small><span></span></div>' +
    '<button type="button" class="uu-nut uu-mo-dat"><span></span></button></div>';
  var nhan = document.createElement("button");
  nhan.type = "button"; nhan.className = "uu-nhan"; nhan.hidden = true;
  nhan.innerHTML = ICON_TAG + '<span class="uu-nhan-chu"></span><span class="uu-nhan-gio"></span>';

  /* ── khung đặt váy: B1 thông tin → B2 cọc + STK → WhatsApp ── */
  var nen = document.createElement("div");
  nen.className = "uu-nen"; nen.hidden = true;
  var dongTk = TK.map(function(x){ return '<div><dt class="uu-tk-' + x[0] + '"></dt><dd>' + x[1] + '</dd><button type="button" class="uu-chep"></button></div>'; }).join("") +
    '<div><dt class="uu-tk-nd"></dt><dd class="uu-nd"></dd><button type="button" class="uu-chep"></button></div>';
  nen.innerHTML =
    '<div class="uu-dat" role="dialog" aria-modal="true">' +
      '<button type="button" class="uu-x">&times;</button>' +
      '<span class="uu-eb"><em style="font-style:normal" class="uu-deb"></em> <span class="uu-dgio"></span></span>' +
      '<p class="uu-dtit"></p>' +
      '<div class="uu-buoc"><span class="uu-b1"></span><span class="uu-b2"></span></div>' +
      '<form class="uu-f uu-buoc1" novalidate>' +
        '<div class="uu-o"><label for="uu-ms" class="uu-l-ms"></label><input id="uu-ms" name="ms" autocomplete="off"><p class="uu-gia" hidden></p></div>' +
        '<div class="uu-o"><label for="uu-ten" class="uu-l-ten"></label><input id="uu-ten" name="ten" autocomplete="name"></div>' +
        '<div class="uu-o2"><div class="uu-o"><label for="uu-wa" class="uu-l-wa"></label><input id="uu-wa" name="wa" type="tel" inputmode="tel" autocomplete="tel"></div>' +
          '<div class="uu-o"><label for="uu-em" class="uu-l-em"></label><input id="uu-em" name="em" type="email" autocomplete="email"></div></div>' +
        '<div class="uu-o2"><div class="uu-o"><label for="uu-ngay" class="uu-l-ngay"></label><input id="uu-ngay" name="ngay" type="date"></div>' +
          '<div class="uu-o"><label for="uu-nuoc" class="uu-l-nuoc"></label><input id="uu-nuoc" name="nuoc" autocomplete="country-name"></div></div>' +
        '<p class="uu-loi" hidden></p>' +
        '<div><button type="submit" class="uu-nut uu-tiep"></button><p class="uu-phu uu-chi-san"></p></div>' +
      '</form>' +
      '<div class="uu-buoc2" hidden>' +
        '<div class="uu-bang"></div>' +
        '<p class="uu-ck"></p><dl class="uu-tk">' + dongTk + '</dl><p class="uu-cach"></p>' +
        '<ul class="uu-ds"><li><b class="uu-c1"></b><i class="uu-c1p"></i></li><li><b class="uu-c2"></b><i class="uu-c2p"></i></li></ul>' +
        '<a class="uu-nut uu-gui" target="_blank" rel="noopener">' + ICON_WA + '<span></span></a>' +
        '<button type="button" class="uu-sua"></button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(the); document.body.appendChild(nhan); document.body.appendChild(nen);
  function q(s){ return the.querySelector(s); }
  function d(s){ return nen.querySelector(s); }
  function ghi(e, t){ if(e) e.textContent = t; }

  function viet(){
    var k = c();
    ghi(q(".uu-eb"), k.nhan); q(".uu-tit").innerHTML = k.tit; q(".uu-gon").innerHTML = k.gon;
    ghi(q(".uu-y1"), k.y1); ghi(q(".uu-y1p"), k.y1p); ghi(q(".uu-y2"), k.y2); ghi(q(".uu-y2p"), k.y2p);
    ghi(q(".uu-dem small"), k.con); ghi(q(".uu-mo-dat span"), k.nut);
    q(".uu-x").setAttribute("aria-label", k.dong); the.setAttribute("aria-label", k.the);
    ghi(nhan.querySelector(".uu-nhan-chu"), k.the);
    ghi(d(".uu-deb"), k.dEb); ghi(d(".uu-dtit"), k.dTit); d(".uu-dat").setAttribute("aria-label", k.dTit); d(".uu-x").setAttribute("aria-label", k.dong);
    ghi(d(".uu-b1"), "1 · " + k.b1); ghi(d(".uu-b2"), "2 · " + k.b2);
    ghi(d(".uu-l-ms"), k.fMs); d("#uu-ms").placeholder = k.fMsPh; ghi(d(".uu-l-ten"), k.fTen);
    ghi(d(".uu-l-wa"), k.fWa); d("#uu-wa").placeholder = k.fWaPh; ghi(d(".uu-l-em"), k.fEm);
    ghi(d(".uu-l-ngay"), k.fNgay); ghi(d(".uu-l-nuoc"), k.fNuoc); d("#uu-nuoc").placeholder = k.fNuocPh;
    ghi(d(".uu-tiep"), k.tiep); ghi(d(".uu-chi-san"), k.chiSan); if(!d(".uu-loi").hidden) ghi(d(".uu-loi"), k.thieu);
    ghi(d(".uu-ck"), k.ck); ghi(d(".uu-tk-ten"), k.tkTen); ghi(d(".uu-tk-so"), k.tkSo); ghi(d(".uu-tk-nh"), k.tkNh);
    ghi(d(".uu-tk-swift"), k.tkSwift); ghi(d(".uu-tk-nd"), k.tkNd);
    nen.querySelectorAll(".uu-chep").forEach(function(b){ b.textContent = b.classList.contains("ok") ? k.daChep : k.chep; });
    ghi(d(".uu-cach"), k.cach); ghi(d(".uu-c1"), k.c1); ghi(d(".uu-c1p"), k.c1p); ghi(d(".uu-c2"), k.c2); ghi(d(".uu-c2p"), k.c2p);
    ghi(d(".uu-gui span"), k.gui); ghi(d(".uu-sua"), k.sua);
    giaMs(); if(!d(".uu-buoc2").hidden) veB2();
  }

  function hai(n){ return (n < 10 ? "0" : "") + n; }
  function conLai(){
    var s = Math.max(0, Math.floor((HET - Date.now()) / 1000));
    return hai(Math.floor(s / 3600)) + ":" + hai(Math.floor(s / 60) % 60) + ":" + hai(s % 60);
  }
  function hanVN(){
    try{ return new Intl.DateTimeFormat("en-GB", { timeZone:"Asia/Ho_Chi_Minh", day:"numeric", month:"short", hour:"2-digit", minute:"2-digit", hour12:false }).format(new Date(HET)) + " Vietnam time"; }
    catch(_){ return new Date(HET).toUTCString(); }
  }
  function tien(n){ return "US$" + Math.round(n).toLocaleString("en-US"); }
  function ngayDep(v, vn){  /* "2027-03-20" → "20 Mar 2027" (tin khách) / "20/03/2027" (mail chị) */
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v || ""); if(!m) return v || "";
    if(vn) return m[3] + "/" + m[2] + "/" + m[1];
    return (+m[3]) + " " + "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ")[m[2] - 1] + " " + m[1];
  }
  function usd(s){ var m = /US\$\s?([\d,]+)/.exec(s || ""); return m ? +m[1].replace(/,/g, "") : 0; }

  /* ── giá váy: giỏ hàng (dla-gio) trước, rồi bảng giá đọc từ Bộ sưu tập ── */
  function gioHang(){ try{ var g = JSON.parse(localStorage.getItem("dla-gio") || "[]"); return Array.isArray(g) ? g.filter(function(x){ return x && x.ms; }) : []; }catch(_){ return []; } }
  var BANG = null, DOI = {}, dangDoc = false;
  function docBang(doc){
    var b = {};
    doc.querySelectorAll("figure").forEach(function(f){
      var n = f.querySelector(".nm"); if(!n) return;
      var ms = n.textContent.trim().toUpperCase().replace(/\s+/g, " "); if(!/^MS \d+$/.test(ms)) return;
      var g = f.querySelector(".gia"), v = (g && !g.hasAttribute("data-en")) ? usd(g.textContent) : 0;
      if(v) b[ms] = v;
      (f.getAttribute("data-ma-cu") || "").split(/[\s,]+/).forEach(function(cu){ if(/^\d+$/.test(cu)) DOI["MS " + cu] = ms; });  /* mã cũ đã gộp → mã giữ */
    });
    return b;
  }
  function napBang(){
    if(BANG || dangDoc) return;
    if(document.getElementById("vlGrid")){ BANG = docBang(document); return; }
    dangDoc = true;
    fetch("bo-suu-tap.html").then(function(r){ return r.text(); })
      .then(function(t){ BANG = docBang(new DOMParser().parseFromString(t, "text/html")); })
      .catch(function(){ BANG = {}; })
      .then(function(){ dangDoc = false; giaMs(); if(!d(".uu-buoc2").hidden) veB2(); });
  }
  function dsMs(){  /* "23, ms 27" → [{ms:"MS 23", gia:1080}, …] */
    var so = (d("#uu-ms").value.match(/\d{1,4}/g) || []), seen = {}, gh = {};
    gioHang().forEach(function(x){ gh[x.ms.toUpperCase()] = usd(x.gia); });
    return so.map(function(n){ var ms = "MS " + (+n); return DOI[ms] || ms; })
      .filter(function(ms){ if(seen[ms]) return false; seen[ms] = 1; return true; })
      .map(function(ms){ return { ms:ms, gia:gh[ms] || (BANG && BANG[ms]) || 0 }; });
  }
  function giaMs(){
    var p = d(".uu-gia"), ds = dsMs(), k = c();
    if(!ds.length){ p.hidden = true; return; }
    p.textContent = ds.map(function(x){ return x.ms + " · " + (x.gia ? tien(x.gia) : (BANG ? k.hoiGia : "…")); }).join("   ");
    p.hidden = false;
  }
  function tinh(){
    var ds = dsMs(), du = ds.length > 0 && ds.every(function(x){ return x.gia; });
    var tong = ds.reduce(function(s, x){ return s + x.gia; }, 0), sau = Math.max(0, tong - GIAM);
    return { ds:ds, du:du, tong:tong, sau:sau, coc:du ? Math.round(sau * COC) : 0 };
  }
  function thongTin(){ var f = d(".uu-buoc1"); return { ten:f.ten.value.trim(), wa:f.wa.value.trim(), em:f.em.value.trim(), ngay:f.ngay.value, nuoc:f.nuoc.value.trim() }; }

  function veB2(){
    var k = c(), t = tinh(), tt = thongTin(), h = "";
    t.ds.forEach(function(x){ h += '<div><span>' + x.ms + '</span><span>' + (x.gia ? tien(x.gia) : k.hoiGia) + '</span></div>'; });
    h += '<div class="tru"><span>' + k.uuDai + '</span><span>−' + tien(GIAM) + '</span></div>';
    if(t.du) h += '<div class="tong"><span>' + k.tong + '</span><span>' + tien(t.sau) + '</span></div>' +
                  '<div class="coc"><span>' + k.coc + '</span><span>' + tien(t.coc) + '</span></div>';
    else h += '<div class="tong coc"><span>' + k.coc + '</span><span>' + k.cocHoi + '</span></div>';
    d(".uu-bang").innerHTML = h;
    d(".uu-nd").textContent = (tt.ten || "Name") + " Deposit";
    d(".uu-gui").href = linkGui();
  }
  function tinGui(){
    var t = tinh(), tt = thongTin(), L = [];
    L.push("Hi Dolinhanh Bridal, I'd like to book with the offer " + MA + " (valid until " + hanVN() + ").");
    L.push("Gown: " + t.ds.map(function(x){ return x.ms + (x.gia ? " (" + tien(x.gia) + ")" : ""); }).join(", "));
    if(t.du){ L.push("Total after US$100 off: " + tien(t.sau)); L.push("Deposit 30%: " + tien(t.coc)); }
    else L.push("Please confirm the price and my 30% deposit.");
    L.push("Name: " + tt.ten); L.push("WhatsApp: " + tt.wa);
    if(tt.em) L.push("Email: " + tt.em);
    if(tt.ngay) L.push("Wedding date: " + ngayDep(tt.ngay));
    if(tt.nuoc) L.push("Country: " + tt.nuoc);
    L.push("I will send the transfer receipt here.");
    return L.join("\n");
  }
  function linkGui(){ return "https://wa.me/" + WA + "?text=" + encodeURIComponent(tinGui()); }

  var daBao = "";
  function baoChi(){  /* mail báo chị Linh — cùng máy gửi mail của form đặt lịch */
    var t = tinh(), tt = thongTin();
    var tin = "ĐẶT VÁY ƯU ĐÃI US$100 · 24H (vietnamweddinggown.com)\n"
      + "Váy: " + t.ds.map(function(x){ return x.ms + (x.gia ? " (" + tien(x.gia) + ")" : " (chưa có giá)"); }).join(", ") + "\n"
      + (t.du ? "Sau giảm: " + tien(t.sau) + " · Cọc 30%: " + tien(t.coc) + "\n" : "Cọc 30%: nhân viên báo khách\n")
      + "Tên: " + tt.ten + "\nWhatsApp: " + tt.wa + "\nEmail: " + (tt.em || "-") + "\nNgày cưới: " + (ngayDep(tt.ngay, 1) || "-") + "\nQuốc gia: " + (tt.nuoc || "-") + "\n"
      + "Hạn ưu đãi: " + hanVN().replace(" Vietnam time", " (giờ VN)") + "\n"
      + "(Khách vừa điền form trên web — chờ khách nhắn WhatsApp + gửi biên lai)";
    if(tin === daBao) return; daBao = tin;
    try{ fetch(MAIL_URL + "?hoi=" + encodeURIComponent(tin) + "&em=" + encodeURIComponent(tt.em || tt.wa), { mode:"no-cors" }).catch(function(){}); }catch(_){}
  }

  /* ── mở / đóng khung đặt váy (nút Back điện thoại cũng đóng) ── */
  var moDat = false, dayLS = false, boQuaPop = false, cuonCu = "";
  function moKhung(){
    if(moDat) return;
    var o = d("#uu-ms"); if(!o.value){ var g = gioHang(); if(g.length) o.value = g.map(function(x){ return x.ms; }).join(", "); }
    napBang(); giaMs(); buoc(1);
    nen.hidden = false; moDat = true;
    cuonCu = document.documentElement.style.overflow; document.documentElement.style.overflow = "hidden";
    requestAnimationFrame(function(){ requestAnimationFrame(function(){ nen.classList.add("hien"); }); });
    try{ history.pushState({ uu100:1 }, ""); dayLS = true; }catch(_){}
    setTimeout(function(){ try{ (o.value ? d("#uu-ten") : o).focus({ preventScroll:true }); }catch(_){} }, 300);
  }
  function dongKhung(tuPop){
    if(!moDat) return;
    moDat = false; nen.classList.remove("hien");
    document.documentElement.style.overflow = cuonCu;
    setTimeout(function(){ if(!moDat) nen.hidden = true; }, 250);
    if(dayLS && !tuPop){ boQuaPop = true; try{ history.back(); }catch(_){} }
    dayLS = false;
  }
  addEventListener("popstate", function(){ if(boQuaPop){ boQuaPop = false; return; } if(moDat) dongKhung(true); });
  addEventListener("keydown", function(e){ if(e.key === "Escape" && moDat) dongKhung(); });
  nen.addEventListener("click", function(e){ if(e.target === nen) dongKhung(); });
  d(".uu-x").addEventListener("click", function(){ dongKhung(); });

  function buoc(n){
    d(".uu-buoc1").hidden = n !== 1; d(".uu-buoc2").hidden = n !== 2;
    d(".uu-b1").classList.toggle("on", n === 1); d(".uu-b2").classList.toggle("on", n === 2);
    d(".uu-dat").scrollTop = 0;
  }
  d("#uu-ms").addEventListener("input", giaMs);
  d(".uu-buoc1").addEventListener("submit", function(e){
    e.preventDefault();
    var tt = thongTin(), ok = true;
    [["#uu-ms", dsMs().length], ["#uu-ten", tt.ten], ["#uu-wa", (tt.wa.match(/\d/g) || []).length >= 6]].forEach(function(x){
      var o = d(x[0]).parentNode; o.classList.toggle("loi", !x[1]); if(!x[1]) ok = false;
    });
    var loi = d(".uu-loi"); loi.hidden = ok; if(!ok){ loi.textContent = c().thieu; return; }
    veB2(); buoc(2); baoChi();
    try{ if(typeof fbq === "function") fbq("track", "Lead", { content_name:"Offer US$100 24H" }); }catch(_){}
  });
  d(".uu-sua").addEventListener("click", function(){ buoc(1); });
  nen.querySelectorAll(".uu-chep").forEach(function(b){
    b.addEventListener("click", function(){
      var v = b.previousElementSibling.textContent;
      function xong(){ b.classList.add("ok"); b.textContent = c().daChep; setTimeout(function(){ b.classList.remove("ok"); b.textContent = c().chep; }, 1600); }
      try{ navigator.clipboard.writeText(v).then(xong, function(){ chepCu(v); xong(); }); }catch(_){ chepCu(v); xong(); }
    });
  });
  function chepCu(v){ try{ var t = document.createElement("textarea"); t.value = v; t.style.cssText = "position:fixed;opacity:0"; document.body.appendChild(t); t.select(); document.execCommand("copy"); t.remove(); }catch(_){} }
  var gui = d(".uu-gui");
  function capNhatGui(){ gui.href = linkGui(); }
  gui.addEventListener("mouseenter", capNhatGui); gui.addEventListener("focus", capNhatGui);
  gui.addEventListener("touchstart", capNhatGui, { passive:true });
  gui.addEventListener("click", function(){
    capNhatGui();
    try{ if(typeof fbq === "function") fbq("trackCustom", "Offer100Book"); }catch(_){}
  });

  viet();
  try{ new MutationObserver(viet).observe(document.documentElement, { attributes:true, attributeFilter:["lang"] }); }catch(_){}

  /* mọi link WhatsApp khác trên trang: còn hạn thì thêm dòng mã ưu đãi vào tin soạn sẵn (bấm lúc nào sửa lúc đó) */
  function kemMa(e){
    if(Date.now() >= HET) return;
    var a = e.target && e.target.closest && e.target.closest('a[href*="wa.me/"]');
    if(!a || a === gui) return;
    try{
      var u = new URL(a.href), tin = u.searchParams.get("text") || "Hi Dolinhanh Bridal,";
      if(tin.indexOf(MA) > -1) return;
      a.href = u.origin + u.pathname + "?text=" + encodeURIComponent(tin + "\nOffer: " + MA + " (valid until " + hanVN() + ")");
    }catch(_){}
  }
  document.addEventListener("click", kemMa, true);
  addEventListener("click", kemMa);

  var hen = null;
  function tick(){
    if(Date.now() >= HET){ the.hidden = true; nhan.hidden = true; clearInterval(hen); return; }
    var g = conLai();
    ghi(q(".uu-dem span"), g); ghi(nhan.querySelector(".uu-nhan-gio"), g); ghi(d(".uu-dgio"), g);
  }
  tick(); hen = setInterval(tick, 1000);

  var moLuc = 0, yMo = 0;
  function mo(){
    nhan.hidden = true; the.hidden = false;
    requestAnimationFrame(function(){ requestAnimationFrame(function(){ the.classList.add("hien"); }); });
    moLuc = Date.now(); yMo = scrollY;
  }
  function thu(){
    dat(K_DONG, "1");
    the.classList.remove("hien");
    setTimeout(function(){ the.hidden = true; if(Date.now() < HET) nhan.hidden = false; }, 260);
  }
  q(".uu-x").addEventListener("click", thu);
  q(".uu-mo-dat").addEventListener("click", moKhung);
  nhan.addEventListener("click", mo);
  window.uu100 = { datVay:moKhung };  /* nút khác trên trang muốn mở khung đặt váy: uu100.datVay() */

  /* điện thoại: khách cuộn tiếp ~1 màn hình mà không bấm → thu về nhãn nhỏ cho khỏi che nội dung */
  addEventListener("scroll", function(){
    if(the.hidden || moDat || !moLuc || Date.now() - moLuc < 1500) return;
    if(innerWidth <= 640 && Math.abs(scrollY - yMo) > innerHeight * 0.9) thu();
  }, { passive:true });

  if(lay(K_DONG) === "1"){ nhan.hidden = false; return; }

  /* lần đầu: hiện sau 7 giây hoặc khi cuộn 500px — đợi nếu đang mở ảnh phóng to / giỏ hàng / form đặt lịch */
  var daHien = false;
  function dangBan(){
    return moDat || [document.getElementById("phongTo"), document.getElementById("popNen"), document.querySelector(".gh-nen")]
      .some(function(e){ return e && !e.hidden; });
  }
  function thuHien(){
    if(daHien) return;
    if(dangBan()){ setTimeout(thuHien, 2500); return; }
    daHien = true; removeEventListener("scroll", cuon); mo();
  }
  var DT = innerWidth <= 640;
  function cuon(){ if(scrollY > (DT ? innerHeight * 0.5 : 500)) thuHien(); }
  addEventListener("scroll", cuon, { passive:true });
  setTimeout(thuHien, DT ? 10000 : 7000);
})();
