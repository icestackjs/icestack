import { BaseEventOrig, MovableArea, MovableView, MovableViewProps, View } from '@tarojs/components'
import { FC, PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react'
import debounce from 'lodash.debounce'
import Taro from '@tarojs/taro'
import { systemInfo } from '@/store/index'

// console.log(systemInfo)
function rpx2px(size: number) {
  return (systemInfo.windowWidth / 750) * size
}
const btnW = 96
const btnWidth = rpx2px(btnW)
const edgeWidth = rpx2px(32)

const FloatBtn: FC<
  PropsWithChildren<{
    storeKey?: string
    padding?: string[]
  }>
> = ({ padding = ['256rpx', '32rpx', '96rpx', '32rpx'], storeKey = 'global-float-btn-key', children }) => {
  const { windowHeight, windowWidth } = systemInfo
  let initX = windowWidth
  let initY = windowHeight / 1.25
  if (storeKey) {
    try {
      const j = Taro.getStorageSync(storeKey)
      if (j) {
        const js = JSON.parse(j)
        if (js.x) {
          initX = js.x
        }
        if (js.y) {
          initY = js.y
        }
      }
    } catch (error) {}
  }

  const [position, setPosition] = useState({
    x: initX,
    y: initY
  })

  const resetToYaxis = useCallback(
    debounce((x: number, y: number, source) => {
      if (source) {
        setPosition({
          x,
          y
        })
      }
      // console.log('[Final]', x, y, source)
    }, 100),
    [setPosition]
  )
  const half = (windowWidth - btnWidth - edgeWidth * 2) / 2

  const onChange = useCallback(
    (e: BaseEventOrig<MovableViewProps.onChangeEventDetail>) => {
      if (e && e.detail) {
        const { source, x, y } = e.detail
        resetToYaxis(x, y, source)
      }
    },
    [resetToYaxis]
  )

  const onTouchEnd = useCallback(() => {
    // console.log('touchend')
    setTimeout(() => {
      setPosition(({ x, y }) => {
        if (x > half) {
          return {
            x: windowWidth,
            y
          }
        } else {
          return {
            x: 0,
            y
          }
        }
      })
      // console.log(position.x)

      if (storeKey) {
        setTimeout(() => {
          Taro.setStorageSync(storeKey, JSON.stringify(position))
        }, 0)
      }
    }, 200)
  }, [half, position, storeKey, windowWidth])
  return (
    <View
      className='pointer-events-none fixed z-50'
      style={{
        top: padding[0],
        right: padding[1],
        bottom: padding[2],
        left: padding[3]
      }}
    >
      <MovableArea className='h-full w-full'>
        <MovableView
          animation
          direction='all'
          onChange={onChange}
          onTouchEnd={onTouchEnd}
          x={position.x}
          y={position.y}
          style={{
            height: `${btnW}rpx`,
            width: `${btnW}rpx`
          }}
        >
          {children}
        </MovableView>
      </MovableArea>
    </View>
  )
}

export default FloatBtn
