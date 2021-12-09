const breadAddForm = async () => {
   let name = $("#bread-add-name").val();
   let bakery = $("#bread-add-bakery").val();
   let tag = $("#bread-add-tag").val();
   let description = $("#bread-add-description").val();

   let r = await query({
      type:'insert_bread',
      params:[sessionStorage.userId,name,bakery,tag,description]
   });

   if(r.error) throw(r.error);

   sessionStorage.breadId = r.id;
   history.go(-1);
}

const breadEditForm = async () => {
   let name = $("#bread-edit-name").val();
   let bakery = $("#bread-edit-bakery").val();
   let tag = $("#bread-edit-tag").val();
   let description = $("#bread-edit-description").val();

   let r = await query({
      type:'update_bread',
      params:[name,bakery,tag,description,sessionStorage.breadId]
   });

   if(r.error) throw(r.error);

   history.go(-1);
}


const userAddForm = async () => {
   let name = $("#signup-name").val();
   let username = $("signup-username");
   let email = $("#signup-email").val();
   let password = $("#signup-password").val();
   let confirm = $("#signup-password2").val();

   if(password!==confirm) throw ("Passwords don't match")

   let r = await query({
      type:'insert_user',
      params:[name,username,email,password]
   });

   if(r.error) throw(r.error);

   history.go(-1);
}


const userEditForm = async () => {
   let username = $("#user-edit-username").val();
   let name = $("#user-edit-name").val();
   let email = $("#user-edit-email").val();

   let r = await query({
      type:'update_user',
      params:[username,name,email,sessionStorage.userId]
   });

   if(r.error) throw(r.error);

   history.go(-1);
}


const userEditPasswordForm = async () => {
   let password = $("#user-password-initial").val();
   let confirm = $("#user-password-confirm").val();

   if(password!==confirm) throw ("Passwords don't match")

   let r = await query({
      type:'update_user_password',
      params:[password,sessionStorage.userId]
   });

   if(r.error) throw(r.error);

   history.go(-1);
}

const locationAddForm = async () => {
   let bread = $("#location-bread-choice").val();
   let lat = $("#location-lat").val();
   let lng = $("#location-lng").val();
   let description = $("#location-description").val();

   let r = await query({
      type:'insert_location',
      params:[bread,lat,lng,description]
   });

   if(r.error) throw(r.error);

   history.go($("#location-navigateback").val());
}

const checkSearchForm = async (s) => {
   let breads = await query({
      type:'breads_search',
      params:[s,sessionStorage.userId]
   });

   if(breads.error) throw(breads.error);

   makeBreadListSet(breads.result);
}

const checkFilter = async (f,v) => {
   let breads = await query({
      type:'breads_tag_filter',
      params:[f,v,sessionStorage.userId]
   });

   if(breads.error) throw(breads.error);

   makeBreadListSet(breads.result);
}