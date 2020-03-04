function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
  let bracketsArr = expr.match(/[()]/g);

  if (bracketsArr) {
    let bracketsStr = bracketsArr.join('');
    let length;

    do {
      length = bracketsStr.length;
      bracketsStr = bracketsStr.replace(/\(\)/g, '');
    } while (length !== bracketsStr.length);

    if (bracketsStr.length) throw 'ExpressionError: Brackets must be paired';
  }

  let exprArr = expr.match(/[()\*\/+-]|\d+/g);

  while (exprArr.includes('(')) {
    let indexСloseBr = exprArr.indexOf(')');
    let indexOpenBr = exprArr.lastIndexOf('(', indexСloseBr);

    exprArr.splice(
      indexOpenBr,
      indexСloseBr - indexOpenBr + 1,
      order(exprArr.slice(indexOpenBr + 1, indexСloseBr))
    );
  }

  return order(exprArr);

  function order(array) {
    let orderArr = array;

    while (orderArr.length > 1) {
      let index;
      let indexMul = orderArr.indexOf('*');
      let indexDiv = orderArr.indexOf('/');

      if (indexMul !== -1 || indexDiv !== -1) {
        if ((indexMul < indexDiv) && (indexMul !== -1) || (indexDiv === -1)) {
          index = indexMul;
        } else {
          index = indexDiv;
        }
      } else {
        let indexPlus = orderArr.indexOf('+');
        let indexMinus = orderArr.indexOf('-');

        if ((indexPlus < indexMinus) && (indexPlus !== -1) || (indexMinus === -1)) {
          index = indexPlus;
        } else {
          index = indexMinus;
        }
      }

      orderArr.splice(index - 1, 3, сalc(orderArr.slice(index - 1, index + 2)));
    }

    return orderArr[0]
  }

  function сalc(arr) {
    switch (arr[1]) {
      case '*':
        return arr[0] * arr[2];

      case '/':
        if (+arr[2] === 0) throw 'TypeError: Division by zero.';
        return arr[0] / arr[2];

      case '+':
        return +arr[0] + +arr[2];

      case '-':
        return arr[0] - arr[2];

      default:
        return ''
    }
  }
}

module.exports = {
    expressionCalculator
}
