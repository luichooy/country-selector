<template>
  <div
    :style="{ width: typeof width === 'number' ? width + 'px' : width }"
    class="lu-country"
  >
    <input
      ref="input"
      v-model="select.text"
      :placeholder="placeholder"
      @keyup="handleKeyupEvent"
      @focus="handleFocusEvent"
      :class="'lu-country__input--' + size"
      class="lu-country__input"
      type="text"
      autocomplete="off"
    />

    <div ref="panel" @click.stop="" class="lu-country__panel">
      <div class="lu-country__select" v-show="selectShow">
        <p class="tips" v-html="lang === 'zh' ? tips.zh : tips.en"></p>
        <ul class="nav" @click="toggleTab">
          <li
            v-for="(val, tab) in countries"
            :key="tab"
            :class="{ active: activeTab === tab }"
            class="nav-item"
          >
            {{ tab }}
          </li>
        </ul>
        <div class="hot-country">
          <template v-for="(item, kinds) in countries">
            <div class="country-list" :key="kinds" v-show="activeTab === kinds">
              <dl v-for="(couns, kind) in item" :key="kind">
                <dt>{{ kind === 'HOT' ? '&nbsp;' : kind }}</dt>
                <dd>
                  <a
                    v-for="country in couns"
                    :key="country.code"
                    :code="country.code"
                    :text="country.name"
                    @click="selectCountry"
                  >
                    {{ country.name }}
                  </a>
                </dd>
              </dl>
            </div>
          </template>
        </div>
      </div>
      <ul class="lu-country__search" v-show="searchShow">
        <li
          v-for="(country, index) in searchResult"
          :key="index"
          :code="country.code"
          :text="country.name"
          :class="{ active: count === index }"
          class="search-item"
        >
          <span class="country-name">{{ country.name }}</span>
          <span class="country-code">{{ country.code }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getLanguage } from './utils'

const data = require('./country')

const REGEXP = {
  1: /^[A-C]$/i,
  2: /^[D-F]$/i,
  3: /^[G-I]$/i,
  4: /^[J-L]$/i,
  5: /^[M-N]$/i,
  6: /^[O-Q]$/i,
  7: /^[R-T]$/i,
  8: /^[U-W]$/i,
  9: /^[X-Z]$/i,
}

export default {
  name: 'VueCountrySelect',
  props: {
    width: {
      type: [String, Number],
      default: '100%',
    },

    language: {
      type: String,
      default: 'auto',
    },

    placeholder: {
      type: String,
      default: '',
    },

    size: {
      type: String,
      default: 'medium',
    },

    data: {
      type: Array,
      default: () => data,
    },

    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      tips: {
        zh: '输入关键字可搜索国家/地区（支持汉字/拼音/国家代码）',
        en: 'Enter keywords to search for countries/region(support name and code)',
      },
      selectShow: false,
      searchShow: false,
      countries: null,
      activeTab: 'HOT',
      searchResult: [],
      count: 0,
      select: {
        code: this.value,
        text: '',
      },
    }
  },
  computed: {
    lang() {
      return this.language === 'auto' ? getLanguage() : this.language
    },
  },
  watch: {
    value: function () {
      this.getText()
    },
    'select.code': function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$emit('input', newVal)
      }
    },
  },
  created() {
    // 对传入的数据进行分组
    this.formatCountry()

    // 根据传入的value查找text;
    this.getText()
  },
  mounted() {
    // 设置dropdown的位置
    this.setDropdownPos()

    // 设置点击文档隐藏弹出的国家选择器
    document.addEventListener('click', this.handleDocEvent, false)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleDocEvent, false)
  },
  methods: {
    formatCountry() {
      let countries = {
        HOT: {},
        ABC: {},
        DEF: {},
        GHI: {},
        JKL: {},
        MN: {},
        OPQ: {},
        RST: {},
        UVW: {},
        XYZ: {},
      }

      let keys = Object.keys(countries)
      let initial = ''
      this.data.forEach((country, index) => {
        initial = this.getInitial(country)

        if (country.hot) {
          if (!countries.HOT['HOT']) countries.HOT['HOT'] = []
          this.pushCountries(countries.HOT['HOT'], country)
        }

        for (var i = 1; i < keys.length; i++) {
          if (REGEXP[i].test(initial)) {
            if (!countries[keys[i]][initial]) countries[keys[i]][initial] = []
            this.pushCountries(countries[keys[i]][initial], country)
            break
          }
        }
      })
      this.countries = countries
    },

    getText() {
      let code = this.value
      for (let i = 0, j = this.data.length; i < j; i++) {
        if (!code) break
        let country = this.data[i]
        if (country.code === code) {
          if (this.lang === 'zh') {
            this.select.text = country.cnName
          } else {
            this.select.text = country.enName
          }
          break
        }
      }
    },

    setDropdownPos() {
      let panel = this.$refs['panel']
      panel.style.top = this.$refs['input'].clientHeight + 5 + 'px'
    },

    handleDocEvent(event) {
      event.stopPropagation()
      let target = event.target
      if (target === this.$refs['input']) return false
      this.selectShow = false
      this.searchShow = false
    },

    // 根据语言获取国家首字母，用来进行国家分类
    getInitial(country) {
      let initial = ''
      switch (this.lang) {
        case 'zh':
          initial = country.cnSpell.substr(0, 1)
          break
        case 'en':
          initial = country.enName.substr(0, 1)
          break
        default:
          initial = country.enName.substr(0, 1)
          break
      }
      return initial
    },

    // 根据语言向countries中push country
    pushCountries(arr, country) {
      switch (this.lang) {
        case 'zh':
          arr.push({
            name: country.cnName,
            code: country.code,
          })
          break
        case 'en':
          arr.push({
            name: country.enName,
            code: country.code,
          })
          break
        default:
          arr.push({
            name: country.enName,
            code: country.code,
          })
          break
      }
    },

    // 处理input输入框上的事件
    handleFocusEvent() {
      if (this.searchShow === false) {
        this.selectShow = true
      }
    },

    // 处理input中的keyup事件
    handleKeyupEvent() {
      let value = event.currentTarget.value
      if (value) {
        this.searchCountry(value, event)
      } else {
        // 当值为空的时候，隐藏search-list,显示select-menu
        this.searchShow = false
        this.selectShow = true
      }
    },

    // 正则匹配国家，生成 searchResult
    searchCountry(keyword, event) {
      // 创建正则，如： /^a|\\|a/gi
      let reg = new RegExp(`^${keyword}|\\|${keyword}`, 'gi')

      // 每次匹配之前，需将searchResult置为空数组
      this.searchResult = []

      let text = ''
      let lang = this.lang

      this.data.forEach(country => {
        if (lang === 'zh') {
          // 中国|CN|ZHONGGUO
          text = `${country.cnName}|${country.code}|${country.cnSpell}`
        } else if (lang === 'en') {
          // CHINA|CN
          text = `${country.enName}|${country.code}`
        } else {
          text = `${country.enName}|${country.code}`
        }
        if (text.search(reg) > -1) {
          this.pushCountries(this.searchResult, country)
        }
      })
      if (this.searchResult.length) {
        this.searchShow = true
        this.selectShow = false

        // 当 search-list显示的时候，需要处理键盘 ↑ ↓ enter事件
        this.handleKeyboardEvent(event)
      } else {
        // 如果没有匹配到，则显示搜索为空的文本内容
        this.lang === 'zh'
          ? this.searchResult.push({
              code: '',
              name: '没有搜索到对应的国家',
            })
          : this.searchResult.push({
              code: '',
              name: 'No result',
            })
      }
    },

    // 处理键盘 ↑ ↓ enter 事件
    handleKeyboardEvent(event) {
      let keyCode = event.keyCode
      let len = this.searchResult.length

      switch (keyCode) {
        case 40: // 向下箭头
          this.count++
          if (this.count > len - 1) this.count = 0
          break
        case 38: // 向上箭头
          this.count--
          if (this.count < 0) this.count = len - 1
          break
        case 13: // enter键
          // 找到 search-item.active的 LI 元素
          let target = this.$refs['panel'].querySelector('.search-item.active')
          this.select.code = target.getAttribute('code')
          this.select.text = target.getAttribute('text')
          this.searchShow = false
          break
        default:
          break
      }
    },

    // select-menu中的 tab 切换
    toggleTab() {
      const target = event.target
      this.activeTab = target.innerHTML.trim()
    },

    // 点击选择国家事件
    selectCountry() {
      let target = event.currentTarget
      this.select.code = target.getAttribute('code')
      this.select.text = target.getAttribute('text')
      this.selectShow = false
    },
  },
}
</script>

<style lang="scss" scoped>
h1, h2, h3, h4, h5, h6, p, dl, dd {
  margin: 0;
}

html, body {
  height: 100%;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.lu-country {
  position: relative;
  display: inline-block;

  .lu-country__input {
    display: inline-block;
    width: 100%;
    padding: 0 15px;
    border-radius: 4px;
    border: 1px solid #DCDFE6;
    background-color: #FFFFFF;
    background-image: none;
    box-sizing: border-box;
    color: #606266;
    font-size: inherit;
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    outline: 0;
    -webkit-appearance: none;

    &:hover {
      border-color: #C0C4CC;
    }

    &:focus {
      border-color: #409EFF;
    }

    &::placeholder {
      color: #C0C4CC;
    }
  }

  .lu-country__input--large {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
  }

  .lu-country__input--medium {
    height: 36px;
    line-height: 36px;
    font-size: 14px
  }

  .lu-country__input--small {
    height: 32px;
    line-height: 32px;
    font-size: 13px;
  }

  .lu-country__input--mini {
    height: 28px;
    line-height: 28px;
    font-size: 12px;
  }

  .lu-country__panel {
    position: absolute;
    left: 0;
    z-index: 99999;

    .lu-country__select {
      width: 474px;
      overflow: hidden;
      border: 1px solid rgb(101, 206, 167);
      border-radius: 4px;
      background-color: #FFFFFF;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
      font-size: 12px;

      .tips {
        color: #999999;
        line-height: 20px;
        padding: 5px 8px;
      }

      .nav {
        display: flex;
        justify-content: flex-start;

        .nav-item {
          padding: 5px 12px;
          border-bottom: 1px solid #DDDDDD;
          list-style: none;
          cursor: pointer;
          color: #00A346;
          transition: all .3s ease-in-out;

          &.active {
            border-bottom-color: rgb(101, 206, 167);
          }
        }
      }

      .hot-country {
        height: auto;
        border-top: 1px solid #DDDDDD;
        margin-top: -1px;
        overflow: hidden;
        padding: 10px 0;
        .country-list {
          dl {
            display: flex;
            padding: 0 10px;
          }

          dt {
            padding-left: 3px;
            width: 20px;
            color: rgb(101, 206, 167);
            margin-top: 1px;
            text-indent: 5px;
            line-height: 25px;
            font-size: 14px;

          }

          dd {
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            padding-left: 5px;

            a {
              padding: 0 5px;
              line-height: 25px;
              color: #333333;
              cursor: pointer;

              &:hover {
                color: rgb(101, 206, 167);
              }
            }
          }
        }
      }
    }

    .lu-country__search {
      padding: 5px 0;
      width: auto;
      max-height: 350px;
      background-color: #FFFFFF;
      border: 1px solid rgb(101, 206, 167);
      border-radius: 5px;
      overflow: auto;
      .search-item {
        display: flex;
        justify-content: space-between;
        min-width: 230px;
        padding: 8px 16px;
        cursor: pointer;

        &.active {
          background: rgb(101, 206, 167);
          color: #FFFFFF;
        }

        &:hover {
          background: rgb(101, 206, 167);
          color: #FFFFFF;
        }

        .country-name {
          white-space: nowrap;
        }

        .country-code {
          margin-left: 50px;
        }
      }
    }
  }
}
</style>
