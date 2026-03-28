<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>FarmPulse — Farm to Table Marketplace</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Inter',system-ui,sans-serif;background:#f9fafb;color:#111827;-webkit-font-smoothing:antialiased}
:root{
  --g50:#f0fdf4;--g100:#dcfce7;--g200:#bbf7d0;--g300:#86efac;--g400:#4ade80;
  --g500:#22c55e;--g600:#16a34a;--g700:#15803d;--g800:#166534;--g900:#14532d;
  --e600:#059669;--e700:#047857;--e800:#065f46;--e900:#064e3b;
  --r50:#fef2f2;--r200:#fecaca;--r500:#ef4444;--r600:#dc2626;--r700:#b91c1c;
  --b50:#eff6ff;--b600:#2563eb;
  --a400:#fbbf24;--a900:#78350f;
  --gray50:#f9fafb;--gray100:#f3f4f6;--gray200:#e5e7eb;
  --gray400:#9ca3af;--gray500:#6b7280;--gray600:#4b5563;
  --gray700:#374151;--gray800:#1f2937;--gray900:#111827;
}
a{text-decoration:none;color:inherit}
button{font-family:inherit;cursor:pointer}
input,select,textarea{font-family:inherit}

@keyframes spin{to{transform:rotate(360deg)}}
@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
@keyframes slideDown{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}
@keyframes scaleIn{from{opacity:0;transform:scale(0.93)}to{opacity:1;transform:scale(1)}}
@keyframes toastIn{from{opacity:0;transform:translateX(80px)}to{opacity:1;transform:none}}

.page{display:none}
.page.active{display:block}
.hidden{display:none!important}

/* ── NAVBAR ── */
#navbar{position:fixed;top:0;left:0;right:0;z-index:100;background:rgba(255,255,255,.96);backdrop-filter:blur(12px);border-bottom:1px solid var(--g100);box-shadow:0 1px 4px rgba(0,0,0,.06)}
.nav-wrap{max-width:1280px;margin:0 auto;padding:0 24px;height:64px;display:flex;align-items:center;justify-content:space-between}
.nav-logo{display:flex;align-items:center;gap:10px;cursor:pointer}
.nav-logo-icon{width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,var(--g500),var(--e700));display:flex;align-items:center;justify-content:center;font-size:1.1rem;box-shadow:0 2px 8px rgba(22,163,74,.3)}
.nav-logo span{font-size:1.2rem;font-weight:800;color:var(--g800)}
.nav-links{display:flex;align-items:center;gap:4px}
.nav-link{padding:8px 14px;border-radius:10px;font-size:.875rem;font-weight:500;color:var(--gray600);background:none;border:none;cursor:pointer;transition:all .15s}
.nav-link:hover{background:var(--g50);color:var(--g700)}
.nav-link.active{background:var(--g100);color:var(--g800);font-weight:600}
.nav-right{display:flex;align-items:center;gap:8px}
.lang-group{display:flex;gap:4px}
.lang-btn{padding:6px 10px;border-radius:8px;border:1px solid var(--gray200);background:#fff;font-size:.75rem;cursor:pointer;transition:all .15s}
.lang-btn:hover{border-color:var(--g300)}
.lang-btn.active{background:var(--g600);color:#fff;border-color:var(--g600)}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;border:none;border-radius:12px;font-family:inherit;font-weight:700;cursor:pointer;transition:all .15s;font-size:.875rem}
.btn-p{background:var(--g600);color:#fff;padding:9px 18px}
.btn-p:hover{background:var(--g700)}
.btn-p:disabled{opacity:.6;cursor:not-allowed}
.btn-o{background:none;border:1.5px solid var(--g300);color:var(--g700);padding:8px 18px}
.btn-o:hover{background:var(--g50)}
.btn-d{background:var(--r500);color:#fff;padding:9px 18px}
.btn-d:hover{background:var(--r600)}
.btn-ghost{background:none;border:none;padding:8px 12px;border-radius:10px;color:var(--r600)}
.btn-ghost:hover{background:var(--r50)}
.user-chip{display:flex;align-items:center;gap:8px;background:var(--g50);border-radius:12px;padding:6px 12px}
.uavatar{width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,var(--g400),var(--e600));display:flex;align-items:center;justify-content:center;color:#fff;font-size:.75rem;font-weight:700;flex-shrink:0}
.ham{display:none;background:none;border:none;padding:8px;border-radius:10px;cursor:pointer;font-size:1.3rem}
.ham:hover{background:var(--g50)}
#mob-menu{display:none;background:#fff;border-top:1px solid var(--g100);padding:12px 16px 16px}
#mob-menu.open{display:block;animation:slideDown .2s ease}
.mob-link{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:10px;font-size:.875rem;font-weight:500;color:var(--gray700);background:none;border:none;width:100%;text-align:left;cursor:pointer;transition:all .15s}
.mob-link:hover{background:var(--g50);color:var(--g700)}

/* ── TOAST ── */
#toasts{position:fixed;top:76px;right:16px;z-index:9999;display:flex;flex-direction:column;gap:8px;pointer-events:none}
.toast{display:flex;align-items:flex-start;gap:10px;padding:12px 16px;border-radius:14px;border:1px solid;box-shadow:0 4px 16px rgba(0,0,0,.1);max-width:320px;font-size:.875rem;font-weight:500;animation:toastIn .25s ease;pointer-events:auto}
.t-ok{background:var(--g50);border-color:var(--g200);color:var(--g800)}
.t-err{background:var(--r50);border-color:var(--r200);color:var(--r700)}
.t-warn{background:#fffbeb;border-color:#fde68a;color:#92400e}
.t-x{background:none;border:none;cursor:pointer;opacity:.6;margin-left:auto;flex-shrink:0;font-size:1rem}
.t-x:hover{opacity:1}

/* ── SPINNER ── */
.sp{border-radius:50%;border:3px solid var(--g200);border-top-color:var(--g600);animation:spin .7s linear infinite;flex-shrink:0}
.sp-s{width:16px;height:16px;border-width:2px}
.sp-m{width:32px;height:32px}
.sp-l{width:48px;height:48px}

/* ── LOADING / EMPTY ── */
.lbox{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:80px 24px;gap:16px}
.ebox{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:80px 24px;gap:14px;text-align:center}
.eicon{width:80px;height:80px;background:var(--g50);border-radius:24px;display:flex;align-items:center;justify-content:center;font-size:2.5rem}
.errbox{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:80px 24px;gap:14px;text-align:center}
.erricon{width:64px;height:64px;background:var(--r50);border-radius:20px;display:flex;align-items:center;justify-content:center;font-size:2rem}

/* ── HERO ── */
.hero{min-height:calc(100vh - 64px);display:flex;align-items:center;position:relative;overflow:hidden;padding:80px 24px}
.hero-bg{position:absolute;inset:0;background:linear-gradient(135deg,rgba(4,47,28,.95) 0%,rgba(4,47,28,.8) 50%,rgba(4,47,28,.4) 100%)}
.hero-content{position:relative;z-index:2;max-width:680px}
.hero-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.25);color:#fff;padding:8px 18px;border-radius:9999px;font-size:.875rem;margin-bottom:24px}
.hero h1{font-size:clamp(2.4rem,6vw,4rem);font-weight:900;color:#fff;line-height:1.08;margin-bottom:20px}
.hero h1 span{color:#86efac}
.hero p{font-size:1.1rem;color:#bbf7d0;margin-bottom:32px;line-height:1.7;max-width:520px}
.hero-btns{display:flex;flex-wrap:wrap;gap:12px;margin-bottom:48px}
.hbp{display:inline-flex;align-items:center;gap:8px;background:var(--g500);color:#fff;font-weight:700;padding:14px 28px;border-radius:18px;font-size:1rem;border:none;cursor:pointer;transition:all .2s;box-shadow:0 8px 24px rgba(34,197,94,.3)}
.hbp:hover{background:var(--g400);transform:translateY(-1px)}
.hbs{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.14);border:1.5px solid rgba(255,255,255,.35);color:#fff;font-weight:600;padding:14px 28px;border-radius:18px;font-size:1rem;cursor:pointer;transition:all .2s}
.hbs:hover{background:rgba(255,255,255,.24)}
.hero-stats{display:flex;flex-wrap:wrap;gap:14px}
.hstat{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);border-radius:14px;padding:12px 20px}
.hstat .v{font-size:1.5rem;font-weight:900;color:#fff}
.hstat .l{font-size:.75rem;color:#bbf7d0}

/* ── SECTIONS ── */
.sec{padding:80px 24px}
.mw{max-width:1280px;margin:0 auto;padding:0 24px}
.stitle{font-size:2rem;font-weight:900;color:var(--gray900);margin-bottom:8px}
.ssub{font-size:1.05rem;color:var(--gray500);margin-bottom:48px}

/* ── ROLE CARDS ── */
.rgrid{display:grid;grid-template-columns:1fr 1fr;gap:24px}
.rcard{border-radius:24px;padding:32px;color:#fff;position:relative;overflow:hidden}
.rcard.f{background:linear-gradient(135deg,var(--g600),var(--e800))}
.rcard.b{background:linear-gradient(135deg,#2563eb,#4f46e5)}
.rcard::before{content:'';position:absolute;top:-40px;right:-40px;width:160px;height:160px;background:rgba(255,255,255,.1);border-radius:50%}
.rcard h2{font-size:1.4rem;font-weight:800;margin:12px 0 8px}
.rcard p{opacity:.88;font-size:.9rem;margin-bottom:16px;line-height:1.6}
.rcard ul{list-style:none;margin-bottom:24px}
.rcard ul li{display:flex;align-items:center;gap:8px;font-size:.875rem;margin-bottom:8px;opacity:.9}
.rcbtn{display:inline-flex;align-items:center;gap:8px;background:#fff;font-weight:700;padding:12px 22px;border-radius:12px;font-size:.875rem;border:none;cursor:pointer;transition:all .15s}
.rcard.f .rcbtn{color:var(--g700)}
.rcard.b .rcbtn{color:#2563eb}
.rcbtn:hover{opacity:.9;transform:translateY(-1px)}

/* ── FEATURES ── */
.fgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px}
.fcard{background:#fff;border-radius:18px;padding:24px;border:1px solid var(--gray100);box-shadow:0 1px 4px rgba(0,0,0,.05);transition:box-shadow .2s}
.fcard:hover{box-shadow:0 4px 16px rgba(0,0,0,.08)}
.ficon{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1.4rem;margin-bottom:14px}

/* ── STEPS ── */
.sgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:32px}
.step{text-align:center}
.sicon{width:64px;height:64px;border-radius:18px;background:linear-gradient(135deg,var(--g500),var(--e700));display:flex;align-items:center;justify-content:center;margin:0 auto 14px;box-shadow:0 8px 24px rgba(22,163,74,.2);font-size:1.6rem}
.snum{font-size:.75rem;font-weight:700;color:var(--g500);margin-bottom:4px}

/* ── VILLAGES ── */
.vsec{background:linear-gradient(135deg,var(--g900),var(--e900));padding:64px 24px;text-align:center}
.vtags{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-top:28px}
.vtag{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);color:#fff;padding:8px 16px;border-radius:9999px;font-size:.875rem;font-weight:500;cursor:pointer;transition:all .15s}
.vtag:hover{background:rgba(255,255,255,.22)}

/* ── FOOTER ── */
.footer{background:var(--g900);color:#bbf7d0;padding:32px 24px}
.footer-in{max-width:1280px;margin:0 auto;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px}

/* ── AUTH ── */
.auth-page{min-height:100vh;padding-top:64px;background:linear-gradient(135deg,var(--g50) 0%,#ecfdf5 50%,#f0fdfa 100%);display:flex;align-items:center;justify-content:center;padding:80px 16px}
.acard{background:#fff;border-radius:28px;box-shadow:0 25px 60px rgba(0,0,0,.12);width:100%;max-width:440px;overflow:hidden;animation:scaleIn .3s ease}
.ahdr{background:linear-gradient(135deg,var(--g600),var(--e800));padding:32px;color:#fff}
.ahdr h1{font-size:1.75rem;font-weight:900;margin-top:16px}
.ahdr p{color:#bbf7d0;font-size:.875rem;margin-top:4px}
.abody{padding:28px}
.fg{margin-bottom:16px}
.flbl{display:block;font-size:.875rem;font-weight:600;color:var(--gray700);margin-bottom:6px}
.finp{width:100%;padding:12px 16px;border:1.5px solid var(--gray200);border-radius:12px;font-size:.875rem;font-family:inherit;transition:all .15s;outline:none;background:#fff;color:var(--gray900)}
.finp:hover{border-color:var(--g300)}
.finp:focus{border-color:var(--g500);box-shadow:0 0 0 3px rgba(34,197,94,.12)}
.finp.err{border-color:#fca5a5;background:var(--r50)}
.fwrap{position:relative}
.fwrap .finp{padding-left:40px}
.fwrap .fwrap-icon{position:absolute;left:13px;top:50%;transform:translateY(-50%);color:var(--gray400);pointer-events:none;font-size:1rem}
.fwrap .feye{position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;color:var(--gray400);cursor:pointer;padding:2px;font-size:1rem}
.fwrap .feye:hover{color:var(--gray600)}
.ferr{font-size:.75rem;color:var(--r600);margin-top:4px;font-weight:500;display:none}
.aerr{background:var(--r50);border:1px solid var(--r200);color:var(--r700);padding:12px 16px;border-radius:12px;font-size:.875rem;margin-bottom:16px;font-weight:500;display:none}
.rpick{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.ropt{display:flex;flex-direction:column;align-items:center;gap:6px;padding:16px;border:2px solid var(--gray200);border-radius:14px;cursor:pointer;transition:all .15s;background:#fff;font-size:.875rem;font-weight:600;color:var(--gray600)}
.ropt:hover{border-color:var(--g300)}
.ropt.sel{border-color:var(--g500);background:var(--g50);color:var(--g700)}
.atog{text-align:center;font-size:.875rem;color:var(--gray600);margin-top:20px}
.atog a{color:var(--g600);font-weight:700;cursor:pointer}
.atog a:hover{color:var(--g700)}

/* ── DASHBOARD ── */
.dpage{padding-top:64px;min-height:100vh;background:var(--gray50)}
.pin{max-width:1280px;margin:0 auto;padding:32px 24px}
.phdr{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:16px;margin-bottom:32px}
.ptitle{font-size:1.875rem;font-weight:900;color:var(--gray900)}
.psub{color:var(--gray500);margin-top:4px;font-size:.9rem}
.sgrid2{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:32px}
.scard{background:#fff;border-radius:18px;padding:20px;border:1px solid var(--gray100);box-shadow:0 1px 4px rgba(0,0,0,.05)}
.scard-icon{width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;margin-bottom:12px;font-size:1.2rem}
.scard-val{font-size:1.5rem;font-weight:900;color:var(--gray900)}
.scard-lbl{font-size:.8rem;color:var(--gray500);margin-top:2px}
.panel{background:#fff;border-radius:18px;border:1px solid var(--gray100);box-shadow:0 1px 4px rgba(0,0,0,.05);overflow:hidden}
.phdr2{padding:16px 24px;border-bottom:1px solid var(--gray100);display:flex;align-items:center;justify-content:space-between}
.pbody{padding:24px}
.cgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:20px}

/* ── CROP CARD ── */
.ccard{background:#fff;border-radius:18px;border:1px solid var(--gray100);box-shadow:0 1px 4px rgba(0,0,0,.05);overflow:hidden;transition:box-shadow .2s,border-color .2s;animation:fadeUp .3s ease both;position:relative}
.ccard:hover{box-shadow:0 4px 16px rgba(0,0,0,.08);border-color:var(--g200)}
.ccard.best{border-color:#fcd34d;box-shadow:0 0 0 2px #fde68a}
.cbar{height:4px;background:linear-gradient(90deg,var(--g400),var(--e600))}
.cbar.gold{background:linear-gradient(90deg,#fbbf24,#f59e0b)}
.cbody{padding:16px}
.chdr{display:flex;align-items:flex-start;gap:12px;margin-bottom:12px}
.cemoji{width:48px;height:48px;background:var(--g50);border:1px solid var(--g100);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1.5rem;flex-shrink:0}
.cname{font-size:1.05rem;font-weight:700;color:var(--gray900);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ccat{display:inline-block;font-size:.7rem;color:var(--g700);background:var(--g50);border:1px solid var(--g100);padding:2px 8px;border-radius:9999px;margin-top:4px}
.cprice{font-size:1.75rem;font-weight:900;color:var(--g700);margin-bottom:10px}
.cprice span{font-size:.875rem;font-weight:400;color:var(--gray400)}
.cinfo{display:flex;flex-direction:column;gap:6px;font-size:.85rem;color:var(--gray600);margin-bottom:10px}
.crow{display:flex;align-items:center;gap:8px}
.cdesc{font-size:.75rem;color:var(--gray500);background:var(--gray50);border-radius:10px;padding:8px 10px;margin-bottom:10px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.cfoot{border-top:1px solid var(--gray100);padding-top:10px;display:flex;gap:8px}
.cbtn-contact{width:100%;display:flex;align-items:center;justify-content:center;gap:8px;background:var(--g600);color:#fff;border:none;border-radius:12px;padding:10px;font-size:.875rem;font-weight:700;cursor:pointer;transition:all .15s;text-decoration:none}
.cbtn-contact:hover{background:var(--g700)}
.cbtn-edit{flex:1;display:flex;align-items:center;justify-content:center;gap:6px;background:#eff6ff;color:#2563eb;border:none;border-radius:12px;padding:10px;font-size:.8rem;font-weight:600;cursor:pointer;transition:all .15s}
.cbtn-edit:hover{background:#dbeafe}
.cbtn-del{flex:1;display:flex;align-items:center;justify-content:center;gap:6px;background:var(--r50);color:var(--r600);border:none;border-radius:12px;padding:10px;font-size:.8rem;font-weight:600;cursor:pointer;transition:all .15s}
.cbtn-del:hover{background:#fee2e2}
.best-badge{position:absolute;top:12px;right:12px;z-index:5;background:var(--a400);color:var(--a900);font-size:.7rem;font-weight:700;padding:4px 10px;border-radius:9999px}
.sold-ov{position:absolute;inset:0;background:rgba(243,244,246,.82);z-index:10;display:flex;align-items:center;justify-content:center;border-radius:18px}
.sold-badge{background:var(--gray600);color:#fff;font-size:.875rem;font-weight:700;padding:8px 20px;border-radius:9999px}

/* ── BROWSE ── */
.bhdr{background:linear-gradient(135deg,var(--g700),var(--e800));padding:40px 24px 32px;color:#fff}
.bhdr h1{font-size:1.875rem;font-weight:900;margin-bottom:6px}
.swrap{position:relative;max-width:640px;margin-top:20px}
.swrap input{width:100%;padding:14px 48px;background:#fff;border:none;border-radius:18px;font-size:.9rem;font-family:inherit;box-shadow:0 4px 20px rgba(0,0,0,.12);outline:none;color:var(--gray900)}
.swrap input::placeholder{color:var(--gray400)}
.swrap input:focus{box-shadow:0 4px 20px rgba(0,0,0,.12),0 0 0 3px rgba(34,197,94,.2)}
.sicon2{position:absolute;left:16px;top:50%;transform:translateY(-50%);color:var(--gray400);pointer-events:none;font-size:1.1rem}
.sclear{position:absolute;right:14px;top:50%;transform:translateY(-50%);background:none;border:none;color:var(--gray400);cursor:pointer;font-size:1rem;padding:4px;display:none}
.sclear:hover{color:var(--gray600)}
.fbar{display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin-bottom:20px}
.fsel{padding:10px 32px 10px 14px;border:1.5px solid var(--gray200);border-radius:12px;font-size:.875rem;font-family:inherit;background:#fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E") no-repeat right 10px center;appearance:none;cursor:pointer;outline:none;transition:all .15s;color:var(--gray700)}
.fsel:hover{border-color:var(--g300)}
.fsel:focus{border-color:var(--g500);box-shadow:0 0 0 3px rgba(34,197,94,.1)}
.ppanel{background:#fff;border:1.5px solid var(--gray200);border-radius:16px;padding:16px;display:flex;flex-wrap:wrap;gap:16px;align-items:flex-end;margin-bottom:20px;animation:slideDown .2s ease;display:none}
.ppanel input{width:120px;padding:8px 12px;border:1.5px solid var(--gray200);border-radius:10px;font-size:.875rem;font-family:inherit;outline:none;color:var(--gray900)}
.ppanel input:focus{border-color:var(--g500)}
.plbl{font-size:.75rem;font-weight:600;color:var(--gray600);display:block;margin-bottom:6px}
.atag{display:inline-flex;align-items:center;gap:6px;padding:6px 12px;border-radius:9999px;font-size:.75rem;font-weight:600}
.atag-x{background:none;border:none;cursor:pointer;opacity:.7;padding:0;display:flex;align-items:center}
.atag-x:hover{opacity:1}
.cpill{display:flex;align-items:center;gap:6px;padding:10px 16px;border:1.5px solid var(--r200);background:var(--r50);color:var(--r600);border-radius:12px;font-size:.875rem;font-weight:600;cursor:pointer;transition:all .15s;display:none}
.cpill:hover{background:#fee2e2}
.rinfo{font-size:.875rem;color:var(--gray500);margin-bottom:20px}
.rinfo strong{color:var(--gray800)}

/* ── MODAL ── */
.modal-bg{position:fixed;inset:0;background:rgba(0,0,0,.5);backdrop-filter:blur(4px);z-index:200;display:flex;align-items:center;justify-content:center;padding:16px;display:none}
.mbox{background:#fff;border-radius:24px;box-shadow:0 25px 60px rgba(0,0,0,.25);width:100%;max-width:500px;max-height:90vh;overflow-y:auto;animation:scaleIn .25s ease}
.mhdr{position:sticky;top:0;background:#fff;border-bottom:1px solid var(--gray100);padding:16px 24px;display:flex;align-items:center;justify-content:space-between;border-radius:24px 24px 0 0;z-index:10}
.mhdr h2{font-size:1.1rem;font-weight:700;color:var(--gray900);display:flex;align-items:center;gap:8px}
.mclose{background:none;border:none;padding:6px;border-radius:10px;cursor:pointer;color:var(--gray500);font-size:1.2rem;transition:all .15s}
.mclose:hover{background:var(--gray100)}
.mbody{padding:24px}
.mbox-sm{max-width:380px}
.conf-icon{width:56px;height:56px;background:var(--r50);border-radius:16px;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:1.75rem}

/* ── RESPONSIVE ── */
@media(max-width:768px){
  .nav-links,.nav-right{display:none}
  .ham{display:flex;align-items:center;justify-content:center}
  .rgrid{grid-template-columns:1fr}
  .sgrid{grid-template-columns:1fr}
  .sgrid2{grid-template-columns:1fr 1fr}
  .hero h1{font-size:2.2rem}
  .sec{padding:60px 16px}
}
@media(max-width:480px){
  .sgrid2{grid-template-columns:1fr 1fr}
  .abody{padding:20px}
  .ahdr{padding:24px}
}
</style>
</head>
<body>

<!-- NAVBAR -->
<nav id="navbar">
  <div class="nav-wrap">
    <div class="nav-logo" onclick="go('home')">
      <div class="nav-logo-icon">🌱</div>
      <span id="n-app">FarmPulse</span>
    </div>
    <div class="nav-links">
      <button class="nav-link active" id="nl-home" onclick="go('home')">Home</button>
      <button class="nav-link" id="nl-browse" onclick="go('browse')">Browse Crops</button>
      <button class="nav-link hidden" id="nl-dash" onclick="go('dashboard')">Dashboard</button>
    </div>
    <div class="nav-right">
      <div class="lang-group">
        <button class="lang-btn active" onclick="setLang('en')">🇬🇧 EN</button>
        <button class="lang-btn" onclick="setLang('te')">🇮🇳 TE</button>
        <button class="lang-btn" onclick="setLang('hi')">🇮🇳 HI</button>
      </div>
      <div id="n-auth" style="display:flex;gap:8px">
        <button class="btn btn-o" onclick="go('login')" id="n-lbtn">Login</button>
        <button class="btn btn-p" onclick="go('signup')" id="n-sbtn">Sign Up</button>
      </div>
      <div id="n-user" style="display:none;align-items:center;gap:8px">
        <div class="user-chip">
          <div class="uavatar" id="n-av">R</div>
          <div>
            <div style="font-weight:700;font-size:.875rem;color:var(--g800)" id="n-un">Ravi</div>
            <div style="font-size:.7rem;color:var(--g600);text-transform:capitalize" id="n-ur">farmer</div>
          </div>
        </div>
        <button class="btn-ghost btn" onclick="doLogout()">🚪 <span id="n-out">Logout</span></button>
      </div>
    </div>
    <button class="ham" onclick="toggleMob()">☰</button>
  </div>
  <div id="mob-menu">
    <button class="mob-link" onclick="go('home');closeMob()">🏠 <span id="mn-home">Home</span></button>
    <button class="mob-link" onclick="go('browse');closeMob()">🛒 <span id="mn-browse">Browse Crops</span></button>
    <button class="mob-link hidden" id="mn-dbtn" onclick="go('dashboard');closeMob()">📊 <span id="mn-dash">Dashboard</span></button>
    <div style="border-top:1px solid var(--gray100);margin:10px 0;padding-top:10px;display:flex;gap:6px">
      <button class="lang-btn active" onclick="setLang('en');closeMob()">🇬🇧 EN</button>
      <button class="lang-btn" onclick="setLang('te');closeMob()">🇮🇳 TE</button>
      <button class="lang-btn" onclick="setLang('hi');closeMob()">🇮🇳 HI</button>
    </div>
    <div id="mn-auth" style="display:flex;gap:8px;padding-top:8px;border-top:1px solid var(--gray100)">
      <button class="btn btn-o" style="flex:1" onclick="go('login');closeMob()">Login</button>
      <button class="btn btn-p" style="flex:1" onclick="go('signup');closeMob()">Sign Up</button>
    </div>
    <div id="mn-user" style="display:none;padding-top:8px;border-top:1px solid var(--gray100)">
      <div style="display:flex;align-items:center;gap:10px;padding:8px 4px">
        <div class="uavatar" id="mn-av">R</div>
        <div><div style="font-weight:700;font-size:.875rem" id="mn-un">Ravi</div><div style="font-size:.7rem;color:var(--gray500);text-transform:capitalize" id="mn-ur">farmer</div></div>
      </div>
      <button class="mob-link" style="color:var(--r600)" onclick="doLogout();closeMob()">🚪 <span id="mn-out">Logout</span></button>
    </div>
  </div>
</nav>

<!-- TOASTS -->
<div id="toasts"></div>

<!-- ══════════════ HOME ══════════════ -->
<div id="page-home" class="page active">
  <div class="hero" style="padding-top:64px">
    <div class="hero-bg"></div>
    <div class="mw hero-content">
      <div class="hero-badge">🌱 Andhra Pradesh's #1 Farm Marketplace</div>
      <h1 id="h-title">Fresh from Farm<br/><span>to Your Table</span></h1>
      <p id="h-sub">Connect directly with local farmers. Get the freshest produce at the best prices.</p>
      <div class="hero-btns" id="h-btns">
        <button class="hbp" onclick="go('signup')">Get Started →</button>
        <button class="hbs" onclick="go('browse')">🛒 Browse Crops</button>
      </div>
      <div class="hero-stats">
        <div class="hstat"><div class="v">24</div><div class="l">Villages Covered</div></div>
        <div class="hstat"><div class="v">8+</div><div class="l">Crop Categories</div></div>
        <div class="hstat"><div class="v">100%</div><div class="l">Direct Connections</div></div>
      </div>
    </div>
  </div>

  <div class="sec" style="background:#fff">
    <div class="mw">
      <div class="rgrid">
        <div class="rcard f">
          <div style="font-size:2rem">🌾</div>
          <h2 id="h-ff">For Farmers</h2>
          <p id="h-fd">List your crops, set your price, and connect directly with buyers in your region.</p>
          <ul><li>✅ List unlimited crops</li><li>✅ Set your own prices</li><li>✅ Manage inventory easily</li><li>✅ Connect with buyers directly</li></ul>
          <button class="rcbtn" onclick="go('signup')">Start Selling →</button>
        </div>
        <div class="rcard b">
          <div style="font-size:2rem">🛒</div>
          <h2 id="h-bf">For Buyers</h2>
          <p id="h-bd">Browse fresh produce from local farmers, filter by village, compare prices, and buy directly.</p>
          <ul><li>✅ Filter by village &amp; category</li><li>✅ Compare prices instantly</li><li>✅ See best deals highlighted</li><li>✅ Contact farmers directly</li></ul>
          <button class="rcbtn" onclick="go('browse')">Browse Crops →</button>
        </div>
      </div>
    </div>
  </div>

  <div class="sec" style="background:var(--gray50)">
    <div class="mw">
      <div style="text-align:center;margin-bottom:48px"><h2 class="stitle">Why FarmPulse?</h2><p class="ssub">Built for the farming communities of Andhra Pradesh</p></div>
      <div class="fgrid">
        <div class="fcard"><div class="ficon" style="background:var(--g50)">🌱</div><h3 style="font-weight:700;margin-bottom:6px">Direct from Farm</h3><p style="font-size:.875rem;color:var(--gray500)">No middlemen. Buy directly from farmers in your region.</p></div>
        <div class="fcard"><div class="ficon" style="background:#eff6ff">📉</div><h3 style="font-weight:700;margin-bottom:6px">Best Prices</h3><p style="font-size:.875rem;color:var(--gray500)">Compare prices across villages and find best deals automatically.</p></div>
        <div class="fcard"><div class="ficon" style="background:#f5f3ff">📍</div><h3 style="font-weight:700;margin-bottom:6px">Local Villages</h3><p style="font-size:.875rem;color:var(--gray500)">Filter crops by 24 specific villages in West Godavari district.</p></div>
        <div class="fcard"><div class="ficon" style="background:#fffbeb">🛡️</div><h3 style="font-weight:700;margin-bottom:6px">Verified Farmers</h3><p style="font-size:.875rem;color:var(--gray500)">All listings are from registered and verified local farmers.</p></div>
        <div class="fcard"><div class="ficon" style="background:var(--r50)">⚡</div><h3 style="font-weight:700;margin-bottom:6px">Instant Contact</h3><p style="font-size:.875rem;color:var(--gray500)">Get farmer contact details instantly and close deals fast.</p></div>
        <div class="fcard"><div class="ficon" style="background:#f0fdfa">🤝</div><h3 style="font-weight:700;margin-bottom:6px">Community</h3><p style="font-size:.875rem;color:var(--gray500)">Join a growing community of farmers and buyers in Andhra Pradesh.</p></div>
      </div>
    </div>
  </div>

  <div class="sec" style="background:#fff">
    <div class="mw">
      <div style="text-align:center;margin-bottom:48px"><h2 class="stitle" id="h-hiw">How It Works</h2></div>
      <div class="sgrid">
        <div class="step"><div class="sicon">👤</div><div class="snum">01</div><h3 style="font-size:1.1rem;font-weight:700;margin-bottom:6px" id="h-s1">Sign Up</h3><p style="color:var(--gray500);font-size:.9rem" id="h-s1d">Create your account as a farmer or buyer</p></div>
        <div class="step"><div class="sicon">🌾</div><div class="snum">02</div><h3 style="font-size:1.1rem;font-weight:700;margin-bottom:6px" id="h-s2">List or Browse</h3><p style="color:var(--gray500);font-size:.9rem" id="h-s2d">Farmers list crops, buyers browse and filter</p></div>
        <div class="step"><div class="sicon">✅</div><div class="snum">03</div><h3 style="font-size:1.1rem;font-weight:700;margin-bottom:6px" id="h-s3">Connect</h3><p style="color:var(--gray500);font-size:.9rem" id="h-s3d">Contact directly and complete the transaction</p></div>
      </div>
    </div>
  </div>

  <div class="vsec">
    <div class="mw">
      <h2 style="font-size:1.75rem;font-weight:900;color:#fff;margin-bottom:6px">Serving 24 Villages</h2>
      <p style="color:#86efac">West Godavari District, Andhra Pradesh</p>
      <div class="vtags" id="vtags"></div>
    </div>
  </div>

  <div class="sec" style="background:#fff;text-align:center">
    <div style="max-width:640px;margin:0 auto">
      <h2 class="stitle">Ready to get started?</h2>
      <p class="ssub">Join thousands of farmers and buyers connecting directly.</p>
      <div style="display:flex;flex-wrap:wrap;gap:12px;justify-content:center">
        <button class="hbp" onclick="go('signup')">Create Free Account →</button>
        <button class="hbs" style="background:none;border:2px solid var(--g600);color:var(--g700)" onclick="go('browse')">🛒 Browse Crops</button>
      </div>
    </div>
  </div>

  <div class="footer">
    <div class="footer-in">
      <div style="display:flex;align-items:center;gap:8px">🌱 <strong style="color:#fff;font-size:1.1rem;font-weight:800">FarmPulse</strong> <span>— Connecting Farmers &amp; Buyers</span></div>
      <span style="font-size:.8rem">© 2024 FarmPulse. West Godavari, Andhra Pradesh.</span>
    </div>
  </div>
</div>

<!-- ══════════════ LOGIN ══════════════ -->
<div id="page-login" class="page">
  <div class="auth-page">
    <div class="acard">
      <div class="ahdr">
        <div style="display:flex;align-items:center;gap:10px"><span style="font-size:1.5rem">🌱</span><span style="font-weight:800;font-size:1.1rem">FarmPulse</span></div>
        <h1 id="l-title">Welcome Back</h1>
        <p>Sign in to your account</p>
      </div>
      <div class="abody">
        <div id="l-err" class="aerr"></div>
        <form onsubmit="doLogin(event)" novalidate>
          <div class="fg">
            <label class="flbl" id="l-elbl">Email Address *</label>
            <div class="fwrap"><span class="fwrap-icon">✉️</span><input type="email" id="l-email" class="finp" placeholder="you@example.com" autocomplete="email"/></div>
            <div class="ferr" id="l-eerr"></div>
          </div>
          <div class="fg">
            <label class="flbl" id="l-plbl">Password *</label>
            <div class="fwrap"><span class="fwrap-icon">🔒</span><input type="password" id="l-pass" class="finp" style="padding-left:40px;padding-right:44px" placeholder="Your password" autocomplete="current-password"/><button type="button" class="feye" onclick="tpw('l-pass',this)">👁️</button></div>
            <div class="ferr" id="l-perr"></div>
          </div>
          <button type="submit" class="btn btn-p" style="width:100%;padding:14px;font-size:1rem;margin-top:8px" id="l-sub">
            <span id="l-btxt">Sign In →</span>
            <span id="l-sp" style="display:none;align-items:center;gap:8px"><span class="sp sp-s"></span>Signing in...</span>
          </button>
        </form>
        <p class="atog">Don't have an account? <a onclick="go('signup')" id="l-tog">Sign Up</a></p>
      </div>
    </div>
  </div>
</div>

<!-- ══════════════ SIGNUP ══════════════ -->
<div id="page-signup" class="page">
  <div class="auth-page">
    <div class="acard">
      <div class="ahdr">
        <div style="display:flex;align-items:center;gap:10px"><span style="font-size:1.5rem">🌱</span><span style="font-weight:800;font-size:1.1rem">FarmPulse</span></div>
        <h1 id="s-title">Create Account</h1>
        <p>Create your free account today</p>
      </div>
      <div class="abody">
        <div id="s-err" class="aerr"></div>
        <form onsubmit="doSignup(event)" novalidate>
          <div class="fg">
            <label class="flbl" id="s-nlbl">Full Name *</label>
            <div class="fwrap"><span class="fwrap-icon">👤</span><input type="text" id="s-name" class="finp" placeholder="Your full name"/></div>
            <div class="ferr" id="s-nerr"></div>
          </div>
          <div class="fg">
            <label class="flbl">Email Address *</label>
            <div class="fwrap"><span class="fwrap-icon">✉️</span><input type="email" id="s-email" class="finp" placeholder="you@example.com" autocomplete="email"/></div>
            <div class="ferr" id="s-eerr"></div>
          </div>
          <div class="fg">
            <label class="flbl">Password *</label>
            <div class="fwrap"><span class="fwrap-icon">🔒</span><input type="password" id="s-pass" class="finp" style="padding-left:40px;padding-right:44px" placeholder="At least 6 characters" autocomplete="new-password"/><button type="button" class="feye" onclick="tpw('s-pass',this)">👁️</button></div>
            <div class="ferr" id="s-perr"></div>
          </div>
          <div class="fg">
            <label class="flbl" id="s-rlbl">I am a *</label>
            <div class="rpick">
              <button type="button" class="ropt" id="ro-f" onclick="pickRole('farmer')"><span style="font-size:1.75rem">🌾</span><span id="ro-fl">Farmer (Seller)</span></button>
              <button type="button" class="ropt" id="ro-b" onclick="pickRole('buyer')"><span style="font-size:1.75rem">🛒</span><span id="ro-bl">Buyer</span></button>
            </div>
            <div class="ferr" id="s-rerr"></div>
          </div>
          <div class="fg">
            <label class="flbl" id="s-phlbl">Phone Number <span style="color:var(--gray400);font-weight:400">(optional)</span></label>
            <div class="fwrap"><span class="fwrap-icon">📱</span><input type="tel" id="s-phone" class="finp" placeholder="10-digit mobile number" maxlength="10"/></div>
          </div>
          <button type="submit" class="btn btn-p" style="width:100%;padding:14px;font-size:1rem;margin-top:8px" id="s-sub">
            <span id="s-btxt">Create Account →</span>
            <span id="s-sp" style="display:none;align-items:center;gap:8px"><span class="sp sp-s"></span>Creating...</span>
          </button>
        </form>
        <p class="atog">Already have an account? <a onclick="go('login')">Login</a></p>
      </div>
    </div>
  </div>
</div>

<!-- ══════════════ DASHBOARD ══════════════ -->
<div id="page-dashboard" class="page">
  <div class="dpage">
    <div class="pin">
      <div class="phdr">
        <div>
          <h1 class="ptitle" id="d-title">My Dashboard</h1>
          <p class="psub" id="d-wel">Welcome back 👋</p>
        </div>
        <div style="display:flex;gap:8px">
          <button class="btn btn-o" onclick="loadDash()" style="display:flex;align-items:center;gap:6px">🔄 <span id="d-ref">Refresh</span></button>
          <button class="btn btn-p" onclick="openForm(null)" style="display:flex;align-items:center;gap:6px">➕ <span id="d-add">Add New Crop</span></button>
        </div>
      </div>
      <div class="sgrid2">
        <div class="scard"><div class="scard-icon" style="background:#eff6ff">📦</div><div class="scard-val" id="st-t">0</div><div class="scard-lbl" id="st-tl">Total Crops</div></div>
        <div class="scard"><div class="scard-icon" style="background:var(--g50)">🌱</div><div class="scard-val" id="st-a">0</div><div class="scard-lbl" id="st-al">Available</div></div>
        <div class="scard"><div class="scard-icon" style="background:#fffbeb">📈</div><div class="scard-val" id="st-s">0</div><div class="scard-lbl" id="st-sl">Sold Out</div></div>
        <div class="scard"><div class="scard-icon" style="background:#f5f3ff">💰</div><div class="scard-val" id="st-r">₹0</div><div class="scard-lbl" id="st-rl">Potential Revenue</div></div>
      </div>
      <div class="panel">
        <div class="phdr2">
          <h2 style="font-weight:700;font-size:1.1rem" id="d-mc">My Crop Listings</h2>
          <span id="d-cnt" style="font-size:.8rem;color:var(--gray500);background:var(--gray100);padding:4px 12px;border-radius:9999px">0 listings</span>
        </div>
        <div class="pbody" id="dash-body">
          <div class="lbox"><div class="sp sp-l"></div><p style="color:var(--gray500)">Loading...</p></div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- ══════════════ BROWSE ══════════════ -->
<div id="page-browse" class="page">
  <div class="bhdr">
    <div class="mw">
      <h1 id="b-title">Browse Available Crops</h1>
      <p style="color:#bbf7d0;font-size:.9rem">Fresh produce from 24 villages in West Godavari</p>
      <div class="swrap">
        <span class="sicon2">🔍</span>
        <input type="text" id="b-srch" placeholder="Search crops..." oninput="onSrch()"/>
        <button class="sclear" id="b-clr" onclick="clrSrch()">✕</button>
      </div>
    </div>
  </div>
  <div class="mw" style="padding-top:24px;padding-bottom:48px">
    <div class="fbar">
      <select class="fsel" id="b-vil" onchange="loadBrowse()"><option value="">All Villages</option></select>
      <select class="fsel" id="b-cat" onchange="loadBrowse()">
        <option value="">All Categories</option>
        <option value="vegetables">🥦 Vegetables</option>
        <option value="fruits">🍎 Fruits</option>
        <option value="grains">🌾 Grains &amp; Cereals</option>
        <option value="pulses">🫘 Pulses &amp; Legumes</option>
        <option value="spices">🌶️ Spices</option>
        <option value="leafy-greens">🥬 Leafy Greens</option>
        <option value="flowers">🌸 Flowers</option>
        <option value="other">🌱 Other</option>
      </select>
      <select class="fsel" id="b-srt" onchange="loadBrowse()">
        <option value="">Newest First</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
      </select>
      <button id="b-ptgl" onclick="tglPrice()" style="display:flex;align-items:center;gap:6px;padding:10px 16px;border:1.5px solid var(--gray200);border-radius:12px;background:#fff;font-size:.875rem;font-weight:600;cursor:pointer;transition:all .15s">⚙️ Price Range</button>
      <button class="cpill" id="b-cpill" onclick="clrFilters()">✕ Clear Filters</button>
      <button onclick="loadBrowse()" style="margin-left:auto;background:none;border:none;cursor:pointer;color:var(--gray500);padding:8px;border-radius:10px;font-size:1.1rem">🔄</button>
    </div>
    <div class="ppanel" id="b-pp">
      <div><label class="plbl">Min Price (₹)</label><input type="number" id="b-mn" placeholder="0" min="0"/></div>
      <div><label class="plbl">Max Price (₹)</label><input type="number" id="b-mx" placeholder="∞" min="0"/></div>
      <button class="btn btn-p" onclick="loadBrowse()">Apply Filters</button>
    </div>
    <div id="b-tags" style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px"></div>
    <div id="b-info" class="rinfo"></div>
    <div id="browse-body">
      <div class="lbox"><div class="sp sp-l"></div><p style="color:var(--gray500)">Loading crops...</p></div>
    </div>
  </div>
</div>

<!-- CROP FORM MODAL -->
<div id="cf-modal" class="modal-bg" onclick="cfBg(event)">
  <div class="mbox">
    <div class="mhdr">
      <h2>🌿 <span id="cf-ttl">Add New Crop</span></h2>
      <button class="mclose" onclick="closeForm()">✕</button>
    </div>
    <div class="mbody">
      <div id="cf-err" class="aerr"></div>
      <form onsubmit="saveCrop(event)" novalidate>
        <input type="hidden" id="cf-id"/>
        <div class="fg">
          <label class="flbl">Crop Name *</label>
          <input type="text" id="cf-nm" class="finp" placeholder="e.g., Tomato, Rice, Onion" maxlength="100"/>
          <div class="ferr" id="cf-nerr"></div>
        </div>
        <div class="fg">
          <label class="flbl">Category</label>
          <select id="cf-cat" class="finp">
            <option value="vegetables">🥦 Vegetables</option>
            <option value="fruits">🍎 Fruits</option>
            <option value="grains">🌾 Grains &amp; Cereals</option>
            <option value="pulses">🫘 Pulses &amp; Legumes</option>
            <option value="spices">🌶️ Spices</option>
            <option value="leafy-greens">🥬 Leafy Greens</option>
            <option value="flowers">🌸 Flowers</option>
            <option value="other">🌱 Other</option>
          </select>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
          <div class="fg">
            <label class="flbl">Price (₹) *</label>
            <input type="number" id="cf-pr" class="finp" placeholder="0.00" min="0.01" step="0.01"/>
            <div class="ferr" id="cf-prerr"></div>
          </div>
          <div class="fg">
            <label class="flbl">Quantity *</label>
            <div style="display:flex;gap:6px">
              <input type="number" id="cf-qt" class="finp" placeholder="0" min="0.01" step="0.01" style="flex:1;min-width:0"/>
              <select id="cf-un" class="finp" style="width:80px;padding:12px 6px">
                <option value="kg">kg</option>
                <option value="quintal">quintal</option>
                <option value="ton">ton</option>
                <option value="bundle">bundle</option>
                <option value="dozen">dozen</option>
                <option value="piece">piece</option>
              </select>
            </div>
            <div class="ferr" id="cf-qerr"></div>
          </div>
        </div>
        <div class="fg">
          <label class="flbl">Village *</label>
          <select id="cf-vil" class="finp"><option value="">Select Village</option></select>
          <div class="ferr" id="cf-verr"></div>
        </div>
        <div class="fg">
          <label class="flbl">Contact Number *</label>
          <input type="tel" id="cf-con" class="finp" placeholder="10-digit mobile number" maxlength="10"/>
          <div class="ferr" id="cf-cerr"></div>
        </div>
        <div class="fg">
          <label class="flbl">Description <span style="color:var(--gray400);font-weight:400">(optional)</span></label>
          <textarea id="cf-dsc" class="finp" rows="3" placeholder="Quality, harvest date, special notes..." maxlength="500" style="resize:none" oninput="document.getElementById('cf-dcnt').textContent=this.value.length+'/500'"></textarea>
          <div style="text-align:right;font-size:.7rem;color:var(--gray400);margin-top:2px" id="cf-dcnt">0/500</div>
        </div>
        <div style="display:flex;gap:10px;margin-top:8px">
          <button type="button" class="btn btn-o" style="flex:1" onclick="closeForm()" id="cf-cncl">Cancel</button>
          <button type="submit" class="btn btn-p" style="flex:1" id="cf-sav">
            <span id="cf-stxt">💾 Save Crop</span>
            <span id="cf-ssp" style="display:none;align-items:center;gap:8px"><span class="sp sp-s"></span>Saving...</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

<!-- DELETE MODAL -->
<div id="del-modal" class="modal-bg" onclick="delBg(event)">
  <div class="mbox mbox-sm" style="animation:scaleIn .25s ease">
    <div class="mbody" style="text-align:center;padding:32px 24px">
      <div class="conf-icon">⚠️</div>
      <h3 style="font-size:1.1rem;font-weight:700;margin-bottom:8px" id="del-ttl">Delete Crop</h3>
      <p style="color:var(--gray500);font-size:.9rem;margin-bottom:6px">Are you sure you want to delete</p>
      <p style="font-weight:700;color:var(--gray800);margin-bottom:24px" id="del-nm">"Tomato"?</p>
      <div style="display:flex;gap:10px">
        <button class="btn btn-o" style="flex:1" onclick="closeDel()" id="del-cncl">Cancel</button>
        <button class="btn btn-d" style="flex:1" onclick="confirmDel()" id="del-ok">Delete</button>
      </div>
    </div>
  </div>
</div>

<script>
// ═══════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════
const VILLAGES=['Bhimavaram','Gollalakoderu','Garagaparru','Saggapadu','Kesavaram','Veeravasaram','Rayalam','Taderu','Chinamiram','Pedamiram','Palakoderu','Undi','Kalla','Mogallu','Vempa','Dirusumarru','Juvvalapalem','Sivaramapuram','Annavaram','Kakaraparru','Kalipatnam','Yelamanchili','Penumantra','Bhimadole'];
const CICON={vegetables:'🥦',fruits:'🍎',grains:'🌾',pulses:'🫘',spices:'🌶️','leafy-greens':'🥬',flowers:'🌸',other:'🌱'};
const CLBL={vegetables:'Vegetables',fruits:'Fruits',grains:'Grains & Cereals',pulses:'Pulses & Legumes',spices:'Spices','leafy-greens':'Leafy Greens',flowers:'Flowers',other:'Other'};

// ═══════════════════════════════════════════════
// TRANSLATIONS
// ═══════════════════════════════════════════════
const TR={
  en:{app:'FarmPulse',home:'Home',browse:'Browse Crops',dash:'Dashboard',login:'Login',signup:'Sign Up',logout:'Logout',ff:'For Farmers',fb:'For Buyers',fd:'List your crops, set your price, and connect directly with buyers.',bd:'Browse fresh produce from local farmers, filter by village, compare prices.',hiw:'How It Works',s1:'Sign Up',s1d:'Create your account as a farmer or buyer',s2:'List or Browse',s2d:'Farmers list crops, buyers browse and filter',s3:'Connect',s3d:'Contact directly and complete the transaction',ltitle:'Welcome Back',stitle:'Create Account',lbtn:'Sign In →',sbtn:'Create Account →',noacc:"Don't have an account?",hasacc:'Already have an account?',namel:'Full Name',emaill:'Email Address',passl:'Password',rolel:'I am a',phonel:'Phone Number',fr:'Farmer (Seller)',br:'Buyer',mydash:'My Dashboard',totc:'Total Crops',potrev:'Potential Revenue',avail:'Available',sold:'Sold Out',addcrop:'Add New Crop',mycrops:'My Crop Listings',bcrops:'Browse Available Crops',sph:'Search crops...',allv:'All Villages',allc:'All Categories',new:'Newest First',plow:'Price: Low to High',phigh:'Price: High to Low',minp:'Min Price (₹)',maxp:'Max Price (₹)',applyf:'Apply Filters',clrf:'Clear Filters',pr:'Price Range',nores:'No crops available in your village',nomatch:'No crops match your filters',best:'🏆 Best Deal',cf:'Contact Farmer',save:'💾 Save Crop',edit:'Edit Crop',del:'Delete Crop',cancel:'Cancel',confdel:'Are you sure you want to delete',nocrops:'No crops added yet',nocropsmsg:'Start by adding your first crop listing',loading:'Loading...',retry:'Try Again',refresh:'Refresh',req:'This field is required',invalidemail:'Invalid email format',shortpass:'Password must be at least 6 characters',invalidphone:'Enter a valid 10-digit mobile number (starts with 6-9)',negprice:'Price must be a positive number',invalidqty:'Quantity must be a positive number',invalidvil:'Please select a valid village',neterr:'Network error. Please check your connection.'},
  te:{app:'ఫార్మ్‌పల్స్',home:'హోమ్',browse:'పంటలు చూడండి',dash:'డాష్‌బోర్డ్',login:'లాగిన్',signup:'నమోదు',logout:'లాగ్అవుట్',ff:'రైతుల కోసం',fb:'కొనుగోలుదారుల కోసం',fd:'మీ పంటలను జాబితా చేయండి, ధర నిర్ణయించండి.',bd:'స్థానిక రైతుల నుండి తాజా పంటలు బ్రౌజ్ చేయండి.',hiw:'ఇది ఎలా పని చేస్తుంది',s1:'నమోదు',s1d:'రైతు లేదా కొనుగోలుదారుగా ఖాతా సృష్టించండి',s2:'జాబితా లేదా బ్రౌజ్',s2d:'రైతులు పంటలు జాబితా చేస్తారు',s3:'అనుసంధానం',s3d:'నేరుగా సంప్రదించి లావాదేవీ పూర్తి చేయండి',ltitle:'స్వాగతం',stitle:'ఖాతా సృష్టించండి',lbtn:'సైన్ ఇన్ →',sbtn:'ఖాతా సృష్టించండి →',noacc:'ఖాతా లేదా?',hasacc:'ఇప్పటికే ఖాతా ఉందా?',namel:'పూర్తి పేరు',emaill:'ఇమెయిల్ చిరునామా',passl:'పాస్‌వర్డ్',rolel:'నేను',phonel:'ఫోన్ నంబర్',fr:'రైతు (విక్రేత)',br:'కొనుగోలుదారు',mydash:'నా డాష్‌బోర్డ్',totc:'మొత్తం పంటలు',potrev:'సంభావ్య ఆదాయం',avail:'అందుబాటులో',sold:'అమ్ముడైంది',addcrop:'కొత్త పంట జోడించండి',mycrops:'నా పంట జాబితాలు',bcrops:'అందుబాటులో ఉన్న పంటలు',sph:'పంటలు వెతకండి...',allv:'అన్ని గ్రామాలు',allc:'అన్ని వర్గాలు',new:'కొత్తవి ముందు',plow:'ధర: తక్కువ నుండి ఎక్కువ',phigh:'ధర: ఎక్కువ నుండి తక్కువ',minp:'కనిష్ట ధర (₹)',maxp:'గరిష్ట ధర (₹)',applyf:'ఫిల్టర్లు వర్తించు',clrf:'ఫిల్టర్లు తొలగించు',pr:'ధర పరిధి',nores:'మీ గ్రామంలో పంటలు అందుబాటులో లేవు',nomatch:'మీ ఫిల్టర్‌లకు సరిపోలే పంటలు లేవు',best:'🏆 అత్యుత్తమ డీల్',cf:'రైతుని సంప్రదించండి',save:'💾 పంట సేవ్ చేయండి',edit:'సవరించండి',del:'తొలగించండి',cancel:'రద్దు',confdel:'ఈ పంటను తొలగించాలా',nocrops:'ఇంకా పంటలు జోడించలేదు',nocropsmsg:'మీ మొదటి పంట జాబితాను జోడించండి',loading:'లోడ్ అవుతోంది...',retry:'మళ్ళీ ప్రయత్నించండి',refresh:'రిఫ్రెష్',req:'ఈ ఫీల్డ్ అవసరం',invalidemail:'చెల్లని ఇమెయిల్',shortpass:'పాస్‌వర్డ్ కనీసం 6 అక్షరాలు',invalidphone:'చెల్లని 10-అంకెల మొబైల్ నంబర్',negprice:'ధర సానుకూలంగా ఉండాలి',invalidqty:'పరిమాణం సానుకూలంగా ఉండాలి',invalidvil:'చెల్లని గ్రామం',neterr:'నెట్‌వర్క్ లోపం.'},
  hi:{app:'फार्मपल्स',home:'होम',browse:'फसलें देखें',dash:'डैशबोर्ड',login:'लॉगिन',signup:'साइन अप',logout:'लॉगआउट',ff:'किसानों के लिए',fb:'खरीदारों के लिए',fd:'अपनी फसलें सूचीबद्ध करें, कीमत तय करें।',bd:'स्थानीय किसानों से ताजी उपज ब्राउज़ करें।',hiw:'यह कैसे काम करता है',s1:'साइन अप',s1d:'किसान या खरीदार के रूप में खाता बनाएं',s2:'सूचीबद्ध या ब्राउज़',s2d:'किसान फसलें सूचीबद्ध करते हैं',s3:'जुड़ें',s3d:'सीधे संपर्क करें और लेनदेन पूरा करें',ltitle:'वापस स्वागत है',stitle:'खाता बनाएं',lbtn:'साइन इन →',sbtn:'खाता बनाएं →',noacc:'खाता नहीं है?',hasacc:'पहले से खाता है?',namel:'पूरा नाम',emaill:'ईमेल पता',passl:'पासवर्ड',rolel:'मैं हूं',phonel:'फोन नंबर',fr:'किसान (विक्रेता)',br:'खरीदार',mydash:'मेरा डैशबोर्ड',totc:'कुल फसलें',potrev:'संभावित राजस्व',avail:'उपलब्ध',sold:'बिक गया',addcrop:'नई फसल जोड़ें',mycrops:'मेरी फसल सूचियां',bcrops:'उपलब्ध फसलें',sph:'फसलें खोजें...',allv:'सभी गांव',allc:'सभी श्रेणियां',new:'नवीनतम पहले',plow:'कीमत: कम से ज़्यादा',phigh:'कीमत: ज़्यादा से कम',minp:'न्यूनतम कीमत (₹)',maxp:'अधिकतम कीमत (₹)',applyf:'फ़िल्टर लागू करें',clrf:'फ़िल्टर हटाएं',pr:'मूल्य सीमा',nores:'आपके गांव में कोई फसल उपलब्ध नहीं',nomatch:'कोई फसल मेल नहीं खाती',best:'🏆 सबसे अच्छा सौदा',cf:'किसान से संपर्क करें',save:'💾 फसल सहेजें',edit:'संपादित करें',del:'हटाएं',cancel:'रद्द करें',confdel:'क्या आप इस फसल को हटाना चाहते हैं',nocrops:'अभी तक कोई फसल नहीं जोड़ी',nocropsmsg:'अपनी पहली फसल सूची जोड़ें',loading:'लोड हो रहा है...',retry:'पुनः प्रयास करें',refresh:'रीफ्रेश',req:'यह फ़ील्ड आवश्यक है',invalidemail:'अमान्य ईमेल',shortpass:'पासवर्ड कम से कम 6 अक्षर',invalidphone:'वैध 10-अंकीय मोबाइल नंबर दर्ज करें',negprice:'कीमत सकारात्मक होनी चाहिए',invalidqty:'मात्रा सकारात्मक होनी चाहिए',invalidvil:'कृपया एक वैध गांव चुनें',neterr:'नेटवर्क त्रुटि।'}
};

// ═══════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════
let lang='en', user=null, token=null, page='home', selRole='', delTarget=null, srchTimer=null;

function T(k){return(TR[lang]&&TR[lang][k])||(TR.en&&TR.en[k])||k}
function $(id){return document.getElementById(id)}
function txt(id,v){const e=$(id);if(e)e.textContent=v}
function htm(id,v){const e=$(id);if(e)e.innerHTML=v}
function show(id){const e=$(id);if(e)e.style.display=''}
function hide(id){const e=$(id);if(e)e.style.display='none'}
function showFlex(id){const e=$(id);if(e)e.style.display='flex'}
function showBlock(id){const e=$(id);if(e)e.style.display='block'}

function showErr(id,msg){
  const e=$(id);if(!e)return;
  e.textContent=msg;e.style.display='block';
  const prev=e.previousElementSibling;
  const inp=prev?.querySelector?.('input,select')||prev;
  if(inp?.classList)inp.classList.add('err');
}
function hideErr(id){
  const e=$(id);if(!e)return;
  e.style.display='none';
  const prev=e.previousElementSibling;
  const inp=prev?.querySelector?.('input,select')||prev;
  if(inp?.classList)inp.classList.remove('err');
}
function setLoad(btnId,txtId,spId,on){
  const b=$(btnId);if(b)b.disabled=on;
  const t=$(txtId);if(t)t.style.display=on?'none':'';
  const s=$(spId);if(s)s.style.display=on?'flex':'none';
}

// ═══════════════════════════════════════════════
// TOAST
// ═══════════════════════════════════════════════
function toast(msg,type='ok'){
  const c=$('toasts');
  const d=document.createElement('div');
  d.className='toast t-'+type;
  const ico=type==='ok'?'✅':type==='err'?'❌':'⚠️';
  d.innerHTML=`<span style="flex-shrink:0">${ico}</span><span style="flex:1">${msg}</span><button class="t-x" onclick="this.parentElement.remove()">✕</button>`;
  c.appendChild(d);
  setTimeout(()=>d.remove(),4500);
}

// ═══════════════════════════════════════════════
// LANGUAGE
// ═══════════════════════════════════════════════
function setLang(l){
  lang=l;
  try{localStorage.setItem('fp_lang',l)}catch{}
  document.querySelectorAll('.lang-btn').forEach(b=>{
    b.classList.toggle('active',b.textContent.toLowerCase().includes(l));
  });
  applyLang();
  if(page==='browse')loadBrowse();
  if(page==='dashboard')loadDash();
}

function applyLang(){
  txt('n-app',T('app'));
  txt('nl-home',T('home'));txt('nl-browse',T('browse'));txt('nl-dash',T('dash'));
  txt('n-lbtn',T('login'));txt('n-sbtn',T('signup'));txt('n-out',T('logout'));
  txt('mn-home',T('home'));txt('mn-browse',T('browse'));txt('mn-dash',T('dash'));txt('mn-out',T('logout'));
  txt('h-ff',T('ff'));txt('h-bf',T('fb'));txt('h-fd',T('fd'));txt('h-bd',T('bd'));
  txt('h-hiw',T('hiw'));
  txt('h-s1',T('s1'));txt('h-s1d',T('s1d'));
  txt('h-s2',T('s2'));txt('h-s2d',T('s2d'));
  txt('h-s3',T('s3'));txt('h-s3d',T('s3d'));
  txt('l-title',T('ltitle'));txt('l-elbl',T('emaill')+' *');txt('l-plbl',T('passl')+' *');txt('l-btxt',T('lbtn'));
  txt('s-title',T('stitle'));txt('s-nlbl',T('namel')+' *');txt('s-rlbl',T('rolel')+' *');txt('s-phlbl',T('phonel'));txt('s-btxt',T('sbtn'));
  txt('ro-fl',T('fr'));txt('ro-bl',T('br'));
  txt('d-title',T('mydash'));txt('d-add',T('addcrop'));txt('d-mc',T('mycrops'));txt('d-ref',T('refresh'));
  txt('st-tl',T('totc'));txt('st-al',T('avail'));txt('st-sl',T('sold'));txt('st-rl',T('potrev'));
  txt('b-title',T('bcrops'));
  const si=$('b-srch');if(si)si.placeholder=T('sph');
  const bv=$('b-vil');if(bv&&bv.options[0])bv.options[0].text=T('allv');
  const bc=$('b-cat');if(bc&&bc.options[0])bc.options[0].text=T('allc');
  const bs=$('b-srt');if(bs){if(bs.options[0])bs.options[0].text=T('new');if(bs.options[1])bs.options[1].text=T('plow');if(bs.options[2])bs.options[2].text=T('phigh')}
  txt('cf-cncl',T('cancel'));txt('cf-stxt',T('save'));
  txt('del-cncl',T('cancel'));txt('del-ok',T('del'));
}

// ═══════════════════════════════════════════════
// AUTH
// ═══════════════════════════════════════════════
function saveAuth(tk,u){
  token=tk;user=u;
  try{localStorage.setItem('fp_token',tk);localStorage.setItem('fp_user',JSON.stringify(u))}catch{}
  updateNav();
}
function loadAuth(){
  try{const tk=localStorage.getItem('fp_token');const u=localStorage.getItem('fp_user');if(tk&&u){token=tk;user=JSON.parse(u)}}catch{}
}
function clearAuth(){
  token=null;user=null;
  try{localStorage.removeItem('fp_token');localStorage.removeItem('fp_user')}catch{}
}
function aHdr(){return token?{Authorization:'Bearer '+token}:{}}

// ═══════════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════════
function go(p,skipH){
  if(p==='dashboard'){if(!user){go('login');return}if(user.role!=='farmer'){go('browse');return}}
  if((p==='login'||p==='signup')&&user){go(user.role==='farmer'?'dashboard':'browse');return}
  page=p;
  if(!skipH)history.pushState({},'','#'+p);
  document.querySelectorAll('.page').forEach(el=>el.classList.remove('active'));
  const el=$('page-'+p);
  if(el){el.classList.add('active');window.scrollTo(0,0)}
  document.querySelectorAll('.nav-link').forEach(l=>{
    l.classList.toggle('active',l.id==='nl-'+p||(p==='dashboard'&&l.id==='nl-dash'));
  });
  if(p==='browse')loadBrowse();
  if(p==='dashboard')loadDash();
}
window.addEventListener('popstate',()=>{const h=location.hash.replace('#','')||'home';go(h,true)});

// ═══════════════════════════════════════════════
// NAVBAR
// ═══════════════════════════════════════════════
function updateNav(){
  if(user){
    hide('n-auth');showFlex('n-user');
    txt('n-av',user.name[0].toUpperCase());txt('n-un',user.name.split(' ')[0]);txt('n-ur',user.role);
    txt('mn-av',user.name[0].toUpperCase());txt('mn-un',user.name);txt('mn-ur',user.role);
    if(user.role==='farmer'){$('nl-dash').classList.remove('hidden');$('mn-dbtn').classList.remove('hidden')}
    hide('mn-auth');showBlock('mn-user');
    txt('d-wel','Welcome back, '+user.name+' 👋');
    const hb=$('h-btns');
    if(hb)hb.innerHTML=`<button class="hbp" onclick="go('${user.role==='farmer'?'dashboard':'browse'}')">${user.role==='farmer'?'Go to Dashboard':'Browse Crops'} →</button>`;
  } else {
    showFlex('n-auth');hide('n-user');
    $('nl-dash').classList.add('hidden');$('mn-dbtn').classList.add('hidden');
    showFlex('mn-auth');hide('mn-user');
  }
}
function toggleMob(){$('mob-menu').classList.toggle('open')}
function closeMob(){$('mob-menu').classList.remove('open')}
function tpw(id,btn){const i=$(id);if(i.type==='password'){i.type='text';btn.textContent='🙈'}else{i.type='password';btn.textContent='👁️'}}

// ═══════════════════════════════════════════════
// LOGIN
// ═══════════════════════════════════════════════
async function doLogin(e){
  e.preventDefault();
  const email=$('l-email').value.trim();
  const pass=$('l-pass').value;
  let ok=true;
  hideErr('l-eerr');hideErr('l-perr');hide('l-err');
  if(!email){showErr('l-eerr',T('req'));ok=false}
  else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){showErr('l-eerr',T('invalidemail'));ok=false}
  if(!pass){showErr('l-perr',T('req'));ok=false}
  else if(pass.length<6){showErr('l-perr',T('shortpass'));ok=false}
  if(!ok)return;
  setLoad('l-sub','l-btxt','l-sp',true);
  try{
    const r=await fetch('/api/auth?action=login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password:pass})});
    const d=await r.json();
    if(!r.ok){$('l-err').textContent=d.error||T('neterr');showBlock('l-err');return}
    saveAuth(d.token,d.user);
    toast('Welcome back, '+d.user.name+'! 👋','ok');
    go(d.user.role==='farmer'?'dashboard':'browse');
  }catch{$('l-err').textContent=T('neterr');showBlock('l-err')}
  finally{setLoad('l-sub','l-btxt','l-sp',false)}
}

// ═══════════════════════════════════════════════
// SIGNUP
// ═══════════════════════════════════════════════
async function doSignup(e){
  e.preventDefault();
  const name=$('s-name').value.trim();
  const email=$('s-email').value.trim();
  const pass=$('s-pass').value;
  const phone=$('s-phone').value.trim();
  let ok=true;
  hideErr('s-nerr');hideErr('s-eerr');hideErr('s-perr');hideErr('s-rerr');hide('s-err');
  if(!name||name.length<2){showErr('s-nerr','Name must be at least 2 characters');ok=false}
  if(!email){showErr('s-eerr',T('req'));ok=false}
  else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){showErr('s-eerr',T('invalidemail'));ok=false}
  if(!pass){showErr('s-perr',T('req'));ok=false}
  else if(pass.length<6){showErr('s-perr',T('shortpass'));ok=false}
  if(!selRole){showErr('s-rerr',T('req'));ok=false}
  if(!ok)return;
  setLoad('s-sub','s-btxt','s-sp',true);
  try{
    const r=await fetch('/api/auth?action=signup',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,email,password:pass,role:selRole,phone:phone||null})});
    const d=await r.json();
    if(!r.ok){$('s-err').textContent=d.error||T('neterr');showBlock('s-err');return}
    saveAuth(d.token,d.user);
    toast('Welcome to FarmPulse, '+d.user.name+'! 🌱','ok');
    go(d.user.role==='farmer'?'dashboard':'browse');
  }catch{$('s-err').textContent=T('neterr');showBlock('s-err')}
  finally{setLoad('s-sub','s-btxt','s-sp',false)}
}

function pickRole(r){
  selRole=r;
  $('ro-f').classList.toggle('sel',r==='farmer');
  $('ro-b').classList.toggle('sel',r==='buyer');
  hideErr('s-rerr');
}

function doLogout(){
  clearAuth();updateNav();
  toast('Logged out successfully','ok');
  go('home');
}

// ═══════════════════════════════════════════════
// DASHBOARD
// ═══════════════════════════════════════════════
async function loadDash(){
  if(!user||user.role!=='farmer')return;
  const body=$('dash-body');
  body.innerHTML='<div class="lbox"><div class="sp sp-l"></div><p style="color:var(--gray500)">'+T('loading')+'</p></div>';
  try{
    const r=await fetch('/api/crops?farmer_id='+user.id,{headers:aHdr()});
    const d=await r.json();
    if(!r.ok)throw new Error(d.error||'Failed to load');
    const crops=Array.isArray(d)?d:[];
    renderDash(crops);updateStats(crops);
  }catch(err){
    body.innerHTML='<div class="errbox"><div class="erricon">⚠️</div><p style="color:var(--r600);font-weight:600">'+esc(err.message)+'</p><button class="btn btn-o" onclick="loadDash()" style="margin-top:8px">'+T('retry')+'</button></div>';
  }
}

function updateStats(crops){
  const av=crops.filter(c=>c.is_available).length;
  const rev=crops.reduce((s,c)=>s+Number(c.price)*Number(c.quantity),0);
  txt('st-t',crops.length);txt('st-a',av);txt('st-s',crops.length-av);
  txt('st-r','₹'+rev.toLocaleString('en-IN'));
  txt('d-cnt',crops.length+' listings');
}

function renderDash(crops){
  const body=$('dash-body');
  if(!crops.length){
    body.innerHTML='<div class="ebox"><div class="eicon">🌱</div><h3 style="font-size:1.2rem;font-weight:700;color:var(--gray800)">'+T('nocrops')+'</h3><p style="color:var(--gray500);max-width:300px;font-size:.9rem">'+T('nocropsmsg')+'</p><button class="btn btn-p" onclick="openForm(null)" style="margin-top:8px">➕ '+T('addcrop')+'</button></div>';
    return;
  }
  const g=document.createElement('div');g.className='cgrid';
  crops.forEach((c,i)=>g.appendChild(mkCard(c,i,true)));
  body.innerHTML='';body.appendChild(g);
}

// ═══════════════════════════════════════════════
// BROWSE
// ═══════════════════════════════════════════════
async function loadBrowse(){
  const body=$('browse-body');
  body.innerHTML='<div class="lbox"><div class="sp sp-l"></div><p style="color:var(--gray500)">'+T('loading')+'</p></div>';
  updTags();
  const qs=bldQS();
  try{
    const r=await fetch('/api/crops'+(qs?'?'+qs:''));
    const d=await r.json();
    if(!r.ok)throw new Error(d.error||'Failed to load');
    renderBrowse(Array.isArray(d)?d:[]);
  }catch(err){
    body.innerHTML='<div class="errbox"><div class="erricon">⚠️</div><p style="color:var(--r600);font-weight:600;max-width:300px">'+esc(err.message)+'</p><button class="btn btn-p" onclick="loadBrowse()" style="margin-top:8px">'+T('retry')+'</button></div>';
  }
}

function bldQS(){
  const p=new URLSearchParams();
  const v=$('b-vil')?.value,c=$('b-cat')?.value,s=$('b-srt')?.value;
  const q=$('b-srch')?.value?.trim(),mn=$('b-mn')?.value,mx=$('b-mx')?.value;
  if(v&&VILLAGES.includes(v))p.set('village',v);
  if(c)p.set('crop_name',c);
  if(s)p.set('sort',s);
  if(q)p.set('search',q);
  if(mn&&!isNaN(+mn)&&+mn>=0)p.set('min_price',mn);
  if(mx&&!isNaN(+mx)&&+mx>0)p.set('max_price',mx);
  return p.toString();
}

function renderBrowse(crops){
  const body=$('browse-body');
  // Best deal
  const minC={};
  crops.forEach(c=>{if(!minC[c.category]||+c.price<minC[c.category])minC[c.category]=+c.price});
  const best=new Set();
  crops.forEach(c=>{if(+c.price===minC[c.category])best.add(c.id)});
  // Info
  const info=$('b-info');
  if(info){
    if(crops.length>0)info.innerHTML='<strong>'+crops.length+'</strong> crop'+(crops.length!==1?'s':'')+' found'+(best.size>0?' &nbsp;• <span style="color:#d97706">'+best.size+' best deal'+(best.size!==1?'s':'')+' highlighted ⭐</span>':'');
    else info.textContent='';
  }
  if(!crops.length){
    const v=$('b-vil')?.value;
    const hasF=!!(v||$('b-cat')?.value||$('b-srch')?.value||$('b-mn')?.value||$('b-mx')?.value);
    body.innerHTML='<div class="ebox"><div class="eicon">🌾</div><h3 style="font-size:1.2rem;font-weight:700;color:var(--gray800)">'+(v?T('nores'):T('nomatch'))+'</h3><p style="color:var(--gray500);font-size:.9rem;max-width:320px">'+(hasF?'Try adjusting your filters or search terms':'No crops listed yet. Check back soon!')+'</p>'+(hasF?'<button class="cpill" onclick="clrFilters()" style="display:flex;margin-top:12px">✕ '+T('clrf')+'</button>':'')+'</div>';
    return;
  }
  const g=document.createElement('div');g.className='cgrid';
  crops.forEach((c,i)=>g.appendChild(mkCard(c,i,false,best.has(c.id))));
  body.innerHTML='';body.appendChild(g);
}

function updTags(){
  const tags=$('b-tags');if(!tags)return;tags.innerHTML='';
  const v=$('b-vil')?.value,c=$('b-cat')?.value,q=$('b-srch')?.value?.trim();
  if(v){const s=document.createElement('span');s.className='atag';s.style.cssText='background:#eff6ff;color:#2563eb;border:1px solid #bfdbfe';s.innerHTML='📍 '+esc(v)+' <button class="atag-x" onclick="$(\'b-vil\').value=\'\';loadBrowse()">✕</button>';tags.appendChild(s)}
  if(c){const s=document.createElement('span');s.className='atag';s.style.cssText='background:var(--g50);color:var(--g700);border:1px solid var(--g200)';s.innerHTML=(CICON[c]||'')+' '+(CLBL[c]||c)+' <button class="atag-x" onclick="$(\'b-cat\').value=\'\';loadBrowse()">✕</button>';tags.appendChild(s)}
  if(q){const s=document.createElement('span');s.className='atag';s.style.cssText='background:#f5f3ff;color:#7c3aed;border:1px solid #ddd6fe';s.innerHTML='🔍 "'+esc(q)+'" <button class="atag-x" onclick="$(\'b-srch\').value=\'\';clrSrch()">✕</button>';tags.appendChild(s)}
  const hasF=!!(v||c||q||$('b-mn')?.value||$('b-mx')?.value);
  const cp=$('b-cpill');if(cp)cp.style.display=hasF?'flex':'none';
}

function onSrch(){
  const v=$('b-srch').value;
  $('b-clr').style.display=v?'block':'none';
  clearTimeout(srchTimer);
  srchTimer=setTimeout(loadBrowse,v?400:0);
}
function clrSrch(){$('b-srch').value='';$('b-clr').style.display='none';loadBrowse()}
function tglPrice(){
  const p=$('b-pp'),btn=$('b-ptgl');
  const on=p.style.display==='flex';
  p.style.display=on?'none':'flex';
  if(btn){btn.style.background=on?'#fff':'var(--g600)';btn.style.color=on?'var(--gray700)':'#fff';btn.style.borderColor=on?'var(--gray200)':'var(--g600)'}
}
function clrFilters(){
  $('b-vil').value='';$('b-cat').value='';$('b-srt').value='';
  $('b-srch').value='';$('b-clr').style.display='none';
  $('b-mn').value='';$('b-mx').value='';
  loadBrowse();
}

// ═══════════════════════════════════════════════
// CROP CARD
// ═══════════════════════════════════════════════
function mkCard(c,idx,actions,isBest){
  const icon=CICON[c.category]||'🌱';
  const lbl=CLBL[c.category]||c.category;
  const div=document.createElement('div');
  div.className='ccard'+(isBest?' best':'');
  div.style.animationDelay=Math.min(idx*.04,.4)+'s';
  const cdata=JSON.stringify(c).replace(/'/g,"&#39;");
  div.innerHTML=
    '<div class="cbar'+(isBest?' gold':'')+'"></div>'+
    (isBest?'<div class="best-badge">'+T('best')+'</div>':'')+
    (!c.is_available?'<div class="sold-ov"><div class="sold-badge">'+T('sold')+'</div></div>':'')+
    '<div class="cbody">'+
      '<div class="chdr">'+
        '<div class="cemoji">'+icon+'</div>'+
        '<div style="flex:1;min-width:0">'+
          '<div class="cname">'+esc(c.crop_name)+'</div>'+
          '<div class="ccat">'+esc(lbl)+'</div>'+
        '</div>'+
      '</div>'+
      '<div class="cprice">₹'+Number(c.price).toLocaleString('en-IN')+'<span> /'+esc(c.unit)+'</span></div>'+
      '<div class="cinfo">'+
        '<div class="crow"><span>📦</span><span><strong>'+esc(String(c.quantity))+' '+esc(c.unit)+'</strong> available</span></div>'+
        '<div class="crow"><span>📍</span><span>'+esc(c.village)+'</span></div>'+
        (c.fp_users?.name?'<div class="crow"><span>👤</span><span>'+esc(c.fp_users.name)+'</span></div>':'')+
      '</div>'+
      (c.description?'<div class="cdesc">'+esc(c.description)+'</div>':'')+
      '<div class="cfoot">'+
        (actions
          ?`<button class="cbtn-edit" onclick='openForm(${cdata})'>✏️ ${T('edit')}</button><button class="cbtn-del" onclick='askDel(${cdata})'>🗑️ ${T('del')}</button>`
          :`<a href="tel:${esc(c.contact)}" class="cbtn-contact">📞 ${esc(c.contact)} — ${T('cf')}</a>`
        )+
      '</div>'+
    '</div>';
  return div;
}

function esc(s){
  if(!s)return'';
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ═══════════════════════════════════════════════
// CROP FORM
// ═══════════════════════════════════════════════
function openForm(crop){
  $('cf-modal').style.display='flex';
  document.body.style.overflow='hidden';
  $('cf-id').value=crop?crop.id:'';
  $('cf-nm').value=crop?crop.crop_name:'';
  $('cf-cat').value=crop?crop.category:'vegetables';
  $('cf-pr').value=crop?crop.price:'';
  $('cf-qt').value=crop?crop.quantity:'';
  $('cf-un').value=crop?crop.unit:'kg';
  $('cf-vil').value=crop?crop.village:'';
  $('cf-con').value=crop?crop.contact:'';
  $('cf-dsc').value=crop?crop.description||'':'';
  $('cf-dcnt').textContent=(crop?.description||'').length+'/500';
  txt('cf-ttl',crop?T('edit'):T('addcrop'));
  ['cf-nerr','cf-prerr','cf-qerr','cf-verr','cf-cerr'].forEach(id=>{const e=$(id);if(e)e.style.display='none'});
  ['cf-nm','cf-pr','cf-qt','cf-vil','cf-con'].forEach(id=>{const e=$(id);if(e)e.classList.remove('err')});
  hide('cf-err');
}
function closeForm(){$('cf-modal').style.display='none';document.body.style.overflow=''}
function cfBg(e){if(e.target===$('cf-modal'))closeForm()}

async function saveCrop(e){
  e.preventDefault();
  const id=$('cf-id').value;
  const name=$('cf-nm').value.trim();
  const price=$('cf-pr').value;
  const qty=$('cf-qt').value;
  const village=$('cf-vil').value;
  const contact=$('cf-con').value.trim();
  const unit=$('cf-un').value;
  const cat=$('cf-cat').value;
  const desc=$('cf-dsc').value.trim();
  let ok=true;
  ['cf-nerr','cf-prerr','cf-qerr','cf-verr','cf-cerr'].forEach(id=>hideErr(id));
  hide('cf-err');
  if(!name||name.length<2){showErr('cf-nerr','Crop name must be at least 2 characters');ok=false}
  if(!price||isNaN(+price)||+price<=0){showErr('cf-prerr',T('negprice'));ok=false}
  if(!qty||isNaN(+qty)||+qty<=0){showErr('cf-qerr',T('invalidqty'));ok=false}
  if(!village||!VILLAGES.includes(village)){showErr('cf-verr',T('invalidvil'));ok=false}
  if(!contact||!/^[6-9]\d{9}$/.test(contact.replace(/\s/g,''))){showErr('cf-cerr',T('invalidphone'));ok=false}
  if(!ok)return;
  setLoad('cf-sav','cf-stxt','cf-ssp',true);
  try{
    const url=id?'/api/crops?id='+id:'/api/crops';
    const r=await fetch(url,{method:id?'PUT':'POST',headers:{'Content-Type':'application/json',...aHdr()},body:JSON.stringify({crop_name:name,price:+price,quantity:+qty,village,contact,unit,category:cat,description:desc||null})});
    const d=await r.json();
    if(!r.ok){$('cf-err').textContent=d.error||T('neterr');showBlock('cf-err');return}
    toast(id?'Crop updated successfully! ✅':'Crop added successfully! 🌱','ok');
    closeForm();loadDash();
  }catch{$('cf-err').textContent=T('neterr');showBlock('cf-err')}
  finally{setLoad('cf-sav','cf-stxt','cf-ssp',false)}
}

// ═══════════════════════════════════════════════
// DELETE
// ═══════════════════════════════════════════════
function askDel(crop){
  delTarget=crop;
  txt('del-nm','"'+crop.crop_name+'"?');
  $('del-modal').style.display='flex';
  document.body.style.overflow='hidden';
}
function closeDel(){$('del-modal').style.display='none';document.body.style.overflow='';delTarget=null}
function delBg(e){if(e.target===$('del-modal'))closeDel()}

async function confirmDel(){
  if(!delTarget)return;
  const btn=$('del-ok');btn.disabled=true;btn.textContent='Deleting...';
  try{
    const r=await fetch('/api/crops?id='+delTarget.id,{method:'DELETE',headers:aHdr()});
    const d=await r.json();
    if(!r.ok)throw new Error(d.error||'Delete failed');
    toast('Crop deleted successfully 🗑️','ok');
    closeDel();loadDash();
  }catch(err){
    toast(err.message||T('neterr'),'err');
    btn.disabled=false;btn.textContent=T('del');
  }
}

// ═══════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════
(function init(){
  try{const l=localStorage.getItem('fp_lang');if(l&&TR[l])lang=l}catch{}
  loadAuth();

  // Populate village dropdowns
  const bv=$('b-vil');
  VILLAGES.forEach(v=>{const o=document.createElement('option');o.value=v;o.textContent=v;bv.appendChild(o)});
  const cv=$('cf-vil');
  VILLAGES.forEach(v=>{const o=document.createElement('option');o.value=v;o.textContent=v;cv.appendChild(o)});

  // Village tags on home
  const vt=$('vtags');
  VILLAGES.forEach(v=>{
    const b=document.createElement('button');
    b.className='vtag';b.innerHTML='📍 '+v;
    b.onclick=()=>{go('browse');setTimeout(()=>{$('b-vil').value=v;loadBrowse()},200)};
    vt.appendChild(b);
  });

  // Lang buttons
  document.querySelectorAll('.lang-btn').forEach(b=>{
    b.classList.toggle('active',b.textContent.toLowerCase().includes(lang));
  });

  applyLang();
  updateNav();

  const h=location.hash.replace('#','')||'home';
  go(h,true);

  // Verify session silently
  if(token){
    fetch('/api/auth?action=verify',{headers:{Authorization:'Bearer '+token}})
      .then(r=>r.ok?r.json():null)
      .then(d=>{if(d?.user){user=d.user;try{localStorage.setItem('fp_user',JSON.stringify(user))}catch{}updateNav()}else{clearAuth();updateNav()}})
      .catch(()=>{});
  }
})();
    </script>
    </body>
    </html>
</script>
</body>
</html>
