# vue-country-selector

# 介绍
vue-country-selector是基于Vue.js开发的一个国家选择器，可用来快速选择、搜索国家。它的样式参考了[Element-ui](https://element.eleme.io/)中el-input的样式。



![example1.png | center | 519x287](https://cdn.nlark.com/yuque/0/2018/png/95048/1537516655380-7593f7ff-7cdf-44ae-a42f-37e8afee308b.png "")




![example2.png | center | 317x298](https://cdn.nlark.com/yuque/0/2018/png/95048/1537516671100-f979767d-81e3-4c35-b2a8-9967f5a94bee.png "")


## 安装
```plain
#npm
npm install vue-country-selector --save

# yarn
yarn add vue-country-selector
```


## 快速开始
```plain
// main.js
import Vue from 'vue';
import CountrySelector from 'vue-country-selector';

// import stylesheet
import 'vue-country-selector/dist/countryselect.css';

// use in template tag
<template>
    <country-selector v-model="selected" width="260" ></country-selector>
</template>
```

## 参数列表


| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| width | 定义组件的宽度 | String/Number | —— | 默认宽度为100% |
| language | 定义组件的默认显示语言 | String | zh/en/auto | auto，即根据浏览器语言来显示 |
| placeholder | 定义文本输入框的placeholder | String | —— | —— |
| size | 组件的size | String | large/medium/small/mini | medium |
| data | 组件的数据源 | Array | —— | 默认值及格式要求见下 |
| value | v-model绑定的值 | String | —— | —— |

### data数据源
vue-country-select组件将根据data数据源中的数据来渲染组件的可选项，你可以根据自己的业务要求，通过data选项灵活的配置数据，如果你没有传入data选项，则vue-country-selector组件将使用内部默认的数据源来渲染组件。

data数据源的格式：
```plain
[
    {
        code: 'CN',             // id
        cnName: '中国'，         // 中文名
        cnSpell: 'zhongguo',    // 中文拼音（大小写均可）
        enName: 'China',        // 英文名
        hot: true               // 是否热门，值为true的国家将显示在HOTtab下
    },
    {
        code: 'us',
        cnName: '美国'，
        cnSpell: 'meiguo',
        enName: 'United States of America',
        hot: false
    },
    ...
]
```
