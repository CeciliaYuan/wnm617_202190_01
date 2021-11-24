
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
         case "page-map-add": MapAddPage(); break;
         case "page-bread-edit": BreadEditPage(); break;
         case "page-edit-profile": UserEditPgae(); break;
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

   // Search function
 


});