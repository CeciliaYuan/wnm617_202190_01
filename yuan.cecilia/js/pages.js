

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

const RecentPage = async() => {
   console.log("honk")
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

