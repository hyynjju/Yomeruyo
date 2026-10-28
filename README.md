<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1k-_ciOaEDqoy76CYfZ81qEwwRr-ZwJdX

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## 메뉴 읽기 데이터

`public/data/menus.json`에서 지명 데이터와 같은 방식으로 관리합니다.
카테고리는 `izakaya`, `yakiniku`, `cafe`, `western`, `cocktail`입니다.
각 항목은 `display`(메뉴 표기), `reading`(히라가나 독음), `korean`(한국어 독음), `meaning`(한국어 뜻)을 가집니다.
선택한 카테고리에서 최대 20개를 중복 없이 섞어 출제합니다.
이자카야·야키니쿠는 Yuji Syuku, 나머지는 Noto Serif JP를 사용합니다.
폰트는 Google Fonts에서 불러오며 연결 실패 시 시스템 명조체로 표시됩니다.

메뉴 구성: 야키토리 37개, 야키니쿠 36개, 카페 40개, 양식 40개, 칵테일 40개. 카페에는 한자와 카타카나가 섞인 디저트도 포함합니다.
