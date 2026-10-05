const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const {compare}=require('../answer-check.js'),data=require('../cards.json');const ctx={window:{}};vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../concepts.js'),'utf8'),ctx);const concepts=ctx.window.ANSWER_CONCEPTS;
function terms(question){return concepts[data.cards.find(c=>c.question.includes(question)).id];}
test('Explicit vocabulary for every biology card; safe nonempty aliases',()=>{
 assert.deepEqual(Object.keys(concepts).sort(),data.cards.map(c=>c.id).sort());
 for(const [id,items] of Object.entries(concepts)){assert.ok(items.length,id);for(const c of items){assert.ok(c.label);assert.ok(c.terms.length&&c.terms.every(s=>typeof s==='string'&&s.length>1),id);}}
});
test('Biology synonyms, Swiss spelling and compound boundaries',()=>{
 assert.ok(compare('Das Cytoplasma liegt in der Zellmembran.',terms('Welche Grundbestandteile')).found.includes('Zellplasma'));
 assert.ok(compare('Ethylen ist ein Pflanzenhormon, das die Reifung fördert.',terms('Welcher Stoff präzisiert')).found.includes('Ethen'));
 assert.ok(compare('Thrombozyten und Leukozyten',terms('Welche Blutbestandteile')).found.includes('Blutplättchen'));
 assert.ok(compare('Die Bauchspeicheldruese bildet Hormone.',terms('Welche Hormondrüsen')).found.includes('Bauchspeicheldrüse'));
 assert.equal(compare('Herzlosigkeit', [{label:'Herz',terms:['Herz']}]).found.length,0);
 assert.equal(compare('Pizza',terms('Welche Grundbestandteile')).found.length,0);
});
test('Negations remain cautions, concept detection never assigns correctness',()=>{
 const r=compare('Bakterien haben keinen Zellkern.',terms('Nenne drei typische Merkmale'));
 assert.equal(r.caution,true);assert.ok(r.found.includes('Zellkern'));assert.equal(r.correct,undefined);
});
test('Chemical subscripts and plain spoken formulas share normalization',()=>{
 const q=terms('ausgeglichene Fotosynthesegleichung');
 assert.equal(compare('6 CO₂ + 6 H₂O → C₆H₁₂O₆ + 6 O₂',q).missing.length,0);
 assert.equal(compare('Kohlendioxid, Wasser, Traubenzucker, Sauerstoff',q).missing.length,0);
});
test('Model wording does not produce spurious missing vocabulary',()=>{
 for(const c of data.cards)assert.equal(compare(c.answer.join(' '),concepts[c.id]).missing.length,0,c.id);
});
