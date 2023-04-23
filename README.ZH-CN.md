# estree-walker-ts
🥑 对符合 [ESTree](https://github.com/estree/estree) 的 AST (例如由 [acorn](https://github.com/marijnh/acorn) 生成的 AST)进行遍历的简单实用程序。

[English](https://github.com/baiwusanyu-c/estree-walker-ts/blob/master/README.md) | 中文

## Feature

* 🧩 支持 esm 与 cjs 格式使用
* 🌈 使用 typescript 编写
* ⛰ 支持 estree ast 遍历
*  ⚡ 支持 acorn 的 ast

## Why is estree-walker-ts ? 
原因很简单，`estree-walker` 目前不支持 cjs 格式的使用，而作者似乎也没有想要支持这种格式，于是我将它使用 typescript 写了一遍    
并自己维护，他的内容与 `estree-walker` 几乎一致，同时也对它的类型做了简单的支持，但是原谅我，我不是一个 typescript 的类型专家，  
因此如果你使用时有任何问题 欢迎👏 给我提供 issue。  
最后，再次感谢 `estree-walker`以及作者 `Rich-Harris`。  

## Install

```bash
npm i estree-walker-ts -D
```
或
```bash
yarn add estree-walker-ts -D
```
或
```bash
pnpm add estree-walker-ts -D
```

## Usage
它的使用和 `estree-walker` 一样
> https://github.com/Rich-Harris/estree-walker/blob/master/README.md

## Thanks
* [estree-walker](https://github.com/Rich-Harris/estree-walker)
