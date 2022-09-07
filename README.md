# 喵内记账本

- 用 `Vue.js + TypeScript` 写的一个记账本。
- 网站：[Gitee Pages](https://xmasuhai.gitee.io/meowney-0-website)
  或者 [GitHub Pages](http://xmasuhai.xyz/meowney-0-website/#/)

## 主要技术

- 这是我从自己的需求出发，设计出的极简记账应用，特点是快速记账， 并可以通过图表查看用户消费习惯
- 基于` Vue 2.6`、`Vue Router`、`Vuex`、`TypeScript`
- 主要功能包括按日期记账、查看收入支出、统计、收支的图形展示等
- 统计图表使用第三方库`ECharts.js`
- 由本人参考开源UI，独立实现代码
- 期间遇到了很多 webpack svg、Vuex 和 TypeScript 方面的问题
- 源代码完全使用TypeScript实现，用到了装饰器语法

---

## 安装

```sh
yarn install
```

- 也可以用 `yarn` 或者 `npm`

---

## 运行

```sh
yarn serve
```

---

## 构建

```sh
yarn build
yarn build:dev
```

---

## 运行单元测试

```sh
yarn test:unit
```

---

## 手动部署

```sh
yarn deploy
```

- 目前有添加了 `deployWebsite.yml` 放在 `GitHub Actions`上自动部署预览页面

---
---
