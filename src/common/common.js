export async function getlocationIP(){
    const ipData = await fetch('https://geolocation-db.com/json/');
    const locationIp = await ipData.json();


    return locationIp;
}
