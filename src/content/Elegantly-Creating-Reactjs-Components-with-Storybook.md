---
slug: elegantly-creating-reactjs-components-with-storybook
date: 2023-01-11T00:00:00Z
title: 使用 Storybook 更優雅地製作 React.js 組件
tags:
    - Storybook
    - UI Components
    - JavaScript
    - TypeScript
    - Collaboration
    - Component Library
    - UI Development
    - React.js
headerImage: https://i.imgur.com/piG1KF6.png
description: Storybook 是一個支援多種前端框架的工具，它支持 React.js，Vue.js，Angular。我們可以在單獨的環境中進行組件的開發與測試。它能夠幫助我們更快速地構建和測試組件，並確保它們在應用程式中的可用性。在這裏我希望分享一些關於 Storybook 的心得。
---

![](https://i.imgur.com/piG1KF6.png)

## 前言

`Storybook` 是一個支援多種前端框架的工具，它支持 `React.js`，`Vue.js`，`Angular`。我們可以在單獨的環境中進行組件的開發與測試。它能夠幫助我們更快速地構建和測試組件，並確保它們在應用程式中的可用性。在這裏我希望分享一些關於 `Storybook` 的心得。

## 優點

Storybook 最大的優點是它可以提供不同的頁面來顯示組件的不同狀態，讓我們在各種不同的情況下測試和評估組件。通過為不同狀態創建不同的頁面，我們可以輕鬆地測試組件。另外，Storybook 也可以輸出一個 Static Website，可以輕鬆分享給設計師和其他團隊成員，讓他們容易理解組件的外觀和行為。

例如 `Attraction` 這個組件，我就可以在 Storybook 的界面上展示如何透過傳達不同的 Props 輸出不同效果。

![](https://i.imgur.com/J4jbkri.png)

如果將 `title` 由「東京的電子商圈和動漫天堂」修改爲「可以一去再去的動漫聖地」的話，那麼你也可以看見實時的輸出效果。

![](https://i.imgur.com/zFrL5jJ.png)

我們也可以使用內置的功能來測試該組件在不同大小的設備上是否可以達到滿意的效果，例如 Small Mobile 就可以模擬比較小的手機上的效果。

![](https://i.imgur.com/dR3k1Mt.png)

## 使用方法

![](https://i.imgur.com/stynbVS.png)

我在使用 Markdown 的時候發現預設的 blockquote 語法不太滿足我的需求，於是便開始使用 CSS 修改 blockquote 的字體大小、顏色、背景色、縮排等等，讓它有更獨特的樣式。

以下是我在 [@calpa/ui](https://github.com/calpa/ui) 的 React.js 代碼：

```ts
// src/components/Blockquote/index.tsx
import React, { FC } from "react";

type BlockquoteProps = {
  children: React.ReactNode;
};

const Blockquote: FC<BlockquoteProps> = (props) => {
  return (
    <blockquote
      style={{
        maxWidth: "100%",
        width: "100%",
        wordBreak: "break-word",
        caretColor: "rgba(255, 255, 255, 0.9)",
        borderLeft: "3px solid currentcolor",
        margin: "0",
        paddingLeft: "0.9em",
        paddingRight: "0.9em",
      }}
    >
      {props.children}
    </blockquote>
  );
};

export default Blockquote;
```

我們可以簡單地使用以下代碼來創建一個 Storybook 頁面。

```ts
//src/components/Blockquote/index.stories.ts
import Blockquote from ".";

export default {
  title: "Components/Blockquote",
  component: Blockquote,
};

const Template = (args) => <Blockquote {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
};
```

## Addons

![](https://i.imgur.com/PLGyTBA.png)

Storybook 豐富的生態圈可以讓我們擁有各種各樣的開發體驗，例如 `@storybook/addon-interactions` 可以讓我們模擬各種互動效果。

![](https://i.imgur.com/gacJKMI.png)

## 總結

我最近在重構以前的博客項目，並且使用 Material UI 以及 TypeScript 來構建一個獨立的 UI 組件庫。UI 組件庫名為 @calpa/ui，它已經發佈到 npm 上並且可以通過 `npm install @calpa/ui` 來安裝。歡迎到 https://ui.calpa.me 來體驗 Storybook 的效果。

組件庫的 Source Code 在 https://github.com/calpa/ui ，喜歡的話歡迎給 Star 以及 Follow。