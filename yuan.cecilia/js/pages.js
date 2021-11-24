const resultQuery = async (options) => {
   // destructure
   let {result,error} = await query(options);
   if(error) {
      throw(error);
      return;
   }
   return result;
}

const ListPage = async() => {
   // destructure
   let {result,error} = await query({type:'breads_by_user_id',params:[sessionStorage.userId]});

   if(error) {
      console.log(error);
      return;
   }

   console.log(result,error);

   $("#page-list .breadlist").html(makeBreadList(result));
}

const MapPage = async() => {
   let {result,error} = await query({
      type:'recent_bread_locations',
      params:[sessionStorage.userId]
   });

   let breads = result.reduce((r,o)=>{
      o.icon = o.icon;
      if(o.lat && o.lng) r.push(o);
      return r;
   },[]);


   let mapEl = await makeMap("#page-map .map");
   makeMarkers(mapEl, breads);


   let {infoWindow,map,markers} = mapEl.data();
   mapEl.data('markers').forEach((o,i)=>{
      o.addListener("click",function(){

         /* 
          Example */
         // sessionStorage.breadId = breads[i].bread_id;
         // $.mobile.navigate("#page-bread-profile")

         /* InfoWindow Example */
         infoWindow.open(map,o);
         infoWindow.setContent(makeBreadPopup(breads[i]))
      })
   });
}


const UserProfilePage = async() => {
   let {result,error} = await query({type:'user_by_id',params:[sessionStorage.userId]});

   if(error) {
      console.log(error);
      return;
   }

   let [user] =result;

   $("#page-user-profile .userinfo").html(makeUserProfile(user));
}


const BreadProfilePage = async() => {
   let bread_result = await resultQuery({
         type:'bread_by_id',
         params:[sessionStorage.breadId]
      });
  
   let [bread] = bread_result;
   $(".bread-image img").attr("src",bread.img);

   let location_result = await resultQuery({
         type:'locations_by_bread_id',
         params:[sessionStorage.breadId]
      });

   let mapEl = await makeMap("#page-bread-profile .map");
   makeMarkers(mapEl,location_result);

   $(".bread_name").text(bread.name);
   $(".bread_bakery").text(bread.bakery);
   $(".bread_tag").text(bread.tag);
   $(".bread_date_create").text(bread.date_create);
   $(".bread_description").text(bread.description);
}

const MapAddPage = async() =>{
   
   let mapEl = await makeMap("#page-map-add .map");
   }


// const BreadEditPage = async() => {
//    let bread_result = await resultQuery({
//       type:'bread_by_id',
//       params:[sessionStorage.breadId]
//    });

//    $("#list-edit-name").val(bread.name);
//    $("#list-edit-bakery").val(bread.bakery);
//    $("#list-edit-description").val(bread.description);
// }

const BreadEditPage = async() => {
   let bread_result = await resultQuery({
      type:'bread_by_id',
      params:[sessionStorage.breadId]
   });

   let [bread] = bread_result;
   
   $("#bread-edit-form .fill-parent").html(
      makeBreadFormInputs(bread,"bread-edit")
   );
}

const UserEditPgae = async() => {
   let result = await resultQuery({
         type:'user_by_id',
         params:[sessionStorage.userId]
      });

   let [user] = result;

   $("#user-edit-input-box").html
   (makeUserFormInputs(user, "user-edit"));

}
