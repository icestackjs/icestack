'use strict'; function e(t) { '@babel/helpers - typeof'; return (e = typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol' ? function (e) { return typeof e } : function (e) { return e && typeof Symbol == 'function' && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e })(t) } function t(e, t, o) { return t = n(t), t in e ? Object.defineProperty(e, t, { value: o, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = o, e } function n(t) { const n = o(t, 'string'); return e(n) === 'symbol' ? n : String(n) } function o(t, n) {
  if (e(t) !== 'object' || t === null) { return t } const o = t[Symbol.toPrimitive]; if (void 0 !== o) {
    const i = o.call(t, n || 'default'); if (e(i) !== 'object') { return i } throw new TypeError('@@toPrimitive must return a primitive value.')
  } return (n === 'string' ? String : Number)(t)
}/*!
 * mp-html v2.4.2
 * https://github.com/jin-yufeng/mp-html
 *
 * Released under the MIT license
 * Author: Jin Yufeng
 */
const i = require('./parser'); const r = [require('./markdown/index.js'), require('./highlight/index.js')]

Component({ data: { nodes: [] }, properties: { markdown: Boolean, containerStyle: String, content: { type: String, value: '', observer(e) { this.setContent(e) } }, copyLink: { type: Boolean, value: !0 }, domain: String, errorImg: String, lazyLoad: Boolean, loadingImg: String, pauseVideo: { type: Boolean, value: !0 }, previewImg: { type: Boolean, value: !0 }, scrollTable: Boolean, selectable: null, setTitle: { type: Boolean, value: !0 }, showImgMenu: { type: Boolean, value: !0 }, tagStyle: Object, useAnchor: null }, created() { this.plugins = []; for (let e = r.length; e--;) { this.plugins.push(new r[e](this)) } }, detached() { this._hook('onDetached') }, methods: { in(e, t, n) { e && t && n && (this._in = { page: e, selector: t, scrollTop: n }) }, navigateTo(e, n) {
  const o = this; return e = this._ids[decodeURI(e)] || e, new Promise((i, r) => {
    if (!o.data.useAnchor) { return void r(new Error('Anchor is disabled')) } const a = wx.createSelectorQuery().in(o._in ? o._in.page : o).select((o._in ? o._in.selector : '._root') + (e ? ''.concat('>>>', '#').concat(e) : '')).boundingClientRect(); o._in ? a.select(o._in.selector).scrollOffset().select(o._in.selector).boundingClientRect() : a.selectViewport().scrollOffset(), a.exec((e) => {
      if (!e[0]) { return void r(new Error('Label not found')) } const a = e[1].scrollTop + e[0].top - (e[2] ? e[2].top : 0) + (n || Number.parseInt(o.data.useAnchor) || 0); o._in ? o._in.page.setData(t({}, o._in.scrollTop, a)) : wx.pageScrollTo({ scrollTop: a, duration: 300 }), i()
    })
  })
}, getText(e) {
  let t = ''; return (function e(n) {
    for (let o = 0; o < n.length; o++) {
      const i = n[o]; if (i.type === 'text') {
        t += i.text.replace(/&amp;/g, '&')
      }
      else if (i.name === 'br') {
        t += '\n'
      }
      else { const r = i.name === 'p' || i.name === 'div' || i.name === 'tr' || i.name === 'li' || i.name[0] === 'h' && i.name[1] > '0' && i.name[1] < '7'; r && t && t[t.length - 1] !== '\n' && (t += '\n'), i.children && e(i.children), r && t[t.length - 1] !== '\n' ? t += '\n' : i.name !== 'td' && i.name !== 'th' || (t += '\t') }
    }
  }(e || this.data.nodes)), t
}, getRect() { const e = this; return new Promise((t, n) => { wx.createSelectorQuery().in(e).select('._root').boundingClientRect().exec((e) => { return e[0] ? t(e[0]) : n(new Error('Root label not found')) }) }) }, pauseMedia() { for (let e = (this._videos || []).length; e--;) { this._videos[e].pause() } }, setPlaybackRate(e) { this.playbackRate = e; for (let t = (this._videos || []).length; t--;) { this._videos[t].playbackRate(e) } }, setContent(e, t) {
  const n = this; this.imgList && t || (this.imgList = []), this._videos = []; const o = {}; const r = new i(this).parse(e); if (t) {
    for (let a = this.data.nodes.length, s = r.length; s--;) { o['nodes['.concat(a + s, ']')] = r[s] }
  }
  else {
    o.nodes = r
  } if (this.setData(o, () => { n._hook('onLoad'), n.triggerEvent('load') }), this.data.lazyLoad || this.imgList._unloadimgs < this.imgList.length / 2) { let l = 0; const c = function e(t) { t && t.height || (t = {}), t.height === l ? n.triggerEvent('ready', t) : (l = t.height, setTimeout(() => { n.getRect().then(e).catch(e) }, 350)) }; this.getRect().then(c).catch(c) }
  else {
    this.imgList._unloadimgs || this.getRect().then((e) => { n.triggerEvent('ready', e) }).catch(() => { n.triggerEvent('ready', {}) })
  }
}, _hook(e) { for (let t = r.length; t--;) { this.plugins[t][e] && this.plugins[t][e]() } }, _add(e) { e.detail.root = this } } })
