
// DOCUMENT READY
$(()=>{
   checkUserId();


   // Event Delegation
   $(document)

   .on("pagecontainerbeforeshow",function(event, ui){
      // Page Routing
      switch(ui.toPage[0].id) {
         case "page-list": ListPage(); break;
         case "page-user-profile": UserProfilePage(); break;
         case "page-bread-profile": BreadProfilePage(); break;
         case "page-map": MapPage(); break;
         case "page-map-add": BreadAddPage(); break;
         case "page-bread-edit": BreadEditPage(); break;
         case "page-edit-profile": UserEditPgae(); break;
         case "page-add-location": LocationSetLocationPage(); break;
         case "page-map-location-add" : LocationChooseBreadPage(); break;
      }
   })



   // FORM SUBMITS

   .on("submit","#signin-form",function(e) {
      e.preventDefault();
      checkSigninForm();
   })

   .on("submit","#list-add-form",function(e) {
      e.preventDefault();
   })


   .on("submit", "#signup-form", function(e) {
      e.preventDefault();
      userAddForm();
   })

   .on("submit", "#searchBar", function(e) {
      e.preventDefault();
      let s = $(this).find("input").val();
      checkSearchForm(s);
   })


   // ANCHOR CLICKS
   .on("click",".js-logout",function(e) {
      e.preventDefault();
      sessionStorage.removeItem("userId");
      checkUserId();
   })


    .on("click",".bread-jump",function(e) {
      if(!$(this).data("id")) throw("No ID on element");
      sessionStorage.breadId = $(this).data("id");
      $.mobile.navigate("#page-bread-profile");
   })


   // FORM ANCHOR CLICKS

    .on("click",".js-submituseredit",function(e) {
      e.preventDefault();
      userEditForm();

      let image = $("#user-upload-filename").val();
      query({
         type:"update_user_image",
         params: [image,sessionStorage.userId]
      }).then(d=>{
         if(d.error) throw(d.error);

         history.go(-1);
      })
   })

     .on("click",".js-submituserpassword",function(e) {
      e.preventDefault();
      userEditPasswordForm();
   })

     .on("click",".js-submitlocationform",function(e) {
      e.preventDefault();
      locationAddForm();
   })

     .on("click",".js-saveaddbreadform",function(e){
      e.preventDefault();
      breadAddForm();
   })

     .on("click",".js-breadeditform",function(e){
      e.preventDefault();
      breadEditForm();
   })


     .on("click",".js-breadsearch",function(e){
      e.preventDefault();
      let s = $(this).find("input").val();
      console.log(s)
   })

      .on("click",".js-delete-bread",function(e){
      query({
         type:"delete_bread",
         params: [sessionStorage.breadId]
      }).then(d=>{
         history.go(-2);
      })
   })

   .on("click","[data-filter]",function(e){
      let {filter,value} = $(this).data();
      if(value=="") ListPage();
      else checkFilter(filter,value);
   })


   .on("change",".image-picker input",function(e){
      checkUpload(this.files[0])
      .then(d=>{
         console.log(d);
         $(this).parent().prev().val("uploads/"+d.result);
         $(this).parent().css({
            "background-image":`url(uploads/${d.result})`
         });
      })
   })

   // Search function

   .on("submit","#searchBar",function(e){
      e.preventDefault();
      let search = $("#search").val();
      if(search=="") {
         showListPage();
      } else {
         query({
            type:'breads_search',
            params:[
               sessionStorage.userId
            ]
         }).then(d=>{
            if(d.error) throw d.error;
            else showListPage(d.result);
         })
      }
   })

  // On Change

  .on("change","#location-bread-choice-select",function(e){
      $("#location-bread-choice").val(this.value)
   })


   .on("click","[data-activate]",function(e){
      e.preventDefault();
      let target = $(this).data("activate");
      $(target).addClass("active");
   })
   .on("click","[data-deactivate]",function(e){
      e.preventDefault();
      let target = $(this).data("deactivate");
      $(target).removeClass("active");
   })
   .on("click","[data-toggle]",function(e){
      e.preventDefault();
      let target = $(this).data("toggle");
      $(target).toggleClass("active");
   })

      $("[data-template]").each(function(){
      let target = $(this).data("template");
      $(this).html($(target).html());
   })



});
