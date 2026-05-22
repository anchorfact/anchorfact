---
id:"kb-2026-00174"
title:"Webpack"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"Webpack Documentation"
    type:"documentation"
    year:2025
    url:"https://webpack.js.org/"
    institution:"OpenJS Foundation"
completeness:0.82
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Webpack is a module bundler that transforms frontend assets (JS, CSS, images) into optimized bundles. Entry point → dependency graph → loaders (transform files) → plugins (optimize output) → bundles. Introduced code splitting and hot module replacement to mainstream JavaScript.

## Core Explanation

Loaders: `babel-loader` (transpile), `css-loader`, `file-loader`. Plugins: `HtmlWebpackPlugin`, `MiniCssExtractPlugin`, `TerserPlugin` (minification). Webpack 5 (2020): module federation (sharing modules across applications). Newer alternatives: Vite (ESM-native, faster dev server), esbuild (Go, 10-100x faster), Turbopack (Rust, Next.js).

## Further Reading

- [Webpack Documentation](https://webpack.js.org/)
