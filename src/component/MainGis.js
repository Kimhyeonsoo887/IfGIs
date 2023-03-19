import React, { useEffect } from "react";

const { kakao} = window;

export default function MainGis(){
    

    useEffect(() =>{
        const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        const options = { //지도를 생성할 때 필요한 기본 옵션
            center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
            level: 10 //지도의 레벨(확대, 축소 정도)
        };
        const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

        // 마커가 표시될 위치입니다 
        var markerPosition  = new kakao.maps.LatLng(33.450701, 126.570667); 

        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
            position: markerPosition
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);

    },[]);
    
    return (

        <div className="map_wrap">
            <div id="map" style={{width:100+"%", height:700+"px"}}></div> 

            {/* <div className="custom_typecontrol radius_border">
                <span id="btnRoadmap" className="selected_btn" onclick="setMapType('roadmap')">지도</span>
                <span id="btnSkyview" className="btn" onclick="setMapType('skyview')">스카이뷰</span>
            </div>

            <div className="custom_zoomcontrol radius_border"> 
                <span onclick="zoomIn()"><img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_plus.png" alt="확대"></span>  
                <span onclick="zoomOut()"><img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_minus.png" alt="축소"></span>
            </div> */}
        </div>

       
    )
}
