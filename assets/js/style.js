"use strict";

window.onload = function () {
  var body = document.querySelector('body'),
      hexInput = document.getElementById('hex'),
      hslInput = document.getElementById('hsl'),
      rgbInput = document.getElementById('rgb'),
      boxGenerator = document.querySelectorAll('.box-generator')[0],
      boxResult = document.querySelectorAll('.box-result')[0],
      boxGeneratorLayer1 = boxGenerator.querySelector('.box-generator--layer-1'),
      boxGeneratorLayer2 = boxGenerator.querySelector('.box-generator--layer-2'),
      step = 1;
  /* Do Animation*/

  setTimeout(function () {
    boxGenerator.classList.remove('is-grow-up');
    boxResult.classList.remove('is-grow-up');
  }, 300);
  /* Append Box */

  function appendBoxItem() {
    for (var i = 0; i < 100 / step; i++) {
      document.querySelector('.box-result').insertAdjacentHTML('beforeend', '<div class="box-result--item">' + '<div class="percentage"></div>' + '<div class="item-flex">' + '<div class="hex"></div>' + '<button type="button" class="btn btn-sm btn-copy" data-toggle="tooltip" data-placement="top" title="Copied!">' + '<i class="typcn typcn-book"></i>' + '</button>' + '</div>' + '<div class="box-result--item-background"></div>' + '</div>');
    }
  }

  appendBoxItem();
  /* For quick copy-paste */

  document.querySelectorAll('input').forEach(function (el, index) {
    el.addEventListener('focus', function (event) {
      this.select();
    });
  });
  document.querySelectorAll('.btn-copy').forEach(function (el, index) {
    el.addEventListener('click', function (event) {
      var hex = this.parentNode.querySelector('.hex');
      if (hex == '') return;
      copyToClipboard(hex);
    });
  });
  /* Tooltip */

  document.querySelectorAll('[data-toggle="tooltip"]').forEach(function (el, index) {
    el.addEventListener('click', function (event) {
      var pos = el.getBoundingClientRect();
      body.insertAdjacentHTML('beforeend', '<div class="tooltip tooltip-inner" style="position: absolute; top: 0; left: 0; will-change: transform; transform: translate3d(' + (pos.left + window.scrollX) + 'px, ' + (pos.top + window.scrollY - 35) + 'px, 0);">' + el.getAttribute('title') + '</div>');
      body.querySelector('.tooltip').classList.add('open');
      el.classList.add('open');
      setTimeout(function () {
        body.querySelector('.tooltip').classList.remove('open');
        body.querySelector('.tooltip').classList.add('show');
      }, 10);
    });
  });

  window.onclick = function (event) {
    document.querySelectorAll('.tooltip:not(.open)').forEach(function (el, index) {
      body.querySelector('.tooltip').classList.remove('show');
      setTimeout(function () {
        document.querySelectorAll('[data-toggle="tooltip"]').forEach(function (el, index) {
          el.classList.remove('open');
        });
        body.removeChild(el);
      }, 300);
    });
  };

  window.addEventListener('resize', function () {
    document.querySelectorAll('[data-toggle="tooltip"]').forEach(function (el, index) {
      if (el.classList.contains('open')) {
        var pos = el.getBoundingClientRect();

        if (body.querySelector('.tooltip') != null) {
          // body.querySelector('.tooltip').style.top = (pos.top + window.scrollY - 35) + 'px'; 
          console.log(el.getBoundingClientRect());
          console.log(pos.left + window.scrollX);
          body.querySelector('.tooltip').style.transform = 'translate3d(' + (pos.left + window.scrollX) + 'px, ' + (pos.top + window.scrollY - 35) + 'px, 0)';
        }
      }
    });
  });
  /* Change color on every key input. */

  var ConvertHex = function ConvertHex(event) {
    this.validate(event);
    this.calculate(this.validate(event));
    this.printValue();
  };

  ConvertHex.prototype.validate = function (event) {
    var charCode = event.charCode,
        element = event.target,
        value = element.value,
        hex = value.replace(/#/, '');

    if (event.type == 'keypress') {
      if (charCode != 0) {
        // Allow A-F (Upercase & Lowercase) and Number
        if ((charCode < 48 || charCode > 57 && charCode < 65 || charCode > 70 && charCode < 97 || charCode > 102) && charCode != 35) {
          event.preventDefault();
          element.classList.add('is-invalid');
        } else {
          element.classList.remove('is-invalid');
        }
      }
    } // if (value.length === 1 && value !== '#')  element.value = '#' + value;
    // if (hex.length == 3) hex = hex + hex;


    if (value.length === 1 && value !== '#') element.value = '#' + value;
    if (hex.length === 3) hex = hex + hex;
    if (hex.length === 0) element.value = '';
    return hex;
  };

  ConvertHex.prototype.calculate = function (value) {
    // Calculate
    var rgb = [],
        fail = false;

    if (value != '' || value != undefined) {
      for (var i = 0; i < 6; i += 2) {
        rgb.push(parseInt(value.substr(i, 2), 16));
        fail = fail || rgb[rgb.length - 1].toString() === 'NaN';
      }

      rgbInput.value = fail ? '' : 'rgb(' + rgb.join(',') + ')';
      hslInput.value = fail ? '' : 'hsl(' + rgbToHsl.apply(null, rgb).join(',') + ')'; // Add Color to Box Generator

      boxGenerator.style.backgroundColor = rgbInput.value;
      [boxGeneratorLayer1, boxGeneratorLayer2].forEach(function (element, index) {
        element.style.borderColor = rgbInput.value;
      });
    }
  };

  ConvertHex.prototype.printValue = function () {
    var result = hslInput.value;

    if (!result == '' && result == result) {
      var temp,
          originalResult,
          count,
          cutResult = [];
      temp = result.split(',').pop();

      for (var i = 0; i <= 100; i += step) {
        count = i.toString() + '%)';
        originalResult = result.split(',');
        originalResult.pop();
        temp = originalResult;
        temp.push(count.toString());
        cutResult.push(temp.join(','));
      }

      var i = 0;
      document.querySelectorAll('.box-result--item-background').forEach(function (item, index) {
        item.style.backgroundColor = cutResult[index];
        var color = item.style.backgroundColor,
            percentage = ((i += step) - step).toString() + '%',
            hex,
            r,
            g,
            b;
        color = color.substr(3).split(',');
        r = color[0].substr(1);
        g = color[1].substr(1);
        b = color[2].substr(1).slice(0, -1);
        hex = rgbToHex(r, g, b);
        item.parentNode.querySelector('.hex').innerHTML = hex;
        item.closest('.box-result--item').querySelector('.percentage').innerHTML = percentage;
      });
      boxResult.classList.remove('is-pending');
    } else {
      document.querySelectorAll('.box-result--item-background').forEach(function (item, index) {
        item.style.backgroundColor = '';
        item.parentNode.querySelector('.hex').innerHTML = '';
        item.closest('.box-result--item').querySelector('.percentage').innerHTML = '';
      });
      boxResult.classList.add('is-pending');
    }
  };

  function focusInput(event) {
    new ConvertHex(event);
  }
  /* Click function */


  hexInput.addEventListener('keypress', focusInput, false);
  hexInput.addEventListener('keydown', focusInput, false);
  hexInput.addEventListener('keyup', focusInput, false);
  hexInput.addEventListener('blur', focusInput, false);
  /* Function to convert rgb-to-hsl. */

  function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    var h,
        s,
        l = (max + min) / 2;

    if (max == min) {
      h = s = 0;
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;

        case g:
          h = (b - r) / d + 2;
          break;

        case b:
          h = (r - g) / d + 4;
          break;
      }

      h /= 6;
    } // return [(h*100+0.5)|0, ((s*100+0.5)|0) + '%', ((l*100+0.5)|0) + '%'];


    return [h = Math.floor(h * 360).toString(), s = Math.floor(s * 100).toString() + '%', l = Math.floor(l * 100).toString() + '%'];
  }
  /* Function to convert rgb-to-hex. */


  function byte2Hex(n) {
    var nybHexString = "0123456789ABCDEF";
    return String(nybHexString.substr(n >> 4 & 0x0F, 1)) + nybHexString.substr(n & 0x0F, 1);
  }

  function rgbToHex(r, g, b) {
    return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
  }
  /* Button Copy Click */


  function getSelectionText() {
    var selectedText = "";

    if (window.getSelection) {
      // all modern browsers and IE9+
      selectedText = window.getSelection().toString();
    }

    return selectedText;
  }

  function selectElementText(el) {
    var range = document.createRange(); // create new range object

    range.selectNodeContents(el); // set range to encompass desired element text

    var selection = window.getSelection(); // get Selection object from currently user selected text

    selection.removeAllRanges(); // unselect any user selected text (if any)

    selection.addRange(range); // add range to Selection object to select it
  }

  function copyToClipboard(element) {
    selectElementText(element);
    getSelectionText();
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
  }
};