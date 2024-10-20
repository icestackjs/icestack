'use strict'; function t(t, e) {
  let s = typeof Symbol != 'undefined' && t[Symbol.iterator] || t['@@iterator']; if (!s) { if (Array.isArray(t) || (s = i(t)) || e && t && typeof t.length == 'number') { s && (t = s); let n = 0; const a = function () {}; return { s: a, n() { return n >= t.length ? { done: !0 } : { done: !1, value: t[n++] } }, e(t) { throw t }, f: a } } throw new TypeError('Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.') } let r; let o = !0; let l = !1; return { s() { s = s.call(t) }, n() { const t = s.next(); return o = t.done, t }, e(t) { l = !0, r = t }, f() {
    try { o || s.return == null || s.return() }
    finally {
      if (l) { throw r }
    }
  } }
} function i(t, i) {
  if (t) {
    if (typeof t == 'string') { return e(t, i) } let s = Object.prototype.toString.call(t).slice(8, -1); return s === 'Object' && t.constructor && (s = t.constructor.name), s === 'Map' || s === 'Set' ? Array.from(t) : s === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(s) ? e(t, i) : void 0
  }
} function e(t, i) { (i == null || i > t.length) && (i = t.length); for (var e = 0, s = new Array(i); e < i; e++) { s[e] = t[e] } return s } function s(t) { for (var i = Object.create(null), e = t.split(','), s = e.length; s--;) { i[e[s]] = !0 } return i } function n(t, i) {
  for (let e = t.indexOf('&'); e !== -1;) {
    const s = t.indexOf(';', e + 3); let n = void 0; if (s === -1) { break } t[e + 1] === '#' ? (n = Number.parseInt((t[e + 2] === 'x' ? '0' : '') + t.substring(e + 2, s)), isNaN(n) || (t = t.substr(0, e) + String.fromCharCode(n) + t.substr(s + 1))) : (n = t.substring(e + 1, s), (l.entities[n] || n === 'amp' && i) && (t = t.substr(0, e) + (l.entities[n] || '&') + t.substr(s + 1))), e = t.indexOf('&', e + 1)
  } return t
} function a(t) { for (let i = t.length - 1, e = i; e >= -1; e--) { (e === -1 || t[e].c || !t[e].name || t[e].name !== 'div' && t[e].name !== 'p' && t[e].name[0] !== 'h' || (t[e].attrs.style || '').includes('inline')) && (i - e >= 5 && t.splice(e + 1, i - e, { name: 'div', attrs: {}, children: t.slice(e + 1, i + 1) }), i = e - 1) } } function r(t) { this.options = t.data || {}, this.tagStyle = Object.assign({}, l.tagStyle, this.options.tagStyle), this.imgList = t.imgList || [], this.imgList._unloadimgs = 0, this.plugins = t.plugins || [], this.attrs = Object.create(null), this.stack = [], this.nodes = [], this.pre = (this.options.containerStyle || '').includes('white-space') && this.options.containerStyle.includes('pre') ? 2 : 0 } function o(t) { this.handler = t } var l = { trustTags: s('a,abbr,ad,audio,b,blockquote,br,code,col,colgroup,dd,del,dl,dt,div,em,fieldset,h1,h2,h3,h4,h5,h6,hr,i,img,ins,label,legend,li,ol,p,q,ruby,rt,source,span,strong,sub,sup,table,tbody,td,tfoot,th,thead,tr,title,ul,video'), blockTags: s('address,article,aside,body,caption,center,cite,footer,header,html,nav,pre,section'), ignoreTags: s('area,base,canvas,embed,frame,head,iframe,input,link,map,meta,param,rp,script,source,style,textarea,title,track,wbr'), voidTags: s('card,area,base,br,col,circle,ellipse,embed,frame,hr,img,input,line,link,meta,param,path,polygon,rect,source,track,use,wbr'), entities: { lt: '<', gt: '>', quot: '"', apos: '\'', ensp: ' ', emsp: ' ', nbsp: ' ', semi: ';', ndash: '–', mdash: '—', middot: '·', lsquo: '‘', rsquo: '’', ldquo: '“', rdquo: '”', bull: '•', hellip: '…', larr: '←', uarr: '↑', rarr: '→', darr: '↓' }, tagStyle: { address: 'font-style:italic', big: 'display:inline;font-size:1.2em', caption: 'display:table-caption;text-align:center', center: 'text-align:center', cite: 'font-style:italic', dd: 'margin-left:40px', mark: 'background-color:yellow', pre: 'font-family:monospace;white-space:pre', s: 'text-decoration:line-through', small: 'display:inline;font-size:0.8em', strike: 'text-decoration:line-through', u: 'text-decoration:underline' }, svgDict: { animatetransform: 'animateTransform', lineargradient: 'linearGradient', viewbox: 'viewBox', attributename: 'attributeName', repeatcount: 'repeatCount', repeatdur: 'repeatDur', foreignobject: 'foreignObject' } }; const h = {}; const c = wx.getSystemInfoSync(); const d = c.windowWidth; const p = c.system; const u = s(' ,\r,\n,\t,\f'); let f = 0; r.prototype.parse = function (t) { for (let i = this.plugins.length; i--;) { this.plugins[i].onUpdate && (t = this.plugins[i].onUpdate(t, l) || t) } for (new o(this).parse(t); this.stack.length;) { this.popNode() } return this.nodes.length > 50 && a(this.nodes), this.nodes }, r.prototype.expose = function () {
  for (let t = this.stack.length; t--;) {
    const i = this.stack[t]; if (i.c || i.name === 'a' || i.name === 'video' || i.name === 'audio') { return } i.c = 1
  }
}, r.prototype.hook = function (t) {
  for (let i = this.plugins.length; i--;) {
    if (this.plugins[i].onParse && !1 === this.plugins[i].onParse(t, this)) { return !1 }
  } return !0
}, r.prototype.getUrl = function (t) { const i = this.options.domain; return t[0] === '/' ? t[1] === '/' ? t = `${i ? i.split('://')[0] : 'http'}:${t}` : i && (t = i + t) : !i || t.includes('data:') || t.includes('://') || (t = `${i}/${t}`), t }, r.prototype.parseStyle = function (t) {
  const i = t.attrs; const e = (this.tagStyle[t.name] || '').split(';').concat((i.style || '').split(';')); const s = {}; let n = ''; i.id && !this.xml && (this.options.useAnchor ? this.expose() : t.name !== 'img' && t.name !== 'a' && t.name !== 'video' && t.name !== 'audio' && (i.id = void 0)), i.width && (s.width = Number.parseFloat(i.width) + (i.width.includes('%') ? '%' : 'px'), i.width = void 0), i.height && (s.height = Number.parseFloat(i.height) + (i.height.includes('%') ? '%' : 'px'), i.height = void 0); for (let a = 0, r = e.length; a < r; a++) {
    const o = e[a].split(':'); if (!(o.length < 2)) {
      const l = o.shift().trim().toLowerCase(); let h = o.join(':').trim(); if (h[0] === '-' && h.lastIndexOf('-') > 0 || h.includes('safe')) {
        n += ';'.concat(l, ':').concat(h)
      }
      else if (!s[l] || h.includes('import') || !s[l].includes('import')) {
        if (h.includes('url')) { let c = h.indexOf('(') + 1; if (c) { for (;h[c] === '"' || h[c] === '\'' || u[h[c]];) { c++ }h = h.substr(0, c) + this.getUrl(h.substr(c)) } }
        else {
          h.includes('rpx') && (h = h.replace(/[0-9.]+\s*rpx/g, (t) => { return `${Number.parseFloat(t) * d / 750}px` }))
        }s[l] = h
      }
    }
  } return t.attrs.style = n, s
}, r.prototype.onTagName = function (t) { this.tagName = this.xml ? t : t.toLowerCase(), this.tagName === 'svg' && (this.xml = (this.xml || 0) + 1, l.ignoreTags.style = void 0) }, r.prototype.onAttrName = function (t) { t = this.xml ? t : t.toLowerCase(), t.substr(0, 5) === 'data-' ? t !== 'data-src' || this.attrs.src ? this.tagName === 'img' || this.tagName === 'a' ? this.attrName = t : this.attrName = void 0 : this.attrName = 'src' : (this.attrName = t, this.attrs[t] = 'T') }, r.prototype.onAttrVal = function (t) { const i = this.attrName || ''; i === 'style' || i === 'href' ? this.attrs[i] = n(t, !0) : i.includes('src') ? this.attrs[i] = this.getUrl(n(t, !0)) : i && (this.attrs[i] = t) }, r.prototype.onOpenTag = function (t) {
  const i = Object.create(null); i.name = this.tagName, i.attrs = this.attrs, this.attrs = Object.create(null); const e = i.attrs; const s = this.stack[this.stack.length - 1]; const n = s ? s.children : this.nodes; const a = this.xml ? t : l.voidTags[i.name]; if (h[i.name] && (e.class = h[i.name] + (e.class ? ` ${e.class}` : '')), i.name === 'embed') { const r = e.src || ''; r.includes('.mp4') || r.includes('.3gp') || r.includes('.m3u8') || (e.type || '').includes('video') ? i.name = 'video' : (r.includes('.mp3') || r.includes('.wav') || r.includes('.aac') || r.includes('.m4a') || (e.type || '').includes('audio')) && (i.name = 'audio'), e.autostart && (e.autoplay = 'T'), e.controls = 'T' } if (i.name !== 'video' && i.name !== 'audio' || (i.name !== 'video' || e.id || (e.id = `v${f++}`), e.controls || e.autoplay || (e.controls = 'T'), i.src = [], e.src && (i.src.push(e.src), e.src = void 0), this.expose()), a) {
    if (!this.hook(i) || l.ignoreTags[i.name]) { return void (i.name !== 'base' || this.options.domain ? i.name === 'source' && s && (s.name === 'video' || s.name === 'audio') && e.src && s.src.push(e.src) : this.options.domain = e.href) } const o = this.parseStyle(i); if (i.name === 'img') {
      if (e.src && (e.src.includes('webp') && (i.webp = 'T'), e.src.includes('data:') && !e['original-src'] && (e.ignore = 'T'), !e.ignore || i.webp || e.src.includes('cloud://'))) {
        for (let c = this.stack.length; c--;) {
          const p = this.stack[c]; p.name !== 'table' || i.webp || e.src.includes('cloud://') || (!o.display || o.display.includes('inline') ? i.t = 'inline-block' : i.t = o.display, o.display = void 0); const u = p.attrs.style || ''; if (!u.includes('flex:') || u.includes('flex:0') || u.includes('flex: 0') || o.width && !(Number.parseInt(o.width) > 100)) {
            if (u.includes('flex') && o.width === '100%') {
              for (let g = c + 1; g < this.stack.length; g++) { const m = this.stack[g].attrs.style || ''; if (!m.includes(';width') && !m.includes(' width') && m.indexOf('width') !== 0) { o.width = ''; break } }
            }
            else {
              u.includes('inline-block') && (o.width && o.width[o.width.length - 1] === '%' ? (p.attrs.style += `;max-width:${o.width}`, o.width = '') : p.attrs.style += ';max-width:100%')
            }
          }
          else { o.width = '100% !important', o.height = ''; for (let v = c + 1; v < this.stack.length; v++) { this.stack[v].attrs.style = (this.stack[v].attrs.style || '').replace('inline-', '') } }p.name === 'a' ? i.a = p.attrs : p.c = 1
        }i.i = this.imgList.length; let y = e['original-src'] || e.src; if (this.imgList.includes(y)) { let b = y.indexOf('://'); if (b !== -1) { b += 3; for (var x = y.substr(0, b); b < y.length && y[b] !== '/'; b++) { x += Math.random() > 0.5 ? y[b].toUpperCase() : y[b] }x += y.substr(b), y = x } } this.imgList.push(y), i.t || (this.imgList._unloadimgs += 1)
      }o.display === 'inline' && (o.display = ''), e.ignore && (o['max-width'] = o['max-width'] || '100%', e.style += ';-webkit-touch-callout:none'), Number.parseInt(o.width) > d && (o.height = void 0), isNaN(Number.parseInt(o.width)) || (i.w = 'T'), !isNaN(Number.parseInt(o.height)) && (!o.height.includes('%') || s && (s.attrs.style || '').includes('height')) && (i.h = 'T')
    }
    else if (i.name === 'svg') {
      return n.push(i), this.stack.push(i), void this.popNode()
    } for (const w in o) { o[w] && (e.style += ';'.concat(w, ':').concat(o[w].replace(' !important', ''))) }e.style = e.style.substr(1) || void 0
  }
  else {
    (i.name === 'pre' || (e.style || '').includes('white-space') && e.style.includes('pre')) && this.pre !== 2 && (this.pre = i.pre = 1), i.children = [], this.stack.push(i)
  } n.push(i)
}, r.prototype.onCloseTag = function (t) {
  t = this.xml ? t : t.toLowerCase(); let i; for (i = this.stack.length; i-- && this.stack[i].name !== t;) { ; } if (i !== -1) {
    for (;this.stack.length > i;) { this.popNode() }
  }
  else if (t === 'p' || t === 'br') { const e = this.stack.length ? this.stack[this.stack.length - 1].children : this.nodes; e.push({ name: t, attrs: { class: h[t], style: this.tagStyle[t] } }) }
}, r.prototype.popNode = function () {
  const i = this.stack.pop(); let e = i.attrs; const s = i.children; const n = this.stack[this.stack.length - 1]; const r = n ? n.children : this.nodes; if (!this.hook(i) || l.ignoreTags[i.name]) { return i.name === 'title' && s.length && s[0].type === 'text' && this.options.setTitle && wx.setNavigationBarTitle({ title: s[0].text }), void r.pop() } if (i.pre && this.pre !== 2) { this.pre = i.pre = void 0; for (let o = this.stack.length; o--;) { this.stack[o].pre && (this.pre = 1) } } if (i.name === 'svg') {
    if (this.xml > 1) { return void this.xml-- } let h = ''; const c = e.style; return e.style = '', e.xmlns = 'http://www.w3.org/2000/svg', (function i(e) {
      if (e.type === 'text') { return void (h += e.text) } const s = l.svgDict[e.name] || e.name; if (s === 'foreignObject') {
        let n; const a = t(e.children || []); try { for (a.s(); !(n = a.n()).done;) { const r = n.value; if (r.attrs && !r.attrs.xmlns) { r.attrs.xmlns = 'http://www.w3.org/1999/xhtml'; break } } }
        catch (t) { a.e(t) }
        finally { a.f() }
      }h += `<${s}`; for (const o in e.attrs) { const c = e.attrs[o]; c && (h += ' '.concat(l.svgDict[o] || o, '="').concat(c, '"')) } if (e.children) { h += '>'; for (let d = 0; d < e.children.length; d++) { i(e.children[d]) }h += `</${s}>` }
      else {
        h += '/>'
      }
    }(i)), i.name = 'img', i.attrs = { src: `data:image/svg+xml;utf8,${h.replace(/#/g, '%23')}`, style: c, ignore: 'T' }, i.children = void 0, this.xml = !1, void (l.ignoreTags.style = !0)
  } const p = {}; if (e.align && (i.name === 'table' ? e.align === 'center' ? p['margin-inline-start'] = p['margin-inline-end'] = 'auto' : p.float = e.align : p['text-align'] = e.align, e.align = void 0), e.dir && (p.direction = e.dir, e.dir = void 0), i.name === 'font' && (e.color && (p.color = e.color, e.color = void 0), e.face && (p['font-family'] = e.face, e.face = void 0), e.size)) { let u = Number.parseInt(e.size); isNaN(u) || (u < 1 ? u = 1 : u > 7 && (u = 7), p['font-size'] = ['x-small', 'small', 'medium', 'large', 'x-large', 'xx-large', 'xxx-large'][u - 1]), e.size = void 0 } if ((e.class || '').includes('align-center') && (p['text-align'] = 'center'), Object.assign(p, this.parseStyle(i)), i.name !== 'table' && Number.parseInt(p.width) > d && (p['max-width'] = '100%', p['box-sizing'] = 'border-box'), l.blockTags[i.name]) {
    i.name = 'div'
  }
  else if (l.trustTags[i.name] || this.xml) {
    if (i.name === 'a' || i.name === 'ad') {
      this.expose()
    }
    else if (i.name === 'video' || i.name === 'audio') {
      (p.height || '').includes('auto') && (p.height = void 0), i.children = void 0
    }
    else if (i.name !== 'ul' && i.name !== 'ol' || !i.c) {
      if (i.name === 'table') {
        let f = Number.parseFloat(e.cellpadding); let g = Number.parseFloat(e.cellspacing); const m = Number.parseFloat(e.border); const v = p['border-color']; const y = p['border-style']; if (i.c && (isNaN(f) && (f = 2), isNaN(g) && (g = 2)), m && (e.style += ';border:'.concat(m, 'px ').concat(y || 'solid', ' ').concat(v || 'gray')), i.flag && i.c) {
          i.flag = void 0, p.display = 'grid', p['border-collapse'] === 'collapse' && (p['border-collapse'] = void 0, g = 0), g ? (p['grid-gap'] = `${g}px`, p.padding = `${g}px`) : m && (e.style += ';border-left:0;border-top:0'); const b = []; const x = []; const w = []; const k = {}; !(function i(e) {
            for (let s = 0; s < e.length; s++) {
              if (e[s].name === 'tr') {
                x.push(e[s])
              }
              else if (e[s].name === 'colgroup') {
                var n; let a = 1; const r = t(e[s].children || []); try { for (r.s(); !(n = r.n()).done;) { const o = n.value; if (o.name === 'col') { const l = o.attrs.style || ''; const h = l.indexOf('width') ? l.indexOf(';width') : 0; if (h !== -1) { let c = l.indexOf(';', h + 6); c === -1 && (c = l.length), b[a] = l.substring(h ? h + 7 : 6, c) }a += 1 } } }
                catch (t) { r.e(t) }
                finally { r.f() }
              }
              else {
                i(e[s].children || [])
              }
            }
          }(s)); for (let N = 1; N <= x.length; N++) {
            for (var T = 1, O = 0; O < x[N - 1].children.length; O++) {
              const j = x[N - 1].children[O]; if (j.name === 'td' || j.name === 'th') {
                for (;k[`${N}.${T}`];) { T++ }j.c = 1; let S = j.attrs.style || ''; let C = S.indexOf('width') ? S.indexOf(';width') : 0; if (C !== -1) { let A = S.indexOf(';', C + 6); A === -1 && (A = S.length), j.attrs.colspan || (b[T] = S.substring(C ? C + 7 : 6, A)), S = S.substr(0, C) + S.substr(A) } if (S += ';display:flex;flex-direction:column', (C = S.indexOf('vertical-align')) !== -1) { const I = S.substr(C + 15, 10); I.includes('middle') ? S += ';justify-content:center' : I.includes('bottom') && (S += ';justify-content:flex-end') }
                else {
                  S += ';justify-content:center'
                } if ((C = S.indexOf('text-align')) !== -1) { const L = S.substr(C + 11, 10); L.includes('center') ? S += ';justify-content: center' : L.includes('right') && (S += ';justify-content: right') } if (S = `${(m ? ';border:'.concat(m, 'px ').concat(y || 'solid', ' ').concat(v || 'gray') + (g ? '' : ';border-right:0;border-bottom:0') : '') + (f ? ';padding:'.concat(f, 'px') : '')};${S}`, j.attrs.colspan && (S += ';grid-column-start:'.concat(T, ';grid-column-end:').concat(T + Number.parseInt(j.attrs.colspan)), j.attrs.rowspan || (S += ';grid-row-start:'.concat(N, ';grid-row-end:').concat(N + 1)), T += Number.parseInt(j.attrs.colspan) - 1), j.attrs.rowspan) {
                  S += ';grid-row-start:'.concat(N, ';grid-row-end:').concat(N + Number.parseInt(j.attrs.rowspan)), j.attrs.colspan || (S += ';grid-column-start:'.concat(T, ';grid-column-end:').concat(T + 1)); for (let z = 1; z < j.attrs.rowspan; z++) {
                    for (let U = 0; U < (j.attrs.colspan || 1); U++) { k[`${N + z}.${T - U}`] = 1 }
                  }
                }S && (j.attrs.style = S), w.push(j), T++
              }
            } if (N === 1) { for (var q = '', F = 1; F < T; F++) { q += `${b[F] ? b[F] : 'auto'} ` }p['grid-template-columns'] = q }
          }i.children = w
        }
        else {
          i.c && (p.display = 'table'), isNaN(g) || (p['border-spacing'] = `${g}px`), (m || f || i.c) && (function t(e) { for (let s = 0; s < e.length; s++) { const n = e[s]; i.c && (n.c = 1), n.name === 'th' || n.name === 'td' ? (m && (n.attrs.style = 'border:'.concat(m, 'px ').concat(y || 'solid', ' ').concat(v || 'gray', ';').concat(n.attrs.style || '')), f && (n.attrs.style = 'padding:'.concat(f, 'px;').concat(n.attrs.style || ''))) : n.children && t(n.children) } }(s))
        } if (this.options.scrollTable && !(e.style || '').includes('inline')) { const V = Object.assign({}, i); i.name = 'div', i.attrs = { style: 'overflow-x:auto;padding:1px' }, i.children = [V], e = V.attrs }
      }
      else if (i.name !== 'td' && i.name !== 'th' || !e.colspan && !e.rowspan) { if (i.name === 'ruby') { i.name = 'span'; for (let D = 0; D < s.length - 1; D++) { s[D].type === 'text' && s[D + 1].name === 'rt' && (s[D] = { name: 'span', attrs: { style: 'display:inline-block;text-align:center' }, children: [{ name: 'div', attrs: { style: `font-size:50%;${s[D + 1].attrs.style || ''}` }, children: s[D + 1].children }, s[D]] }, s.splice(D + 1, 1)) } } }
      else {
        for (let B = this.stack.length; B--;) {
          if (this.stack[B].name === 'table') { this.stack[B].flag = 1; break }
        }
      }
    }
    else { const M = { a: 'lower-alpha', A: 'upper-alpha', i: 'lower-roman', I: 'upper-roman' }; M[e.type] && (e.style += `;list-style-type:${M[e.type]}`, e.type = void 0), i.c = 1; for (let P = s.length; P--;) { s[P].name === 'li' && (s[P].c = 1) } }
  }
  else {
    i.name = 'span'
  } if ((p.display || '').includes('flex') && !i.c) {
    for (let Z = s.length; Z--;) { const _ = s[Z]; _.f && (_.attrs.style = (_.attrs.style || '') + _.f, _.f = void 0) }
  } const E = n && ((n.attrs.style || '').includes('flex') || (n.attrs.style || '').includes('grid')) && !i.c && !(p.display || '').includes('inline'); E && (i.f = ';max-width:100%'), s.length >= 50 && i.c && !(p.display || '').includes('flex') && a(s); for (const G in p) {
    if (p[G]) { const W = ';'.concat(G, ':').concat(p[G].replace(' !important', '')); E && (G.includes('flex') && G !== 'flex-direction' || G === 'align-self' || G.includes('grid') || p[G][0] === '-' || G.includes('width') && W.includes('%')) ? (i.f += W, G === 'width' && (e.style += ';width:100%')) : e.style += W }
  }e.style = e.style.substr(1) || void 0
}, r.prototype.onText = function (t) {
  if (!this.pre) {
    for (var i, e = '', s = 0, a = t.length; s < a; s++) { u[t[s]] ? (e[e.length - 1] !== ' ' && (e += ' '), t[s] !== '\n' || i || (i = !0)) : e += t[s] } if (e === ' ' && i) { return } t = e
  } const r = Object.create(null); if (r.type = 'text', r.text = n(t), this.hook(r)) { this.options.selectable === 'force' && p.includes('iOS') && !wx.canIUse('rich-text.user-select') && this.expose(); (this.stack.length ? this.stack[this.stack.length - 1].children : this.nodes).push(r) }
}, o.prototype.parse = function (t) { this.content = t || '', this.i = 0, this.start = 0, this.state = this.text; for (let i = this.content.length; this.i !== -1 && this.i < i;) { this.state() } }, o.prototype.checkClose = function (t) { const i = this.content[this.i] === '/'; return !!(this.content[this.i] === '>' || i && this.content[this.i + 1] === '>') && (t && this.handler[t](this.content.substring(this.start, this.i)), this.i += i ? 2 : 1, this.start = this.i, this.handler.onOpenTag(i), this.handler.tagName === 'script' ? (this.i = this.content.indexOf('</', this.i), this.i !== -1 && (this.i += 2, this.start = this.i), this.state = this.endTag) : this.state = this.text, !0) }, o.prototype.text = function () {
  if (this.i = this.content.indexOf('<', this.i), this.i === -1) { return void (this.start < this.content.length && this.handler.onText(this.content.substring(this.start, this.content.length))) } const t = this.content[this.i + 1]; if (t >= 'a' && t <= 'z' || t >= 'A' && t <= 'Z') {
    this.start !== this.i && this.handler.onText(this.content.substring(this.start, this.i)), this.start = ++this.i, this.state = this.tagName
  }
  else if (t === '/' || t === '!' || t === '?') {
    this.start !== this.i && this.handler.onText(this.content.substring(this.start, this.i)); const i = this.content[this.i + 2]; if (t === '/' && (i >= 'a' && i <= 'z' || i >= 'A' && i <= 'Z')) { return this.i += 2, this.start = this.i, void (this.state = this.endTag) } let e = '--\x3E'; t === '!' && this.content[this.i + 2] === '-' && this.content[this.i + 3] === '-' || (e = '>'), this.i = this.content.indexOf(e, this.i), this.i !== -1 && (this.i += e.length, this.start = this.i)
  }
  else {
    this.i++
  }
}, o.prototype.tagName = function () {
  if (u[this.content[this.i]]) { for (this.handler.onTagName(this.content.substring(this.start, this.i)); u[this.content[++this.i]];) { ; } this.i < this.content.length && !this.checkClose() && (this.start = this.i, this.state = this.attrName) }
  else {
    this.checkClose('onTagName') || this.i++
  }
}, o.prototype.attrName = function () {
  let t = this.content[this.i]; if (u[t] || t === '=') {
    this.handler.onAttrName(this.content.substring(this.start, this.i)); for (let i = t === '=', e = this.content.length; ++this.i < e;) {
      if (t = this.content[this.i], !u[t]) {
        if (this.checkClose()) { return } if (i) { return this.start = this.i, void (this.state = this.attrVal) } if (this.content[this.i] !== '=') { return this.start = this.i, void (this.state = this.attrName) } i = !0
      }
    }
  }
  else {
    this.checkClose('onAttrName') || this.i++
  }
}, o.prototype.attrVal = function () {
  const t = this.content[this.i]; const i = this.content.length; if (t === '"' || t === '\'') {
    if (this.start = ++this.i, this.i = this.content.indexOf(t, this.i), this.i === -1) { return } this.handler.onAttrVal(this.content.substring(this.start, this.i))
  }
  else {
    for (;this.i < i; this.i++) {
      if (u[this.content[this.i]]) { this.handler.onAttrVal(this.content.substring(this.start, this.i)); break } if (this.checkClose('onAttrVal')) { return }
    }
  } for (;u[this.content[++this.i]];) { ; } this.i < i && !this.checkClose() && (this.start = this.i, this.state = this.attrName)
}, o.prototype.endTag = function () {
  const t = this.content[this.i]; if (u[t] || t === '>' || t === '/') {
    if (this.handler.onCloseTag(this.content.substring(this.start, this.i)), t !== '>' && (this.i = this.content.indexOf('>', this.i), this.i === -1)) { return } this.start = ++this.i, this.state = this.text
  }
  else {
    this.i++
  }
}, module.exports = r
