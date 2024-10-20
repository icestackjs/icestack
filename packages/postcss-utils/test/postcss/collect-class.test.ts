import { collectClassPlugin } from '@/plugins'
import postcss from 'postcss'

describe('collect-class', () => {
  it('base', async () => {
    let res
    await postcss([
      collectClassPlugin({
        process(x) {
          res = x
        },
      }),
      // @ts-ignore
    ]).process(`
      
      .btn{
        color:red;
      }

      .btn{
        color:red;
      }
    `)

    expect(res).toMatchSnapshot()
  })

  it('base 0', async () => {
    let res
    await postcss([
      collectClassPlugin({
        process(x) {
          res = x
        },
      }),
      // @ts-ignore
    ]).process(`
      
      .btn{
        color:red;
      }

      .btn1{
        color:red;
      }
    `)

    expect(res).toMatchSnapshot()
  })
})
