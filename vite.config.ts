import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// import { resolve } from "path"

export default defineConfig({
  plugins: [react()],
  base: './',
  // resolve: {
  //   alias: {
  //     '~': resolve(__dirname, 'src'),
  //   },
  // },
  // assetsInclude: ['**/*.xlsx'],
  define: {
    'process.env': process.env,
    global: {},
  },
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  },
  build: {
    outDir: './build'
  },
  //这里也可以配置端口以及开启ip访问
  server: {
    host: true,//支持0.0.0.0或true
    port: 2024, // 指定服务器端口
    hmr: true,// 开启热更新
    open: true, // 在服务器启动时自动在浏览器中打开应用程序
    // https: false, // 是否开启 https
  },
  //第二中配置端口 在package.json 启动命令配置
  //例如:"dev": "vite --host --port=2024",
})
