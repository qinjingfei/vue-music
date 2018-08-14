export function hasClass(el, className) {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)') // className 开头和结尾可以有空格
    return reg.test(el.className)
  }

export function addClass(el, className) {
  if (hasClass(el, className)) return
  let newClass = el.className.split(' ') // 根据‘ ’拆成数组
  newClass.push(className) // 把新的className加入数组
  el.className = newClass.join(' ') // 把数组拼成字符串
}