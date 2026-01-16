# astro-whono

一个极简双栏的 Astro 主题起步项目，包含：

- 主页 `/`：聚合 posts + essay 最新内容
- 归档 `/posts/`：长文归档（按年分组）
- 随笔 `/essay/`：碎片化想法与短文
- 小记 `/bits/`：短动态（带草稿生成器脚本）
- 孩童 `/kids/`：育儿记录（TOC 折叠）
- 关于 `/about/`：个人简介 + 技术栈

## 运行环境

- Node.js 18+（建议 20+）

## 安装与启动

```bash
npm i
npm run dev
```

构建与预览：

```bash
npm run build
npm run preview
```

类型检查：

```bash
npm run check
```

## 路由说明

| 栏目 | 路径 | 说明 |
| --- | --- | --- |
| 主页 | `/` | 聚合 posts + essay 最新内容 |
| 归档 | `/posts/` | 长文列表（按年分组） |
| 长文详情 | `/posts/[...slug]/` | 由 content collection 生成静态页面 |
| 随笔 | `/essay/` | 随笔列表 |
| 随笔详情 | `/essay/[...slug]/` | 由 content collection 生成静态页面 |
| 小记 | `/bits/` | bits 流（支持草稿与生成脚本） |
| 孩童 | `/kids/` | kids 单页（TOC 折叠） |
| 关于 | `/about/` | 个人简介页 |

## 内容结构（Content Collections）

内容放在 `src/content/` 下：

- 长文：`src/content/posts/*.md`
- 随笔：`src/content/essay/*.md`
- 小记：`src/content/bits/*.md`
- 孩童：`src/content/kids/index.md`
- 集合定义：`src/content.config.ts`

## Frontmatter 约定

posts / essay（必填：title、date；其他可选）：

```yaml
---
title: My Post
description: optional
date: 2026-01-01
tags: ["tag1", "tag2"]
draft: false
slug: optional-custom-permalink
cover: optional
---
```

bits（title 可省略）：

```yaml
---
title: optional
description: optional
date: 2026-01-01T12:00:00+08:00
tags: []
draft: true
slug: optional
image: optional
---
```

kids：

```yaml
---
title: Kids
subtitle: optional
date: optional
draft: false
slug: optional
---
```

`draft: true` 的内容会从列表与 RSS 中过滤。

## 小记草稿生成器（bits）

生成一条新的 bits 草稿：

```bash
npm run new:bit
```

它会在 `src/content/bits/` 下创建一个以时间命名的 `.md` 文件，并写入：

- `draft: true`
- `date`: 本地时间（含时区偏移）

脚本位置：`scripts/new-bit.mjs`

## RSS

- `/rss.xml`：聚合 posts + essay
- `/posts/rss.xml`：posts
- `/essay/rss.xml`：essay

⚠️ 你必须修改 `astro.config.mjs` 里的 `site` 为你的真实域名，否则 RSS 链接不正确：

```js
export default defineConfig({
  site: 'https://your-domain.com',
  trailingSlash: 'always',
})
```

## 主题定制入口

### 站点标题 / 页脚年份

`src/layouts/BaseLayout.astro`

```js
const siteTitle = 'Whono';
```

footer 文案：`© {siteTitle} | since 2023`

### 侧栏导航 / 引用文案

`src/components/Sidebar.astro`

- `nav` 数组：控制栏目顺序、路径、文案
- `quote`：侧栏引言

### 样式

- 全局样式：`src/styles/global.css`
- Markdown 排版：`src/styles/markdown.css`

### 代码高亮主题（Shiki）

`astro.config.mjs` → `markdown.shikiConfig.theme`

## 开源与贡献

- License：MIT
- 欢迎提交 PR / Issue（建议在提交前跑一次 `npm run check`）

## 致谢

- 感谢 [elizen/elizen-blog](https://github.com/elizen/elizen-blog)，它是最初的设计蓝本
- 进一步追溯，其风格源于经典的 Hugo 主题 [yihui/hugo-ivy](https://github.com/yihui/hugo-ivy)

本项目基于 Astro 框架进行了全面重构，并优化了桌面与移动端的体验。
