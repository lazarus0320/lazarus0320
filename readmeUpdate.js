import fs from 'fs';
import dayjs from 'dayjs';
import Parser from 'rss-parser';
import timezone from 'dayjs/plugin/timezone.js';
import utc from 'dayjs/plugin/utc.js';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Seoul');

let text = `
# 민지훈 MIN JI HUN 👋
BackEnd Engineer  
팀원과의 의사소통 뿐만 아니라 미래의 팀원들에게도 의사소통이 될 수 있는 문서와 코드를 쓰고자 최선을 다하고 있습니다.

### 💼 Career
| Period | Organization | Role / Project |
|:--- |:--- |:--- |
| **2026.03 - Present** | **BNK 시스템** | **Backend Developer** 🏦 |
| 2025.04 - 2025.12 | 한국교육학술정보원 (KERIS) | 정보화 사업 관리 |
| 2023.12 - 2024.02 | KAIST AUTO ID LAB | 연구 위촉원 |

---

### 🛠️ Tech Stack

#### Backend
![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=java&logoColor=white)
![SpringBoot](https://img.shields.io/badge/SpringBoot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Postgres](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)

#### DevOps & Tools
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)
![AWS EC2](https://img.shields.io/badge/AWS_EC2-FF9900?style=for-the-badge&logo=amazon-aws&logoColor=white)
![AWS RDS](https://img.shields.io/badge/AWS_RDS-527FFF?style=for-the-badge&logo=amazon-rds&logoColor=white)
![Ubuntu](https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white)

#### Frontend & UI/UX
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Flutter](https://img.shields.io/badge/Flutter-02569B?style=for-the-badge&logo=flutter&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)

#### Collaboration & Documentation
![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white)
![Jira](https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=jira&logoColor=white)

---

### 📖 Latest Blog Posts
`;

const parser = new Parser({
  headers: {
    Accept: 'application/rss+xml, application/xml, text/xml; q=0.1',
  },
});

(async () => {
  // 피드 목록
  const feed = await parser.parseURL('https://afterdawncoding.tistory.com/rss');

  // 최신 5개의 글의 제목과 링크를 가져온 후 text에 추가
  for (let i = 0; i < 5; i++) {
    const { title, link, pubDate } = feed.items[i];
    console.log(`${i + 1}번째 게시물`);
    console.log(`추가될 제목: ${title}`);
    console.log(`추가될 링크: ${link}`);

    const date = dayjs(pubDate).add(9, 'hours').format('YYYY.MM.DD HH:mm:ss');
    text += `<a href="${link}">${title}</a></br>`;
    text += `게시일자 : ${date}</br></br>`;
  }

  // README.md 파일 작성
  fs.writeFileSync('README.md', text, 'utf8', (e) => {
    console.log(e);
  });

  console.log('업데이트 완료');
})();
