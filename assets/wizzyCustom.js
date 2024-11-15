window.onWizzyScriptLoaded = function () {
  var wizzyInputMain = $(".wizzy-search-input")[1];
  $(wizzyInputMain).click(function () {
    var wizzyInputInside = $(".wizzy-search-input")[2];
    $(wizzyInputInside).click();
    $(wizzyInputInside).focus();
  });
  window.wizzyConfig.events.registerEvent(
    window.wizzyConfig.events.allowedEvents.BEFORE_INIT,
    function (payload) {
      wizzyConfig.search.configs.facets.leftFacets.mobileCollapsible = true;
      payload.common.lazyDOMConfig.contentDOMIdentifiers.push("#content");
      window.wizzyConfig.search.view.templates.facets.rangeListItem = "#wizzy-facet-range-list-item";
      window.wizzyConfig.search.configs.facets.configs.push({
        "label": "PRICE",
        "buckets": [
          {
            "from": 0,
            "to": 500
          },
          {
            "from": 501,
            "to": 1000
          },
          {
            "from": 1001,
            "to": 2000
          },
          {
            "from": 2001,
            "to": 5000
          },
          {
            "from": 5000
          }
        ],
        "key": "sellingPrice",
        "position": "left",
        "order": 6,
    });
      payload.filters = {
        configs: {
          keepOpenedInMobileAfterApply: true,
          displayAsDrawer: false,
          keepOpenedInDesktopAfterApply: false,
        },
      };
      return payload;
    }
  );
  window.wizzyConfig.events.registerEvent(
    window.wizzyConfig.events.allowedEvents.AFTER_PRODUCTS_TRANSFORMED,
    function (payload) {
      console.log(payload)
      payload.forEach((product) => {
        var limited_price=false;
          var limited_discount=false;
        var bargain=false
        var fast_sell=false;
        var bestSel="";
        var flag_search_best_seller=false;
        var other_tag_seller=false;
        var ct_best_class="";
        
        if (product.price) {
          product.price = parseInt(product.price.replace(/,/g, ""));
        }
        if (product.sellingPrice) {
          product.sellingPrice = parseInt(
            product.sellingPrice.replace(/,/g, "")
          );
        }

        if(product.discount)
        {
          var dis_price=parseInt(
            product.discount.replace(/,/g, "")
          ); 
          if(dis_price > 1000)
          {
            product.discount_price=dis_price            
          }
          
        }
        
            if(product.discountPercentage && product.discountPercentage >= 10 && product.discountPercentage <= 50 )
              {
                limited_discount=true;            
              }    
             
              if(product.sellingPrice && product.sellingPrice >= 1300 && product.sellingPrice   <= 2000)
              {
                limited_price= true
              }
             if(product.sellingPrice && product.sellingPrice  > 2000)
              {
                bargain= true
              }
               if(limited_discount &&  limited_price)
               {
                 bestSel="Limited Deal";
                 fast_sell=true;
                 ct_best_class="limited_tag";
               }
               if(bargain &&  limited_discount)
               {
                 bestSel="Price Crash";
                   
                 fast_sell=true;
                 ct_best_class="bargain_tag";
               }

        var attributes = product.attributes;
        attributes.forEach((attribute) => {
          if (attribute.name == "Front End Tags") {
            product.silverTag = attribute.values[0].value[0];
          }
          if (attribute.id == "product_handle") {
            product.handle = attribute.values[0].value[0];
          }
          if (attribute.id == "product_best_seller_badge_custom") {

            flag_search_best_seller=true;
          
          }
          
        });
          var qty = 0;
    
        
        if(flag_search_best_seller)
        {
           ct_best_class="bargain_tag";
          product.tag_class="ct_best"
           product.best_seller = "Best Seller"
        }
        else
        {
      
          if( fast_sell)
         {
            product.tag_class=ct_best_class
             product.best_seller =bestSel            
          }
        }

        var swatches = product.swatches;
        
        if (swatches) {
          
          if(swatches[0])
          {
            if(swatches[0].values.length > 1)
            {
             product.var_count=swatches[0].values.length
              
            }
          }
          
          swatches.forEach((swatch) => {
            swatchValues = swatch.values;
            swatchValues.forEach((swatchValue) => {
              let color = findHaxCode(swatchValue.value);
              swatchValue.isSwatch = true;
              swatchValue.isVisualSwatch = true;
              try {
                swatchValue.isURLSwatch = color[1];
                swatchValue.swatchValue = color[0];
              } catch (se) {
                console.log("Swatches Error", se);
              }
            });
          });
        }
      });
      return payload;
    }
  );

  window.wizzyConfig.events.registerEvent(
    window.wizzyConfig.events.allowedEvents.BEFORE_RENDER_RESULTS,
    function (payload) {
      try {
        var facets = payload.response.payload.facets;
        facets.forEach((facet) => {
          if (facet.key == "product_color_searchtap") {
            const facetItem = facet.data;
            facetItem.forEach((item) => {
              let color = findHaxCode(item.key);
              item.isSwatch = true;
              item.isURLSwatch = color[1];
              item.isVisualSwatch = true;
              item.swatchValue = color[0];
              item.data = {
                value: item.key,
                swatch: {
                  type: "visual",
                  value: color[0],
                },
              };
            });
          }
          if(facet.key === "sellingPrice"){
            let facetItem = facet.data;
            facet.data = facetItem.filter((item)=>{
              // console.log(item);
              if(item.count > 0) return true;
              return false
            })
          } 
          facetsData = facet.data;
          if (facetsData[0]) {
            facetsData = facetsData.filter(function (obj) {
              return obj.count !== 1;
            });
          }
          facet.data = facetsData;
        });
      } catch (e) {
        console.log("e", e);
      }
      return payload;
    }
  );

  window.wizzyConfig.events.registerEvent(
    window.wizzyConfig.events.allowedEvents.VIEW_RENDERED,
    function (payload) {
      $(".wizzy-filters-header").click(function () {
        $(".wizzy-main-content").toggleClass("wizzy-facet-menu-closed");
      });

      return payload;
    }
  );

  // Removing discount facet
  window.wizzyConfig.events.registerEvent(
    window.wizzyConfig.events.allowedEvents.PRODUCTS_RESULTS_RENDERED,
    function (payload) {
      var $discountPercentageFacetBlock = $(
        ".wizzy-filters-facet-block.facet-block-discountPercentage"
      );
      var $liElements = $discountPercentageFacetBlock.find(
        "li[data-key='_gte_0_']"
      );

      if ($liElements.length === 1) {
        $liElements.parent().parent().parent().remove();
      }
      $(".wizzy-search-back .wizzy-icon").click();
      return payload;
    }
  );

  const mobileSearch = () => {
    $(".wizzy-search-input").on("click", () => {
      if (screen.width < 768) {
        document
          .getElementsByClassName("wizzy-search-form-wrapper")[0]
          .classList.add("mobileTapped");
      }
    });
  };

  const replaceTemplate = (div) => {
    let newDiv = document.getElementById(div + "-new").text;
    let oldDiv = document.getElementById(div);
    oldDiv.text = newDiv;
  };

  $(document).ready(function () {
    mobileSearch();
    replaceTemplate("wizzy-search-results-product");
    replaceTemplate("wizzy-search-results");
    replaceTemplate("wizzy-search-wrapper");
    replaceTemplate("wizzy-search-empty-results");
  });

  const colorMap = new Map([
    ["Ametist", ["#9966cc", false]],
    ["Aqua", ["#00FFFF", false]],
    ["Brown", ["#8b5e3b", false]],
    ["Lavender", ["#E6E6FA", false]],
    ["Ramagreen", ["#066E68", false]],
    ["Blue", ["#00ffff", false]],
    ["Green", ["#00bc29", false]],
    ["Champagne", ["#fae382", false]],
    ["Copper", ["#b66739", false]],
    ["Coral", ["#fd6a55", false]],
    [
      "Coral-Pearl",
      [
        "https://www.kushals.com/cdn/shop/files/coral-pearl_128x128_crop_center.png",
        true,
      ],
    ],
    ["Cream", ["#fffed1", false]],
    ["Emerald", ["#51c97a", false]],
    ["Full Amethyst", ["#5d238d", false]],
    ["Full Garnet", ["#ff0100", false]],
    ["Full Green", ["#008037", false]],
    ["Full Pink", ["#f053aa", false]],
    ["Full Peridot", ["#0b7c06", false]],
    ["Full Sapphire", ["#100fe3", false]],
    ["Full Black", ["#241f21", false]],
    ["Ferozi", ["#29def3", false]],
    ["Full Blue", ["#14598d", false]],
    ["Full Champagne", ["#fae382", false]],
    ["Gold Pearl", ["#da9e1a", false]],
    ["Gold", ["#da9e1a", false]],
    [
      "Green-Sapphire",
      [
        "https://www.kushals.com/cdn/shop/files/green-sapphire_128x128_crop_center.png",
        true,
      ],
    ],
    [
      "Green-White",
      [
        "https://www.kushals.com/cdn/shop/files/green-white_128x128_crop_center.png",
        true,
      ],
    ],
    ["Garnet", ["#ff0100", false]],
    [
      "Green-Pearl",
      [
        "https://www.kushals.com/cdn/shop/files/green-pearl_128x128_crop_center.png",
        true,
      ],
    ],
    ["Grey", ["#b4b7bf", false]],
    ["Lavender", ["#dcd0ff", false]],
    [
      "Mint-Cream",
      [
        "https://www.kushals.com/cdn/shop/files/mint-cream_128x128_crop_center.png",
        true,
      ],
    ],
    [
      "Multi",
      [
        "https://www.kushals.com/cdn/shop/files/multi_128x128_crop_center.png",
        true,
      ],
    ],
    ["Maroon", ["#800000", false]],
    ["Mint", ["#aaf1d3", false]],
    [
      "Navaratna",
      [
        "https://www.kushals.com/cdn/shop/files/navaratna_128x128_crop_center.png",
        true,
      ],
    ],
    ["Orange", ["#f26623", false]],
    ["Peach", ["#f7796b", false]],
    ["B.SAPHIRE", ["#0F52BA", false]],
    ["Sapphire", ["#0F52BA", false]],
    ["M.Green", ["#008037", false]],
    ["Purple", ["#7301ac", false]],
    ["Peridot", ["#0b7c06", false]],
    ["Pearl", ["#dbd5d9", false]],
    ["Pink", ["#f053aa", false]],
    [
      "Pink-Mint",
      [
        "https://www.kushals.com/cdn/shop/files/pink-mint_128x128_crop_center.png",
        true,
      ],
    ],
    [
      "Rani-Sapphire",
      [
        "https://www.kushals.com/cdn/shop/files/rani-sapphire_128x128_crop_center.png",
        true,
      ],
    ],
    [
      "Rani-Orange",
      [
        "https://www.kushals.com/cdn/shop/files/rani-orange_128x128_crop_center.png",
        true,
      ],
    ],
    ["Rhodolite", ["#c71d7b", false]],
    [
      "Rhodolite-Champagne",
      [
        "https://www.kushals.com/cdn/shop/files/rhodolite-champagne_128x128_crop_center.png",
        true,
      ],
    ],
    [
      "Rhodolite-Green",
      [
        "https://www.kushals.com/cdn/shop/files/rhodolite-green_128x128_crop_center.png",
        true,
      ],
    ],
    [
      "Rhodolite-Ruby-Green",
      [
        "https://www.kushals.com/cdn/shop/files/rhodolite-ruby-green_128x128_crop_center.png",
        true,
      ],
    ],
    [
      "Rhodolite-Ruby",
      [
        "https://www.kushals.com/cdn/shop/files/rhodolite-ruby_128x128_crop_center.png",
        true,
      ],
    ],
    [
      "Ruby-Amethyst",
      [
        "https://www.kushals.com/cdn/shop/files/ruby-amethyst_128x128_crop_center.png",
        true,
      ],
    ],
    [
      "Ruby-Champagne",
      [
        "https://www.kushals.com/cdn/shop/files/ruby-champagne_128x128_crop_center.png",
        true,
      ],
    ],
    [
      "Ruby-Green",
      [
        "https://www.kushals.com/cdn/shop/files/ruby-green_128x128_crop_center.png",
        true,
      ],
    ],
    [
      "Ruby-Turquoise",
      [
        "https://www.kushals.com/cdn/shop/files/ruby-turquoise_128x128_crop_center.png",
        true,
      ],
    ],
    [
      "Ruby White",
      [
        "https://www.kushals.com/cdn/shop/files/ruby-white_128x128_crop_center.png",
        true,
      ],
    ],
    [
      "Ruby-White",
      [
        "https://www.kushals.com/cdn/shop/files/ruby-white_128x128_crop_center.png",
        true,
      ],
    ],
    ["Rani", ["#fa26b6", false]],
    [
      "Ruby-Green-White",
      [
        "https://www.kushals.com/cdn/shop/files/ruby-green-white_128x128_crop_center.png",
        true,
      ],
    ],
    ["Red", ["#ed1d24", false]],
    [
      "Rhodolite-Ferozi",
      [
        "https://www.kushals.com/cdn/shop/files/rhodolite-ferozi_128x128_crop_center.png",
        true,
      ],
    ],
    [
      "Ruby-Green-Pearl",
      [
        "https://www.kushals.com/cdn/shop/files/ruby-green-pearl_128x128_crop_center.png",
        true,
      ],
    ],
    ["Ruby", ["#d60220", false]],
    [
      "Ruby-Green-White",
      [
        "https://www.kushals.com/cdn/shop/files/ruby-green-white_128x128_crop_center.png",
        true,
      ],
    ],
    [
      "Ruby-Pearl",
      [
        "https://www.kushals.com/cdn/shop/files/ruby-pearl_128x128_crop_center.png",
        true,
      ],
    ],
    ["Topaz", ["#f9ab3b", false]],
    [
      "Topaz-Maroon",
      [
        "https://www.kushals.com/cdn/shop/files/topaz-maroon_128x128_crop_center.png",
        true,
      ],
    ],
    [
      "Topaz-Ruby-Green",
      [
        "https://www.kushals.com/cdn/shop/files/topaz-ruby-green_128x128_crop_center.png",
        true,
      ],
    ],
    [
      "Turquoise-Green",
      [
        "https://www.kushals.com/cdn/shop/files/turquoise-green_128x128_crop_center.png",
        true,
      ],
    ],
    [
      "Turquoise-Rani",
      [
        "https://www.kushals.com/cdn/shop/files/turquoise-rani_128x128_crop_center.png",
        true,
      ],
    ],
    ["Turquoise", ["#01e1d0", false]],
    ["White", ["#ffffff", false]],
    [
      "White-Pearl",
      [
        "https://www.kushals.com/cdn/shop/files/white-pearl_128x128_crop_center.png",
        true,
      ],
    ],
    ["Yellow", ["#ffdd15", false]],
    ["Full Ruby", ["#d60220", false]],
    ["Full-Ruby", ["#d60220", false]],
    ["Tourmaline", ["#142e38", false]],
    [
      "Ruby-White-Pearl",
      [
        "https://www.kushals.com/cdn/shop/files/ruby-white-pearl_128x128_crop_center.png",
        true,
      ],
    ],
    [
      "Ruby White Pearl",
      [
        "https://www.kushals.com/cdn/shop/files/ruby-white-pearl_128x128_crop_center.png",
        true,
      ],
    ],
    ["Aqua", ["#00ffff", false]],
    [
      "Ruby-Mint",
      [
        "https://www.kushals.com/cdn/shop/files/ruby-mint_128x128_crop_center.png",
        true,
      ],
    ],
    [
      "Ruby Mint",
      [
        "https://www.kushals.com/cdn/shop/files/ruby-mint_128x128_crop_center.png",
        true,
      ],
    ],
    ["Amethyst", ["#5d238d", false]],
    ["Grean", ["#008037", false]],
    ["Pink", ["#f053aa", false]],
    ["Sapphire", ["#100fe3", false]],
    ["Black", ["#000000", false]],
    [
      "Black-White",
      [
        "https://www.kushals.com/cdn/shop/files/black-white_128x128_crop_center.png",
        true,
      ],
    ],
    [
      "Gold-Rodium-Rose Gold",
      [
        "https://www.kushals.com/cdn/shop/files/gold-rodium-rose-gold_128x128_crop_center.png",
        true,
      ],
    ],
    [
      "Rodium-Rose Gold",
      [
        "https://www.kushals.com/cdn/shop/files/rodium-rose-gold_128x128_crop_center.png",
        true,
      ],
    ],
    [
      "Ruby/Mint",
      [
        "https://www.kushals.com/cdn/shop/files/ruby-mint_128x128_crop_center.png",
        true,
      ],
    ],
    [
      "Grey/Pink",
      [
        "https://www.kushals.com/cdn/shop/files/grey-pink_128x128_crop_center.png",
        true,
      ],
    ],
    [
      "Aqua white",
      [
        "https://www.kushals.com/cdn/shop/files/aqua-white_128x128_crop_center.png",
        true,
      ],
    ],
    ["Bronze", ["#cd7f32", false]],
    [
      "Oxidised Gold",
      [
        "https://www.kushals.com/cdn/shop/files/oxidised-gold_128x128_crop_center.png",
        true,
      ],
    ],
    [
      "Oxidised Sliver",
      [
        "https://www.kushals.com/cdn/shop/files/oxidised-sliver_128x128_crop_center.png",
        true,
      ],
    ],
    [
      "Rodium-Gold",
      [
        "https://www.kushals.com/cdn/shop/files/rodium-gold_128x128_crop_center.png",
        true,
      ],
    ],
    [
      "Black Polish",
      [
        "https://www.kushals.com/cdn/shop/files/black-polish_128x128_crop_center.png",
        true,
      ],
    ],
    [
      "Green Pearl",
      [
        "https://www.kushals.com/cdn/shop/files/green-pearl_128x128_crop_center.png",
        true,
      ],
    ],
    [
      "Ruby Green",
      [
        "https://www.kushals.com/cdn/shop/files/ruby-green_128x128_crop_center.png",
        true,
      ],
    ],
    [
      "Ruby/Green",
      [
        "https://www.kushals.com/cdn/shop/files/ruby-green_128x128_crop_center.png",
        true,
      ],
    ],
    [
      "Full Ruby-Green",
      [
        "https://www.kushals.com/cdn/shop/files/ruby-green_128x128_crop_center.png",
        true,
      ],
    ],
    [
      "Ruby/Pearl",
      [
        "https://www.kushals.com/cdn/shop/files/ruby-pearl_128x128_crop_center.png",
        true,
      ],
    ],
    [
      "Rodium-Rose Gold",
      [
        "https://www.kushals.com/cdn/shop/files/rodium-rose-gold_128x128_crop_center.png",
        true,
      ],
    ],
    [
      "Gold-Rodium-Rose Gold",
      [
        "https://www.kushals.com/cdn/shop/files/gold-rodium-rose-gold_128x128_crop_center.png",
        true,
      ],
    ],
    [
      "Ruby/Mint",
      [
        "https://www.kushals.com/cdn/shop/files/ruby-mint_128x128_crop_center.png",
        true,
      ],
    ],
    [
      "Grey/Pink",
      [
        "https://www.kushals.com/cdn/shop/files/grey-pink_128x128_crop_center.png",
        true,
      ],
    ],
    [
      "Rodium-Gold",
      [
        "https://www.kushals.com/cdn/shop/files/rodium-gold_128x128_crop_center.png",
        true,
      ],
    ],
    [
      "Black Polish",
      [
        "https://www.kushals.com/cdn/shop/files/black-polish_128x128_crop_center.png",
        true,
      ],
    ],
    [
      "Ruby Mint",
      [
        "https://www.kushals.com/cdn/shop/files/ruby-mint_128x128_crop_center.png",
        true,
      ],
    ],
    [
      "Pink Mint",
      [
        "https://www.kushals.com/cdn/shop/files/pink-mint_128x128_crop_center.png",
        true,
      ],
    ],
    [
      "Green White Pearl",
      [
        "https://www.kushals.com/cdn/shop/files/green-white-pearl_128x128_crop_center.png",
        true,
      ],
    ],
    [
      "Ruby Pearl",
      [
        "https://www.kushals.com/cdn/shop/files/ruby-pearl_128x128_crop_center.png",
        true,
      ],
    ],
    [
      "Ru/Gr/Pr",
      [
        "https://www.kushals.com/cdn/shop/files/ru-gr-pr_128x128_crop_center.png",
        true,
      ],
    ],
    [
      "Rodium Gold",
      [
        "https://www.kushals.com/cdn/shop/files/rodium-gold_128x128_crop_center.png",
        true,
      ],
    ],
    [
      "Rodium Black",
      [
        "https://www.kushals.com/cdn/shop/files/rodium-black_128x128_crop_center.png",
        true,
      ],
    ],
    [
      "Gold White",
      [
        "https://www.kushals.com/cdn/shop/files/gold-white_128x128_crop_center.png",
        true,
      ],
    ],
    [
      "Navratna",
      [
        "https://www.kushals.com/cdn/shop/files/navratna_128x128_crop_center.png",
        true,
      ],
    ],
    [
      "Sapphire-Pearl",
      [
        "https://www.kushals.com/cdn/shop/files/sapphire-pearl_128x128_crop_center.png",
        true,
      ],
    ],
    [
      "Coral-White",
      [
        "https://www.kushals.com/cdn/shop/files/coral-white_128x128_crop_center.png",
        true,
      ],
    ],
    [
      "Rodium Rose-Gold",
      [
        "https://www.kushals.com/cdn/shop/files/rodium-rose-gold_128x128_crop_center.png",
        true,
      ],
    ],
    [
      "Mint Pink",
      [
        "https://www.kushals.com/cdn/shop/files/mint-pink_128x128_crop_center.png",
        true,
      ],
    ],
    [
      "Multy",
      [
        "https://www.kushals.com/cdn/shop/files/multi_128x128_crop_center.png",
        true,
      ],
    ],
    [
      "Grey-Pink",
      [
        "https://www.kushals.com/cdn/shop/files/grey-pink_128x128_crop_center.png",
        true,
      ],
    ],
    [
      "Aqua-White",
      [
        "https://www.kushals.com/cdn/shop/files/aqua-white_128x128_crop_center.png",
        true,
      ],
    ],
    [
      "Grey-White-Pearl",
      [
        "https://www.kushals.com/cdn/shop/files/grey-white-pearl_128x128_crop_center.png",
        true,
      ],
    ],
    [
      "Pink-White",
      [
        "https://www.kushals.com/cdn/shop/files/pink-white_128x128_crop_center.png",
        true,
      ],
    ],
    [
      "Pink-Lavender",
      [
        "https://www.kushals.com/cdn/shop/files/pink-lavender_128x128_crop_center.png",
        true,
      ],
    ],
    [
      "Pink-Aqua",
      [
        "https://www.kushals.com/cdn/shop/files/pink-aqua_128x128_crop_center.png",
        true,
      ],
    ],
    [
      "Aqua/blue",
      [
        "https://www.kushals.com/cdn/shop/files/aqua-blue_128x128_crop_center.png",
        true,
      ],
    ],
    ["Full Pearl", ["#dbd5d9", false]],
    [
      "Pearl-White",
      [
        "https://www.kushals.com/cdn/shop/files/Pearl-White_128x128_crop_center.png",
        true,
      ],
    ],
    [
      "Mint-Lavender",
      [
        "https://www.kushals.com/cdn/shop/files/Mint-Lavender_128x128_crop_center.png",
        true,
      ],
    ],
    ["Mehandi Green", ["#557054", false]],
    [
      "Green-Lavender",
      [
        "https://www.kushals.com/cdn/shop/files/Green-_Lavender_128x128_crop_center.png",
        true,
      ],
    ],
    [
      "Black-Pearl",
      [
        "https://www.kushals.com/cdn/shop/files/Black-Pearl_128x128_crop_center.png",
        true,
      ],
    ],
    ["Metallic", ["#bcc6cc", false]],
  ]);

  function findHaxCode(key) {
    if (colorMap.has(key)) {
      return colorMap.get(key);
    } else {
      return [key, false];
    }
  }
};
