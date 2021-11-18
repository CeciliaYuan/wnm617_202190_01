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

   let locations_result = await resultQuery({
      type:'locations_by_bread_id',
      params:[sessionStorage.breadId]
   });
   let mapEl = await makeMap("#page-bread-profile .map");
   makeMarkers(mapEl,locations_result);
}
   
// const MapAddPage = async() =>{
//    let mapEl = await makeMap("#page-map-add .map");
   
// }