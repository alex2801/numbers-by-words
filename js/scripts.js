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
    for (i = numbersNumArr.length - 3; i >= 0; i -= 3) {
        if (numbersNumArr[i]) {
            numbersNumArr[i] = " " + units[numbersNumArr[i]] + " hundred";
        } else {
            numbersNumArr[i] = "";
        }
    }
    for (i = numbersNumArr.length - 2, j = 3; i >= 0; i -= 3, j--) {
        if (numbersNumArr[i] === 1) {
            numbersNumArr[i] = " " + tens1[numbersNumArr[i + 1]] + orders[j];
            numbersNumArr[i + 1] = "";
        } else if (numbersNumArr[i] && numbersNumArr[i] !== 1) {
            numbersNumArr[i] = " " + tens2[numbersNumArr[i]];
            numbersNumArr[i + 1] = " " + units[numbersNumArr[i + 1]] + orders[j];
        } else if (numbersNumArr[i] === 0 && numbersNumArr[i + 1] !== 0) {
            numbersNumArr[i] = "";
            numbersNumArr[i + 1] = " " + units[numbersNumArr[i + 1]] + orders[j];
        }
    }
    for (i = 0; i < numbersStrArr.length; i++) {
        if (numbersNumArr[i] === 0) {
            numbersNumArr[i] = "";
        }
    }
    for (i = numbersNumArr.length - 1, j = 3; i >= 0; i -= 3, j--) {
        if (+numbersNumArr[i]) {
            numbersNumArr[i] = " " + units[numbersNumArr[i]] + orders[j];
        }
    }
    for (i = numbersNumArr.length - 3, j = 3; i >= 0; i -= 3, j--) {
        if (numbersNumArr[i] && numbersNumArr[i + 1] === '' && numbersNumArr[i + 2] === '') {
            numbersNumArr[i] = numbersNumArr[i] + " " + orders[j];
        }
    }
    var words = "";
    numbersNumArr.forEach(function(word) {
        words += word;
    });
    return words;
};

$(document).ready(function() {
  $("form#numbers").submit(function(event) {
      event.preventDefault();

      var result;
      var number = $("#number").val().trim();
      if (+number === 0 && number !== "") {
          result = 'zero';
      } else if (/^\d+$/g.test(number)) {
          result = transform(number);
      } else {
          alert('Enter a number less than the trillion, please!')
      }
      $(".input").text(number);
      $(".result").empty().text(result);
      $(":input").val("");
      $("#result").show();
  });
});