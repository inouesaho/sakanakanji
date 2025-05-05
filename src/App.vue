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
const kanjiData = {
  kanji_list: [
    {
      id: 1,
      kanji: "鮪",
      reading: { 
        kun: {
          primary: ["まぐろ"],
          alternative: ["しび"]
        },
        on: ["ゆう", "き"]
      },
      bushu: "魚",
      strokes: 17,
      description: "大型の回遊魚。赤身の身は刺身や寿司の代表的な魚として知られる。マグロの中でも特に本マグロ（クロマグロ）は「海の大物」として珍重される。"
    },
    {
      id: 2,
      kanji: "鯖",
      reading: { 
        kun: {
          primary: ["さば"],
          alternative: []
        },
        on: ["せい"]
      },
      bushu: "魚",
      strokes: 15,
      description: "背中が青く、腹が銀白色の魚。DHAやEPAが豊富で栄養価が高い。しめ鯖や味噌煮が代表的な料理。"
    },
    {
      id: 3,
      kanji: "鮭",
      reading: { 
        kun: {
          primary: ["さけ"],
          alternative: ["しゃけ"]
        },
        on: ["かい", "けい"]
      },
      bushu: "魚",
      strokes: 15,
      description: "産卵期になると川を上る習性を持つ魚。身は鮮やかなピンク色で、焼き魚や塩辛、切り身など様々な料理に使われる。"
    },
    {
      id: 4,
      kanji: "鯛",
      reading: { 
        kun: {
          primary: ["たい"],
          alternative: []
        },
        on: ["ちょう"]
      },
      bushu: "魚",
      strokes: 15,
      description: "日本の祝い事に欠かせない縁起物の魚。真鯛は白身で上品な味わい。焼き物や煮付け、刺身など様々な調理法で食べられる。"
    },
    {
      id: 5,
      kanji: "鰯",
      reading: { 
        kun: {
          primary: ["いわし"],
          alternative: []
        },
        on: ["れい"]
      },
      bushu: "魚",
      strokes: 19,
      description: "小魚の代表格で、群れで泳ぐ習性がある。カルシウムが豊富で、丸ごと食べられる。干物や蒲焼、つみれなど様々な料理に使われる。"
    }
  ]
}

export default {
  name: 'App',
  data() {
    return {
      kanjiList: kanjiData.kanji_list,
      selectedKanji: null
    }
  },
  methods: {
    showDetail(kanji) {
      this.selectedKanji = kanji
    },
    closeDetail() {
      this.selectedKanji = null
    }
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
