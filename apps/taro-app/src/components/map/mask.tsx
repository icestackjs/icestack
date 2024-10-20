import CodeRender from '@/components/CodeRender'
import { Image, View } from '@tarojs/components'
import { cx } from 'class-variance-authority'
import panda from '../../assets/panda.jpg'

const list = [
  'mask-squircle',
  'mask-decagon',
  'mask-diamond',
  'mask-heart',
  'mask-hexagon',
  'mask-hexagon-2',
  'mask-circle',
  'mask-parallelogram',
  'mask-parallelogram-2',
  'mask-parallelogram-3',
  'mask-parallelogram-4',
  'mask-pentagon',
  'mask-square',
  'mask-star',
  'mask-star-2',
  'mask-triangle',
  'mask-triangle-2',
  'mask-triangle-3',
  'mask-triangle-4',
]
export default () => {
  return (
    <View>
      <View className="subtitle">遮罩类型</View>
      <CodeRender className="grid grid-cols-3 gap-2">
        {list.map((x) => {
          return <Image key={x} className={cx('w-full mask', x)} mode="widthFix" src={panda}></Image>
        })}
      </CodeRender>
    </View>
  )
}
