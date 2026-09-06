# 큰소망교회 홈페이지

대구 감삼동 큰소망교회의 단일 페이지 홈페이지입니다. 별도 서버, 데이터베이스, 패키지 설치 없이 GitHub Pages에서 운영합니다.

## 파일

- `index.html`: 교회 소개, 예배 시간, 가정예배 순서지, 주소와 연락처
- `styles.css`: PC·태블릿·휴대폰 레이아웃
- `script.js`: 모바일 메뉴, 현재 메뉴 표시, 주소 복사
- `assets/`: 제공받은 로고와 교회 사진의 웹용 사본, Noto Sans KR 웹폰트, 가정예배 PDF와 표지 썸네일 (상위 폴더 원본은 유지)

## 미리보기와 확인

```sh
python3 -m http.server 8000
```

브라우저에서 `http://localhost:8000`을 엽니다. 링크·파일 검사는 `python3 scripts/check_site.py`로 실행합니다.

## GitHub Pages

저장소: https://github.com/DavidPark9830/bighope-church

최초 한 번 저장소 **Settings → Pages → Source → GitHub Actions**를 선택합니다. 이후 `main` 브랜치로 푸시하면 `.github/workflows/pages.yml`이 검사 후 자동 배포합니다.

기본 배포 주소: https://davidpark9830.github.io/bighope-church/

```sh
git add .
git commit -m "Update church website"
git push origin main
```

파일을 저장하는 것만으로 GitHub에 업로드되지는 않습니다. VS Code의 소스 제어에서 커밋·동기화하거나 위 명령을 실행합니다. 기존 `bighope.co.kr` 도메인은 DNS와 기존 서비스 전환이 필요하므로 별도로 변경하지 않았습니다.

## 정보 출처와 확인 사항

2026-09-06 제작 시 아래 기존 공식 홈페이지 공개 자료를 참고했습니다. 노션 직접 응답에서는 본문을 읽을 수 없어, 동일 교회 Oopy 홈페이지에 공개된 메뉴와 내용을 사용했습니다.

- 제공된 노션: https://bighopechurch.notion.site/WEBPAGE-7035ada4694b4aa7b79cfcfbc0beb8ff
- 환영과 비전: https://www.bighope.co.kr/
- 교단·개척·예배 안내: https://www.bighope.co.kr/about
- 주소·지하철·접근성·지도 링크: https://www.bighope.co.kr/location
- 대표전화: 상위 폴더의 `OOPY_html_body.txt`

기존 홈페이지의 예배 시간과 식사·경사로 안내를 반영했으며, 현재 운영 여부를 전화로 직접 확인한 것은 아닙니다. 운영 시간이 달라졌다면 `index.html`의 예배 시간표를 수정해 주세요. 수요·금요 시간은 기존의 “오후 08:00”을 24시간 표기인 `20:00`으로 정리했습니다.

연도별 운영 기간과 버스 노선 번호처럼 쉽게 오래되는 정보는 고정하지 않았습니다. 게시판 성격의 주보·자료·교회 소식과 정기 갱신이 필요한 설교 목록은 요청에 따라 제외했습니다.
