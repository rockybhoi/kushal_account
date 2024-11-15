
jQuery(document).ready(function() {
    var formData = new FormData();
    jQuery(document).on('click', '.ct_product .ct_gift_btn', function() {
var prod_title=jQuery(".title-row .title").text();
 var prod_id=__st.rid;     

      clevertap.event.push("Gifting Option Clicked", {
          "Product title":prod_title,
          "Product ID":prod_id,
          });
        jQuery("body").addClass("ct_stop_scroll");
        jQuery(".mm-ajaxcart-close").trigger("click");
        jQuery('.ct_product .ct_design_Gift_Main').show();
        jQuery('.ct_product .ct_design_Gift_Main').addClass("active");
    })

    jQuery(document).on('click', '.ct_product .ct_close_gift, .CT_cart_save_box_close', function() {
        jQuery('.ct_product .ct_design_Gift_Main').hide();
      jQuery("body").removeClass("ct_stop_scroll");
        jQuery('.ct_product .ct_cart_design_Gift_Main').hide();
       jQuery('.ct_product .ct_design_Gift_Main').removeClass("active");
              jQuery('.ct_product .ct_cart_design_Gift_Main').removeClass("active");
        
        var video_src=jQuery(".ct_product .record_video").attr("src")
        var audio_src=jQuery(".ct_product .record_audio").attr("src")
        if(typeof video_src != "undefined" )
        {
          $('.ct_product .record_video').get(0).pause(); 
        }
        if(typeof audio_src != "undefined")
        {
             $('.ct_product .record_audio').get(0).pause();           
        }
    })


    var shop_url = "kushalsonline-com.myshopify.com";

    jQuery(document).on('click', '.ct_gift_tab.active .ct_tabbing_accord  .accordion', function() {
     
        jQuery(".ct_gift_tab.active .ct_tabbing_accord .accordion").removeClass("active");

          var check_coach_mark=localStorage.getItem('ct_coach_mark');
          if(!check_coach_mark)
          {
            if(jQuery(this).parent().hasClass("tab_2"))
            {
              jQuery(".ct-cotch-mark").show();
            }
          }
      
        // jQuery(".ct_tabbing_accord .panel_tabing").hide();
        $(this).toggleClass("active");
        var panel = $(this).closest('.ct_tabbing_accord').find(".panel");
        if (panel.hasClass("active")) {
            jQuery(".ct_gift_tab.active .ct_tabbing_accord .panel").removeClass("active");
            jQuery(".ct_gift_tab.active .ct_tabbing_accord .accordion").removeClass("active");
        } else {
            jQuery(".ct_tabbing_accord .panel").removeClass("active");
            jQuery(".ct_tabbing_accord .accordion").removeClass("active");
            panel.addClass("active");
            $(this).closest('.ct_tabbing_accord').find('.accordion').addClass("active")
        }
    });

    if (window.location.search == "?name=rocky") {
        var url = "http://localhost/new_gift_app/data_gift_request.php";
    } else {
        var url = "https://gifting.kushals.com/new_gift_app/data_gift_request.php"
    }
    var get_new_data_request = false;
    var get_ct_data = localStorage.getItem('ct_id');
    var s_result = jQuery.parseJSON(get_ct_data);
    var prod_id = __st.rid;
    var variant_id=jQuery("form [name=id]").val();
    var sku=jQuery("form [name=id] option:selected").attr("data-sku");
  var uniq_id="";
    $.each(s_result, function(i, val) {
        if (prod_id == val.product_id) {
            get_new_data_request = true;
            uniq_id=val.c_id;
            return false;
        }
    });

    if (get_new_data_request) {
        var get_ct_data = localStorage.getItem('ct_id');
        var s_result = jQuery.parseJSON(get_ct_data);

      
        var data = {
            "shop_url": shop_url,
            "page": __st.p,
            "prod_id": prod_id,
            "variant_id":variant_id,
            "sku":sku,
            "method_call": "get_edit_the_data",
            "uniq": uniq_id
        }


        $.ajax({
            type: "POST",
            url: url,
            data: data,
            success: function(response) {
                var obj = jQuery.parseJSON(response);
                if (__st.p == "product") {
                    if (obj.product == "yes") {
                        jQuery('.ct_product .ct_gift_box_html').html(obj.main)
                    }
                }

                jQuery('.ct_product .ct_design_Gift_Main').html(obj.data)
                jQuery('.ct_product .ct_gift_box_html').show()
              if($(window).width() > 767)
                {
                    jQuery(".ct_gifting_enable_status").show();  
                }
                else
                {
                  jQuery(".ct_gifting_enable_status").show()
                }

                console.log(obj);
            }
        });

    } else {
     
        var prod_id = __st.rid;
        var data = {
            "shop_url": shop_url,
            "page": __st.p,
            "prod_id": prod_id,
          
            "variant_id":variant_id,
            "sku":sku,
            "method_call": "get_the_data"
        }
        $.ajax({
            type: "POST",
            url: url,
            data: data,
            success: function(response) {
                var obj = jQuery.parseJSON(response);
 
               if(obj.main != "")
              {                
                if($(window).width() > 767)
                {
                    jQuery(".ct_gifting_enable_status").show();  
                }
                else
                {
                  jQuery(".ct_gifting_enable_status").show()
                }
                  
                
                
                jQuery('.ct_product .ct_gift_box_html').html(obj.main)
                jQuery('.ct_product .ct_design_Gift_Main').html(obj.data)
                jQuery('.ct_product .ct_gift_box_html').show()
                // jQuery('.ct_cart').html(obj.card)
                // jQuery('.ct_gift_box').html(obj.gift)
                console.log(obj);
              }
              
                
            }
        });

    }
    var recordedChunks_video = [];
    setTimeout(function() {

        /// Video Upload
        //const videoElement = jQuery('.ct_product #video');
        var startRecordButton = $('.ct_product #startRecord');
        var mediaRecorderVideo;


        const handleVideoSuccess = function(stream) {
          var startRecordButton = $('.ct_product #startRecord');
        const stopRecordButton = $('.ct_product #stopRecord');
        const uploadVideoButton = $('.ct_product #uploadVideo');
          
          var videoElement = jQuery('.ct_product .ct_gift_tab.active #video')[0];
          
            var time = 0.00;
            var timer = document.querySelector('.ct_product .ct_gift_tab.active .tab-content.active  #ct_timer');
          $(videoElement).prop('srcObject', stream);
          var size_flag="";
          //  videoElement.srcObject = stream;
            mediaRecorderVideo = new MediaRecorder(stream);

            
          
            mediaRecorderVideo.onstop = function() {
                uploadVideoButton.prop('disabled', false);
            };

            
            mediaRecorderVideo.start();
            // mediaRecorderVideo.videoWidth = 100;
            // mediaRecorderVideo.videoHeight = 200;
            startRecordButton.prop('disabled', true);
            stopRecordButton.prop('disabled', false);
            uploadVideoButton.prop('disabled', true);
            timer.style.display = "block";
            interval = setInterval(function() {
                time += 1 / 100;
                timer.innerHTML = time.toFixed(2);
            }, 10);
              jQuery(".ct_product .ct_gift_tab.active .ct_tip_lable").hide();
              jQuery(".ct_product .ct_gift_tab.active .red-recording-dot").show();
          jQuery(".ct_product .ct_gift_tab.active  .tab-content.active .ct_wrap_tips").hide();

          stopRecordButton.show();
          startRecordButton.hide();
            jQuery(".ct_product .ct_gift_tab.active .ct_video_play_show").hide();
               mediaRecorderVideo.ondataavailable = function(e) {
                            if (e.data.size > 0) {
                                recordedChunks_video.push(e.data);
                            }
                        };
            
          /****** VIDEO STOP BUTTON CLICK EVENT ****/
          stopRecordButton.on('click', function() {
                mediaRecorderVideo.stop();
               stream.getTracks().forEach(function(track) {
                      track.stop();
                  });
            console.log(mediaRecorderVideo);
              mediaRecorderVideo.addEventListener('dataavailable', e => {
                   var video_record_size=e.data.size;
                    if (e.data.size < 105000000) {
                  
                       
                          jQuery(".ct_err_size").remove()
                            jQuery(".ct_product .ct_gift_tab.active .red-recording-dot").hide();
                            jQuery(".ct_gift_tab.active .ct_video_record_video  .ct_audio_recorded").hide();
                            jQuery(".ct_gift_tab.active .ct_video_record_video .ct_return_video_wrap").show();
                           
                           
                            const blob = new Blob(recordedChunks_video, {
                                type: 'video/webm'
                            });
                   
                      
                        //  alert( blob.size )
                            let videoURL = window.URL.createObjectURL(blob);
            
                            timer.innerHTML = 0.00;
                            clearInterval(interval);
                            time = 0.00;
                            // videoElement.controls = true;
                            // videoElement.src = videoURL;
                          stopRecordButton.hide();
                          startRecordButton.show();
                          jQuery('.ct_product .tab-content.active  #ct_timer').hide();
                            var videoElement = document.querySelector(".ct_product .ct_gift_tab.active .record_video");
                           
                                videoElement.src = URL.createObjectURL(e.data) // <6>
                              videoElement.controls = true;
                           
                          jQuery(".ct_product .ct_gift_tab.active .record_video").show();
            
                            jQuery('.ct_product .ct_gift_tab.active .ct_video_record_video').addClass("ct_video_uploaded_done")
                            jQuery('.ct_product .ct_gift_tab.active .ct_video_record_video').removeClass("ct_video_recorded_done")
            
                            startRecordButton.prop('disabled', false);
                            stopRecordButton.prop('disabled', true);
                            var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none"> <path d="M13.0767 6.28461L12.2834 5.36294C12.1317 5.18794 12.0092 4.86127 12.0092 4.62794V3.63627C12.0092 3.01794 11.5017 2.51044 10.8834 2.51044H9.8917C9.6642 2.51044 9.3317 2.38794 9.1567 2.23627L8.23503 1.44294C7.83253 1.09877 7.17337 1.09877 6.76503 1.44294L5.8492 2.24211C5.6742 2.38794 5.3417 2.51044 5.1142 2.51044H4.10503C3.4867 2.51044 2.9792 3.01794 2.9792 3.63627V4.63377C2.9792 4.86127 2.8567 5.18794 2.71087 5.36294L1.92337 6.29044C1.58503 6.69294 1.58503 7.34627 1.92337 7.74877L2.71087 8.67627C2.8567 8.85127 2.9792 9.17794 2.9792 9.40544V10.4029C2.9792 11.0213 3.4867 11.5288 4.10503 11.5288H5.1142C5.3417 11.5288 5.6742 11.6513 5.8492 11.8029L6.77087 12.5963C7.17337 12.9404 7.83253 12.9404 8.24087 12.5963L9.16253 11.8029C9.33753 11.6513 9.6642 11.5288 9.89753 11.5288H10.8892C11.5075 11.5288 12.015 11.0213 12.015 10.4029V9.41127C12.015 9.18377 12.1375 8.85127 12.2892 8.67627L13.0825 7.75461C13.4209 7.35211 13.4209 6.68711 13.0767 6.28461ZM9.9267 5.91711L7.1092 8.73461C7.02753 8.81627 6.9167 8.86294 6.80003 8.86294C6.68337 8.86294 6.57253 8.81627 6.49087 8.73461L5.0792 7.32294C4.91003 7.15377 4.91003 6.87377 5.0792 6.70461C5.24837 6.53544 5.52837 6.53544 5.69753 6.70461L6.80003 7.80711L9.30837 5.29877C9.47753 5.12961 9.75753 5.12961 9.9267 5.29877C10.0959 5.46794 10.0959 5.74794 9.9267 5.91711Z" fill="#08A217"></path> </svg>'
            
                            jQuery(".accordion.active .ct_selected_value").html(svg + " Video added");
                            jQuery(".accordion.active .ct_selected_value").show()
                          jQuery('.ct_product  #ct_save_btn').prop("disabled", false); 
                        
                   
                    }
                  else
                    {
                      jQuery(".ct_product .ct_gift_tab.active .red-recording-dot").hide();
                       jQuery('.ct_product .ct_gift_tab.active .ct_video_record_video').addClass("ct_video_uploaded_done")
                            jQuery('.ct_product .ct_gift_tab.active .ct_video_record_video').removeClass("ct_video_recorded_done")
            
                      size_flag=false;
                        timer.style.display = "none";
                      timer.innerHTML = 0.00;
                            clearInterval(interval);
                            time = 0.00;
                       jQuery(".ct_gift_tab.active .ct_video_record_video  .ct_audio_recorded").show();
                    
                        jQuery(".ct_product .ct_return_video_wrap").hide();
                      jQuery(".ct_product #videoRecorded").hide();
                      jQuery(".ct_product .record_video").attr("src","");
                         stopRecordButton.hide();
                          startRecordButton.show();
                       var svg_notselected='<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M12.8636 6.29216L12.0703 5.37049C11.9186 5.19549 11.7961 4.86883 11.7961 4.63549V3.64383C11.7961 3.02549 11.2886 2.51799 10.6703 2.51799H9.67863C9.45113 2.51799 9.11863 2.39549 8.94363 2.24383L8.02196 1.45049C7.61946 1.10633 6.96029 1.10633 6.55196 1.45049L5.63613 2.24966C5.46113 2.39549 5.12863 2.51799 4.90113 2.51799H3.89196C3.27363 2.51799 2.76613 3.02549 2.76613 3.64383V4.64133C2.76613 4.86883 2.64363 5.19549 2.49779 5.37049L1.71029 6.29799C1.37196 6.70049 1.37196 7.35383 1.71029 7.75633L2.49779 8.68383C2.64363 8.85883 2.76613 9.18549 2.76613 9.41299V10.4105C2.76613 11.0288 3.27363 11.5363 3.89196 11.5363H4.90113C5.12863 11.5363 5.46113 11.6588 5.63613 11.8105L6.55779 12.6038C6.96029 12.948 7.61946 12.948 8.02779 12.6038L8.94946 11.8105C9.12446 11.6588 9.45113 11.5363 9.68446 11.5363H10.6761C11.2945 11.5363 11.802 11.0288 11.802 10.4105V9.41883C11.802 9.19133 11.9245 8.85883 12.0761 8.68383L12.8695 7.76216C13.2078 7.35966 13.2078 6.69466 12.8636 6.29216ZM9.71363 5.92466L6.89613 8.74216C6.81446 8.82383 6.70363 8.87049 6.58696 8.87049C6.47029 8.87049 6.35946 8.82383 6.27779 8.74216L4.86613 7.33049C4.69696 7.16133 4.69696 6.88133 4.86613 6.71216C5.03529 6.54299 5.31529 6.54299 5.48446 6.71216L6.58696 7.81466L9.09529 5.30633C9.26446 5.13716 9.54446 5.13716 9.71363 5.30633C9.88279 5.47549 9.88279 5.75549 9.71363 5.92466Z" fill="#E6DD0A"></path> </svg>';
                       jQuery(".accordion.active .ct_selected_value").html(svg_notselected+" Not Selected");
                      recordedChunks_video = [];
                      var convert_into_mb=formatBytes(video_record_size)
                       jQuery(".ct_video_record").after("<span class='ct_err_size' style='color:red'>Your file size is of "+convert_into_mb+", please keep it under 100MB</span>")
                        startRecordButton.prop('disabled', false);
                        stopRecordButton.prop('disabled', true);
                        uploadVideoButton.prop('disabled', false);
                    }
                });
              
             
           
              
               
            });

          
            jQuery('.ct_product .ct_gift_tab.active .ct_video_record_video').addClass("ct_video_recorded_done")
            jQuery('.ct_product .ct_gift_tab.active .ct_video_record_video').removeClass("ct_video_uploaded_done")


        };

        // jQuery(document).on('click','.ct_product #startRecord', function() {
    
        //     navigator.mediaDevices.getUserMedia({
        //         video: true,
        //         audio: true
        //     }).then(handleVideoSuccess)
        // })


        // Audio  
        const startButton = jQuery('.ct_product .ct_gift_tab.active #start');
        const handleError = function(error) {
            // Handle the error, for example, display an alert
            alert("Error accessing the microphone: " + error);
        }
        const handleSuccess = function(stream) {
            var time = 0.00;
            var interval;
            const downloadLink = document.querySelector('.ct_product .ct_gift_tab.active #download');
            const stopButton = jQuery('.ct_product .ct_gift_tab.active #stop');


            var timer_audio = document.querySelector('.ct_product .ct_gift_tab.active .tab-content.active #ct_timer_audio');
            // alert(MediaRecorder.isTypeSupported("audio/webm"))
            // alert(MediaRecorder.isTypeSupported("audio/mp4"))
            // alert(MediaRecorder.isTypeSupported("audio/mpeg"))
            // alert(MediaRecorder.isTypeSupported("audio/ogg; codecs=vorbis"))
            // alert(MediaRecorder.isTypeSupported("audio/ogg"))
            // alert(MediaRecorder.isTypeSupported("audio/3gp2"))
            // alert(MediaRecorder.isTypeSupported("audio/webm;codecs=vorbis"))
            // alert(MediaRecorder.isTypeSupported("audio/webm;codecs=opus"))
            // alert(MediaRecorder.isTypeSupported("audio/3gpp"))

            var audio_type = "";
            const jQueryArr = ["audio/webm", "audio/mp4", "audio/mpeg", , "audio/ogg; codecs=vorbis", "audio/ogg", "audio/3gp2", "audio/webm;codecs=vorbis", "audio/webm;codecs=opus", "audio/3gpp"];
            $.each(jQueryArr, function(i, val) {
                if (MediaRecorder.isTypeSupported(val)) {
                    audio_type = val;
                }
            })
            try {
                const options = {
                    mimeType: audio_type
                };
                const recordedChunks = [];
                const mediaRecorder = new MediaRecorder(stream, options);
                console.log(mediaRecorder);
                //alert("aaaa");

                mediaRecorder.start();
              jQuery('.ct_product .ct_gift_tab.active #stop').show()
              jQuery('.ct_product .ct_gift_tab.active #start').hide()
              jQuery(".ct_product .ct_gift_tab.active  .tab-content.active .ct_wrap_tips").hide();
              jQuery(".ct_product .ct_gift_tab.active  .tab-content.active .ct_tip_lable").hide();
                // jQuery('.ct_product #start').prop('disabled', true);
                // jQuery('.ct_product #stop').prop('disabled', false);

                timer_audio.style.display = "block";
                interval = setInterval(function() {
                    time += 1 / 100;
                    timer_audio.innerHTML = time.toFixed(2);
                }, 10);

                //alert("dfdfd");
                jQuery('.ct_product .ct_gift_tab.active .red-recording-dot').show();
                jQuery('.ct_product .ct_gift_tab.active .ct_timer_audio').show();
                mediaRecorder.addEventListener('dataavailable', function(e) {
                    if (e.data.size > 0) recordedChunks.push(e.data);
                });

                mediaRecorder.addEventListener('stop', function() {
                    // jQuery('.ct_product #start').prop('disabled', false);
                    // jQuery('.ct_product #stop').prop('disabled', true);
                  
                   jQuery('.ct_product .ct_gift_tab.active #stop').hide()
                  jQuery('.ct_product .ct_gift_tab.active #start').show()
                  
                    stream.getTracks().forEach(function(track) {
                        track.stop();
                    });
                    
                    timer_audio.innerHTML = 0.00;
                    clearInterval(interval);
                    time = 0.00;
                    // saveAudioData(recordedChunks);
                    


                    let audio =jQuery(".ct_product .ct_gift_tab.active .record_audio")[0];
                    const audioBlob = new Blob(recordedChunks, { type: audio_type });
                    audio.src = URL.createObjectURL(audioBlob);
                     //audio.type="audio/wav";

                  audio.addEventListener('error', function(e) {
                        console.error('Audio error:', e);
                    });
                    //audio.load();
                    jQuery('.ct_wrap_audio').show();
                  
                    jQuery('.ct_product .ct_gift_tab.active .red-recording-dot').hide();
                    jQuery('.ct_product .ct_gift_tab.active #ct_timer_audio').hide();
                    jQuery('.ct_product .ct_gift_tab.active  .tab-content.active .ct_audio_recorded').hide();


                    formData.append('audio', new Blob(recordedChunks));
                    // downloadLink.href = new Blob(recordedChunks);
                    // downloadLink.download = 'acetest.wav';

                    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none"> <path d="M13.0767 6.28461L12.2834 5.36294C12.1317 5.18794 12.0092 4.86127 12.0092 4.62794V3.63627C12.0092 3.01794 11.5017 2.51044 10.8834 2.51044H9.8917C9.6642 2.51044 9.3317 2.38794 9.1567 2.23627L8.23503 1.44294C7.83253 1.09877 7.17337 1.09877 6.76503 1.44294L5.8492 2.24211C5.6742 2.38794 5.3417 2.51044 5.1142 2.51044H4.10503C3.4867 2.51044 2.9792 3.01794 2.9792 3.63627V4.63377C2.9792 4.86127 2.8567 5.18794 2.71087 5.36294L1.92337 6.29044C1.58503 6.69294 1.58503 7.34627 1.92337 7.74877L2.71087 8.67627C2.8567 8.85127 2.9792 9.17794 2.9792 9.40544V10.4029C2.9792 11.0213 3.4867 11.5288 4.10503 11.5288H5.1142C5.3417 11.5288 5.6742 11.6513 5.8492 11.8029L6.77087 12.5963C7.17337 12.9404 7.83253 12.9404 8.24087 12.5963L9.16253 11.8029C9.33753 11.6513 9.6642 11.5288 9.89753 11.5288H10.8892C11.5075 11.5288 12.015 11.0213 12.015 10.4029V9.41127C12.015 9.18377 12.1375 8.85127 12.2892 8.67627L13.0825 7.75461C13.4209 7.35211 13.4209 6.68711 13.0767 6.28461ZM9.9267 5.91711L7.1092 8.73461C7.02753 8.81627 6.9167 8.86294 6.80003 8.86294C6.68337 8.86294 6.57253 8.81627 6.49087 8.73461L5.0792 7.32294C4.91003 7.15377 4.91003 6.87377 5.0792 6.70461C5.24837 6.53544 5.52837 6.53544 5.69753 6.70461L6.80003 7.80711L9.30837 5.29877C9.47753 5.12961 9.75753 5.12961 9.9267 5.29877C10.0959 5.46794 10.0959 5.74794 9.9267 5.91711Z" fill="#08A217"></path> </svg>'

                    jQuery(".accordion.active .ct_selected_value").html(svg + " Audio added");
                    jQuery(".accordion.active .ct_selected_value").show()
                    jQuery(".accordion.active").parent().addClass("ct_fill_active");
                    jQuery('.ct_product  #ct_save_btn').prop("disabled", false);

                   var prod_id = __st.rid;
                      clevertap.event.push("Gifinting Message Added", {
                        "Message type":"Audio",
                        "Product ID":prod_id,
                        });

                });

                stopButton.on('click', function() {
                    mediaRecorder.stop();
                });
            } catch (error) {
                alert(error);
            }
        };
        // startButton.on('click', function() {
          jQuery(document).on('click','.ct_product #start',function(){
            try {

                navigator.mediaDevices.getUserMedia({
                        audio: true
                       
                    })
                    .then(handleSuccess)
                    .catch(handleError);
            } catch (error) {
                alert(error);
            }

        })
    }, 3000)

        //   // Assuming you have loaded 'ffmpeg.wasm' in your project
        // const ffmpeg = createFFmpeg({ log: true });
        
        // async function compressVideo(blob) {
        //   // Load FFmpeg
        //   await ffmpeg.load();
        
        //   // Convert Blob to uint8 array
        //   const uint8Array = await blob.arrayBuffer();
        //   const input = new Uint8Array(uint8Array);
        
        //   // Run FFmpeg to compress the video
        //   await ffmpeg.write('input.webm', input);
        //   await ffmpeg.run('-i', 'input.webm', '-c:v', 'libx264', 'output.mp4');
        
        //   // Read the compressed video
        //   const compressedVideo = await ffmpeg.read('output.mp4');
        
        //   // Perform further actions with the compressed video (e.g., upload or display)
        //   console.log(compressedVideo);
        
        //   // Clean up
        //   await ffmpeg.remove('input.webm');
        //   await ffmpeg.remove('output.mp4');
        // }
        


  function formatBytes(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Byte';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

    jQuery(document).on("click", ".ct_product .ct_return_video_wrap .ct_return_btn", function() {
      jQuery(".ct_product .ct_video_play_show").hide();  
      jQuery(".ct_product .ct_video_record_video  .ct_audio_recorded").show();
        jQuery(".ct_product .ct_return_video_wrap").hide();
      jQuery(".ct_product #videoRecorded").hide();
      jQuery(".ct_product .record_video").attr("src","");

           jQuery(".ct_product .ct_gift_tab.active .ct_tip_lable").show();
       jQuery(".ct_product .ct_gift_tab.active  .tab-content.active .ct_wrap_tips").show();

       var svg_notselected='<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M12.8636 6.29216L12.0703 5.37049C11.9186 5.19549 11.7961 4.86883 11.7961 4.63549V3.64383C11.7961 3.02549 11.2886 2.51799 10.6703 2.51799H9.67863C9.45113 2.51799 9.11863 2.39549 8.94363 2.24383L8.02196 1.45049C7.61946 1.10633 6.96029 1.10633 6.55196 1.45049L5.63613 2.24966C5.46113 2.39549 5.12863 2.51799 4.90113 2.51799H3.89196C3.27363 2.51799 2.76613 3.02549 2.76613 3.64383V4.64133C2.76613 4.86883 2.64363 5.19549 2.49779 5.37049L1.71029 6.29799C1.37196 6.70049 1.37196 7.35383 1.71029 7.75633L2.49779 8.68383C2.64363 8.85883 2.76613 9.18549 2.76613 9.41299V10.4105C2.76613 11.0288 3.27363 11.5363 3.89196 11.5363H4.90113C5.12863 11.5363 5.46113 11.6588 5.63613 11.8105L6.55779 12.6038C6.96029 12.948 7.61946 12.948 8.02779 12.6038L8.94946 11.8105C9.12446 11.6588 9.45113 11.5363 9.68446 11.5363H10.6761C11.2945 11.5363 11.802 11.0288 11.802 10.4105V9.41883C11.802 9.19133 11.9245 8.85883 12.0761 8.68383L12.8695 7.76216C13.2078 7.35966 13.2078 6.69466 12.8636 6.29216ZM9.71363 5.92466L6.89613 8.74216C6.81446 8.82383 6.70363 8.87049 6.58696 8.87049C6.47029 8.87049 6.35946 8.82383 6.27779 8.74216L4.86613 7.33049C4.69696 7.16133 4.69696 6.88133 4.86613 6.71216C5.03529 6.54299 5.31529 6.54299 5.48446 6.71216L6.58696 7.81466L9.09529 5.30633C9.26446 5.13716 9.54446 5.13716 9.71363 5.30633C9.88279 5.47549 9.88279 5.75549 9.71363 5.92466Z" fill="#E6DD0A"></path> </svg>';
       jQuery(".accordion.active .ct_selected_value").html(svg_notselected+" Not Selected");
      recordedChunks_video = [];
        jQuery(".accordion.active").parent().removeClass("ct_fill_active")
      
    })


    jQuery(document).on("click", ".ct_product .ct_again_audio", function() {
      jQuery("#audioFileInput").val("");
      
              jQuery(".ct_product .ct_gift_tab.active  .tab-content.active .ct_wrap_tips").show();
              jQuery(".ct_product .ct_gift_tab.active  .tab-content.active .ct_tip_lable").show();
        
            jQuery('.ct_product .tab-content.active .ct_audio_recorded').show();
            jQuery('.ct_product .ct_wrap_audio').hide();
            jQuery('.ct_product .record_audio source').attr("src","");
            var svg_notselected='<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M12.8636 6.29216L12.0703 5.37049C11.9186 5.19549 11.7961 4.86883 11.7961 4.63549V3.64383C11.7961 3.02549 11.2886 2.51799 10.6703 2.51799H9.67863C9.45113 2.51799 9.11863 2.39549 8.94363 2.24383L8.02196 1.45049C7.61946 1.10633 6.96029 1.10633 6.55196 1.45049L5.63613 2.24966C5.46113 2.39549 5.12863 2.51799 4.90113 2.51799H3.89196C3.27363 2.51799 2.76613 3.02549 2.76613 3.64383V4.64133C2.76613 4.86883 2.64363 5.19549 2.49779 5.37049L1.71029 6.29799C1.37196 6.70049 1.37196 7.35383 1.71029 7.75633L2.49779 8.68383C2.64363 8.85883 2.76613 9.18549 2.76613 9.41299V10.4105C2.76613 11.0288 3.27363 11.5363 3.89196 11.5363H4.90113C5.12863 11.5363 5.46113 11.6588 5.63613 11.8105L6.55779 12.6038C6.96029 12.948 7.61946 12.948 8.02779 12.6038L8.94946 11.8105C9.12446 11.6588 9.45113 11.5363 9.68446 11.5363H10.6761C11.2945 11.5363 11.802 11.0288 11.802 10.4105V9.41883C11.802 9.19133 11.9245 8.85883 12.0761 8.68383L12.8695 7.76216C13.2078 7.35966 13.2078 6.69466 12.8636 6.29216ZM9.71363 5.92466L6.89613 8.74216C6.81446 8.82383 6.70363 8.87049 6.58696 8.87049C6.47029 8.87049 6.35946 8.82383 6.27779 8.74216L4.86613 7.33049C4.69696 7.16133 4.69696 6.88133 4.86613 6.71216C5.03529 6.54299 5.31529 6.54299 5.48446 6.71216L6.58696 7.81466L9.09529 5.30633C9.26446 5.13716 9.54446 5.13716 9.71363 5.30633C9.88279 5.47549 9.88279 5.75549 9.71363 5.92466Z" fill="#E6DD0A"></path> </svg>';
            jQuery(".accordion.active .ct_selected_value").html(svg_notselected+" Not Selected");
            jQuery(".accordion.active").parent().removeClass("ct_fill_active");
      
        
    })
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M13.0767 6.28461L12.2834 5.36294C12.1317 5.18794 12.0092 4.86127 12.0092 4.62794V3.63627C12.0092 3.01794 11.5017 2.51044 10.8834 2.51044H9.8917C9.6642 2.51044 9.3317 2.38794 9.1567 2.23627L8.23503 1.44294C7.83253 1.09877 7.17337 1.09877 6.76503 1.44294L5.8492 2.24211C5.6742 2.38794 5.3417 2.51044 5.1142 2.51044H4.10503C3.4867 2.51044 2.9792 3.01794 2.9792 3.63627V4.63377C2.9792 4.86127 2.8567 5.18794 2.71087 5.36294L1.92337 6.29044C1.58503 6.69294 1.58503 7.34627 1.92337 7.74877L2.71087 8.67627C2.8567 8.85127 2.9792 9.17794 2.9792 9.40544V10.4029C2.9792 11.0213 3.4867 11.5288 4.10503 11.5288H5.1142C5.3417 11.5288 5.6742 11.6513 5.8492 11.8029L6.77087 12.5963C7.17337 12.9404 7.83253 12.9404 8.24087 12.5963L9.16253 11.8029C9.33753 11.6513 9.6642 11.5288 9.89753 11.5288H10.8892C11.5075 11.5288 12.015 11.0213 12.015 10.4029V9.41127C12.015 9.18377 12.1375 8.85127 12.2892 8.67627L13.0825 7.75461C13.4209 7.35211 13.4209 6.68711 13.0767 6.28461ZM9.9267 5.91711L7.1092 8.73461C7.02753 8.81627 6.9167 8.86294 6.80003 8.86294C6.68337 8.86294 6.57253 8.81627 6.49087 8.73461L5.0792 7.32294C4.91003 7.15377 4.91003 6.87377 5.0792 6.70461C5.24837 6.53544 5.52837 6.53544 5.69753 6.70461L6.80003 7.80711L9.30837 5.29877C9.47753 5.12961 9.75753 5.12961 9.9267 5.29877C10.0959 5.46794 10.0959 5.74794 9.9267 5.91711Z" fill="#08A217"/></svg>'
    jQuery(document).on("change", ".ct_gift_box  input[name='card']", function() {

        var title = jQuery(this).closest('li').find('.ct_gift_img_title').text()

        jQuery(this).closest('.ct_tabbing_accord').find('.ct_selected_value').html(svg + title);
        jQuery(this).closest('.ct_tabbing_accord').find('.ct_selected_value').show();

        jQuery(this).closest('.ct_tabbing_accord').addClass("ct_fill_active");

       var prod_id = __st.rid;
                      clevertap.event.push("Greeting Card Selected", {
                        "Card Name":title,
                        "Product ID":prod_id,
                        });

      

        jQuery('.ct_product  #ct_save_btn').prop("disabled", false);
    });
    jQuery(document).on("input", ".ct_gift_tab.active #ct_gif_msg", function() {
        var t = jQuery(this).val();
        var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none"> <path d="M13.0767 6.28461L12.2834 5.36294C12.1317 5.18794 12.0092 4.86127 12.0092 4.62794V3.63627C12.0092 3.01794 11.5017 2.51044 10.8834 2.51044H9.8917C9.6642 2.51044 9.3317 2.38794 9.1567 2.23627L8.23503 1.44294C7.83253 1.09877 7.17337 1.09877 6.76503 1.44294L5.8492 2.24211C5.6742 2.38794 5.3417 2.51044 5.1142 2.51044H4.10503C3.4867 2.51044 2.9792 3.01794 2.9792 3.63627V4.63377C2.9792 4.86127 2.8567 5.18794 2.71087 5.36294L1.92337 6.29044C1.58503 6.69294 1.58503 7.34627 1.92337 7.74877L2.71087 8.67627C2.8567 8.85127 2.9792 9.17794 2.9792 9.40544V10.4029C2.9792 11.0213 3.4867 11.5288 4.10503 11.5288H5.1142C5.3417 11.5288 5.6742 11.6513 5.8492 11.8029L6.77087 12.5963C7.17337 12.9404 7.83253 12.9404 8.24087 12.5963L9.16253 11.8029C9.33753 11.6513 9.6642 11.5288 9.89753 11.5288H10.8892C11.5075 11.5288 12.015 11.0213 12.015 10.4029V9.41127C12.015 9.18377 12.1375 8.85127 12.2892 8.67627L13.0825 7.75461C13.4209 7.35211 13.4209 6.68711 13.0767 6.28461ZM9.9267 5.91711L7.1092 8.73461C7.02753 8.81627 6.9167 8.86294 6.80003 8.86294C6.68337 8.86294 6.57253 8.81627 6.49087 8.73461L5.0792 7.32294C4.91003 7.15377 4.91003 6.87377 5.0792 6.70461C5.24837 6.53544 5.52837 6.53544 5.69753 6.70461L6.80003 7.80711L9.30837 5.29877C9.47753 5.12961 9.75753 5.12961 9.9267 5.29877C10.0959 5.46794 10.0959 5.74794 9.9267 5.91711Z" fill="#08A217"></path> </svg>'
        if (t.length > 0) {
            jQuery(".accordion.active .ct_selected_value").html(svg + " Text added");
            jQuery(".accordion.active .ct_selected_value").show();
        } else {
          var svg_notselected='<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M12.8636 6.29216L12.0703 5.37049C11.9186 5.19549 11.7961 4.86883 11.7961 4.63549V3.64383C11.7961 3.02549 11.2886 2.51799 10.6703 2.51799H9.67863C9.45113 2.51799 9.11863 2.39549 8.94363 2.24383L8.02196 1.45049C7.61946 1.10633 6.96029 1.10633 6.55196 1.45049L5.63613 2.24966C5.46113 2.39549 5.12863 2.51799 4.90113 2.51799H3.89196C3.27363 2.51799 2.76613 3.02549 2.76613 3.64383V4.64133C2.76613 4.86883 2.64363 5.19549 2.49779 5.37049L1.71029 6.29799C1.37196 6.70049 1.37196 7.35383 1.71029 7.75633L2.49779 8.68383C2.64363 8.85883 2.76613 9.18549 2.76613 9.41299V10.4105C2.76613 11.0288 3.27363 11.5363 3.89196 11.5363H4.90113C5.12863 11.5363 5.46113 11.6588 5.63613 11.8105L6.55779 12.6038C6.96029 12.948 7.61946 12.948 8.02779 12.6038L8.94946 11.8105C9.12446 11.6588 9.45113 11.5363 9.68446 11.5363H10.6761C11.2945 11.5363 11.802 11.0288 11.802 10.4105V9.41883C11.802 9.19133 11.9245 8.85883 12.0761 8.68383L12.8695 7.76216C13.2078 7.35966 13.2078 6.69466 12.8636 6.29216ZM9.71363 5.92466L6.89613 8.74216C6.81446 8.82383 6.70363 8.87049 6.58696 8.87049C6.47029 8.87049 6.35946 8.82383 6.27779 8.74216L4.86613 7.33049C4.69696 7.16133 4.69696 6.88133 4.86613 6.71216C5.03529 6.54299 5.31529 6.54299 5.48446 6.71216L6.58696 7.81466L9.09529 5.30633C9.26446 5.13716 9.54446 5.13716 9.71363 5.30633C9.88279 5.47549 9.88279 5.75549 9.71363 5.92466Z" fill="#E6DD0A"></path> </svg>';
            jQuery(".accordion.active .ct_selected_value").html(svg_notselected+" Not Selected");
            //jQuery(".accordion.active .ct_selected_value").hide();
        }
    })
    jQuery(document).on("change", ".ct_cart  input[name='gift']", function() {
        var title = jQuery(this).closest('li').find('.ct_gift_img_title').text();
        var id = jQuery(this).attr('data-id');
        jQuery(this).closest('.ct_tabbing_accord').find('.ct_selected_value').html(svg + title);
        jQuery(this).closest('.ct_tabbing_accord').find('.ct_selected_value').show();
         jQuery('.ct_product  #ct_save_btn').prop("disabled", false);

          var prod_id = __st.rid;
                      clevertap.event.push("Gift Box Selected", {
                        "Box Name":title,
                        "Product ID":prod_id,
                        });
        jQuery(".accordion.active").parent().addClass("ct_fill_active")
    });

    jQuery(document).on("click", ".ct_ajax_cart .ct_again_audio", function() {
        if (jQuery('.ct_audio_recorded').hasClass("ct_record_show")) {
            jQuery('.ct_ajax_cart .tab-content.active .ct_audio_recorded').show();
            jQuery('.ct_ajax_cart .ct_wrap_audio').hide();
        } else {
            jQuery("#audioFileInput").trigger("click");
        }
    })

    console.log(recordedChunks_video)
    jQuery(document).on('click', '.ct_product .ct_gift_tab.active .ct_save #ct_save_btn', function() {
        
        var card = jQuery(".ct_product  .ct_gift_box  input[name='card']:checked").val();
        var msg_type = jQuery('.ct_product .ct_gift_tab.active .tabs .tab-link.active').attr('data-tab');
        var gift_box = jQuery(".ct_product .ct_gift_tab.active .ct_cart input[name='gift']:checked").val();
        var cust_name = jQuery(".ct_product .ct_gift_tab.active  .ct_wrap_contact .ct_msg_name").val();
        var cust_contact_no = jQuery(".ct_product .ct_gift_tab.active .ct_wrap_contact .ct_msg_number").val();
        var cust_contact_no_length=jQuery(".ct_product .ct_gift_tab.active .ct_wrap_contact .ct_msg_number").val().length
        var prod_id=jQuery(this).attr("data-prod-id");
        var var_id = jQuery(this).attr("data-variant-id");
        var sku_val=jQuery(this).attr("data-sku");
        var msg_value = "";
        var flag = false;
        var c_flag, gift_flag = false;
        var content = jQuery(".ct_wrap_contact .ct_msg_number").val()[0];
        if ($('.ct_product  .ct_gift_box input[name="card"]:checked').length > 0) {
            c_flag = true;
        }
        if ($('.ct_product  .ct_cart input[name="gift"]:checked').length > 0) {
            gift_flag = true;
        }
        // if (content > 5) {
        //     flag = false;
        // } else {
        //     flag = true;
        // }
        console.log(card + " == " + gift_box+" == "+flag);
        if (msg_type == 1) {
            msg_value = jQuery(".ct_product .ct_gift_tab.active #ct_gif_msg").val();
            if (msg_value != "") {
                flag = true;
            }
            formData.append('text', msg_value);

        } else if (msg_type == 2) {
            //  msg_value=jQuery(".ct_gift_tab #download").attr('href');
            // formData.append('audio',  new Blob(msg_value));
            const audioFileInput = document.querySelector('.ct_product #audioFileInput');
            const audioFile = audioFileInput.files[0];
            if (typeof audioFile != "undefined") {
                flag = true;
            }
            //msg_value=jQuery(".ct_gift_tab .ct_audio_file").files[0];
            var edit_audio = jQuery('.ct_product .ct_record  audio').attr('src')
            if (typeof audioFile != "undefined") {
                formData.append('audio', audioFile);
            } else if (edit_audio != "") {
                // formData.append('audio',  ""); 
            }
            var audio_rec = jQuery('.ct_product .ct_gift_tab.active  .record_audio').attr('src')
          if (typeof audio_rec != "undefined") {
          
            formData.append('audio', audio_rec);
           flag = true;
          }
          
          

        } else if (msg_type == 3) {
                 //const video_record_file = document.getElementById('videoFile');
          const video_record_file = $('.ct_gift_tab.active #videoFile')[0];          
          const video_recordFile = video_record_file.files[0];
          console.log(video_recordFile);
          console.log(video_record_file);
          
            if (typeof video_recordFile != "undefined") {

                // const blob = new Blob(recordedChunks_video, {
                //     type: 'video/webm'
                // });
                formData.append('video', video_recordFile);
               flag = true;
            } else {

                //const videoFileInput = document.getElementById('videoFileInput');
               const videoFileInput = $('.ct_gift_tab.active #videoFileInput')[0];  
              const videoFile = videoFileInput.files[0];

                if (typeof videoFile == "undefined") {
                    formData.append('video', "");
                } else {
                    formData.append('video', videoFile);
                   flag = true;
                }
            }
            if (recordedChunks_video != "") {
                flag = true;
            }
            var video_check = jQuery(".ct_video_play_show .source").attr('src');
            if (typeof video_check != "undefined") {
                flag = true;
            }
        }
        var prod_id = __st.rid;
        var data = {
            "card": card,
            "msg_type": msg_type,
            "gift_box": gift_box,
            "cust_name": cust_name,
            "cust_no": cust_contact_no,
            "prod_id": prod_id
        }
        console.log(data);
        formData.append('shop_url', shop_url);
        formData.append('setting_data', JSON.stringify(data));
        var edit_btn = jQuery(this).attr("data-edit");
        if (edit_btn != "") {
            var get_ct_data = localStorage.getItem('ct_id');


            formData.append('uniq_cid', get_ct_data);
            formData.append('method_call', "update_gift_box");
        } else {
            formData.append('method_call', "save_gift");
        }
        if (window.location.search == "?name=rocky") {
            var url = "http://localhost/new_gift_app/data_gift_request.php";
        } else {
            var url = "https://gifting.kushals.com/new_gift_app/data_gift_request.php"
        }
        console.log(c_flag + " == " + gift_flag);


        // jQuery(".ct_msg_error").hide();
        // jQuery('.ct_error').hide()
        //jQuery("#ct_gif_msg").removeClass("ct_error")
       var success_flag=true;
        if(flag != false)
        {
          if(cust_contact_no != ""  && cust_name != "")
          {
              success_flag=true;
             if(cust_contact_no_length == 10)
              {
                 success_flag=true;
              }else
              {
                 success_flag=false;
              }
          }else
          {
            success_flag=false;
          }
          
        }
        else if(flag == false)
        {
            success_flag=false;
        }
        else
        {
          if(cust_contact_no == ""  && cust_name == "")
          {
              success_flag=true;
          }else
          {
            success_flag=false;
             if(cust_contact_no_length == 10)
              {
                success_flag=true;
                 
              }else
              {
                 success_flag=false;
              }
          }          
        }
     

      /**** Check the contact and mobile number is not blank  ***/
        if(success_flag)
        {
          var selected_type_value=jQuery(".tab-link.active span").text();
          jQuery('.ct_load_text').text("File is uploading");
          jQuery(this).hide();
          jQuery('.ct_dev_loader').show();
          jQuery(".ct_msg_name").removeClass("ct_error") 
          jQuery(".ct_msg_number").removeClass("ct_error") 
          jQuery(".ct_msg_error").hide();
          jQuery('.ct_error').hide()
          jQuery(".ct_name_error").hide();
          jQuery(".ct_no_error").hide();       
          
          jQuery.ajax({
            "url": url,
            "type": "post",
            "data": formData,
            processData: false, // important
            contentType: false, // important         
            "success": function(story_res) {

              clevertap.event.push("Added To Cart", {
                  "Is Gifting":"true"
                });
              
              
                var s_result = jQuery.parseJSON(story_res);
                // jQuery('.ct_design_Gift_inner').hide();
                //   jQuery('.CT_cart_save_box').show();
                // jQuery('.ct_gift_box_html').html(s_result.data_html);
                if (typeof s_result.data != "undefined") {

                    var newdata = {
                        "product_id": prod_id,
                        "c_id": s_result.data
                    };
                    let data_local = localStorage.getItem("ct_id");
                    let data_gift = data_local ? JSON.parse(data_local) : []
                    data_gift.push(newdata);
                    localStorage.setItem("ct_id", JSON.stringify(data_gift))

                    // var d=[{
                    //   "product_id":__st.rid,
                    //   "c_id":s_result.data
                    // }]                  
                    // localStorage.setItem('ct_id', JSON.stringify(d));  
                }
                
                //var sku_val = jQuery(".original-selector option:selected").attr('data-sku');
                var card_val = jQuery(".ct_product  .ct_gift_box  input[name='card']:checked").siblings('.ct_gift_img_title').text();
                var box_val = jQuery(".ct_product  .ct_cart   input[name='gift']:checked").siblings('.ct_gift_img_title').text();
                //var sku_val="";
              jQuery("body").removeClass("ct_stop_scroll");
                $.get('/cart.json', function(cart) {
                   
                  // console.log(cart)
                   //     $.each(cart.items,function(i,vall){
                      
                   //       if(prod_id == vall.product_id)
                   //       {
                   //         sku_val=vall.sku;
                   //       }
                   //     })
                   setTimeout(function() {
                      const data_local = cart.note || "";
                  
                      const formData = {
                          items: [{
                              id: var_id,
                              quantity: 1
                          }]
                      };
                  
                      let available_id = false;
                      let main_sku_change = "";
                  
                      cart.items.forEach(val => {
                          if (val.product_id === prod_id) {
                              available_id = true;
                              main_sku_change = val.sku;
                              return;
                          }
                      });
                  
                      const isGiftTabActive = jQuery(".ct_gift_tab.active").hasClass("ct_cart_design_Gift_Main");
                  
                      if (isGiftTabActive || available_id) {
                          const data_gift = data_local || "";
                          const arr = data_gift.split('/');
                          let isMatch = false;
                          let attribute = "";
                  
                          arr.forEach(val => {
                              if (val) {
                                  const sku_value = val.split('-');
                                  const sku_text_match = `SKU ${main_sku_change}`;
                                  if (sku_value.includes(sku_text_match)) {
                                      isMatch = true;
                                      const replace_value = `SKU ${main_sku_change}-CARD ${card_val}-BOX ${box_val}`;
                                      attribute = data_gift.replace(val, replace_value);
                                      return false;
                                  }
                              }
                          });
                  
                          if (!isMatch && (card_val || box_val)) {
                              const pair = `SKU ${sku_val}-CARD ${card_val}-BOX ${box_val}`;
                              attribute = `${data_gift}/${pair}`;
                          }else
                          {
                             attribute = `${data_gift}`;
                          }
                  
                          setTimeout(() => {
                              const data_local_cart = localStorage.getItem("ct_id");
                              $.post('/cart/update.js', {
                                  note: attribute,
                                  attributes: {
                                      '_gift_wrap': data_local_cart
                                  }
                              }).done(function() {
                                  jQuery('.ct_design_Gift_Main, .ct_cart_design_Gift_Main').hide();
                  
                                  const s_result = JSON.parse(localStorage.getItem('ct_id'));
                                  const uniq_id = s_result.find(val => val.product_id === __st.rid)?.c_id || "";
                                  const edit_send_data = {
                                      shop_url,
                                      page: __st.p,
                                      prod_id,
                                      variant_id: jQuery("form [name=id]").val(),
                                      sku: jQuery("form [name=id] option:selected").attr("data-sku"),
                                      method_call: "get_edit_the_data",
                                      uniq: uniq_id
                                  };
                  
                                  if (__st.rid === prod_id) {
                                      $.ajax({
                                          type: "POST",
                                          url,
                                          data: edit_send_data,
                                          success: function(response) {
                                              const obj = JSON.parse(response);
                                              if (__st.p === "product" && obj.product === "yes") {
                                                  jQuery('.ct_product .ct_gift_box_html').html(obj.main);
                                              }
                                              jQuery('.ct_product .ct_design_Gift_Main').html(obj.data);
                                              jQuery('.ct_product .ct_gift_box_html').show();
                                          }
                                      });
                                  }
                  
                                  jQuery('.ct_dev_loader').hide();
                                  mmajaxcart.AjaxcartOpen();
                                  mmajaxcart.AjaxcartRender();
                              });
                          }, 200);
                      } else {
                         var attribute = "";
                          fetch(`${window.Shopify.routes.root}cart/add.js`, {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify(formData)
                          }).then(response => response.json())
                          .then(data => {
                              const data_gift = data_local || "";
                              const arr = data_gift.split('/');
                              let isMatch = false;
                  
                              arr.forEach(val => {
                                  const sku_value = val.split('-');
                                  if (sku_value.includes(`SKU ${sku_val}`)) {
                                      isMatch = true;
                                      return false;
                                  }
                              });
                  
                              if (!isMatch && (card_val || box_val)) {
                                  const pair = `SKU ${sku_val}-CARD ${card_val}-BOX ${box_val}`;
                                 var attribute = `${data_gift}/${pair}`;
                              }
                            else
                              {
                                attribute = `${data_gift}`;
                              }
                  
                              setTimeout(() => {
                                  const data_local_cart = localStorage.getItem("ct_id");
                                  $.post('/cart/update.js', {
                                      note: attribute,
                                      attributes: {
                                          '_gift_wrap': data_local_cart
                                      }
                                  }).done(function() {
                                      jQuery('.ct_design_Gift_Main, .ct_cart_design_Gift_Main').hide();
                  
                                      const s_result = JSON.parse(localStorage.getItem('ct_id'));
                                      const uniq_id = s_result.find(val => val.product_id === __st.rid)?.c_id || "";
                                      const edit_send_data = {
                                          shop_url,
                                          page: __st.p,
                                          prod_id,
                                          variant_id: jQuery("form [name=id]").val(),
                                          sku: jQuery("form [name=id] option:selected").attr("data-sku"),
                                          method_call: "get_edit_the_data",
                                          uniq: uniq_id
                                      };
                  
                                      if (__st.rid === prod_id) {
                                          $.ajax({
                                              type: "POST",
                                              url,
                                              data: edit_send_data,
                                              success: function(response) {
                                                  const obj = JSON.parse(response);
                                                  if (__st.p === "product" && obj.product === "yes") {
                                                      jQuery('.ct_product .ct_gift_box_html').html(obj.main);
                                                  }
                                                  jQuery('.ct_product .ct_design_Gift_Main').html(obj.data);
                                                  jQuery('.ct_product .ct_gift_box_html').show();
                                              }
                                          });
                                      }
                  
                                      jQuery('.ct_dev_loader').hide();
                                      mmajaxcart.AjaxcartOpen();
                                      mmajaxcart.AjaxcartRender();
                                  });
                              }, 200);
                          }).catch(error => console.error('Error:', error));
                      }
                  }, 500);
                  })
                  
            
            
            
            }
        })
        }
      else
        {
          if(cust_contact_no_length < 10)
          {
            jQuery(".ct_msg_number").addClass("ct_error") 
            jQuery(".ct_no_error").show();
          }
          if(cust_contact_no == "")
          {
           jQuery(".ct_msg_number").addClass("ct_error") 
            jQuery(".ct_no_error").show();
          }
          // else
          // {
          //   jQuery(".ct_msg_number").removeClass("ct_error") 
          //   jQuery(".ct_no_error").hide();
          // }
          if(cust_name == "")
          {
            jQuery(".ct_msg_name").addClass("ct_error") 
            jQuery(".ct_name_error").show();
          }
          else
          {
            jQuery(".ct_msg_name").removeClass("ct_error") 
            jQuery(".ct_name_error").hide();
          } 
          if(!jQuery('.tab_2.ct_tabbing_accord .accordion').hasClass("active"))
          {
            jQuery(".tab_2.ct_tabbing_accord .accordion").click();  
          }
          if(!flag)
          {
            jQuery('.ct_error').show()            
          }
          
        }
        // if(flag != false && cust_name != "" && cust_contact_no != "" && gift_flag && c_flag)
        // { 
        //   jQuery(".ct_msg_error").hide();
        //   jQuery('.ct_error').hide()
        //   jQuery("#ct_gif_msg").removeClass("ct_error")
        //    jQuery.ajax({
        //      "url": url,
        //      "type": "post",
        //      "data": formData,
        //      processData: false, // important
        //      contentType: false, // important         
        //      "success": function(story_res) {            
        //         var s_result = jQuery.parseJSON(story_res);
        //        jQuery('.ct_design_Gift_inner').hide();
        //          jQuery('.CT_cart_save_box').show();
        //        jQuery('.ct_gift_box_html').html(s_result.data_html);
        //        if (typeof s_result.data != "undefined")
        //        {      
        //          var d={
        //            "product_id":__st.rid,
        //            "c_id":s_result.data
        //          }                  
        //          localStorage.setItem('ct_id', JSON.stringify(d));  
        //        }  
        //      }
        //    })           
        // }
        // else
        // {
        //   if(cust_name == "" || cust_contact_no == "")
        //   {
        //     jQuery(".ct_no_error").show();
        //     if(cust_contact_no == "")
        //     {
        //      jQuery(".ct_msg_number").addClass("ct_error") 
        //     }
        //     else
        //     {
        //       jQuery(".ct_msg_number").removeClass("ct_error") 
        //     }

        //   }
        //   jQuery('.ct_error').show()
        //   if(jQuery('.ct_product .panel_tabing').hasClass("active"))
        //   {

        //   }
        //   else
        //   {
        //     jQuery('.tab_2.ct_tabbing_accord .accordion').trigger('click');       
        //     jQuery(".ct_msg_error").show();
        //     jQuery("#ct_gif_msg").addClass("ct_error")
        //   }
        // }

    })

    jQuery(document).on("click", ".CT_cart_save_box_bottom_cart", function() {
        jQuery('.ct_product .ct_design_Gift_Main').hide();
        jQuery('.mm-ajaxcart-open').trigger("click");
    })


    $(document).on('click', '.ct_product .tab-link', function() {
      
        
        var tabID = $(this).attr('data-tab');
        console.log(tabID + " -- ");
        $(this).addClass('active').siblings().removeClass('active');

        $('.ct_product #tab-' + tabID).addClass('active').siblings().removeClass('active');

        var video_src=jQuery(".ct_product .record_video").attr("src")
        var audio_src=jQuery(".ct_product .record_audio").attr("src")
        if(typeof video_src != "undefined" )
        {
          $('.ct_product .record_video').get(0).pause(); 
        }
        if(typeof audio_src != "undefined")
        {
             $('.ct_product .record_audio').get(0).pause();           
        }
    });


    jQuery(document).on('change', '.ct_product .ct_record #audioFileInput', function() {
      
        var files = jQuery(this)[0].files[0];
           jQuery(".ct_product .ct_gift_tab.active  .tab-content.active .ct_wrap_tips").hide();
        jQuery('.ct_product .tab-content.active .ct_wrap_audio').show();
      jQuery('.ct_product .tab-content.active .ct_audio_recorded').hide(); 
        var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none"> <path d="M13.0767 6.28461L12.2834 5.36294C12.1317 5.18794 12.0092 4.86127 12.0092 4.62794V3.63627C12.0092 3.01794 11.5017 2.51044 10.8834 2.51044H9.8917C9.6642 2.51044 9.3317 2.38794 9.1567 2.23627L8.23503 1.44294C7.83253 1.09877 7.17337 1.09877 6.76503 1.44294L5.8492 2.24211C5.6742 2.38794 5.3417 2.51044 5.1142 2.51044H4.10503C3.4867 2.51044 2.9792 3.01794 2.9792 3.63627V4.63377C2.9792 4.86127 2.8567 5.18794 2.71087 5.36294L1.92337 6.29044C1.58503 6.69294 1.58503 7.34627 1.92337 7.74877L2.71087 8.67627C2.8567 8.85127 2.9792 9.17794 2.9792 9.40544V10.4029C2.9792 11.0213 3.4867 11.5288 4.10503 11.5288H5.1142C5.3417 11.5288 5.6742 11.6513 5.8492 11.8029L6.77087 12.5963C7.17337 12.9404 7.83253 12.9404 8.24087 12.5963L9.16253 11.8029C9.33753 11.6513 9.6642 11.5288 9.89753 11.5288H10.8892C11.5075 11.5288 12.015 11.0213 12.015 10.4029V9.41127C12.015 9.18377 12.1375 8.85127 12.2892 8.67627L13.0825 7.75461C13.4209 7.35211 13.4209 6.68711 13.0767 6.28461ZM9.9267 5.91711L7.1092 8.73461C7.02753 8.81627 6.9167 8.86294 6.80003 8.86294C6.68337 8.86294 6.57253 8.81627 6.49087 8.73461L5.0792 7.32294C4.91003 7.15377 4.91003 6.87377 5.0792 6.70461C5.24837 6.53544 5.52837 6.53544 5.69753 6.70461L6.80003 7.80711L9.30837 5.29877C9.47753 5.12961 9.75753 5.12961 9.9267 5.29877C10.0959 5.46794 10.0959 5.74794 9.9267 5.91711Z" fill="#08A217"></path> </svg>'

        jQuery(".accordion.active .ct_selected_value").html(svg + " Audio added");
        jQuery(".accordion.active .ct_selected_value").show()
       jQuery('.ct_product  #ct_save_btn').prop("disabled", false);
      
      $(".record_audio").attr("src", URL.createObjectURL(files));
        $(".record_audio").load();
       

    })
    jQuery(document).on('change', '.ct_product .ct_video_upload #videoFileInput', function() {


      //jQuery(".ct_video_record").after("<span style='color:red'>Please the video maximum size 5MB</span>");
        var video_size=jQuery(this)[0].files[0].size;
         var convert_into_mb=formatBytes(video_size);
      if(video_size <= 105000000)                       
      {
        jQuery(".ct_product .ct_gift_tab.active .ct_tip_lable").hide();
        jQuery(".ct_err_size").remove()
          jQuery(".ct_product .ct_gift_tab.active  .tab-content.active .ct_wrap_tips").hide();
          jQuery('.ct_product  .ct_video_record_video').addClass("ct_video_uploaded_done");
          jQuery('.ct_product  .ct_video_record_video').removeClass("ct_video_recorded_done");
          jQuery('.ct_product .tab-content.active .ct_audio_recorded').hide();
        jQuery('.ct_product .ct_return_video_wrap').show(); 
        jQuery('.ct_product .ct_video_play_show').hide(); 
        
        
        jQuery(".ct_product  #videoRecorded").show();
          var files = jQuery(this)[0].files[0];
        var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none"> <path d="M13.0767 6.28461L12.2834 5.36294C12.1317 5.18794 12.0092 4.86127 12.0092 4.62794V3.63627C12.0092 3.01794 11.5017 2.51044 10.8834 2.51044H9.8917C9.6642 2.51044 9.3317 2.38794 9.1567 2.23627L8.23503 1.44294C7.83253 1.09877 7.17337 1.09877 6.76503 1.44294L5.8492 2.24211C5.6742 2.38794 5.3417 2.51044 5.1142 2.51044H4.10503C3.4867 2.51044 2.9792 3.01794 2.9792 3.63627V4.63377C2.9792 4.86127 2.8567 5.18794 2.71087 5.36294L1.92337 6.29044C1.58503 6.69294 1.58503 7.34627 1.92337 7.74877L2.71087 8.67627C2.8567 8.85127 2.9792 9.17794 2.9792 9.40544V10.4029C2.9792 11.0213 3.4867 11.5288 4.10503 11.5288H5.1142C5.3417 11.5288 5.6742 11.6513 5.8492 11.8029L6.77087 12.5963C7.17337 12.9404 7.83253 12.9404 8.24087 12.5963L9.16253 11.8029C9.33753 11.6513 9.6642 11.5288 9.89753 11.5288H10.8892C11.5075 11.5288 12.015 11.0213 12.015 10.4029V9.41127C12.015 9.18377 12.1375 8.85127 12.2892 8.67627L13.0825 7.75461C13.4209 7.35211 13.4209 6.68711 13.0767 6.28461ZM9.9267 5.91711L7.1092 8.73461C7.02753 8.81627 6.9167 8.86294 6.80003 8.86294C6.68337 8.86294 6.57253 8.81627 6.49087 8.73461L5.0792 7.32294C4.91003 7.15377 4.91003 6.87377 5.0792 6.70461C5.24837 6.53544 5.52837 6.53544 5.69753 6.70461L6.80003 7.80711L9.30837 5.29877C9.47753 5.12961 9.75753 5.12961 9.9267 5.29877C10.0959 5.46794 10.0959 5.74794 9.9267 5.91711Z" fill="#08A217"></path> </svg>'
  
          jQuery(".accordion.active .ct_selected_value").html(svg + " Video added");
          jQuery(".accordion.active .ct_selected_value").show()
          jQuery(".accordion.active").parent().addClass("ct_fill_active");
          jQuery('.ct_product  #ct_save_btn').prop("disabled", false);
          $(".record_video").attr("src", URL.createObjectURL(files));
          $(".record_video").load();

         var prod_id = __st.rid;
                      clevertap.event.push("Gifinting Message Added", {
                        "Message type":"Video",
                        "Product ID":prod_id,
                        });

          
      }
      else
      {        
        jQuery(".ct_video_record").after("<span class='ct_err_size' style='color:red'>Your file size is of "+convert_into_mb+", please keep it under 100MB</span>")
      }
    })

  jQuery(document).on('change', '.ct_product #startRecord #videoFile', function() {


      //jQuery(".ct_video_record").after("<span style='color:red'>Please the video maximum size 5MB</span>");
        var video_size=jQuery(this)[0].files[0].size;
         var convert_into_mb=formatBytes(video_size);
      if(video_size <= 105000000)                       
      {
        jQuery(".ct_product .ct_gift_tab.active .ct_tip_lable").hide();
        jQuery(".ct_err_size").remove()
          jQuery(".ct_product .ct_gift_tab.active  .tab-content.active .ct_wrap_tips").hide();
          jQuery('.ct_product  .ct_video_record_video').addClass("ct_video_uploaded_done");
          jQuery('.ct_product  .ct_video_record_video').removeClass("ct_video_recorded_done");
          jQuery('.ct_product .tab-content.active .ct_audio_recorded').hide();
        jQuery('.ct_product .ct_return_video_wrap').show(); 
        jQuery('.ct_product .ct_video_play_show').hide(); 
        
        
        jQuery(".ct_product  #videoRecorded").show();
          var files = jQuery(this)[0].files[0];
        var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none"> <path d="M13.0767 6.28461L12.2834 5.36294C12.1317 5.18794 12.0092 4.86127 12.0092 4.62794V3.63627C12.0092 3.01794 11.5017 2.51044 10.8834 2.51044H9.8917C9.6642 2.51044 9.3317 2.38794 9.1567 2.23627L8.23503 1.44294C7.83253 1.09877 7.17337 1.09877 6.76503 1.44294L5.8492 2.24211C5.6742 2.38794 5.3417 2.51044 5.1142 2.51044H4.10503C3.4867 2.51044 2.9792 3.01794 2.9792 3.63627V4.63377C2.9792 4.86127 2.8567 5.18794 2.71087 5.36294L1.92337 6.29044C1.58503 6.69294 1.58503 7.34627 1.92337 7.74877L2.71087 8.67627C2.8567 8.85127 2.9792 9.17794 2.9792 9.40544V10.4029C2.9792 11.0213 3.4867 11.5288 4.10503 11.5288H5.1142C5.3417 11.5288 5.6742 11.6513 5.8492 11.8029L6.77087 12.5963C7.17337 12.9404 7.83253 12.9404 8.24087 12.5963L9.16253 11.8029C9.33753 11.6513 9.6642 11.5288 9.89753 11.5288H10.8892C11.5075 11.5288 12.015 11.0213 12.015 10.4029V9.41127C12.015 9.18377 12.1375 8.85127 12.2892 8.67627L13.0825 7.75461C13.4209 7.35211 13.4209 6.68711 13.0767 6.28461ZM9.9267 5.91711L7.1092 8.73461C7.02753 8.81627 6.9167 8.86294 6.80003 8.86294C6.68337 8.86294 6.57253 8.81627 6.49087 8.73461L5.0792 7.32294C4.91003 7.15377 4.91003 6.87377 5.0792 6.70461C5.24837 6.53544 5.52837 6.53544 5.69753 6.70461L6.80003 7.80711L9.30837 5.29877C9.47753 5.12961 9.75753 5.12961 9.9267 5.29877C10.0959 5.46794 10.0959 5.74794 9.9267 5.91711Z" fill="#08A217"></path> </svg>'
  
          jQuery(".accordion.active .ct_selected_value").html(svg + " Video added");
          jQuery(".accordion.active .ct_selected_value").show();
          jQuery(".accordion.active").parent().addClass("ct_fill_active")
        jQuery('.ct_product  #ct_save_btn').prop("disabled", false);
          $(".record_video").attr("src", URL.createObjectURL(files));
          $(".record_video").load();
          
      }
      else
      {        
        jQuery(".ct_video_record").after("<span class='ct_err_size' style='color:red'>Your file size is of "+convert_into_mb+", please keep it under 100MB</span>")
      }
    })



    $(document).on('click', '.ct_product .ct_record_record', function() {
        jQuery(this).closest('.active').find('.ct_audio_recorded').toggleClass("ct_record_show");
    })

    $(document).on('click', '.ct_product .ct_video_record .ct_record_record', function() {
        jQuery(this).closest('.active').find('.ct_video_record_video').toggleClass("ct_video_record_show");
        jQuery(".ct_audio_recorded.ct_record_show").show();
    })




    // function saveAudioData(recordedChunks) {
    //     // Convert the recordedChunks array to a FormData object   

    //     formData.append('audio', new Blob(recordedChunks));            
    // }
    var sliders = document.querySelectorAll('.items_scroll');
    var isDown = false;
    var startX;
    var scrollLeft;

    sliders.forEach(slider => {
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });

        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('active');
            enableLinks(); // Re-enable links on mouse leave
        });

        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('active');
            enableLinks(); // Re-enable links on mouse up
        });

        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 1; // scroll-fast
            slider.scrollLeft = scrollLeft - walk;
            disableLinks(); // Disable links when scrolling horizontally
        });
    });

    function disableLinks() {
        var links = document.querySelectorAll('.items_scroll .items_scroll_list');
        links.forEach(link => {
            link.style.pointerEvents = 'none'; // Disable link clicks
        });
    }

    function enableLinks() {
        var links = document.querySelectorAll('.items_scroll .items_scroll_list');
        links.forEach(link => {
            link.style.pointerEvents = 'auto'; // Re-enable link clicks
        });
    }



    /****** cart Drawer  **/
    jQuery(document).on('click', '.ct_ajax_cart .ct_save #ct_save_btn', function() {
        var cartformData = new FormData();
        var card = jQuery(".ct_ajax_cart .ct_gift_tab  input[name='gift_cart']:checked").val();
        var msg_type = jQuery('.ct_ajax_cart .ct_gift_tab .tabs .tab-link.active').attr('data-tab');
        var gift_box = jQuery(".ct_ajax_cart .ct_gift_tab .ct_gift_box input[name='card_cart']:checked").val();
        var cust_name = jQuery(".ct_ajax_cart .tab-content.active .ct_wrap_contact .ct_msg_name").val();
        var cust_contact_no = jQuery(".ct_ajax_cart .tab-content.active .ct_wrap_contact .ct_msg_number").val();
        var msg_value = "";
        console.log(card + " == " + gift_box);
        var flag = false;
        var c_flag, gift_flag = false;
        var content = jQuery(".ct_wrap_contact .ct_msg_number").val()[0];
        if ($('.ct_ajax_cart  .ct_gift_box input[name="card"]:checked').length > 0) {
            c_flag = true;
        }
        if ($('.ct_ajax_cart  .ct_cart input[name="gift"]:checked').length > 0) {
            gift_flag = true;
        }
        if (content > 5) {
            flag = false;
        } else {
            flag = true;
        }
        if (msg_type == 1) {
            msg_value = jQuery(".ct_ajax_cart .ct_gift_tab #ct_gif_msg").val();
            if (msg_value != "") {
                flag = true;
            }
            cartformData.append('text', msg_value);

        } else if (msg_type == 2) {
            //  msg_value=jQuery(".ct_gift_tab #download").attr('href');
            // cartformData.append('audio',  new Blob(msg_value));
            const audioFileInput = document.getElementById('audioFileInput');
            const audioFile = audioFileInput.files[0];
            if (audioFile != "") {
                flag = true;
            }
            //msg_value=jQuery(".ct_gift_tab .ct_audio_file").files[0];
            var edit_audio = jQuery('.ct_ajax_cart .ct_record  audio source').attr('src')
            if (typeof audioFile != "undefined") {
                cartformData.append('audio', audioFile);
            } else if (edit_audio != "") {
                cartformData.append('audio', "");
            }


        } else if (msg_type == 3) {
            if (recordedChunks_video != "") {
                const blob = new Blob(recordedChunks_video, {
                    type: 'video/webm'
                });
                cartformData.append('video', blob);
            } else {
                const videoFileInput = document.querySelector('.ct_ajax_cart #videoFileInput');
                const videoFile = videoFileInput.files[0];
                cartformData.append('video', videoFile);
            }
            var video_check = jQuery(".ct_video_play_show .source").attr('src');
            if (video_check != "") {
                flag = true;
            }
        }



        var data = {
            "card": card,
            "msg_type": msg_type,
            "gift_box": gift_box,
            "cust_name": cust_name,
            "cust_no": cust_contact_no
        }
        console.log(data);
        cartformData.append('shop_url', shop_url);
        cartformData.append('setting_data', JSON.stringify(data));
        var edit_btn = jQuery(this).attr("data-edit");
        if (edit_btn != "") {
            var c_id = localStorage.getItem('ct_id');
            var s_result = jQuery.parseJSON(c_id);

            cartformData.append('uniq_cid', s_result);
            cartformData.append('method_call', "update_gift_box");
        } else {
            cartformData.append('method_call', "save_gift");
        }
        if (window.location.search == "?name=rocky") {
            var url = "http://localhost/new_gift_app/data_gift_request.php";
        } else {
            var url = "https://gifting.kushals.com/new_gift_app/data_gift_request.php"
        }

        if (flag != false && cust_name != "" && cust_contact_no != "" && gift_flag && c_flag) {
            jQuery.ajax({
                "url": url,
                "type": "post",
                "data": cartformData,
                processData: false, // important
                contentType: false, // important         
                "success": function(story_res) {
                    var s_result = jQuery.parseJSON(story_res);
                    if (s_result.success == "true") {
                        jQuery('.ct_ajax_cart .ct_design_Gift_box .accordion').removeClass("active");
                        jQuery('.ct_ajax_cart .ct_design_Gift_box .panel').hide()
                        if ($('.ct_ajax_cart .ct_design_Gift_Main:visible').length != 0) {
                            //jQuery(".ct_ajax_cart .ct_cart_edit").trigger("click");
                        }
                        jQuery('.ct_ajax_cart .CT_cart_save_box').show();

                    }
                    if (typeof s_result.data != "undefined") {
                        localStorage.setItem('ct_id', s_result.data);
                    }
                }
            })
        } else {
            if (cust_name == "" || cust_contact_no == "") {
                jQuery(".ct_no_error").show();
            }
            jQuery('.ct_error').show()
            if (jQuery('.ct_ajax_cart .tab-wrapper .tabs .tab-link').hasClass("active")) {

            } else {
                jQuery('.tab_2.ct_tabbing_accord .accordion').trigger('click');
            }
        }
    })

    $(document).on('click', '.ct_ajax_cart .tab-link', function() {

        var tabID = $(this).attr('data-tab');

        $(this).addClass('active').siblings().removeClass('active');

        $('.ct_ajax_cart  #tab-' + tabID).addClass('active').siblings().removeClass('active');
    });

    var formData = new FormData();
    jQuery(document).on('click', '.mm-ajaxcart-items .ct_gift_btn', function() {
      var prod_id=jQuery(this).closest('li').find(".ct_cart_gift").attr("data-prod-id");
      var var_id=jQuery(this).closest('li').find(".ct_cart_gift").attr("data-var-id");
      var sku=jQuery(this).closest('li').find(".ct_cart_gift").attr("data-sku");
      
      
      //var prod_id = __st.rid;
        var data = {
            "shop_url": shop_url,
            "page": __st.p,
            "prod_id": prod_id,
            "variant_id":var_id,
            "sku":sku,
            "method_call": "get_the_data"
        }
        $.ajax({
            type: "POST",
            url: url,
            data: data,
            success: function(response) {
                var obj = jQuery.parseJSON(response);
                //jQuery('.ct_product .ct_gift_box_html').html(obj.main)
                jQuery('.ct_product .ct_cart_design_Gift_Main').html(obj.data)
                
             // jQuery('.ct_design_Gift_Main').show()  
              
              jQuery('.ct_cart_design_Gift_Main').show()  
              jQuery('.ct_cart_design_Gift_Main').addClass("active");
              //jQuery('.ct_product .ct_gift_box_html').show()
                // jQuery('.ct_cart').html(obj.card)
                // jQuery('.ct_gift_box').html(obj.gift)
                //console.log(obj);
              jQuery("body").addClass("ct_stop_scroll");
              jQuery(".mm-ajaxcart-close").click();
            }
        });
    })

    jQuery(document).on('click', '.ct_ajax_cart .ct_close_gift', function() {
        jQuery(".accordion").removeClass("active")
        jQuery(".panel_tabing").removeClass("active")

        jQuery('.ct_ajax_cart .ct_design_Gift_Main').hide();
    })
    jQuery(document).on('click', '.ct_ajax_cart .CT_cart_save_box_close', function() {
        jQuery('.ct_ajax_cart .CT_cart_save_box').hide();
    })

    jQuery(document).on('change', '.ct_ajax_cart .ct_record #audioFileInput', function() {
        var files = jQuery(this)[0].files[0];
        jQuery('.record_audio').show();
        $(".record_audio").attr("src", URL.createObjectURL(files));
        $(".record_audio").load();

    })
    jQuery(document).on('change', '.ct_ajax_cart .ct_video_upload #videoFileInput', function() {
        jQuery('.ct_ajax_cart  .ct_video_record_video').addClass("ct_video_uploaded_done");
        jQuery('.ct_ajax_cart  .ct_video_record_video').removeClass("ct_video_recorded_done");
        jQuery('.ct_ajax_cart .ct_video_play_show').hide();
        var files = jQuery(this)[0].files[0];
        $(".record_video").attr("src", URL.createObjectURL(files));
        $(".record_video").load();

    })
    $(document).on('click', '.ct_ajax_cart .ct_record_record', function() {
        jQuery(this).closest('.active').find('.ct_audio_recorded').toggleClass("ct_record_show");
    })

    $(document).on('click', '.ct_ajax_cart .ct_video_record .ct_record_record', function() {
        jQuery(this).closest('.active').find('.ct_video_record_video').toggleClass("ct_video_record_show");
    })
    jQuery(document).on("click", ".ct_ajax_cart .ct_return_video_wrap .ct_return_btn", function() {
        jQuery(".ct_ajax_cart .ct_video_record_video  .ct_audio_recorded").show();
        jQuery(".ct_ajax_cart .ct_video_record_video  .ct_return_video_wrap").hide();
       // jQuery(".accordion.active").parent().removeClass("ct_fill_active")
    })
    // 		jQuery(document).on('click', '.ct_ajax_cart  .ct_design_Gift_box  .accordion', function() {

    // 	$(this).toggleClass("active");
    // 	var panel_cart = $(this).closest('.ct_tabbing_accord').find(".panel");
    // 	//var panel_cart = $(this).next(".panel");

    // 	panel_cart.slideToggle();
    // });
    jQuery(document).on("click", ".ct_ajax_cart .ct_cart_edit", function() {
        jQuery('.ct_ajax_cart .ct_design_Gift_Main').toggle();
    })
    jQuery(document).on("click", ".ct_product .ct_cart_edit", function() {
        jQuery('.ct_product .ct_design_Gift_Main').show();
      
      jQuery('.ct_product .ct_design_Gift_Main').addClass("active");
              jQuery('.ct_product .ct_cart_design_Gift_Main').addClass("active");
    })
    jQuery(document).on("input",".ct_wrap_contact .ct_msg_name",function(e) {
        var value_no = jQuery(this).val();
        jQuery(".ct_wrap_contact .ct_msg_name").val(value_no);
    })
    // jQuery(".ct_wrap_contact .ct_msg_number").on('input',function(e){

    // })
    jQuery(document).on("input", ".ct_gift_tab.active .ct_msg_number", function(e) {

        var value = jQuery(this).val();
        jQuery(".ct_wrap_contact .ct_msg_number").val(value);

       $(this).val($(this).val().replace(/\D/g, '')); // Remove non-digit characters
        if ($(this).val().length > 10) {
            $(this).val($(this).val().slice(0, 10));
        }

        setTimeout(function() {

            var content = jQuery(".ct_wrap_contact .ct_msg_number").val()[0]

            console.log(content);
            // var entered = $(this).val(),
            //   content = parseInt(entered,10);    
            if (content <= 5) {
                jQuery(".ct_msg_number").addClass("ct_error");
                jQuery(".ct_no_error").show();
                return false;
            } else {
                jQuery(".ct_msg_number").removeClass("ct_error");
                jQuery(".ct_no_error").hide();
            }
        }, 100)
        var charCode = (e.which) ? e.which : event.keyCode;
        if (String.fromCharCode(charCode).match(/[^0-9]/g)) {
            jQuery(".ct_no_error").hide();
            return false;
        }
    });

    jQuery(document).on("click", ".ct_gift_clear", function() {

        var prod_id = __st.rid;
        var variant_id=jQuery("form [name=id]").val();
        var sku=jQuery("form [name=id] option:selected").attr("data-sku");
        var data = {

            "shop_url": shop_url,
            "page": __st.p,
            "prod_id": prod_id,          
            "variant_id":variant_id,
            "sku":sku,
            "method_call": "get_the_data"
        }
        $.ajax({
            type: "POST",
            url: url,
            data: data,
            success: function(response) {



                  $.get('/cart.json', function(cart) {
                      setTimeout(function(){
                          var data_local = ""
                          if (typeof cart.note != "undefined") {
                              var data = cart.note;
                              var data_local = data;
                          } else {
                              var data_local = "";
                          }
                          var available_id=false;
                          var main_sku_change="";
                          $.each(cart.items,function(i,val){
                              
                            if(val.product_id == prod_id)
                            {
                              available_id=true;
                              main_sku_change=val.sku;
                              return false;
                            }
                          })  
              
                          if(available_id )
                          {
                              var data_gift = data_local ? data_local : "";
                              
                              var isMatch = false;
                              var arr = data_gift.split('/');
                              var attribute="";
                              $.each(arr, function(i, val) {
                                if(val != "")
                                {
                                    var sku_value = val.split('-');
                                    //console.log(sku_value)
                                var replace_value="";
                                         console.log(val+" == "+sku_value);
                                      if(jQuery.inArray(main_sku_change, sku_value) !== -1)
                                      {  
                                         //if(sku_val in sku_value){
                                        //   alert("dfd");
                                        
                                         isMatch = true;
                                        replace_value="";
                                        
                                        console.log(data_gift," == ", val," == ",replace_value);
                                        var data=data_gift.replace("/"+val,replace_value);
                                        // console.log(data);
                                          attribute= data;
                                         //sku_val[sk_val]=card_val;
                                         return false; 
                                                                        
                                       } 
                                  
                                }
                                
                                    
                                 });
              
                              
                            
                             var get_ct_data = localStorage.getItem('ct_id');
                             var s_result = jQuery.parseJSON(get_ct_data);
                            
                                $.each(s_result, function(i, val) {
                                    if (prod_id == val.product_id) {
                                        get_new_data_request = true;
                                      
                                      var index = s_result.indexOf(val.c_id);//get index 
                                      s_result.splice(index, 1);//remove it
                                      localStorage.setItem('ct_id', JSON.stringify(s_result));//set again
                                        return false;
                                    }
                                });
                              setTimeout(function(){                                
                                 var data_local_cart = localStorage.getItem("ct_id");
                                 $.post('/cart/update.js', {
                                         note: attribute,
                                         attributes: {
                                                 '_gift_wrap': data_local_cart
                                               }
                                     })
                              },500)
                          }
              
                          
                      },500)
                  
                  
                  })

              

              
                var obj = jQuery.parseJSON(response);
                jQuery('.ct_product .ct_gift_box_html').html(obj.main)
                jQuery('.ct_product .ct_design_Gift_Main').html(obj.data)
                jQuery('.ct_product .ct_gift_box_html').show();
                


            }
        });
    })

 
      $(document).on("keyup","#ct_gif_msg",function(){
        var txt_length=$(this).val().length;
        if(txt_length <= 400)
        {
          
            $(".text_count").text(($(this).val().length)+" / 400");
        }
        else
        {
            $(".text_count").text("400 / 400");
          
        }
          if($(this).val().length > 0)
          {
            jQuery('.ct_product  #ct_save_btn').prop("disabled", false);
          }else
          {
            jQuery('.ct_product  #ct_save_btn').prop("disabled", true);
          }
        });

  
     /**** Gifting 2.0 30-04-2024  ******/
      jQuery(document).on("click",".ct_wrap_list .ct_tag_list",function(){
        jQuery(".ct_wrap_list .ct_tag_list").removeClass("ct_tag_active")
        var data_id=jQuery(this).attr("data-id");
        jQuery(this).addClass("ct_tag_active");
        jQuery(".tab-content .ct_inner_html").removeClass("ct_tag_active")
        jQuery(".tab-content .ct_inner_html").each(function(){
            var in_data_id=jQuery(this).attr('data-id')
            
            if(in_data_id == data_id)
            {
                jQuery(this).addClass("ct_tag_active");
            }
        })
    })

    jQuery(document).on("click",".ct_inner_html.ct_tag_active .ct_in_data",function(){
      var select_text =jQuery(this).text();
      var textbox_text=jQuery(".tab-content.active #ct_gif_msg").val();

      var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none"> <path d="M13.0767 6.28461L12.2834 5.36294C12.1317 5.18794 12.0092 4.86127 12.0092 4.62794V3.63627C12.0092 3.01794 11.5017 2.51044 10.8834 2.51044H9.8917C9.6642 2.51044 9.3317 2.38794 9.1567 2.23627L8.23503 1.44294C7.83253 1.09877 7.17337 1.09877 6.76503 1.44294L5.8492 2.24211C5.6742 2.38794 5.3417 2.51044 5.1142 2.51044H4.10503C3.4867 2.51044 2.9792 3.01794 2.9792 3.63627V4.63377C2.9792 4.86127 2.8567 5.18794 2.71087 5.36294L1.92337 6.29044C1.58503 6.69294 1.58503 7.34627 1.92337 7.74877L2.71087 8.67627C2.8567 8.85127 2.9792 9.17794 2.9792 9.40544V10.4029C2.9792 11.0213 3.4867 11.5288 4.10503 11.5288H5.1142C5.3417 11.5288 5.6742 11.6513 5.8492 11.8029L6.77087 12.5963C7.17337 12.9404 7.83253 12.9404 8.24087 12.5963L9.16253 11.8029C9.33753 11.6513 9.6642 11.5288 9.89753 11.5288H10.8892C11.5075 11.5288 12.015 11.0213 12.015 10.4029V9.41127C12.015 9.18377 12.1375 8.85127 12.2892 8.67627L13.0825 7.75461C13.4209 7.35211 13.4209 6.68711 13.0767 6.28461ZM9.9267 5.91711L7.1092 8.73461C7.02753 8.81627 6.9167 8.86294 6.80003 8.86294C6.68337 8.86294 6.57253 8.81627 6.49087 8.73461L5.0792 7.32294C4.91003 7.15377 4.91003 6.87377 5.0792 6.70461C5.24837 6.53544 5.52837 6.53544 5.69753 6.70461L6.80003 7.80711L9.30837 5.29877C9.47753 5.12961 9.75753 5.12961 9.9267 5.29877C10.0959 5.46794 10.0959 5.74794 9.9267 5.91711Z" fill="#08A217"></path> </svg>'
 
       
      if(textbox_text != "")
      {
          jQuery(".tab-content.active #ct_gif_msg").val(textbox_text+" "+select_text)        
      }
      else
      {
          jQuery(".tab-content.active #ct_gif_msg").val(select_text)
      }
      

var textbox=$(".tab-content.active #ct_gif_msg")
      

      var elem = $('#area');
    var intervalId;

    var trimText = function() {
        textbox.val(textbox.val().substring(0, 400));
    };
    
    textbox.focus(function() {
        intervalId = setInterval(trimText, 500);
    });
    
    textbox.blur(function() {
        clearInterval(intervalId);
        trimText();
    });



      
      
      
        var textbox_element = textbox.get(0); // Get the DOM element
      textbox_element.selectionStart = textbox_element.selectionEnd = textbox_element.value.length;
 jQuery(".tab-content.active #ct_gif_msg").trigger("keyup");
      $("#ct_gif_msg").focus();
       var t=jQuery(".tab-content.active #ct_gif_msg").val();
       if (t.length > 0) {
           jQuery(".accordion.active").parent().addClass("ct_fill_active")
          jQuery(".accordion.active .ct_selected_value").html(svg + " Text added");
          jQuery(".accordion.active .ct_selected_value").show();

             var prod_id = __st.rid;
            clevertap.event.push("Gifinting Message Added", {
              "Message type":"Note",
              "Product ID":prod_id,
              });
      } else {
           jQuery(".accordion.active").parent().removeClass("ct_fill_active")
        var svg_notselected='<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M12.8636 6.29216L12.0703 5.37049C11.9186 5.19549 11.7961 4.86883 11.7961 4.63549V3.64383C11.7961 3.02549 11.2886 2.51799 10.6703 2.51799H9.67863C9.45113 2.51799 9.11863 2.39549 8.94363 2.24383L8.02196 1.45049C7.61946 1.10633 6.96029 1.10633 6.55196 1.45049L5.63613 2.24966C5.46113 2.39549 5.12863 2.51799 4.90113 2.51799H3.89196C3.27363 2.51799 2.76613 3.02549 2.76613 3.64383V4.64133C2.76613 4.86883 2.64363 5.19549 2.49779 5.37049L1.71029 6.29799C1.37196 6.70049 1.37196 7.35383 1.71029 7.75633L2.49779 8.68383C2.64363 8.85883 2.76613 9.18549 2.76613 9.41299V10.4105C2.76613 11.0288 3.27363 11.5363 3.89196 11.5363H4.90113C5.12863 11.5363 5.46113 11.6588 5.63613 11.8105L6.55779 12.6038C6.96029 12.948 7.61946 12.948 8.02779 12.6038L8.94946 11.8105C9.12446 11.6588 9.45113 11.5363 9.68446 11.5363H10.6761C11.2945 11.5363 11.802 11.0288 11.802 10.4105V9.41883C11.802 9.19133 11.9245 8.85883 12.0761 8.68383L12.8695 7.76216C13.2078 7.35966 13.2078 6.69466 12.8636 6.29216ZM9.71363 5.92466L6.89613 8.74216C6.81446 8.82383 6.70363 8.87049 6.58696 8.87049C6.47029 8.87049 6.35946 8.82383 6.27779 8.74216L4.86613 7.33049C4.69696 7.16133 4.69696 6.88133 4.86613 6.71216C5.03529 6.54299 5.31529 6.54299 5.48446 6.71216L6.58696 7.81466L9.09529 5.30633C9.26446 5.13716 9.54446 5.13716 9.71363 5.30633C9.88279 5.47549 9.88279 5.75549 9.71363 5.92466Z" fill="#E6DD0A"></path> </svg>';
          jQuery(".accordion.active .ct_selected_value").html(svg_notselected+" Not Selected");
          //jQuery(".accordion.active .ct_selected_value").hide();
      }

  })
  jQuery(document).on("click",".cotch-middle-video .cotch-middel-button",function(){
    jQuery(".cotch-middel.cotch-middle-video").hide();
    jQuery(".cotch-middel.cotch-middel-note").show()
  })
  
  jQuery(document).on("click",".cotch-middel-note .cotch-middel-button",function(){
    jQuery(".cotch-middel.cotch-middel-note").hide()
    jQuery(".cotch-middel.cotch-middel-voice").show();
  })
  
  jQuery(document).on("click",".cotch-middel-voice .cotch-middel-button",function(){
    jQuery(".ct-cotch-mark").hide();
    localStorage.setItem('ct_coach_mark', true);  

  })
  $(document).on('click', '.ct-cotch-mark', function(event) {
    if (!$(event.target).is('button')) {
       var type_value=jQuery('.cotch-middel:visible').attr("data-value");
      jQuery(".tab-wrapper ul li span").each(function(){
        var value_type=jQuery(this).text().toLowerCase();
        console.log(value_type+" == "+type_value);
        if(value_type == type_value)
        {
          jQuery(".ct-cotch-mark").hide();
           localStorage.setItem('ct_coach_mark', true);  
          jQuery(this).parent().click();
        }
      })
    }
});
  
})

    function openContactPicker() {
      const supported = "contacts" in navigator && "ContactsManager" in window;

      if (supported) {
        getContacts();
      } else {
        alert(
          "Contact list API not supported!. Only for android mobile chrome and chrome version > 80"
        );
      }
    }
    async function getContacts() {
      const props = ["name", "email", "tel"];
      const opts = { multiple: true };

      try {
        const contacts = await navigator.contacts.select(props, opts);
        // var json_encode=JSON.stringify(contacts);
        //  var con_data = jQuery.parseJSON(json_encode);
        // // var con_data = jQuery.parseJSON(con_data);
        // alert(contacts)
        // alert(contacts['tel']+" == "+contacts['name'])

        // Assuming contacts is an array of contact objects
        for (let i = 0; i < contacts.length; i++) {
            const contact = contacts[i];
          if(contact.name != "" && contact.tel != "")
          {
            jQuery(".ct_msg_name").val(contact.name)
            jQuery(".ct_msg_number").val(contact.tel)
          }
          
        }
        
        //alert(JSON.stringify(contacts));
      } catch (err) {
        alert(err);
      }
    }
   

