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
        <div class="btn" id=""><span>()</span></div>
        <div class="btn" id=""><span>%</span></div>
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
      result: ''
    }
  },
  methods: {
    bounceIn (event) {
      let input = event.target.innerText
      this.expression = this.expression + input
      console.log(event.target.innerText)
      // 如果表达式合法,计算结果
      this.compute()
    },
    // 清除计算表达式
    clear (event) {
      this.expression = ''
    },
    // 表达式向后删除一格
    delete (event) {
      let expLength = this.expression.length
      this.expression = this.expression.substr(0, expLength - 1)
    },
    // 计算表达式的值
    compute () {
      // later...
      this.result = this.expression + '结果'
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
