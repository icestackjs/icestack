'use strict'; function t(t) { this.vm = t, t._ids = {} } const e = require('./marked.min')

let a = 0

t.prototype.onUpdate = function (t) {
  if (this.vm.data.markdown) { return e(t) }
}, t.prototype.onParse = function (t, e) { if (e.options.markdown) { if (e.options.useAnchor && t.attrs && /[\u4E00-\u9FA5]/.test(t.attrs.id)) { const n = `t${a++}`; this.vm._ids[t.attrs.id] = n, t.attrs.id = n }t.name !== 'p' && t.name !== 'table' && t.name !== 'tr' && t.name !== 'th' && t.name !== 'td' && t.name !== 'blockquote' && t.name !== 'pre' && t.name !== 'code' || (t.attrs.class = 'md-'.concat(t.name, ' ').concat(t.attrs.class || '')) } }, module.exports = t
