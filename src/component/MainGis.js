import React, { useEffect, useState } from "react";
import axios from 'axios';
const { kakao} = window;

export default function MainGis(){
   
    const [coordinateData,setCoordinatreData] = useState([]);
    let openMarker = "";

    // 지도에 표시된 마커 객체를 가지고 있을 배열입니다
    let markers = [];


    let container;
    let options;
    let map;

    async function getCoordinate(){
        axios.get("http://localhost:8080/getCoordinate", {
            }).then(function (response) {
                const data = response.data;
                setCoordinatreData(data);
            }).catch(function (error) {
                console.log(error);
            });
      
    }

    function markerSetMap() {
 
      for (var i = 0; i < coordinateData.length; i++) {
        var markerPosition = new kakao.maps.LatLng(
          coordinateData[i].coordinate_y,
          coordinateData[i].coordinate_x
        );

        var marker = new kakao.maps.Marker({
          position: markerPosition,
        });

        marker.setMap(map);
      } 
    } 



    useEffect(() =>{

      
      container = document.getElementById("map");
      options = {
        center: new kakao.maps.LatLng(37.464893, 126.87382),
        level: 5,
      };
      map = new kakao.maps.Map(container, options);
 
      async function fetchCoordinateData() {
        if(coordinateData.length > 0){
          markerSetMap();
        }else{
          await getCoordinate();
        }
        
      } 
      fetchCoordinateData();



      kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        

        
        // // 클릭한 위도, 경도 정보를 가져옵니다 
        let latlng = mouseEvent.latLng; 

        let marker = new kakao.maps.Marker({
          position: latlng,
          clickable: true
        });
        
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        } 

        marker.setMap(map);
        markers.push(marker);
        

        // var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
        // message += '경도는 ' + latlng.getLng() + ' 입니다';
        
        // var resultDiv = document.getElementById('clickLatlng'); 
        // resultDiv.innerHTML = message;
        
      });

    },[coordinateData]); 
    
  

    


    
    
    return (

        <div className="map_wrap">
            <div id="map" style={{width:100+"%", height:700+"px"}}></div>
        </div>

       
    )
}
