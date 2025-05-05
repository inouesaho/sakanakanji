<template>
  <div class="app">
    <header>
      <h1>魚の漢字図鑑</h1>
    </header>
    <main>
      <div class="kanji-grid">
        <div v-for="kanji in kanjiList" :key="kanji.id" class="kanji-card" @click="showDetail(kanji)">
          <div class="kanji">{{ kanji.kanji }}</div>
          <div class="reading">{{ kanji.reading.kun.primary.join('、') }}</div>
        </div>
      </div>
      
      <!-- 詳細モーダル -->
      <div v-if="selectedKanji" class="modal-overlay" @click="closeDetail">
        <div class="modal-content" @click.stop>
          <div class="modal-close" @click="closeDetail">×</div>
          <div class="detail-kanji">{{ selectedKanji.kanji }}</div>
          <div class="detail-readings">
            <div class="reading-section">
              <div class="reading-label">訓読み：</div>
              <div>
                <div>{{ selectedKanji.reading.kun.primary.join('、') }}</div>
                <div v-if="selectedKanji.reading.kun.alternative.length > 0" class="alternative-reading">
                  その他：{{ selectedKanji.reading.kun.alternative.join('、') }}
                </div>
              </div>
            </div>
            <div class="reading-section">
              <div class="reading-label">音読み：</div>
              <div>{{ selectedKanji.reading.on.join('、') }}</div>
            </div>
          </div>
          <div class="detail-info">
            <div>画数：{{ selectedKanji.strokes }}</div>
          </div>
          <div class="detail-description">{{ selectedKanji.description }}</div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      kanjiList: [],
      selectedKanji: null
    }
  },
  methods: {
    showDetail(kanji) {
      this.selectedKanji = kanji
    },
    closeDetail() {
      this.selectedKanji = null
    },
    async loadKanjiData() {
      try {
        const response = await fetch('/sakanakanji/fish-kanji.json')
        const data = await response.json()
        this.kanjiList = data.kanji_list
      } catch (error) {
        console.error('Failed to load kanji data:', error)
      }
    }
  },
  mounted() {
    this.loadKanjiData()
  }
}
</script>

<style>
.app {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

header {
  text-align: center;
  margin-bottom: 30px;
}

h1 {
  font-size: 2em;
  color: #333;
  font-family: "Hina Mincho", serif;
}

.kanji-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);  /* 4列表示に変更 */
  gap: 20px;
  padding: 10px;  /* 両端に余白を追加 */
}

.kanji-card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s;
}

.kanji-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.kanji {
  font-size: 2.5em;
  margin-bottom: 5px;
}

.reading {
  font-size: 0.9em;
  color: #666;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 12px;
  position: relative;
  max-width: 90%;
  width: 400px;
}

.modal-close {
  position: absolute;
  right: 15px;
  top: 10px;
  font-size: 24px;
  cursor: pointer;
  color: #666;
}

.detail-kanji {
  font-size: 4em;
  text-align: center;
  margin-bottom: 20px;
}

.detail-readings {
  margin-bottom: 15px;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 6px;
}

.reading-section {
  display: flex;
  margin-bottom: 8px;
}

.reading-section:last-child {
  margin-bottom: 0;
}

.reading-label {
  min-width: 70px;
  font-weight: bold;
}

.alternative-reading {
  margin-top: 4px;
  font-size: 0.9em;
  color: #666;
}

.detail-info {
  margin-bottom: 15px;
  color: #666;
}

.detail-description {
  line-height: 1.6;
  color: #333;
}
</style>
