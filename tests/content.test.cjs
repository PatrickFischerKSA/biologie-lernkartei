const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.join(__dirname,'..'),data=require('../cards.json'),coverage=require('../coverage.json');
test('171 complete cards, 7 source objectives, all levels and valid references',()=>{
 assert.equal(data.cards.length,171);assert.equal(new Set(data.cards.map(c=>c.id)).size,171);assert.equal(data.goals.length,7);
 for(const c of data.cards){
  for(const k of ['id','question','pages','origin','topic'])assert.ok(c[k]?.trim(),c.id+' '+k);
  assert.ok(c.answer.length&&c.answer.every(p=>p.length>15),c.id);
  assert.ok(c.goals.length&&c.goals.every(id=>data.goals.some(g=>g.id===id)),c.id);
  assert.ok(['basis','vertieft','profi'].includes(c.level));assert.ok(['abgeglichen','praezisiert','ergaenzt','offen'].includes(c.status));
  assert.ok(c.links.every(id=>data.sources[id]?.url.startsWith('https://')));
  if(c.image){assert.ok(fs.existsSync(path.join(root,'assets',c.image)));assert.ok(c.imageAlt);}
 }
 for(const g of data.goals){const row=coverage.find(r=>r.id===g.id);assert.ok(row);assert.deepEqual(row.cards,data.cards.filter(c=>c.goals.includes(g.id)).map(c=>c.id));}
});
test('Browser data matches canonical JSON',()=>{const ctx={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'data.js'),'utf8'),ctx);assert.equal(JSON.stringify(ctx.window.LEARNING_DATA),JSON.stringify(data));});
test('Every source goal has basic recall and deeper application, all 12 organ sections are covered',()=>{
 for(const g of data.goals)for(const level of ['basis','vertieft','profi'])assert.ok(data.cards.some(c=>c.goals.includes(g.id)&&c.level===level),g.id+' '+level);
 const text=data.cards.filter(c=>c.goals.includes('L7')).map(c=>c.question+' '+c.answer.join(' ')).join(' ');
 for(const term of ['Verdauung','Atmung','Harnsystem','Blutsystem','Haut','Sinnes','Nervensystem','Hormone','Fortpflanzungsorgane','Lymphsystem','Skelett','Muskel'])assert.ok(text.includes(term),term);
});
test('Independent biology storage and no inherited geography sources',()=>{
 const app=fs.readFileSync(path.join(root,'app.js'),'utf8'),html=fs.readFileSync(path.join(root,'index.html'),'utf8');
 assert.ok(app.includes("subject:'biologie'"));assert.ok(app.includes('biologie-zum-wenden:v1'));
 for(const s of ['geografie-zum-wenden','Geografie Einführung','Atlasfrage','Erdgestalt','Zeitzonen'])assert.ok(!app.includes(s)&&!html.includes(s));
 assert.ok(html.includes('IMG_6967.pdf'));assert.ok(html.includes('abgeschnitten'));
});
