import { transformCss2Js } from '@/index'

describe('transformCss2Js', () => {
  it('parses nested rules', () => {
    const root = transformCss2Js('a { b {} }')
    expect(root).toMatchSnapshot()
  })

  it('parses at-rules inside rules', () => {
    const root = transformCss2Js('a { @media {} }')
    expect(root).toMatchSnapshot()
  })

  it('parses variables', () => {
    const root = transformCss2Js('$var: 1;')
    expect(root).toMatchSnapshot()
  })

  it('parses inline comments', () => {
    const root = transformCss2Js('\n// a \n/* b */')
    expect(root).toMatchSnapshot()
  })

  it('parses empty inline comments', () => {
    const root = transformCss2Js('//\n// ')
    expect(root).toMatchSnapshot()
  })

  it('parses inline comments inside selector', () => {
    const root = transformCss2Js('a\n// c/**/\nb { }')
    expect(root).toMatchSnapshot()
  })

  it('does not parse comments inside brackets', () => {
    const root = transformCss2Js('a { cursor: url(http://ya.ru) }')
    expect(root).toMatchSnapshot()
  })

  it('parses interpolation', () => {
    const root = transformCss2Js('#{$selector}:hover { #{$prop}-size: #{$color} }')
    expect(root).toMatchSnapshot()
  })

  test('parses interpolation inside word', () => {
    const root = transformCss2Js('.#{class} {}')
    expect(root).toMatchSnapshot()
  })

  test('parses non-interpolation', () => {
    const root = transformCss2Js('\\#{ color: black }')
    expect(root).toMatchSnapshot()
  })

  test('parses interpolation inside interpolation', () => {
    const root = transformCss2Js('$column: #{"#{&}__column"};')
    expect(root).toMatchSnapshot()
  })

  test("parses interpolation that's the entire at-rule", () => {
    const root = transformCss2Js('@#{$var} param { }')
    expect(root).toMatchSnapshot()
  })

  test('parses interpolation at the beginning of at-rule', () => {
    const root = transformCss2Js('@#{$var}suffix param { }')
    expect(root).toMatchSnapshot()
  })

  test('parses interpolation within at-rule', () => {
    const root = transformCss2Js('@before#{$var}after param { }')
    expect(root).toMatchSnapshot()
  })

  test('parses interpolation right after at-rule', () => {
    const root = transformCss2Js('@media#{$var} { }')
    expect(root).toMatchSnapshot()
  })

  test('parses interpolation in at-rule value', () => {
    const root = transformCss2Js('@media #{$var} { }')
    expect(root).toMatchSnapshot()
  })

  test('parses interpolation in url()', () => {
    const root = transformCss2Js('image: url(#{get(path)}.png)')
    expect(root).toMatchSnapshot()
  })

  test('parses text in rules', () => {
    const root = transformCss2Js('a { margin:text { left: 10px; }}')
    expect(root).toMatchSnapshot()
  })

  test('parses semicolon in rules', () => {
    const root = transformCss2Js('a { test(a: 1) { left: 10px; }}')
    expect(root).toMatchSnapshot()
  })

  test('parsers prefixed pseudo in rules', () => {
    const root = transformCss2Js('input:-moz-focusring { left: 1px }')
    expect(root).toMatchSnapshot()
  })

  // test('parses nested props as rule', () => {
  //   const root = transformCss2Js('a { margin: { left: 10px; }}')
  //   expect(root).toMatchSnapshot()
  // })

  test('parses nested props with value', () => {
    const root = transformCss2Js('a { margin: 0 { left: 10px; }}')
    expect(root).toMatchSnapshot()
  })

  test('parses nested props with space-less digit', () => {
    const root = transformCss2Js('a { margin:0 { left: 10px; }}')
    expect(root).toMatchSnapshot()
  })

  test('parses nested props with new line as rule', () => {
    const root = transformCss2Js('a { \n margin  \n:0 { left: 10px; }}')
    expect(root).toMatchSnapshot()
  })

  test('parses nested props with important', () => {
    const root = transformCss2Js('a { margin: 0!important { left: 10px; }}')
    expect(root).toMatchSnapshot()
  })

  test('parses interpolation with variable', () => {
    const root = transformCss2Js('&:#{$var} {}')
    expect(root).toMatchSnapshot()
  })

  test('parses comment inside comment', () => {
    const root = transformCss2Js('a {\n//a/*b*/c\n}')
    expect(root).toMatchSnapshot()
  })

  test('parses complex interpolation', () => {
    const root = transformCss2Js('content: #{fn("\\"}")};')
    expect(root).toMatchSnapshot()
  })

  test('parses interpolation inside string', () => {
    const root = transformCss2Js('content: "#{fn("\\"}")}";')
    expect(root).toMatchSnapshot()
  })
})
