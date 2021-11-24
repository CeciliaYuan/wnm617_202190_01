// const makeMap = (target) => {
//    let mapEl = $(target);
//    new google.maps.Map(mapEl[0], {
//       center: { lat: -34.397, lng: 150.644 },
//       zoom: 8,
//    });
// }

// const makeMap = (target="", center={ lat:37.786437, lng:-122.399650 }) => {
//    let mapEl = $(target);
   
//    new google.maps.Map(mapEl[0], {
//       center:center,
//       zoom: 12,
//       disableDefaultUI:true
//    });

//    return mapEl;
// }


// const makeMap = as(target="", center={ lat:37.786437, lng:-122.399650 }) => {
//    let mapEl = $(target);

//    if(!mapEl.data("map")) {
//       mapEl.data("map",
//          new google.maps.Map(mapEl[0], {
//             center:center,
//             zoom: 12,
//             disableDefaultUI:true
//          })
//       );
//    }

//    return mapEl;
// }



const makeMap = async (target="", center={ lat:37.786437, lng:-122.399650 }) => {
   await checkData(()=>window.google);
   let mapEl = $(target);

    if(!mapEl.data("map")) {
      mapEl.data({
         "map" : new google.maps.Map(mapEl[0], {
            center:center,
            zoom: 12,
            disableDefaultUI:true,
            // styles:mapStyles
         }),
        "infoWindow": new google.maps.InfoWindow({content:''})
      });
   }

   return mapEl;
}

const makeMarkers = (mapEl,mapLocs) => {
   let {map,markers} = mapEl.data();

   if(markers) markers.forEach(o=>o.setMap(null));

   markers = [];

   mapLocs.forEach(o=>{
      let m = new google.maps.Marker({
         position: o,
         map,
         icon: {
            url:o.icon,
            scaledSize: {
               width:40,
               height:40
            }
         }
      });
      markers.push(m);
   });

   mapEl.data("markers",markers);
   setMapBounds(mapEl,mapLocs);
}

const setMapBounds = (mapEl,mapLocs) => {
   let {map,markers} = mapEl.data();
   let zoom = 14;

   if(mapLocs.length==0) {
      if(window.location.protocol!=='https:') return;
      else {
         navigator.geolocation.getCurrentPosition(p=>{
            let pos = {
               lat:p.coords.latitude,
               lng:p.coords.longitude
            };
            map.setCenter(pos);
            map.setZoom(zoom);
         },(...args)=>{
            console.log(args)
         },{
            enableHighAccuracy:false,
            timeout:5000,
            maximumAge:0
         });
      }
   } else if(mapLocs.length==1) {
      map.setCenter(mapLocs[0]);
      map.setZoom(zoom);
   } else {
      let bounds = new google.maps.LatLngBounds(null);
      mapLocs.forEach(o=>{
         bounds.extend(o);
      });
      map.fitBounds(bounds);
   }
}

