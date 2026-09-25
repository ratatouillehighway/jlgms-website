$(document).ready(function () {

      // 스크롤 모션
      AOS.init({
        once: false,
        mirror: false,
      });
      

      
  // 셀렉트

  (function () {
    $('.select-box').each(function (index, item) {
      let txt = $(item).find('.selected').text();
      $(item).find('.select').text(txt);
    });

    $(document).on('click', '.select-btn', function () {
      let tg = $(this).closest('.select-box').find('.option');

      if (!$(this).hasClass('active')) {
        $('.select-box .option').not(tg).slideUp(200).closest('.select-box').find('.select-btn').removeClass('active').closest('.select-wrap').removeClass('z-index-100');
        $(this).addClass('active').closest('.select-wrap').addClass('select-up');
        tg.slideDown(200);

        return false;
      }
      else {
        tg.slideUp(200);
        $(this).removeClass('active');
        let selectTimer = setTimeout(function () {
          $(this).closest('.select-wrap').removeClass('select-up');
          clearTimeout(selectTimer);
        }, 200)
        return false;
      }
    });

    $(document).on('click', '.option li, option', function () {
      let txt = $(this).text();
      let tg = $(this).addClass('selected').siblings().removeClass('selected').closest('.select-box').find(".select");

      $(this).closest('.select-box').find('.select-btn').removeClass('active');

      if (tg.prop("tagName") === "SPAN") {
        tg.text(txt);
      } else if (tg.prop("tagName") === "input") {
        tg.val(txt)
      }

      $(this).closest('.option').slideUp().prev('.select').removeClass('active')
      // return false;
    });

    $(document).on('click', function (e) {
      let tg = e.target;
      if (tg.closest('.select-box') === null) {
        $('.option').slideUp().closest('.select-box').find('.select-btn').removeClass('active');
      }
    });
  })();

      //탭
      (function () {
        $('.tab a').click(function () {
            let id = $(this).attr('data-img');

            $(this).closest('li').addClass('on').siblings().removeClass('on');
            $(id).removeClass('d-none').siblings().addClass('d-none');
        });
    })();

    (function () {
      $('.tab a').click(function () {
          let id = $(this).attr('data-txt');

          $(this).closest('li').addClass('on').siblings().removeClass('on');
          $(id).removeClass('d-none').siblings().addClass('d-none');
      });
  })();

  (function () {
    $('.tab2 a').click(function () {
        let id = $(this).attr('data-card');

        $(this).closest('li').addClass('on').siblings().removeClass('on');
        $(id).removeClass('d-none').siblings().addClass('d-none');
    });
})();

      //페이지네이션
  $(function () {
    let max = 3;
    let paging = $('.pagination li');

    if (max < paging.length) {
      $('.pagination .start-btn,.pagination .prev-btn').removeClass('des');
    }

    paging.click(function () {
      $(this).addClass('active').siblings().removeClass('active');
    })
  });


    //모달 250422
    (function () {

      $('.open-btn').click(function () {
        let data_id = $(this).closest('.modal-open').attr('data-id');
        $(data_id).removeClass('d-none');
  
        if ($('.modal-open').hasClass('award-wrap')) {
          $('.award-modal .figure img').attr('src',  $(this).closest('.modal-open').find('.cer-img>img').attr('src'));
        }
      });
  
      $('.modal-close-btn').click(function () {
        $(this).closest('.modal-wrap').addClass('d-none');
        $('.modal-open').removeClass('active');
        $('.award-modal .figure img').attr('src', "")
      });
  
    })();

    //파일 첨부

  $('.file-add-btn').click(function () {
    $('.file-input').trigger('click');
  });
  $('.file-input').change(function () {
    let tg = $(this).closest('.file-box');
    let file = $(tg).find('[type="file"]').val();
    $(tg).find('.file-data-box').text(file.substring(file.lastIndexOf("\\") + 1));
  });

  var thumbsSlider = new Swiper(".slider-type2", {
    loop: 'true',
    speed: 1000,
    centeredSlides: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    spaceBetween: 20,
    breakpoints: {
      0: {
        slidesPerView: 1.2,
        spaceBetween: 14,
      },
      768: {
        slidesPerView: 1.3,
      },
      1024: {
        slidesPerView: 1.4,
      },
      1025: {
        slidesPerView: 1.5,
      },
      1389: {
        slidesPerView: 1.5
      },
      1921: {
        slidesPerView: 1.1
      },
    },
    // touchRatio: 0,

  });

  //에디터 빈 태그
  (function () {
    let tag=$('.view-body> *');
    if(tag.eq(0).text()=="" || tag.eq(0).find('>*').length===0){
      tag.eq(0).remove();
    }
  })();

  const removedMenuLabels = ['Q&A', '뉴스', '다운로드', '홍보영상', 'VISION 2030', '조직도'];
  $('.gnb a, .sub-nav a, .sub-nav button').filter(function () {
    return removedMenuLabels.indexOf($(this).text().trim()) !== -1;
  }).closest('li').remove();

})