const { $firestore } = require("./firebase")
var nickname = 'cardappio'
// const contatosRef = $firestore.collection('contatos').doc(nickname)

const collections = $firestore.listCollections()
collections.forEach(collection => {
    console.log('Found subcollection with id:', collection.id);
});

