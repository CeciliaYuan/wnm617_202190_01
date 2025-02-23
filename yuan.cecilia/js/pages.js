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
   let breads = await resultQuery({
      type:'breads_by_user_id',
      params:[sessionStorage.userId]
   });

   makeBreadListSet(breads);
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


const mapMapSearchList = async(arr) => {
   let breads = arr.reduce((r,o)=>{
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
   let breads = await resultQuery({
      type:'breads_by_user_id',
      params:[sessionStorage.userId]});
   let tbs = breads.length


   let tags = await resultQuery({
      type:'tags_by_user_id',
      params:[sessionStorage.userId]});  
   let tts = tags.length;

     let loctions = await resultQuery({
      type:'locations_by_user_id',
      params:[sessionStorage.userId]
   });
   let tls = loctions.length;

   let result = await resultQuery({
         type:'user_by_id',
         params:[sessionStorage.userId]});

   let [user] = result;

    $("#page-user-profile .userinfo").html(makeUserProfile(user, tbs, tts, tls));
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

   let {infoWindow,map,markers} = mapEl.data();
   mapEl.data('markers').forEach((o,i)=>{
      o.addListener("click",function(){

         /* 
          Example */
         // sessionStorage.breadId = breads[i].bread_id;
         // $.mobile.navigate("#page-bread-profile")

         /* InfoWindow Example */
         infoWindow.open(map,o);
         infoWindow.setContent(makeLocationPopup(location_result[i]))
      })
   });
}

const BreadAddPage = async() =>{
   
   // let mapEl = await makeMap("#page-map-add .map");

   $("#bread-add-form .fill-parent").html(
      makeBreadFormInputs({
         name:'',
         bakery:'',
         tag:'',
         description:''
      },"bread-add")
   );
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

   $(".user-image-edit-preview").html
   (makeImagePreview(bread, "bread-edit"));

}

const UserEditPgae = async() => {
   let result = await resultQuery({
         type:'user_by_id',
         params:[sessionStorage.userId]
      });

   let [user] = result;

   $("#user-edit-input-box").html
   (makeUserFormInputs(user, "user-edit"));


   $(".user-image-edit-preview").html
   (makeImagePreview(user, "user-edit"));

}




const LocationSetLocationPage = async() =>{
   let mapEl = await makeMap("#page-add-location .map");
   makeMarkers(mapEl,[]);

   mapEl.data("map").addListener("click",function(e){
      $("#location-lat").val(e.latLng.lat())
      $("#location-lng").val(e.latLng.lng())
      makeMarkers(mapEl,[e.latLng]);
   })
}



const LocationChooseBreadPage = async() => {
   let result = await resultQuery({
      type:'breads_by_user_id',
      params:[sessionStorage.userId]
   });

   console.log(result)

   $(".location-bread-choice-select").html(
      makeBreadChoiceSelect({
         breads:result,
         name:'location-bread-choice-select-option'
      })
   );

    $("#location-bread-choice").val(result[0].id);

}


