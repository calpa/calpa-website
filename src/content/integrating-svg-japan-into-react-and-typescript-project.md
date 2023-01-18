---
title: Integrating svg-japan into a React and TypeScript Project
slug: "integrating-svg-japan-into-react-and-typescript-project"
description: "Generating maps of Japan with the svg-japan package can be a fun and powerful way to visualize data, but using it in a React application can be challenging. In this article, we'll show you how to wrap svg-japan in a custom React component and use it in a React and TypeScript project. By the end, you'll have a reusable map component that you can easily incorporate into your own projects."
headerImageUrl: https://i.imgur.com/fQTb11J.png
date: 2023-01-02T00:00:00Z
tags:
    - React
    - TypeScript
    - Maps
    - Japan
    - SVG
    - Mapping
    - Components
    - Integration
    - Customization
    - Travel
---

## Introduction

As a TypeScript developer, I find it fun to generate maps with the `svg-japan` package. I was particularly excited to use this package because I'm planning a trip to Japan and was looking for ways to incorporate Japan-related elements into my projects. However, I ran into some challenges when trying to use `svg-japan` in a React application, as it was not designed to be used as a React component and was last updated over two years ago in November 2020.

To overcome this limitation, I decided to wrap `svg-japan` in a custom React component. This allowed me to use the package in my React application and take advantage of its powerful mapping capabilities, while also taking advantage of the benefits of working with TypeScript. In this article, I'll go through the process of wrapping `svg-japan` in a React component and writing a declaration file for it. By the end, I'll have a reusable component that I can use to easily generate maps in my React applications.

## Wrapping svg-japan in a React Component

To wrap `svg-japan` in a React component, we can start by creating a functional component that accepts `JapanMapProps` as its props. This can include any options that are accepted by the `svgJapan` class, as well as any additional props that you want to add.

In the body of the component, we can use the `useRef` hook to create a ref for the `div` element that will contain the map. We can then use the `useEffect` hook to instantiate a new `svgJapan` object and attach it to the ref when the component mounts. We can also add an event listener to the ref to listen for the `"svgmap.click"` event and call the `onClick` prop when it is emitted.

Finally, we can return the `div` element with the ref attached to it.

Here's an example of what the component might look like:

```tsx
import { useEffect, useRef } from "react";

import svgJapan, { svgJapanOptions } from "svg-japan/src/_core-class";
import "./index.css";

type JapanMapProps = svgJapanOptions & {
  onClick: (event: Event) => void;
};

function JapanMap(props: JapanMapProps) {
  const { onClick } = props;

  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const map = new svgJapan(props);
    mapRef.current?.replaceChildren(map.map_container);
    mapRef.current?.addEventListener("svgmap.click", onClick);
  }, [mapRef, props]);

  return <div ref={mapRef} />;
}

export default JapanMap;
```

## Using the Japan Map Component
Now that I have a custom React component for `svg-japan`, we can use it in the React application just like any other component. We can pass in any of the options accepted by the `svgJapan` class as props, as well as any additional props that we want to add.

For example, the component is like this:

```tsx
import JapanMap from "./JapanMap";

function App() {
  const handleClick = (event: Event) => {
    console.log("Map was clicked!");
  };

  return (
    <JapanMap
      onClick={handleClick}
    />
  );
}
```

## Conclusion

By wrapping the `svg-japan` package in a custom React component, we can use the powerful mapping capabilities of `svg-japan` in the React and TypeScript projects to easily generate beautiful maps of Japan. I'm personally excited to create this component as I plan my trip to Japan in the coming months. I'd like to express our gratitude to the `svg-japan` author, ka2 (Katsuhiko Maeno), for creating such a useful and powerful package.

I hope you also find this component useful and that it helps you get excited about your own travels to Japan. あけましておめでとうございます - Happy New Year!