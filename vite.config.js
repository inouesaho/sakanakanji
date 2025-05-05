import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// JSONファイル用のカスタムプラグイン
function jsonPlugin() {
  return {
    name: 'json-plugin',
    transform(code, id) {
      if (id.endsWith('.json')) {
        return {
          code: `export default ${code}`,
          map: null
        }
      }
    }
  }
}

export default defineConfig({
  base: '/sakanakanji/',  // リポジトリ名を指定
  plugins: [vue(), jsonPlugin()],
  assetsInclude: ['**/*.json'],
  optimizeDeps: {
    include: [],
    exclude: ['src/data/fish-kanji.json']
  }
})
