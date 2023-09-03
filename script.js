$(document).ready(function(){
    $('.slick-slider').slick({
        dots: true,
        infinite: false,
        mobileFirst:true,
        responsive: [    
        {
            breakpoint: 768,
            settings: {
                arrows: false,
                slidesToShow: 3,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 570,
            settings: {
                arrows: false,
                slidesToShow: 2,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 0,
            settings: {
                arrows: false,
                slidesToShow: 1,
                slidesToScroll: 1,
            }
        },
        ]
    });   
    
});


$('.intro__menu-button').click(function(){
    $('.popup').removeClass('notActive');
    $('body').css('overflow','hidden');
})

$('.popup__exet-closeModal').click(function(){
    $('.popup').addClass('notActive');
    $('body').css('overflow','visible');
})

$('.popup__menu-link').click(function(){
    $('.popup').addClass('notActive');
    $('body').css('overflow','visible');
})