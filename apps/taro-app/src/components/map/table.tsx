import { View, Text, Button, ViewProps } from '@tarojs/components'
// import './table.scss'
import MarkdownRender from '@/components/MarkdownRender'

export default () => {
  return (
    <View>
      <View className='tips'>这个组件只是用来展示table结构的数据的，要想更复杂的交互，请使用现成带js的组件</View>
      <View className='subtitle'>默认展示</View>
      <MarkdownRender className='overflow-x-auto'>
        <View className='table'>
          <View className='thead'>
            <View className='tr'>
              <View className='th'>序号</View>
              <View className='th'>姓名</View>
              <View className='th'>年龄</View>
              <View className='th'>性别</View>
            </View>
          </View>
          <View className='tbody'>
            <View className='tr'>
              <View className='td'>1</View>
              <View className='td'>王二妮</View>
              <View className='td'>22</View>
              <View className='td'>女</View>
            </View>

            <View className='tr'>
              <View className='td'>2</View>
              <View className='td'>李狗蛋</View>
              <View className='td'>33</View>
              <View className='td'>男</View>
            </View>

            <View className='tr'>
              <View className='td'>3</View>
              <View className='td'>史珍香</View>
              <View className='td'>32</View>
              <View className='td'>男</View>
            </View>
          </View>
        </View>
      </MarkdownRender>
      <View className='subtitle'>Active and Hover</View>
      <MarkdownRender className='overflow-x-auto'>
        <View className='table'>
          <View className='thead'>
            <View className='tr'>
              <View className='th'>序号</View>
              <View className='th'>姓名</View>
              <View className='th'>年龄</View>
              <View className='th'>性别</View>
            </View>
          </View>
          <View className='tbody'>
            <View className='tr bg-slate-200 dark:bg-slate-700' hoverClass='bg-red-300 dark:bg-red-700'>
              <View className='td'>1</View>
              <View className='td'>王二妮</View>
              <View className='td'>22</View>
              <View className='td'>女</View>
            </View>

            <View className='tr' hoverClass='bg-red-500'>
              <View className='td'>2</View>
              <View className='td'>李狗蛋</View>
              <View className='td'>33</View>
              <View className='td'>男</View>
            </View>

            <View className='tr' hoverClass='bg-red-500'>
              <View className='td'>3</View>
              <View className='td'>史珍香</View>
              <View className='td'>32</View>
              <View className='td'>男</View>
            </View>
          </View>
        </View>
      </MarkdownRender>

      {/* <View className='subtitle'>Zebra</View>
      <View className='overflow-x-auto'>
        <View className='table table-zebra'>
          <View className='thead'>
            <View className='tr'>
              <View className='th'>序号</View>
              <View className='th'>姓名</View>
              <View className='th'>年龄</View>
              <View className='th'>性别</View>
            </View>
          </View>
          <View className='tbody'>
            <View className='tr '>
              <View className='td'>1</View>
              <View className='td'>王二妮</View>
              <View className='td'>22</View>
              <View className='td'>女</View>
            </View>

            <View className='tr' >
              <View className='td'>2</View>
              <View className='td'>李狗蛋</View>
              <View className='td'>33</View>
              <View className='td'>男</View>
            </View>

            <View className='tr'>
              <View className='td'>3</View>
              <View className='td'>史珍香</View>
              <View className='td'>32</View>
              <View className='td'>男</View>
            </View>
          </View>
        </View>
      </View> */}

      <View className='subtitle'>尺寸</View>
      <View className='tips'>table-xs</View>
      <MarkdownRender className='overflow-x-auto'>
        <View className='table table-xs'>
          <View className='thead'>
            <View className='tr'>
              <View className='th'>序号</View>
              <View className='th'>姓名</View>
              <View className='th'>年龄</View>
              <View className='th'>性别</View>
            </View>
          </View>
          <View className='tbody'>
            <View className='tr'>
              <View className='td'>1</View>
              <View className='td'>王二妮</View>
              <View className='td'>22</View>
              <View className='td'>女</View>
            </View>

            <View className='tr'>
              <View className='td'>2</View>
              <View className='td'>李狗蛋</View>
              <View className='td'>33</View>
              <View className='td'>男</View>
            </View>

            <View className='tr'>
              <View className='td'>3</View>
              <View className='td'>史珍香</View>
              <View className='td'>32</View>
              <View className='td'>男</View>
            </View>
          </View>
        </View>
      </MarkdownRender>
      <View className='tips'>table-sm</View>
      <MarkdownRender className='overflow-x-auto'>
        <View className='table table-sm'>
          <View className='thead'>
            <View className='tr'>
              <View className='th'>序号</View>
              <View className='th'>姓名</View>
              <View className='th'>年龄</View>
              <View className='th'>性别</View>
            </View>
          </View>
          <View className='tbody'>
            <View className='tr'>
              <View className='td'>1</View>
              <View className='td'>王二妮</View>
              <View className='td'>22</View>
              <View className='td'>女</View>
            </View>

            <View className='tr'>
              <View className='td'>2</View>
              <View className='td'>李狗蛋</View>
              <View className='td'>33</View>
              <View className='td'>男</View>
            </View>

            <View className='tr'>
              <View className='td'>3</View>
              <View className='td'>史珍香</View>
              <View className='td'>32</View>
              <View className='td'>男</View>
            </View>
          </View>
        </View>
      </MarkdownRender>
      <View className='tips'>table-md</View>
      <MarkdownRender className='overflow-x-auto'>
        <View className='table table-md'>
          <View className='thead'>
            <View className='tr'>
              <View className='th'>序号</View>
              <View className='th'>姓名</View>
              <View className='th'>年龄</View>
              <View className='th'>性别</View>
            </View>
          </View>
          <View className='tbody'>
            <View className='tr'>
              <View className='td'>1</View>
              <View className='td'>王二妮</View>
              <View className='td'>22</View>
              <View className='td'>女</View>
            </View>

            <View className='tr'>
              <View className='td'>2</View>
              <View className='td'>李狗蛋</View>
              <View className='td'>33</View>
              <View className='td'>男</View>
            </View>

            <View className='tr'>
              <View className='td'>3</View>
              <View className='td'>史珍香</View>
              <View className='td'>32</View>
              <View className='td'>男</View>
            </View>
          </View>
        </View>
      </MarkdownRender>
      <View className='tips'>table-lg</View>
      <MarkdownRender className='overflow-x-auto'>
        <View className='table table-lg'>
          <View className='thead'>
            <View className='tr'>
              <View className='th'>序号</View>
              <View className='th'>姓名</View>
              <View className='th'>年龄</View>
              <View className='th'>性别</View>
            </View>
          </View>
          <View className='tbody'>
            <View className='tr'>
              <View className='td'>1</View>
              <View className='td'>王二妮</View>
              <View className='td'>22</View>
              <View className='td'>女</View>
            </View>

            <View className='tr'>
              <View className='td'>2</View>
              <View className='td'>李狗蛋</View>
              <View className='td'>33</View>
              <View className='td'>男</View>
            </View>

            <View className='tr'>
              <View className='td'>3</View>
              <View className='td'>史珍香</View>
              <View className='td'>32</View>
              <View className='td'>男</View>
            </View>
          </View>
        </View>
      </MarkdownRender>
    </View>
  )
}
