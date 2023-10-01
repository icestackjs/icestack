import { FC, useCallback, useState, useRef, useEffect } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { css } from '@codemirror/lang-css'
import { vscodeDark } from '@uiw/codemirror-theme-vscode'
import { createContext } from 'css-to-tailwindcss-plugin/browser'
import { debounce } from 'lodash-es'
const initCss = `@layer base {
  h1 {
    font-size: theme("fontSize.2xl");
  }
  h2 {
    font-size: theme("fontSize.xl");
  }
}

@layer components {
  .card {
    background-color: theme("colors.white");
    border-radius: theme("borderRadius.lg");
    padding: theme("spacing.6");
    box-shadow: theme("boxShadow.xl");
  }
}

@layer utilities {
  .content-auto {
    content-visibility: "auto";
  }
}
/* this will be abandoned unless you set the \`outSideLayerCss\` option */
.btn{
  background: #ffffff;
}`

// 61px is the sidebar sticky's height
const editorHeight = 'calc(100vh - var(--nextra-navbar-height) - 70px) '

const Repl: FC = () => {
  // const ctxRef = useRef()
  // useEffect(() => {
  //   ctxRef.current = createContext()
  // }, [])
  const [cssValue, setCss] = useState(initCss)
  const [jsOutput, setJsOutput] = useState('')

  const generateJs = useCallback(async (val: string) => {
    if (val) {
      try {
        const ctx = createContext()
        await ctx.processString(val)
        const jsCode = ctx.generate(val)

        setJsOutput(jsCode)
      } catch (error) {
        setJsOutput(error.message)
        console.log(error)
      }
    }
  }, [])
  const onChange = useCallback(
    async (val, viewUpdate) => {
      await generateJs(val)
      setCss(val)
    },
    [generateJs]
  )

  useEffect(() => {
    generateJs(initCss)
  }, [generateJs])
  return (
    <div className="flex">
      <div className="w-1/2 border-r border-neutral-800">
        <CodeMirror value={cssValue} height={editorHeight} theme={vscodeDark} extensions={[css()]} onChange={onChange} />
      </div>
      <div className="w-1/2">
        <CodeMirror value={jsOutput} height={editorHeight} theme={vscodeDark} extensions={[javascript({ jsx: true })]} readOnly />
      </div>
    </div>
  )
}

export default Repl
