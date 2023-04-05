import React, { useEffect, useState } from "react";
import axios from 'axios';
const {kakao} = window;

export default function MainGis(){
   
    const [coordinateData,setCoordinatreData] = useState([]);

    // 지도에 표시된 마커 객체를 가지고 있을 배열입니다
    let markers = [];
    // 지도에 표시된 인포윈도우 객체를 가지고 있을 배열입니다
    let infowindows = [];

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

    function markerDefaultSetMap() {
 
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

    function chioceMarker(latlng){
      
      //선택한 마커 생성 로직 start
      let marker = new kakao.maps.Marker({
        position: latlng,
        clickable: true
      });
      
      //지도에 표시된 마커 삭제
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      } 

      marker.setMap(map);
      markers.push(marker);
      //선택한 마커 생성 로직 end

      let detailAddress = getDetailAddress(latlng);

      console.log("1"+detailAddress);
      if(detailAddress == undefined){
        detailAddress = getDetailAddress(latlng)
      }

      console.log("2"+detailAddress);
      //인포윈도우 생성 로직 start
      //인포윈도우 삭제
      for (var i = 0; i < infowindows.length; i++) {
        infowindows[i].close();
      } 

      var iwContent = `<a href="http://localhost:3000/foodInfo" target="_blank">${detailAddress}제보하기 ></a>`, // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
          iwPosition = new kakao.maps.LatLng(latlng); //인포윈도우 표시 위치입니다

      // 인포윈도우를 생성합니다
      var infowindow = new kakao.maps.InfoWindow({
          position : iwPosition, 
          content : iwContent 
      });
        
      // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
      infowindow.open(map, marker); 
      infowindows.push(infowindow);
      //인포윈도우 생성 로직 end

      

    }

    function getDetailAddress(latlng){
      // 주소-좌표 변환 객체를 생성합니다
      var geocoder = new kakao.maps.services.Geocoder();

      geocoder.coord2Address(latlng.getLng(), latlng.getLat(), function(result, status){
        if (status === kakao.maps.services.Status.OK) {
          return result[0].address.address_name;
        }
      });

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
          markerDefaultSetMap();
        }else{
          await getCoordinate();
        }
        
      } 
      fetchCoordinateData();

      kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        

        // // 클릭한 위도, 경도 정보를 가져옵니다 
        let latlng = mouseEvent.latLng; 
        chioceMarker(latlng);

      });

    },[coordinateData]); 
    
  

    


    
    
    return (

        <div className="map_wrap">
            <div id="map" style={{width:100+"%", height:700+"px"}}></div>
        </div>

       
    )
}