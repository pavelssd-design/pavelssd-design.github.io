$(document).ready(function () {
    $.when(
      $.get('./assets/text_main.json'),
      $.get('./assets/text_comments.json'),
      $.get('./assets/text_question.json'),
      $.get('./assets/text_product.json')
    ).done(function(mainData, commentsData, questionData, productData) {
      renderText(mainData[0]);
      renderText(commentsData[0]);
      renderQuestions(questionData[0]);
      changeInputPlaceholder();

      renderSlider(productData[0].slider)
      renderChooseProduct(productData[0].imglist)

      $.get('./assets/text_global.json', function(data) {
        renderText(data);
        changeHTMLTITLE(data.html_title)
        changePrefillFlag(data.country_flag_url)
        changePrefillTimet(data.prefill_timer_color, data.prefill_timer_bg)
        changeEmail(data.country_email)
      }).done(function(){
        changePrefillInputs()
        startOLDScript()
        activateChooseProduct()
      });
});

    function renderSlider(arr){
      arr.map(el => {
        $('.js-slider-for').append(`<img src="${el}" alt="" />`)
        if(arr.length !== 1) $('.js-slider-nav').append(`<img src="${el}" alt="" />`)
        else $('.js-slider-nav').remove()
      })
    }

    function renderChooseProduct(obj){
      if(obj.length == 1){
        $('.title-inner').remove()
        $('.con-prize-outter ul.colors').remove()
        $('.product-image').prop('src', `${obj[0].url}`)
        $('.product.chosen-item1').prop('src', `${obj[0].url}`)
      }
      else{
        obj.map((el, index) => {
          if(index == 0){
            $('.product-image').prop('src', `${el.url}`)
            $('.product.chosen-item1').prop('src', `${el.url}`)
            $('#selectedColor').text(el.selected_title)
          }

          $('.con-prize-outter ul.colors').append(`
            <li 
              class="colors__item ${index == 0 ? '--active' : ''}" 
              data-selected="${el.selected_title}" 
              data-image="./assets/${el.url}"
              style="background: linear-gradient(
                45deg,
                ${el.color_circle_0} 0%,
                ${el.color_circle_0} 50%,
                ${el.color_circle_1} 50%,
                ${el.color_circle_1} 100%
              );"
              >
            </li>
          `)
        })
      }
    }

    function renderText(obj){
        for (let key in obj) {
            $(`span#${key}`).replaceWith(obj[key])
        }
    }
    function renderQuestions(obj){
        const title = obj.title;
        const questionsListArr = obj.question_list;
        let $verifContentBlock = $("#verif-content");
        const questionsListArrCount = questionsListArr.length - 1
        
        questionsListArr.map((el, index)=>{
            if(index !== questionsListArrCount) $verifContentBlock.before(questionsBlock(el, title))
            else $verifContentBlock.before(questionsBlock(el, title, true))
        })
    }
    function questionsBlock(obj, title, type){
        let $innQ = $('<div>', {class:"inn-q animate__animated"})

        let $topTitle = `
                <h2>
                    <span class="qeus-head">${title}</span><br><br>
                    <small class="qeus-numb">${obj.question_number}</small><br>
                    <b class="qeus-text">${obj.question}</b>
                </h2>
        `

        $innQ.append($topTitle)
        $innQ.append(questionsList(obj.answers, type))

        return $innQ
        
    }
    function questionsList(obj, type){
        let $innQuestion = $("<div>",{class: "inn-question"})

        obj.map(el=>{
            $innQuestion.append(`<button class="inn-q-select qeus-text">${el}</button>`)
        })

        if(type){
            $innQuestion.find('button').on('click', function(){
                drawloader()
            })
        }

        return $innQuestion
    }
    var states = [
    document.getElementById('inn-q-progress-state1'),
    document.getElementById('inn-q-progress-state2'),
    document.getElementById('inn-q-progress-state3'),
    document.getElementById('inn-q-progress-state4'),
  ],
  dones = [
    document.getElementById('inn-q-progress-dones2'),
    document.getElementById('inn-q-progress-dones3'),
    document.getElementById('inn-q-progress-dones4'),
  ],
  loadImg = document.getElementById('inn-q-progress-loading'),
  loadBgCol = document.getElementById('content-changeCol');

function drawloader() {
  setTimeout(function () {
    (dones[0].style.display = 'block'),
      dones[0].classList.add('animate__animated'),
      dones[0].classList.add('animate__fadeInUp');
  }, 1500),
    setTimeout(function () {
      (states[0].style.display = 'block'),
        states[0].classList.add('animate__animated'),
        states[0].classList.add('animate__fadeOut'),
        (dones[0].style.color = '#34ae21'),
        loadImg.classList.add('animate__animated'),
        loadImg.classList.add('animate__bounceIn'),
        (loadBgCol.style.backgroundImage =
          'linear-gradient(to right, #e3ffdf,#fff,#fff,#fff,#e3ffdf)');
    }, 2300),
    setTimeout(function () {
      (states[0].style.display = 'none'),
        (states[1].style.display = 'block'),
        states[1].classList.add('animate__animated'),
        states[1].classList.add('animate__fadeIn'),
        dones[0].classList.add('animate__animated'),
        dones[0].classList.add('animate__fadeOut'),
        loadImg.classList.remove('animate__animated'),
        loadImg.classList.remove('animate__bounceIn'),
        (loadBgCol.style.backgroundImage = 'linear-gradient(to right, #fff,#fff,#fff,#fff,#fff)');
    }, 3500),
    setTimeout(function () {
      (dones[0].style.display = 'none'),
        (dones[1].style.display = 'block'),
        dones[1].classList.add('animate__animated'),
        dones[1].classList.add('animate__fadeInUp');
    }, 5500),
    setTimeout(function () {
      (states[1].style.display = 'block'),
        states[1].classList.add('animate__animated'),
        states[1].classList.add('animate__fadeOut'),
        (dones[1].style.color = '#34ae21'),
        loadImg.classList.add('animate__animated'),
        loadImg.classList.add('animate__bounceIn'),
        (loadBgCol.style.backgroundImage =
          'linear-gradient(to right, #e3ffdf,#fff,#fff,#fff,#e3ffdf)');
    }, 6300),
    setTimeout(function () {
      (states[1].style.display = 'none'),
        (states[2].style.display = 'block'),
        states[2].classList.add('animate__animated'),
        states[2].classList.add('animate__fadeIn'),
        dones[1].classList.add('animate__animated'),
        dones[1].classList.add('animate__fadeOut'),
        loadImg.classList.remove('animate__animated'),
        loadImg.classList.remove('animate__bounceIn'),
        (loadBgCol.style.backgroundImage = 'linear-gradient(to right, #fff,#fff,#fff,#fff,#fff)');
    }, 7500),
    setTimeout(function () {
      (dones[1].style.display = 'none'),
        (dones[2].style.display = 'block'),
        dones[2].classList.add('animate__animated'),
        dones[2].classList.add('animate__fadeInUp');
    }, 9500),
    setTimeout(function () {
      (states[2].style.display = 'block'),
        states[2].classList.add('animate__animated'),
        states[2].classList.add('animate__fadeOut'),
        (dones[2].style.color = '#34ae21'),
        loadImg.classList.add('animate__animated'),
        loadImg.classList.add('animate__bounceIn'),
        (loadBgCol.style.backgroundImage =
          'linear-gradient(to right, #e3ffdf,#fff,#fff,#fff,#e3ffdf)');
    }, 10300),
    setTimeout(function () {
      (states[2].style.display = 'none'),
        (states[3].style.display = 'block'),
        states[3].classList.add('animate__animated'),
        states[3].classList.add('animate__fadeIn'),
        dones[2].classList.add('animate__animated'),
        dones[2].classList.add('animate__fadeOut'),
        loadImg.classList.remove('animate__animated'),
        loadImg.classList.remove('animate__bounceIn'),
        (loadBgCol.style.backgroundImage = 'linear-gradient(to right, #fff,#fff,#fff,#fff,#fff)');
    }, 11500),
    setTimeout(function () {
      document.getElementById('verif-content').classList.add('animate__animated'),
        document.getElementById('verif-content').classList.add('animate__fadeOut');
    }, 13500),
    setTimeout(function () {
      (document.getElementById('verif-content').style.display = 'none'),
        (document.getElementById('prize-content-1').style.display = 'block'),
        document.getElementById('prize-content-1').classList.add('animate__animated'),
        document.getElementById('prize-content-1').classList.add('animate__fadeIn');
    }, 14000),
    setTimeout(function () {
      (document.getElementById('prize-content-2').style.display = 'block'),
        document.getElementById('prize-content-2').classList.add('animate__animated'),
        document.getElementById('prize-content-2').classList.add('animate__fadeIn'),
        (document.getElementById('nothing-id').style.display = 'none'),

      // Scroll to prize-content-2
      document.getElementById('prize-content-2').scrollIntoView({ behavior: 'smooth' });
      let qty = 35;
      const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
      const qtyInterval = setInterval(() => {
        // qty == 2 ? clearInterval(qtyInterval) : qty = qty - random(3, 8);
        // qty - random(1, 3) <= 2 ? clearInterval(qtyInterval) : (qty = qty - random(3, 8));
        qty = qty - random(3, 8)
        $('#qty').text(qty);
        if (qty <= 0) {
          $('#qty').text(1);
          clearInterval(qtyInterval);
        }


      }, 5000);
    }, 15000);
}



  
function startOLDScript(){


var answers = document.querySelectorAll('.inn-q-select'),
  lastQnum = document.querySelectorAll('#inn-last-q-item .inn-q-select').length;


  setTimeout(() => {
    $('.main-slider').removeClass('invisible')
    $('.loader').hide()
  }, 1000)
  $(".js-slider-for").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: !1,
    fade: !0,
    asNavFor: ".js-slider-nav",
  }),
  $(".js-slider-nav").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: ".js-slider-for",
    dots: !1,
    focusOnSelect: !0,
    prevArrow:
      "<button type='button' class='slick-prev slick-arrow'><img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAAA9ElEQVRIie3WMUpDQRAG4A9BrOwEwcrCA9hYWqVKq43ewXgJ4yGs9Ao5gJJGUPEMgoFUYieCKHkWz8DbJaCoO49Afth2P2bZnR0WmZOs4hbV17qKQJcwaKAV7iPg0wx9xlZpdB+TBvqOTml0Gy/Sao9Ko+sYZeh5aXQZwwy9xkpp+CxDH9UnUDTHGfqKndJoR31rp+gEB6XRTTxJqz0pjcJdhg7UHevP+W6T6j+Q32TWUfej8F28SS/XYRTe08JzmiZvIGNsRMCttUxYw0OGX0TAzP4We1H4nnQQ+EA3Cu9Lqw4ZfWhx2KMeb28a8GUUvMiP8wl+P2e4Vi0+4AAAAABJRU5ErkJggg==\"></button>",
    nextArrow:
      "<button type='button' class='slick-next slick-arrow'><img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAAA7klEQVRIie3WMUpDQRAG4I+AWNkJgpWFB7DQ0iqVrTZ6B5NLGA9hpVfIARJsAgl4BkHBSuwkIBFj8RT2LSkE2XkJ5Ictl49dZmeHdZYsQ8x/1gRbUfBDAs/RRysC3sNrhvciYDjGRwJ/4SIK76ifeoqjKPwmw1+wGwFv4D7DR9iMwLfxmOF3ETAc4D3DO1H4qaq6f+FPnEThPfVTv2E/Am6pOlmKT/6yaWVzrYGrPlMvrhnapdFFz+myNLqD5wy9LY021jLzT+JJdQNF083QKQ5Lo21V1aaDwHlpdNHoc1UapcFhb5CgY4Hj7Tr/zjfcW2a3eoiKgwAAAABJRU5ErkJggg==\"></button>",
  })

  $('.colors__item').click(function () {
    let t = $(this);
    $('.colors__item').each(function () {
      $(this).removeClass('--active');
    });
    t.addClass('--active');
    $('#selectedColor').text(t.data('selected'));
  });

  $('.sizes>li').click(function () {
    $('.sizes>li').each(function () {
      $(this).removeClass('--active');
    });
    $(this).addClass('--active');
  });
  $('.gender>li').click(function () {
    $('.gender>li').each(function () {
      $(this).removeClass('--active');
    });
    $(this).addClass('--active');
  });


$('#textarea').on('keyup', function () {
  $(this).val().length
    ? $('#commentBtn').removeAttr('disabled')
    : $('#commentBtn').attr('disabled', 'disabled');
}),
  $('#commentBtn').on('click', function () {
    $('#commentsList').prepend(
      '<li class="comment__item"><div class="comment__container">\n      <div class="comment__avatar"><img src="./assets/unnamed.png" alt="" /></div>\n       <div class="comment__content">\n <div class="comment__name">User</div>\n<div class="comment__text">\n' +
        $('#textarea').val() +
        ' </div>\n </div>\n       <div class="comment__time">\n <span>1 min</span>\n <span>like</span>\n <span>comment</span>\n </div>\n     </div></li>',
    ),
      $('#textarea').val(''),
      $('#commentBtn').attr('disabled', 'disabled');
  });

function toNext(e) {
  '1' == e.value &&
    (

    document.getElementsByClassName('first-step')[0].classList.add('animate__animated'),
    document.getElementsByClassName('first-step')[0].classList.add('animate__fadeOut'),
    document.getElementsByClassName('comments')[0].classList.add('animate__animated'),
    document.getElementsByClassName('comments')[0].classList.add('animate__fadeOut'),
    document.getElementsByClassName('con-body-ln2')[0].classList.add('animate__fadeOut'),
    document.getElementsByClassName('con-body-ln2')[0].classList.add('animate__fadeOut'),
    setTimeout(function () {
      document.getElementsByClassName('first-step')[0].style.display = 'none';
      document.getElementsByClassName('comments')[0].style.display = 'none';
      document.getElementsByClassName('con-body-ln2')[0].style.display = 'none';
    }, 500));
  var t = e.parentElement.parentElement,
    a = t.nextElementSibling;
  t.classList.add('animate__animated'),
    t.classList.add('animate__fadeOut'),
    setTimeout(function () {
      t.style.display = 'none';
    }, 490),
    setTimeout(function () {
      a.classList.add('animate__animated'),
        a.classList.add('animate__fadeIn'),
        (a.style.display = 'block');
    }, 490);
}
function assignClickHandlers() {
  answers = document.querySelectorAll('.inn-q-select');
  for (var i = 0; i < answers.length; i++) {
    if (i < answers.length - lastQnum) {
      answers[i].onclick = function () {
        toNext(this);
      };
    } else {
      answers[i].onclick = function () {
        toNext(this);
        setTimeout(function () {
          document.getElementById('content-changeCol').style.backgroundImage = 'none';
        }, 600);
      };
    }
  }
}

  document.getElementById('btn-claim').onclick = function () {
  var e = document.getElementById('modal-prize');
  e.classList.add('mod-con-bg');
  e.children[0].classList.add('mod-con-inn');
  e.classList.remove('hidden');
  var t = document.getElementById('prize-ln2-desc').innerText;
  assignClickHandlers(); // Make sure handlers are assigned after DOM manipulation
};


assignClickHandlers(); // Initial assignment of click handlers

}


function changeInputPlaceholder(){
  let $blockTextForTextarea = $('#custom-textarea-text-for-placeholder');
      text = $blockTextForTextarea.text().trim();

  $('textarea#textarea').prop('placeholder', text);
  $blockTextForTextarea.remove()

}
function changeHTMLTITLE(title){
  $('title').text(title)
}
function changePrefillFlag(url){
  $('#userDataForm .flag').css('background-image', `url('${url}')`);
}
function changePrefillTimet(color, bg){
  $('#app_countdown_wrap').css('color', `${color}`);
  $('#app_countdown_wrap').css('background-color', `${bg}`);
}

function changeEmail(email){
  $('#email-hint-list').append(`
    <li class="email" data-value="gmail.com">@gmail.com</li>
    <li class="email" data-value="outlook.com">@outlook.com</li>
    <li class="email" data-value="live.com">@live.com</li>
    <li class="email" data-value="orange.${email}">@orange.${email}</li>
    <li class="email" data-value="gmail.${email}">@gmail.${email}</li>
    <li class="email" data-value="hotmail.${email}">@hotmail.${email}</li>
    <li class="email" data-value="live.${email}">@live.${email}</li>
    <li class="email" data-value="sfr.${email}">@sfr.${email}</li>
    <li class="email" data-value="yahoo.${email}">@yahoo.${email}</li>
    <li class="email" data-value="gmx.${email}">@gmx.${email}</li>
    <li class="email" data-value="wanadoo.${email}">@wanadoo.${email}</li>
    <li class="email" data-value="neuf.${email}">@neuf.${email}</li>
    <li class="email" data-value="free.${email}">@free.${email}</li>
    `)
}

function changePrefillInputs(){


    let $inputTitle = $('input[name="item"]'),
        $inputIMG = $('input[name="image"]'),
        $productPrefill = $('.product.chosen-item1'),
        $globalTitle = $('.hero__title'),
        globalTitleText = $globalTitle.text(); 
        
    $inputIMG.attr('value', $productPrefill.prop('src'));
    $inputTitle.attr('value',$globalTitle.text());

    $('ul.colors .colors__item').on('click', function(e){
        let $this = $(this),
            img = $this.attr('data-image'),
            title = $this.attr('data-selected')

        $productPrefill.attr('src',img)
        $globalTitle.text(globalTitleText + ": " + title)
        
        
        $inputIMG.attr('value', $productPrefill.prop('src'))
        $inputTitle.attr('value', globalTitleText + ": " + title)
        
    })

}

function activateChooseProduct(){
  const colorItems = document.querySelectorAll('.colors__item') ; 
  const productImage = document.querySelector('.product-image') ; 
  colorItems.forEach(item => { item.addEventListener('click', () => { colorItems.forEach(el => el.classList.remove('--active')) ; item.classList.add('--active') ; const newImageSrc = item.getAttribute('data-image') ; productImage.setAttribute('src', newImageSrc) ; }) ; }) ;
}


})

