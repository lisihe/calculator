let splitExp = /[()*÷+-]/g
let splitExp2 = /\d*\.\d+|\d+/g
let split = /\d*\.\d+|\d+|[()*÷+-]/g
let exp = '((11+22)*33÷44-(55)+1.24-023)'
let tempArr = [...exp]
let arr = exp.match(split)
let sarr = exp.match(splitExp)
console.log(arr)
console.log(sarr)