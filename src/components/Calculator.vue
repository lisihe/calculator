<template>
  <div id="calculator">
    <div id="display">
      <div class="table-tr">
        <div id="expression">
        {{expression}}
        </div>
      </div>
      <div class="table-tr">
        <div id="result">
          {{result}}
        </div>
      </div>
    </div>
    <div id="menu">
      <div id="history">
        历史记录
      </div>
      <div id="delete" @click="this.delete">
        删除
      </div>
    </div>
    <div id="buttons" @click="this.bounceIn">
      <div class="btn_line">
        <div class="btn" id="" @click="this.clear"><span>C</span></div>
        <div class="btn" id=""><span>(</span></div>
        <div class="btn" id=""><span>)</span></div>
        <div class="btn" id=""><span>÷</span></div>
      </div>
      <div class="btn_line">
        <div class="btn" id="">7</div>
        <div class="btn" id="">8</div>
        <div class="btn" id="">9</div>
        <div class="btn" id="">x</div>
      </div>
      <div class="btn_line">
        <div class="btn" id="">4</div>
        <div class="btn" id="">5</div>
        <div class="btn" id="">6</div>
        <div class="btn" id="">-</div>
      </div>
      <div class="btn_line">
        <div class="btn" id="">1</div>
        <div class="btn" id="">2</div>
        <div class="btn" id="">3</div>
        <div class="btn" id="">+</div>
      </div>
      <div class="btn_line">
        <div class="btn" id="">+/-</div>
        <div class="btn" id="">0</div>
        <div class="btn" id="">.</div>
        <div class="btn" id="">=</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'calculator',
  data () {
    return {
      msg: '这是计算器',
      expression: '',
      result: '',
      suffixExpArr: [],
      stack: []
    }
  },
  methods: {
    bounceIn (event) {
      let input = event.target.innerText
      if (input !== 'C' && input !== '=') {
        this.expression = this.expression + input
        this.compute()
      }
      // console.log(event.target.innerText)
      // 如果表达式合法,计算结果
    },
    // 清除计算表达式
    clear (event) {
      this.expression = ''
      this.result = ''
    },
    // 表达式向后删除一格
    delete (event) {
      let expLength = this.expression.length
      this.expression = this.expression.substr(0, expLength - 1)
    },
    // 计算表达式的值
    compute () {
      this.suffix()
      console.log('表达式字符数组-后缀：' + this.suffixExpArr)
      const OPERATIONS = ['+', '-', 'x', '÷']
      const SYMBOLS = ['(', ')', ...OPERATIONS]
      this.stack = []
      let num = 0
      for (let s of this.suffixExpArr) {
        if (!SYMBOLS.includes(s)) {
          this.stack.push(s)
        } else {
          let o1 = Number.parseFloat(this.stack.pop())
          let o2 = Number.parseFloat(this.stack.pop())
          switch (s) {
            case '+':
              num = o2 + o1
              break
            case '-':
              num = o2 - o1
              break
            case 'x':
              num = o2 * o1
              break
            case '÷':
              num = o2 / o1
              break
          }
          this.stack.push(num)
        }
      }
      this.result = num
    },
    suffix () { // 计算后缀表达式
      /*
      算法描述：准备一个空的堆栈，一个后缀表达式字符串数组，从左往右遍历中缀表达式字符串数组。
      如果是左括号，入栈；
      如果是数字，输出；
      如果是+-，弹出并输出堆栈中的运算符，直到数字、左括号、空，然后再将此符号推入栈中；
      如果是*÷，弹出并输出栈顶x或÷运算符，直到符号+\-、数字、左括号、空，然后再将此符号推入栈中；
      如果是右括号，弹出并输出堆栈中直到左括号的所有字符；
      最后弹出并输出堆栈中剩下的字符。
      */
      // const OPERATIONS = ['+', '-', 'x', '÷']
      // const SYMBOLS = ['(', ')', ...OPERATIONS]
      const NUMBERS = /^\d*\.\d+|\d+$/g
      const P1 = /^[+-]$/g
      // 拆分算数表达式
      // let fixinExpArr = [...this.expression]
      let fixinExpArr = this.expression.match(/\d*\.\d+|\d+|[()x÷+-]/g)
      console.log('表达式字符数组-中缀：' + fixinExpArr)
      this.suffixExpArr = []
      this.stack = []
      for (let f of fixinExpArr) {
        if (f.match(NUMBERS)) {
          // 如果是数字，直接输出
          this.suffixExpArr.push(f)
        } else {
          let spop
          switch (f) {
            case '(': // 左括号，直接入栈
              this.stack.push(f)
              break
            case '+':
            case '-': // 加减符号，将栈中一直到数字的运算符都输出，然后入栈
              spop = this.stack.pop()
              while (spop !== undefined && !spop.match(NUMBERS) && spop !== '(') {
                console.log('/,,,,')
                this.suffixExpArr.push(spop)
                spop = this.stack.pop()
              }
              if (spop !== undefined) {
                this.stack.push(spop)
              }
              this.stack.push(f)
              break
            case 'x':
            case '÷':
              spop = this.stack.pop()
              while (spop !== undefined && !spop.match(NUMBERS) && !spop.match(P1) && spop !== '(') {
                this.suffixExpArr.push(spop)
                spop = this.stack.pop()
              }
              if (spop !== undefined) {
                this.stack.push(spop)
              }
              this.stack.push(f)
              break
            case ')':
              spop = this.stack.pop()
              while (spop !== '(') {
                this.suffixExpArr.push(spop)
                spop = this.stack.pop()
              }
              break
          }
        }
      }
      let spop = this.stack.pop()
      while (spop !== undefined) {
        this.suffixExpArr.push(spop)
        spop = this.stack.pop()
      }
      // this.result = this.suffixExpArr.join('')
    },
    splite (exp) { // 分割算数表达式为字符串数组
      // do ..
    }
  }
}
</script>

<style scoped>
#calculator{
  margin: 0 auto;
  width: 400px;
  height: 700px;
  color:darkgray;
  border: 2px solid;
}
#display{
  width: 100%;
  height: 35%;
  display: table;
}
#expression{
  display: table-cell;
  padding: 10px;
  width: 100%;
  height: 50%;
  font-size: 60px;
  text-align: right;
  vertical-align: middle;
}
#result {
  display: table-cell;
  padding: 10px;
  width: 100%;
  height: 50%;
  font-size: 30px;
  text-align: right;
  vertical-align: middle;
}
#menu{
  display: table;
  width: 100%;
  height: 10%;
  background-color:aliceblue;
}
#history{
  display: table-cell;
  width: 50%;
  height: 100%;
  text-align: left;
  vertical-align: middle;
  padding-left: 10px;
}
#delete{
  display: table-cell;
  width: 50%;
  height: 100%;
  text-align: right;
  vertical-align: middle;
  padding-right: 10px;
}
#buttons{
  display: table;
  width: 100%;
  height: 55%;
  font-size: 40px;
}
.btn_line{
  display: table-row;
  width: 100%;
  height: 20%;
  display: table;
}
.btn{
  display:table-cell;
  width: 25%;
  height: 100%;
  vertical-align: middle;
}
.table-tr {
  display:table-row;
}
.table-td {
  display: table-cell;
}
.table {
  display: table;
}

</style>
