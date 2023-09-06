# 翻译相关术语

## 如何翻译

如果你感觉某些翻译不准确，可进行针对性的定义某些词的翻译结果，进行自定义术语库。添加到[翻译配置文件](https://github.com/Hamud-Lang/Hamud_Book/edit/zh-Hans-CN/assets/translate_lib.js)内。具体使用的方法为：

```javascript
translate.nomenclature.append(from, to, properties);
```

传入参数解释：

- `from` 要转换的语种，传入如 `chinese_simplified`；
- `to` 翻译至的目标语种，传入如 `english`；
- `properties` 配置表，格式便是properties的格式，每行一个规则，每个前后用等号分割，等号前是要翻译的词或句子，等号后是自定义的翻译结果。传入如：

```javascript
你好=Hello
世界=ShiJie
```

比如，要自定义 “哈姆语之书” 、 “哈姆语” 这两个词有简体中文翻译为英文的结果，可以这么写：

```javascript
translate.nomenclature.append('chinese_simplified','english',`
    哈姆语言之书=Hamud Book
    哈姆语=the language of Hamud
`);
```

> 需要注意，`translate.nomenclature.append(“内容省略”)` 这行要放到 `translate.execute();` 之前。

## 开始翻译

- [点击在线编辑翻译配置文件](https://github.com/Hamud-Lang/Hamud_Book/edit/zh-Hans-CN/assets/translate_lib.js)

> 如果在线编辑无法满足您的需求，您可以选择使用[标准流程](../About_Book.md#💻代码或内容贡献)对源码进行修改。
