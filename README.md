# ice-ui （WIP）

长久以来我一直在思考，到底什么组件可以满足不同端不同业务的需求

比如我写 react 的时候用 antd, 写 vue 的时候用 element-ui/plus / ant-design-vue

写移动端的时候用 antd mobile 原生再用 rn, 或者 vant

小程序又是一大堆 ui 库，有原生的，有 uni-app 版本的，有 taro 版本的

好烦躁，为什么没有一个原子化的 ui 库，可以自由组合原子化的 样式和交互逻辑来生成组件呢？

当然，这个库显然没有那种专供于某个平台那样的 ui 库开箱即用，但是好处是你可以方便的自定义的扩展你的组件行为，显然这就不适合新手

你可以把这个库，看作成一个 ui 库的范式，然后往里面自由的进行组合，方便进行二次封装来构建出你独一无二的版本

灵感来自于 `tailwindcss`/`headless ui`/`react-use`/`vueuse`/`daisyui`
