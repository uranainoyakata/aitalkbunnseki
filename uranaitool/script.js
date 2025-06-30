document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('file-input');
    const fileNameDisplay = document.getElementById('file-name');
    const uploaderSection = document.getElementById('uploader');
    const loadingSection = document.getElementById('loading');
    const cardSelectionSection = document.getElementById('card-selection');
    const resultsSection = document.getElementById('results');
    const tarotResultArea = document.getElementById('tarot-result-area');

    const positiveWords = ['ありがとう', 'すごい', 'さすが', '嬉しい', '楽しい', '好き', 'やったー', 'おめでとう', 'いいね'];
    const negativeWords = ['ごめん', 'すみません', '遅れます', '問題', '大変', 'つらい', '悲しい', '疲れた', '無理', 'ヤバイ'];

    const tarotCards = {
        0: { name: "愚者", english: "The Fool", meaning: "自由、無邪気、始まり、無限の可能性。固定観念にとらわれず、新しい一歩を踏み出す時。", image: "https://upload.wikimedia.org/wikipedia/commons/9/90/RWS_Tarot_00_Fool.jpg" },
        1: { name: "魔術師", english: "The Magician", meaning: "創造、意志、コミュニケーション、才能の開花。あなたの持つ力で、望む未来を創り出せる。", image: "https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg" },
        2: { name: "女教皇", english: "The High Priestess", meaning: "直感、知性、秘密、神秘。表面的なことだけでなく、物事の本質を見抜く静かな洞察力。", image: "https://upload.wikimedia.org/wikipedia/commons/8/88/RWS_Tarot_02_High_Priestess.jpg" },
        3: { name: "女帝", english: "The Empress", meaning: "豊穣、愛情、繁栄、女性的な魅力。愛と豊かさを受け取り、育むことで満たされる。", image: "https://upload.wikimedia.org/wikipedia/commons/d/d2/RWS_Tarot_03_Empress.jpg" },
        4: { name: "皇帝", english: "The Emperor", meaning: "支配、安定、権威、父性。強い意志と行動力で、現実的な成功と安定を築く。", image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/RWS_Tarot_04_Emperor.jpg" },
        5: { name: "教皇", english: "The Hierophant", meaning: "慈悲、伝統、道徳、信頼。社会的なルールや常識を重んじ、人から信頼される関係。", image: "https://upload.wikimedia.org/wikipedia/commons/8/8d/RWS_Tarot_05_Hierophant.jpg" },
        6: { name: "恋人たち", english: "The Lovers", meaning: "恋愛、調和、選択、コミュニケーション。心がときめくような、楽しく調和の取れた関係。", image: "https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_06_Lovers.jpg" },
        7: { name: "戦車", english: "The Chariot", meaning: "勝利、前進、自己主張、行動力。困難を乗り越え、目標に向かって突き進む強さ。", image: "https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg" },
        8: { name: "力", english: "Strength", meaning: "意志の力、理性、不屈の精神、慈愛。困難に屈しない、内なる強さと優しさ。", image: "https://upload.wikimedia.org/wikipedia/commons/f/f5/RWS_Tarot_08_Strength.jpg" },
        9: { name: "隠者", english: "The Hermit", meaning: "探求、内省、思慮深さ、孤独。静かな場所で、自分自身の内面と向き合う時間。", image: "https://upload.wikimedia.org/wikipedia/commons/4/4d/RWS_Tarot_09_Hermit.jpg" },
        10: { name: "運命の輪", english: "Wheel of Fortune", meaning: "運命、転機、チャンス、幸運の到来。予期せぬ幸運が訪れ、物事が好転する。", image: "https://upload.wikimedia.org/wikipedia/commons/3/3c/RWS_Tarot_10_Wheel_of_Fortune.jpg" },
        11: { name: "正義", english: "Justice", meaning: "公正、公平、バランス、誠実。感情に流されず、公平で誠実な判断が求められる。", image: "https://upload.wikimedia.org/wikipedia/commons/e/e0/RWS_Tarot_11_Justice.jpg" },
        12: { name: "吊るされた男", english: "The Hanged Man", meaning: "試練、忍耐、自己犠牲、視点の変化。今は耐える時。物事の見方を変えれば、新しい道が見える。", image: "https://upload.wikimedia.org/wikipedia/commons/2/2b/RWS_Tarot_12_Hanged_Man.jpg" },
        13: { name: "死神", english: "Death", meaning: "終わりと始まり、変容、大きな変化。古い関係が終わり、新しい関係が始まる。避けられない変化。", image: "https://upload.wikimedia.org/wikipedia/commons/d/d7/RWS_Tarot_13_Death.jpg" },
        14: { name: "節制", english: "Temperance", meaning: "調和、バランス、献身、穏やかな関係。異なる価値観を受け入れ、穏やかで安定した関係を築く。", image: "https://upload.wikimedia.org/wikipedia/commons/f/f8/RWS_Tarot_14_Temperance.jpg" },
        15: { name: "悪魔", english: "The Devil", meaning: "誘惑、束縛、堕落、断ち切れない関係。良くないとは分かっていても、断ち切れない腐れ縁。", image: "https://upload.wikimedia.org/wikipedia/commons/5/55/RWS_Tarot_15_Devil.jpg" },
        16: { name: "塔", english: "The Tower", meaning: "崩壊、衝撃、突然のアクシデント。突然の出来事により、今までの関係が崩れ去る。", image: "https://upload.wikimedia.org/wikipedia/commons/5/53/RWS_Tarot_16_Tower.jpg" },
        17: { name: "星", english: "The Star", meaning: "希望、理想、ひらめき、夢が叶う。希望に満ちた、理想的な関係。未来は明るい。", image: "https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_17_Star.jpg" },
        18: { name: "月", english: "The Moon", meaning: "不安、嘘、幻想、曖昧な関係。先が見えず、相手の気持ちが分からず不安になる。", image: "https://upload.wikimedia.org/wikipedia/commons/7/7f/RWS_Tarot_18_Moon.jpg" },
        19: { name: "太陽", english: "The Sun", meaning: "成功、祝福、生命力、喜び。エネルギーに満ち溢れ、全てが上手くいく最高の状態。", image: "https://upload.wikimedia.org/wikipedia/commons/1/17/RWS_Tarot_19_Sun.jpg" },
        20: { name: "審判", english: "Judgement", meaning: "復活、再生、決断、良い知らせ。過去の努力が報われ、素晴らしい結果が出る。", image: "https://upload.wikimedia.org/wikipedia/commons/d/dd/RWS_Tarot_20_Judgement.jpg" },
        21: { name: "世界", english: "The World", meaning: "完成、完璧、成就、幸福。最高に幸せで、完璧な状態。これ以上のないハッピーエンド。", image: "https://upload.wikimedia.org/wikipedia/commons/f/ff/RWS_Tarot_21_World.jpg" }
    };

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            fileNameDisplay.textContent = `選択されたファイル: ${file.name}`;
            resetUIBeforeAnalysis();
            processFile(file);
        }
    });

    function processFile(file) {
        if (file.size > 10 * 1024 * 1024) {
            alert('ファイルサイズが大きすぎます。10MB以下のファイルを選択してください。');
            resetUI();
            return;
        }

        uploaderSection.classList.add('hidden');
        loadingSection.classList.remove('hidden');

        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result;
            setTimeout(() => {
                try {
                    const analysisResult = analyzeTalk(content);
                    console.log("analyzeTalk 完了。analysisResult:", analysisResult); // ★追加ログ
                    showCardSelection(analysisResult);
                } catch (error) {
                    console.error('解析エラー:', error);
                    alert('ファイルの解析中にエラーが発生しました。LINEからエクスポートされた正しいテキストファイルか確認してください。');
                    resetUI();
                }
            }, 1500); // 少し長めに待ってローディングを見せる
        };

        reader.onerror = () => {
            alert('ファイルの読み込みに失敗しました。');
            resetUI();
        };

        reader.readAsText(file, 'UTF-8');
    }

    function analyzeTalk(text) {
        const lines = text.split('\n');
        const talkData = { users: {}, totalMessages: 0 };

        // iOS形式: 「2024/06/29 15:30\tTaro\tこんにちは」
        const iosRegex = /^(\d{4}\/\d{2}\/\d{2})\s(\d{2}:\d{2})\t(.+?)\t(.+)/;
        // Android形式: 「15:30\tTaro\tこんにちは」（日付行は別途処理）
        const androidRegex = /^(\d{2}:\d{2})\t(.+?)\t(.+)/;
        const dateRegex = /^(\d{4})\/(\d{2})\/(\d{2})\(?[月火水木金土日]?\)?$/;

        let lastUser = null;

        for (const line of lines) {
            const trimmedLine = line.trim();
            if (trimmedLine.length === 0) continue;

            let match = trimmedLine.match(iosRegex);
            let isIOS = true;

            if (!match) {
                match = trimmedLine.match(androidRegex);
                isIOS = false;
            }

            // 日付のみの行はスキップ (Android用)
            if (!isIOS && dateRegex.test(trimmedLine)) {
                continue;
            }

            if (match) {
                const userName = isIOS ? match[3] : match[2];
                const message = isIOS ? match[4] : match[3];
                lastUser = userName;

                if (!talkData.users[userName]) {
                    talkData.users[userName] = { messageCount: 0, positiveCount: 0, negativeCount: 0 };
                }

                const userStats = talkData.users[userName];
                userStats.messageCount++;
                talkData.totalMessages++;

                positiveWords.forEach(word => {
                    if (message.includes(word)) userStats.positiveCount++;
                });
                negativeWords.forEach(word => {
                    if (message.includes(word)) userStats.negativeCount++;
                });
            } else if (lastUser && !dateRegex.test(trimmedLine)) {
                // 複数行メッセージ (今回は分析対象外)
            }
        }
        return talkData;
    }

    function showCardSelection(analysisData) {
        console.log("showCardSelection 呼び出し。analysisData:", analysisData); // ★追加ログ
        loadingSection.classList.add('hidden');

        if (Object.keys(analysisData.users).length < 2) {
            resultsSection.classList.remove('hidden');
            tarotResultArea.innerHTML = '<p>2名以上のトーク履歴が必要です。もう一度、別のファイルを選択してください。</p>';
            return;
        }

        cardSelectionSection.classList.remove('hidden');
        const cardOptionsArea = document.getElementById('card-options-area');
        cardOptionsArea.innerHTML = ''; // クリア

        // 3枚のユニークなカードをランダムに選ぶ
        const cardIds = Object.keys(tarotCards);
        const selectedIds = new Set();
        while(selectedIds.size < 3) {
            const randomId = cardIds[Math.floor(Math.random() * cardIds.length)];
            selectedIds.add(randomId);
        }

        selectedIds.forEach(cardId => {
            const cardDiv = document.createElement('div');
            cardDiv.className = 'card-option';
            cardDiv.dataset.cardId = cardId;
            cardDiv.addEventListener('click', () => {
                console.log("カードクリック。selectedCardId:", cardId, "analysisData:", analysisData); // ★追加ログ
                showFinalResult(cardId, analysisData);
            });
            cardOptionsArea.appendChild(cardDiv);
        });
    }

    function showFinalResult(selectedCardId, analysisData) {
        console.log("showFinalResult 呼び出し。selectedCardId:", selectedCardId, "analysisData:", analysisData); // ★追加ログ
        try {
            cardSelectionSection.classList.add('hidden');
            resultsSection.classList.remove('hidden');

            const selectedCard = tarotCards[selectedCardId];

            const userNames = Object.keys(analysisData.users);
            const user1 = analysisData.users[userNames[0]];
            const user2 = analysisData.users[userNames[1]];
            
            // totalCountが0になるのを防ぐ
            const totalCount = (user1.messageCount || 0) + (user2.messageCount || 0);
            if (totalCount === 0) {
                tarotResultArea.innerHTML = '<p>メッセージの数が少なすぎて、占うことができませんでした。もう少しやり取りのあるトーク履歴でお試しください。</p>';
                return;
            }

            const user1Ratio = Math.round((user1.messageCount / totalCount) * 100);
            const totalPositive = (user1.positiveCount || 0) + (user2.positiveCount || 0);

            let explanation = '';
            // 選ばれたカードに基づいて解説を生成
            switch (parseInt(selectedCardId)) {
                case 6: // 恋人たち
                    explanation = `「恋人たち」のカードを選んだあなたたち。トークの${Math.abs(user1Ratio - 50) < 15 ? 'バランスが良く、' : 'やり取りからは、'}心地よい雰囲気が伝わってきます。これは、このカードが象徴する「調和」と「コミュニケーション」が、二人の関係の重要なテーマであることを示しています。`;
                    break;
                case 19: // 太陽
                    explanation = `「太陽」のカードを選んだあなたたち。トークには${totalPositive > 5 ? 'たくさんのポジティブな言葉があり、' : '明るい兆しがあり、'}生命力に満ちています。このカードは、二人の関係が「成功」と「喜び」に祝福されていることを示唆しています。隠し事のない、オープンな関係を大切にしてください。`;
                    break;
                case 4: // 皇帝
                    explanation = `「皇帝」のカードを選んだあなたたち。トークからは、${user1Ratio > 65 || user1Ratio < 35 ? 'どちらかが会話をリードし、関係の安定を築いている' : '安定感と、現実的な関係性を築こうとする'}様子が伺えます。このカードは「父性」や「責任感」を象徴し、二人の関係がしっかりとした基盤の上にあることを示しています。`;
                    break;
                default:
                    explanation = `あなたがこの「${selectedCard.name}」のカードに惹かれたのには、理由があるはずです。トーク履歴を見ると、二人の間には様々なコミュニケーションの歴史が見られます。このカードは、今の二人の関係性を象徴し、次へのステップを示唆しています。カードのメッセージを心に留め、これからの関係に活かしてください。`;
                    break;
            }

            let finalHtml = `
                <div id="final-card-container">
                    <img src="${selectedCard.image}" alt="${selectedCard.name}" id="tarot-card-image">
                    <h3 id="tarot-card-name">【${selectedCard.name}】 ${selectedCard.english}</h3>
                    <p id="tarot-card-meaning">${selectedCard.meaning}</p>
                    <div id="tarot-explanation">
                        <h4>あなたへのメッセージ</h4>
                        <p>${explanation}</p>
                    </div>
                </div>
            `;
            tarotResultArea.innerHTML = finalHtml;
        } catch (error) {
            // エラーが発生したら、内容を強制的にアラート表示
            alert(`申し訳ございません。予期せぬエラーが発生しました。\n\nエラー内容: ${error.message}\n\nこのメッセージを開発者にお伝えください。`);
            console.error("最終結果の表示中にエラーが発生しました:", error);
        }
    }
    
    function resetUIBeforeAnalysis() {
        cardSelectionSection.classList.add('hidden');
        resultsSection.classList.add('hidden');
        tarotResultArea.innerHTML = '';
    }

    function resetUI() {
        uploaderSection.classList.remove('hidden');
        loadingSection.classList.add('hidden');
        resetUIBeforeAnalysis();
        fileNameDisplay.textContent = '';
        fileInput.value = '';
    }
});