const { $firestore, firebase } = require("./firebase")
const { GeoFirestore } = require("geofirestore");

const CONTATOS = "contatos"
const CLIENTE = "cliente"

const pedidosRef = $firestore.collection('pedidos')

pedidosRef.get().then( snapshot => {

if (snapshot.empty) {
  console.log('No matching documents.')
  return
} else {

  snapshot.forEach(doc => {

    const newValue = doc.data()

    var defaultValue = 'aaaaaa'
    var defaultValuephoneNumber = '5500000000000'
    var defaultValuegeoLocation = {
      lat: 0,
      lng: 0
    }

    let uid = newValue.uid
    let displayName = newValue.displayName || defaultValue
    let phoneNumber = newValue.phoneNumber || defaultValuephoneNumber
    let storeId = newValue.storeId === undefined ? newValue.nickname : newValue.storeId
    let geoLocation = newValue.geoLocation === undefined ? defaultValuegeoLocation : newValue.geoLocation

    phoneNumber = phoneNumber.toString()
    var verificar = phoneNumber.indexOf("+55")

    if (verificar === -1) {
      phoneNumber = '55' + phoneNumber
    } else {
      phoneNumber = phoneNumber.slice(1, 14);
    }

    phoneNumber = phoneNumber.replace("-", "").replace(".", "").replace("(", "").replace(")", "").replace(" ", "")

    //console.log(uid, displayName, phoneNumber, storeId, geoLocation)

    const geofirestore = new GeoFirestore($firestore);

    const geocollection = geofirestore.collection(CONTATOS).doc(storeId).collection(CLIENTE).doc(phoneNumber)

    if (phoneNumber.length == 13 && uid && displayName && storeId) {
      if(geoLocation && geoLocation.lat && geoLocation.lng) {

        geocollection.set({
          name: 'Geofirestore',
          phoneNumber: phoneNumber,
          displayName: displayName,            
          storeId: storeId,
          uid: uid,
          geoLocation: geoLocation,
          coordinates: new firebase.firestore.GeoPoint(Number(geoLocation.lat), Number(geoLocation.lng))
        }).catch( err => {
          console.log(err)
        })

      } else {
        $firestore.collection(CONTATOS).doc(storeId).collection(CLIENTE).doc(phoneNumber).set({
          phoneNumber: phoneNumber,
          displayName: displayName,            
          storeId: storeId,
          uid: uid,
        }).catch( err => {  
          console.log(err)
        })
      }
    }
  })
}
})
