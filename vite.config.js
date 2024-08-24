import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import monkey, { cdn } from 'vite-plugin-monkey';

// https://vitejs.dev/config/
export default defineConfig({
  // assetsInclude: ['**/*.css'],
  plugins: [
    vue(),
    monkey({
      entry: 'src/main.js',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'gaojunran/CQUPT-Art',
        match: ['jwzx.cqupt.edu.cn/*'],
        license: 'GPL-3.0 license',
        author: 'GaoJunRan',
        connect: ['cqupt.edu.cn'],
        name: 'CQUPT-Art',
        description: '重邮学子的极简「教务在线」',
      },
      build: {
        externalGlobals: {
          vue: cdn.jsdelivr('Vue', 'dist/vue.global.prod.js'),
        },
      },
    }),
  ],
});
