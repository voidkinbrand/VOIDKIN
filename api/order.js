// Vercel Node.js Function. Never expose TELEGRAM_BOT_TOKEN in public JavaScript.
const PRODUCTS = Object.freeze({'vk-001':{title:'CONTROL TEE',price:49},'vk-002':{title:'DAYDREAM TEE',price:49},'vk-003':{title:'AFTERIMAGE TEE',price:49}});
const clean = (v,max=120)=>typeof v==='string' ? v.trim().slice(0,max).replace(/[\u0000-\u001f\u007f]/g,' ') : '';
const validContact = v => /^@[a-zA-Z0-9_]{5,32}$/.test(v) || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const safeTelegram = v => String(v).replace(/[<>]/g,'');
export default async function handler(req,res){
 res.setHeader('Cache-Control','no-store');
 if(req.method!=='POST'){res.setHeader('Allow','POST');return res.status(405).json({error:'Method not allowed.'});}
 const host = req.headers.host;
 const origin = req.headers.origin;
 if(origin){try{if(new URL(origin).host!==host)return res.status(403).json({error:'Invalid origin.'});}catch{return res.status(403).json({error:'Invalid origin.'});}}
 const token=process.env.TELEGRAM_BOT_TOKEN,chatId=process.env.TELEGRAM_CHAT_ID;
 if(!token||!chatId)return res.status(503).json({error:'Ordering is not yet available. The Telegram bot has not been connected.'});
 try{
  if(Number(req.headers['content-length']||0)>12000)return res.status(413).json({error:'Request is too large.'});
  const d=req.body||{};
  if(d.website)return res.status(200).json({orderId:'PENDING'}); // bot honeypot
  const name=clean(d.name,80),contact=clean(d.contact,120),country=clean(d.country,80),note=clean(d.note,500);
  if(!name||name.length<2||!validContact(contact)||!country||country.length<2||d.consent!==true)return res.status(400).json({error:'Enter your name, valid Telegram @username or email, shipping country, and consent.'});
  if(!Array.isArray(d.items)||d.items.length<1||d.items.length>12)return res.status(400).json({error:'Your bag is empty or too large.'});
  let total=0,count=0;const lines=[];
  for(const item of d.items){const p=PRODUCTS[item?.id];const q=item?.qty;const size=item?.size;if(!p||!Number.isInteger(q)||q<1||q>10||!['S','M','L','XL'].includes(size))return res.status(400).json({error:'Invalid products or sizes.'});count+=q;if(count>30)return res.status(400).json({error:'Too many items.'});total+=p.price*q;lines.push(`${p.title} / ${size} × ${q} — €${p.price*q}`)}
  const orderId='VK-'+Date.now().toString(36).toUpperCase()+'-'+Math.random().toString(36).slice(2,6).toUpperCase();
  const body=`🖤 VOIDKIN · NEW ORDER REQUEST\n\nReference: ${orderId}\nName: ${name}\nContact: ${contact}\nCountry: ${country}\n\n${lines.join('\n')}\n\nSubtotal: €${total}\nShipping: to be confirmed\nNote: ${note||'—'}\n\nNot paid. Confirm availability, delivery, total and payment before fulfillment.`;
  const response=await fetch(`https://api.telegram.org/bot${token}/sendMessage`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({chat_id:chatId,text:safeTelegram(body),disable_web_page_preview:true}),signal:AbortSignal.timeout(10000)});
  if(!response.ok){console.error('Telegram rejected order:',response.status);return res.status(502).json({error:'Telegram could not receive this order. Please try again later.'});}
  return res.status(200).json({orderId});
 }catch(e){console.error('Order delivery failed:',e?.message);return res.status(500).json({error:'Could not send the order. Please try again later.'});}
}
