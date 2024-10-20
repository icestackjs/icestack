import { objectify } from '@/js'
import { parse } from 'postcss'

describe('postcss', () => {
  it('objectify case 0', () => {
    const root = parse(`
    .btn{
      @apply a f g;
      bg:red;
    }
    `)
    expect(objectify(root)).toMatchSnapshot()
  })

  it('objectify case 1', () => {
    const root = parse(`
    .btn{
      @apply a f g {
        x:x;
      };
      bg:red;
    }
    `)
    expect(objectify(root)).toMatchSnapshot()
  })

  it('objectify nested case 0', () => {
    const root = parse(`
    .btn{
      @apply a f g {
        x:x;
      };
      .xx{
        fs:fd;
      }
      bg:red;
    }
    `)
    expect(objectify(root)).toMatchSnapshot()
  })
})
