window.addEventListener('DOMContentLoaded', () => {

// code from theme.liquid
  $(document).ajaxComplete(function (event, xhr, settings) {
    if (settings.url === "https://zip.appjetty.com//appjetty-zipcode") {
      const estimateDay = $.parseJSON(xhr.responseText);
      //console.log("estimate",estimateDay.estimated_day);
      const todayDate = new Date();
      let deliveryDate = new Date();
      deliveryDate.setDate(todayDate.getDate() + parseInt(estimateDay.estimated_day));
      date = deliveryDate.toString().split(" ");
      $('.estimation_msg .estimated_days').html("Order Now & Get it by " + date[0] + ", " + date[1] + " " + date[2]);
      $('.success_msg').html("<span>Free Shipping in India for orders above Rs 499</span>" + "<span>Easy 15 days return available</span>");
    }
    if (settings.url.includes("/apps/ssw/lite2/fave?")) {
      $('.ssw-link-fave-menu').trigger('click');
    }
  });

  // code from theme.liquid
  $('.mobile-navigation-drawer .navigation__tier-2 .navigation__children-toggle').trigger('click');

  // code from footer.liquid
  var width = $(window).width();
    if (width <= 480) {
      setTimeout(function() {
        $("#pagefooter .accordion .heading-1").trigger('click');
      },100);
    }
    $(".accordion_head").click(function () {
      if ($('.accordion_body').is(':visible')) {
        $(".accordion_body").slideUp(300);
        $(".plusminus").html('<img src="//cdn.shopify.com/s/files/1/0796/1959/files/Add_Plus.png?v=1651733780" width="24" height="24" >');
      }
      if ($(this).next(".accordion_body").is(':visible')) {
        $(this).next(".accordion_body").slideUp(300);
        $(this).children(".plusminus").html('<img src="//cdn.shopify.com/s/files/1/0796/1959/files/Add_Plus.png?v=1651733780" width="24" height="24" >');
      } else {
        $(this).next(".accordion_body").slideDown(300);
        $(this).children(".plusminus").html('<img loading="lazy" src="https://cdn.shopify.com/s/files/1/0796/1959/files/Add_Minus.png?v=1651733780" width="24" height="24" >');
      }
    });

  // code from theme.liquid
  function initFreshChat() {
    window.fcWidget.init({
      	 token: "9ae8f970-1669-4e10-b1d3-ffcda9112212",
	 host: "https://kushalsretailprivatelimited-org.freshchat.com"
    });
  }
  function initialize(i,t){var e;i.getElementById(t)?
  initFreshChat():((e=i.createElement("script")).id=t,e.async=!0,
  e.src="https://kushalsretailprivatelimited-org.freshchat.com/js/widget.js",e.onload=initFreshChat,i.head.appendChild(e))}
  function initiateCall(){initialize(document,"Freshchat-js-sdk")}
  window.addEventListener?window.addEventListener("load",initiateCall,!1):
  window.attachEvent("load",initiateCall,!1);

  // scroll down for pdp
  $("#view_similar").click(function() {
      $('html,body').animate({                                                         
          scrollTop: $(".section-product-recommendations").offset().top-50},
          900);
  });

    jQuery(".CT_link-dropdown__button").click(function(){
      if(jQuery(".ct_fil_shade").hasClass("ct_fill_active"))
      {
        jQuery("#shopify-section-header").removeClass("ct_active_sort");
        jQuery(".template-collection").removeClass("ct_active_sort_body");
        
        jQuery(".ct_fil_shade").removeClass("ct_fill_active");
      }
      else
      {        
        jQuery("#shopify-section-header").addClass("ct_active_sort");
        jQuery(".template-collection").addClass("ct_active_sort_body");
        
        jQuery(".ct_fil_shade").addClass("ct_fill_active");
      }
    })
  // Disabled DOB on account page
  var dtToday = new Date();
    
    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();
    if(month < 10)
        month = '0' + month.toString();
    if(day < 10)
        day = '0' + day.toString();
    
    var maxDate = year + '-' + month + '-' + day;
    $('#birthday').attr('max', maxDate);

    document.addEventListener('theme:cartchanged', (e) => {
      if (e.detail.item_count == 1) {
        $('.majortitle [data-cart-count]').html(`(${e.detail.item_count} Item)`);
      } else {
        $('.majortitle [data-cart-count]').html(`(${e.detail.item_count} Items)`);
      }
    })

    let freshDeskChatBtn = document.querySelector('.fresh-desk-cart-init');
    if (freshDeskChatBtn) {
      freshDeskChatBtn.addEventListener('click', () => {
        fcWidget.open();
      })
    }
});



  
 