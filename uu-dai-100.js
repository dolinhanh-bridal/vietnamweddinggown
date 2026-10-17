/* Ưu đãi US$100 · 24 giờ — CHỈ web riêng vietnamweddinggown.com (chị Linh 17/10/2026)
   - Giảm US$100 khi ĐẶT CỌC váy CÓ SẴN trong 24 giờ (không áp dụng may đo).
   - 24 giờ đếm từ lần đầu khách vào web (localStorage), hết giờ thì không hiện nữa.
   - Không phủ đen, trang vẫn cuộn được.
     Máy tính: hiện sau 7 giây / cuộn 500px · thẻ góc phải, trên nút WhatsApp nổi (góc trái là chữ bìa trang chủ).
     Điện thoại: hiện sau 10 giây / cuộn nửa màn hình · thẻ gọn dưới đáy (2 ý gộp 1 dòng).
   - Đóng (hoặc điện thoại cuộn tiếp ~1 màn hình) → nhãn nhỏ trên nút WhatsApp nổi đếm giờ còn lại, bấm mở lại.
   - Nút "Book on WhatsApp": tin tiếng Anh có mã "US$100 OFF – 24H" + hạn (giờ VN) + mã váy trong giỏ.
   - Còn hạn thì MỌI link WhatsApp khác (nút nổi, giỏ hàng "Order on WhatsApp", form) cũng tự kèm dòng mã + hạn → nhân viên nhận ra.
   - dung-web-vwg.py chèn file này vào các trang web riêng (trừ made-to-measure). Web chính dolinhanhbridal.com KHÔNG nạp.
   - Xem lại từ đầu: thêm ?uudai=0 vào link. */
(function(){
  var H = location.hostname;
  if(!/(^|\.)vietnamweddinggown\.com$/.test(H) && !/^(localhost|127\.0\.0\.1)$/.test(H)) return;  /* chặn web chính */
  if(window.__uu100) return; window.__uu100 = 1;

  var NGAY = 864e5, K_T0 = "vwg-uu100-t0", K_DONG = "vwg-uu100-dong";
  var WA = "84359950588", MA = "US$100 OFF – 24H";
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
         y1:"Book within 24 hours", y1p:"pay your deposit on WhatsApp",
         y2:"Ready-to-wear gowns", y2p:"not for made-to-measure",
         gon:"<b>Deposit within 24 hours</b> · <i>ready-to-wear only</i>",
         con:"Ends in", nut:"Book on WhatsApp", the:"US$100 off", dong:"Close" },
    vi:{ nhan:"Ưu đãi 24 giờ", tit:"Giảm <em>US$100</em> cho váy cưới",
         y1:"Đặt váy trong 24 giờ", y1p:"đặt cọc qua WhatsApp",
         y2:"Váy có sẵn", y2p:"không áp dụng may đo",
         gon:"<b>Đặt cọc trong 24 giờ</b> · <i>chỉ váy có sẵn</i>",
         con:"Còn", nut:"Đặt qua WhatsApp", the:"Giảm US$100", dong:"Đóng" },
    zh:{ nhan:"24 小时限时优惠", tit:"婚纱立减 <em>US$100</em>",
         y1:"24 小时内预订", y1p:"通过 WhatsApp 支付定金",
         y2:"现货婚纱", y2p:"定制婚纱不适用",
         gon:"<b>24 小时内付定金</b> · <i>仅限现货婚纱</i>",
         con:"剩余", nut:"WhatsApp 预订", the:"立减 US$100", dong:"关闭" }
  };
  function ngu(){ var l = (document.documentElement.lang || "en").toLowerCase(); return l.indexOf("zh") === 0 ? "zh" : l.indexOf("vi") === 0 ? "vi" : "en"; }

  var css = [
    ".uu-the,.uu-nhan{--uu-ink:var(--ink,#1B1917);--uu-nau:var(--taupe-deep,#6E665C);--uu-kem:var(--champagne,#F5EFE7);--uu-vien:var(--line,#E7E3DD);--uu-ruou:#7A2638;",
    "  position:fixed;right:clamp(12px,3vw,24px);bottom:calc(80px + env(safe-area-inset-bottom));z-index:130;font-family:var(--sans,'Montserrat',Helvetica,Arial,sans-serif);color:var(--uu-ink)}",
    ".uu-the{width:372px;max-width:calc(100vw - 24px);box-sizing:border-box;padding:22px 24px 20px;background:var(--ivory,#FBF9F6);border:1px solid var(--uu-vien);box-shadow:0 18px 46px rgba(27,25,23,.2);",
    "  opacity:0;transform:translateY(18px);transition:opacity .35s ease,transform .35s ease}",
    ".uu-the.hien{opacity:1;transform:none}",
    ".uu-the[hidden],.uu-nhan[hidden]{display:none}",
    ".uu-dau{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:0 0 8px}",
    ".uu-eb{font-size:.6rem;font-weight:500;letter-spacing:.26em;text-transform:uppercase;color:var(--uu-nau)}",
    ".uu-x{flex:none;display:grid;place-items:center;width:34px;height:34px;margin:-10px -12px -10px 0;padding:0;border:0;background:none;color:var(--uu-nau);cursor:pointer;font-size:22px;line-height:1}",
    ".uu-x:hover{color:var(--uu-ink)}",
    ".uu-tit{margin:0 0 14px;font-family:var(--serif,'Playfair Display',Georgia,serif);font-weight:400;font-size:1.62rem;line-height:1.15;letter-spacing:-.005em}",
    ".uu-tit em{font-style:italic;color:var(--uu-ruou)}",
    ".uu-ds{list-style:none;margin:0 0 16px;padding:12px 0 0;border-top:1px solid var(--uu-vien);display:grid;gap:9px}",
    ".uu-ds li{position:relative;padding-left:16px;line-height:1.3}",
    ".uu-ds li::before{content:'';position:absolute;left:0;top:.55em;width:6px;height:1px;background:var(--uu-ruou)}",
    ".uu-ds b{display:block;font-size:.8rem;font-weight:500;letter-spacing:.01em}",
    ".uu-gon{display:none}",
    ".uu-ds i{display:block;font-family:var(--serif,'Playfair Display',Georgia,serif);font-size:.82rem;color:var(--uu-nau)}",
    ".uu-hang{display:flex;align-items:stretch;gap:10px}",
    ".uu-dem{flex:none;display:flex;flex-direction:column;justify-content:center;min-width:104px;padding:7px 12px;background:var(--uu-kem);text-align:center}",
    ".uu-dem small{font-size:.54rem;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:var(--uu-nau)}",
    ".uu-dem span{font-size:1.02rem;font-weight:500;letter-spacing:.06em;font-variant-numeric:tabular-nums;color:var(--uu-ruou)}",
    ".uu-nut{flex:1;display:inline-flex;align-items:center;justify-content:center;gap:9px;padding:12px 14px;background:var(--uu-ruou);color:#fff;text-decoration:none;",
    "  font-size:.64rem;font-weight:500;letter-spacing:.17em;text-transform:uppercase;text-align:center;line-height:1.35;transition:background .2s}",
    ".uu-nut:hover{background:#611E2D;color:#fff;opacity:1}",
    ".uu-nut svg{flex:none}",
    ".uu-nhan{display:inline-flex;align-items:center;gap:9px;height:48px;box-sizing:border-box;padding:0 16px 0 14px;border:1px solid var(--uu-vien);border-radius:999px;background:var(--ivory,#FBF9F6);",
    "  box-shadow:0 10px 26px rgba(27,25,23,.16);cursor:pointer;font-size:.62rem;font-weight:500;letter-spacing:.16em;text-transform:uppercase;white-space:nowrap}",
    ".uu-nhan svg{flex:none;color:var(--uu-ruou)}",
    ".uu-nhan span:last-child{color:var(--uu-ruou);font-variant-numeric:tabular-nums;letter-spacing:.08em}",
    "@media(max-width:640px){",
    "  .uu-the{left:12px;right:12px;bottom:calc(12px + env(safe-area-inset-bottom));width:auto;max-width:none;padding:16px 18px 16px}",
    "  .uu-dau{margin-bottom:6px}",
    "  .uu-tit{font-size:1.32rem;margin-bottom:7px}",
    "  .uu-ds{display:none}",
    "  .uu-gon{display:block;margin:0 0 12px;font-size:.76rem;line-height:1.35}",
    "  .uu-gon b{font-weight:500}",
    "  .uu-gon i{font-family:var(--serif,'Playfair Display',Georgia,serif);font-size:.84rem;color:var(--uu-nau)}",
    "  .uu-dem{min-width:96px;padding:6px 10px}",
    "  .uu-nut{padding:11px 10px;letter-spacing:.14em}",
    "  .uu-nhan{right:12px;bottom:calc(86px + env(safe-area-inset-bottom))}",
    "}",
    "@media(prefers-reduced-motion:reduce){.uu-the{transition:none}}"
  ].join("\n");
  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  var ICON_WA = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>';
  var ICON_TAG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.5"/></svg>';

  var the = document.createElement("div");
  the.className = "uu-the"; the.hidden = true;
  the.setAttribute("role", "dialog"); the.setAttribute("aria-live", "polite");
  the.innerHTML =
    '<div class="uu-dau"><span class="uu-eb"></span><button type="button" class="uu-x">&times;</button></div>' +
    '<p class="uu-tit"></p><p class="uu-gon"></p>' +
    '<ul class="uu-ds"><li><b class="uu-y1"></b><i class="uu-y1p"></i></li><li><b class="uu-y2"></b><i class="uu-y2p"></i></li></ul>' +
    '<div class="uu-hang"><div class="uu-dem"><small></small><span></span></div>' +
    '<a class="uu-nut" target="_blank" rel="noopener">' + ICON_WA + '<span></span></a></div>';
  var nhan = document.createElement("button");
  nhan.type = "button"; nhan.className = "uu-nhan"; nhan.hidden = true;
  nhan.innerHTML = ICON_TAG + '<span class="uu-nhan-chu"></span><span class="uu-nhan-gio"></span>';
  document.body.appendChild(the); document.body.appendChild(nhan);
  function q(s){ return the.querySelector(s); }

  function viet(){
    var c = CHU[ngu()];
    q(".uu-eb").textContent = c.nhan;
    q(".uu-tit").innerHTML = c.tit; q(".uu-gon").innerHTML = c.gon;
    q(".uu-y1").textContent = c.y1; q(".uu-y1p").textContent = c.y1p;
    q(".uu-y2").textContent = c.y2; q(".uu-y2p").textContent = c.y2p;
    q(".uu-dem small").textContent = c.con;
    q(".uu-nut span").textContent = c.nut;
    q(".uu-x").setAttribute("aria-label", c.dong);
    the.setAttribute("aria-label", c.the);
    nhan.querySelector(".uu-nhan-chu").textContent = c.the;
  }
  viet();
  try{ new MutationObserver(viet).observe(document.documentElement, { attributes:true, attributeFilter:["lang"] }); }catch(_){}

  function hai(n){ return (n < 10 ? "0" : "") + n; }
  function conLai(){
    var s = Math.max(0, Math.floor((HET - Date.now()) / 1000));
    return hai(Math.floor(s / 3600)) + ":" + hai(Math.floor(s / 60) % 60) + ":" + hai(s % 60);
  }
  function hanVN(){
    try{ return new Intl.DateTimeFormat("en-GB", { timeZone:"Asia/Ho_Chi_Minh", day:"numeric", month:"short", hour:"2-digit", minute:"2-digit", hour12:false }).format(new Date(HET)) + " Vietnam time"; }
    catch(_){ return new Date(HET).toUTCString(); }
  }
  function linkWa(){
    var ms = ""; try{ ms = window.dlaGio ? window.dlaGio.ms() : ""; }catch(_){}
    var t = "Hi Dolinhanh Bridal, I'd like to book a ready-to-wear gown with the offer " + MA + " (valid until " + hanVN() + ").";
    if(ms) t += "\nGowns I like: " + ms;
    return "https://wa.me/" + WA + "?text=" + encodeURIComponent(t);
  }
  var nut = q(".uu-nut");
  function capNhatLink(){ nut.href = linkWa(); }
  capNhatLink();
  nut.addEventListener("mouseenter", capNhatLink);
  nut.addEventListener("touchstart", capNhatLink, { passive:true });
  nut.addEventListener("focus", capNhatLink);
  nut.addEventListener("click", function(){
    capNhatLink();
    try{ if(typeof fbq === "function") fbq("trackCustom", "Offer100Book"); }catch(_){}
  });

  /* mọi link WhatsApp khác trên trang: còn hạn thì thêm dòng mã ưu đãi vào tin soạn sẵn (bấm lúc nào sửa lúc đó) */
  function kemMa(e){
    if(Date.now() >= HET) return;
    var a = e.target && e.target.closest && e.target.closest('a[href*="wa.me/"]');
    if(!a || a === nut) return;
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
    q(".uu-dem span").textContent = g;
    nhan.querySelector(".uu-nhan-gio").textContent = g;
  }
  tick(); hen = setInterval(tick, 1000);

  var moLuc = 0, yMo = 0;
  function mo(){
    nhan.hidden = true; the.hidden = false; capNhatLink();
    requestAnimationFrame(function(){ requestAnimationFrame(function(){ the.classList.add("hien"); }); });
    moLuc = Date.now(); yMo = scrollY;
  }
  function thu(){
    dat(K_DONG, "1");
    the.classList.remove("hien");
    setTimeout(function(){ the.hidden = true; if(Date.now() < HET) nhan.hidden = false; }, 260);
  }
  q(".uu-x").addEventListener("click", thu);
  nhan.addEventListener("click", mo);

  /* điện thoại: khách cuộn tiếp ~1 màn hình mà không bấm → thu về nhãn nhỏ cho khỏi che nội dung */
  addEventListener("scroll", function(){
    if(the.hidden || !moLuc || Date.now() - moLuc < 1500) return;
    if(innerWidth <= 640 && Math.abs(scrollY - yMo) > innerHeight * 0.9) thu();
  }, { passive:true });

  if(lay(K_DONG) === "1"){ nhan.hidden = false; return; }

  /* lần đầu: hiện sau 7 giây hoặc khi cuộn 500px — đợi nếu đang mở ảnh phóng to / giỏ hàng / form đặt lịch */
  var daHien = false;
  function dangBan(){
    return [document.getElementById("phongTo"), document.getElementById("popNen"), document.querySelector(".gh-nen")]
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
