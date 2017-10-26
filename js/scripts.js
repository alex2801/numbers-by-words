var transform = function(number) {
    var units = {0:'', 1:'one', 2:'two', 3:'three', 4:'four', 5:'five', 6:'six', 7:'seven', 8:'eight', 9:'nine'};
    var tens1 = {0:'ten', 1:'eleven', 2:'twelve', 3:'thirteen', 4:'fourteen', 5:'fifteen', 6:'sixteen', 7:'seventeen', 8:'eighteen', 9:'nineteen'};
    var tens2 = {2:'twenty', 3:'thirty', 4:'forty', 5:'fifty', 6:'sixty', 7:'seventy', 8:'eighty', 9:'ninety'};
    var orders = [' billion', ' million', ' thousand', ''];
    var numbersStrArr = number.split(/\s*/);
    var numbersNumArr = [];
    for (var i = 0; i < numbersStrArr.length; i++) {
        numbersNumArr[i] = +numbersStrArr[i];
    }
    for (var j = numbersNumArr.length - 3; j >= 0; j -= 3) {
        if (numbersNumArr[j]) {
            numbersNumArr[j] = " " + units[numbersNumArr[j]] + " hundred";
        } else {
            numbersNumArr[j] = "";
        }
    }
    for (var k = numbersNumArr.length - 2, ko = 3; k >= 0; k -= 3, ko--) {
        if (numbersNumArr[k] === 1) {
            numbersNumArr[k] = " " + tens1[numbersNumArr[k + 1]] + orders[ko];
            numbersNumArr[k + 1] = "";
        } else if (numbersNumArr[k] && numbersNumArr[k] !== 1) {
            numbersNumArr[k] = " " + tens2[numbersNumArr[k]];
            numbersNumArr[k + 1] = " " + units[numbersNumArr[k + 1]] + orders[ko];
        } else if (numbersNumArr[k] === 0 && numbersNumArr[k + 1] !== 0) {
            numbersNumArr[k] = "";
            numbersNumArr[k + 1] = " " + units[numbersNumArr[k + 1]] + orders[ko];
        }
    }
    for (var n = 0; n < numbersStrArr.length; n++) {
        if (numbersNumArr[n] === 0) {
            numbersNumArr[n] = "";
        }
    }
    for (var m = numbersNumArr.length - 1, ko1 = 3; m >= 0; m -= 3, ko1--) {
        if (+numbersNumArr[m]) {
            numbersNumArr[m] = " " + units[numbersNumArr[m]] + orders[ko1];
        }
    }
    for (var p = numbersNumArr.length - 3, ko2 = 3; p >= 0; p -= 3, ko2--) {
        if (numbersNumArr[p] && numbersNumArr[p + 1] === '' && numbersNumArr[p + 2] === '') {
            numbersNumArr[p] = numbersNumArr[p] + " " + orders[ko2];
        }
    }
    var words = "";
    numbersNumArr.forEach(function(word) {
        words += word;
    });alert(numbersNumArr);
    return words;
};

$(document).ready(function() {
  $("form#numbers").submit(function(event) {
      event.preventDefault();

      var result;
      var number = $("#number").val().trim();
      if (number === '0') {
          result = 'zero';
      } else {
          result = transform(number);
      }
      $(".result").text(result);
      //$(":input").val("");
      $("#result").show();
  });
});