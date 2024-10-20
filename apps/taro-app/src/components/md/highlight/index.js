'use strict'; function e(e) { this.vm = e } const t = require('../parser'); const s = require('./config'); const r = require('./prism.min')

e.prototype.onParse = function (e, a) {
  if (e.name === 'pre') {
    if (a.options.editable) { return void (e.attrs.class = `${e.attrs.class || ''} hl-pre`) } let n; for (n = e.children.length; n-- && e.children[n].name !== 'code';) { ; } if (n === -1) { return } const l = e.children[n]; let i = `${l.attrs.class} ${e.attrs.class}`; n = i.indexOf('language-'), n === -1 ? (n = i.indexOf('lang-'), n === -1 ? (i = 'language-text', n = 9) : n += 5) : n += 9; let c; for (c = n; c < i.length && i[c] !== ' '; c++) { ; } const h = i.substring(n, c); if (l.children.length) {
      const o = this.vm.getText(l.children).replace(/&amp;/g, '&'); if (!o) { return } if (e.c && (e.c = void 0), r.languages[h] && (l.children = new t(this.vm).parse(`<pre>${r.highlight(o, r.languages[h], h).replace(/token /g, 'hl-')}</pre>`)[0].children), e.attrs.class = 'hl-pre', l.attrs.class = 'hl-code', s.showLanguageName && e.children.push({ name: 'div', attrs: { class: 'hl-language', style: 'user-select:none' }, children: [{ type: 'text', text: h }] }), s.copyByLongPress && (e.attrs.style += `${e.attrs.style || ''};user-select:none`, e.attrs['data-content'] = o, a.expose()), s.showLineNumber) { for (var g = o.split('\n').length, p = [], u = g; u--;) { p.push({ name: 'span', attrs: { class: 'span' } }) }e.children.push({ name: 'span', attrs: { class: 'line-numbers-rows' }, children: p }) }
    }
  }
}, module.exports = e
