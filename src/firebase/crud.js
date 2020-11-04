import firebase from 'firebase/app'

/**
 * create document in the collection
 * @param {String} collection collection name
 * @param {String} idAttr attribute name of the id
 */
const create = (collection, idAttr, converter) => (data) => {
  const id = data[idAttr]
  if (id) {
    // create a document with the given ID
    return firebase
      .firestore()
      .collection(collection)
      .withConverter(converter)
      .doc(id)
      .set({
        ...data,
        createTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
        updateTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
  }
  // create document with a generated id
  return firebase
    .firestore()
    .collection(collection)
    .withConverter(converter)
    .add({
      ...data,
      createTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
      updateTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
}

/**
 * read document in the collection
 * @param {String} collection collection name
 */
const read = (collection, converter) => (id) => {
  console.log(`Read ${collection}: ${id}`)
  return firebase.firestore().collection(collection).withConverter(converter).doc(id).get()
}

/**
 * update the document in the collection
 * @param {String} collection collection name
 * @param {String} idAttr attribute name of the id
 */
const update = (collection, idAttr) => (data) => {
  return firebase
    .firestore()
    .collection(collection)
    .doc(data[idAttr])
    .update({
      ...data,
      updateTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
}

/**
 * delete document in the collection
 * @param {String} collection collection name
 */
const deleteDoc = (collection) => (id) =>
  firebase.firestore().collection(collection).doc(id).delete()

export default (collection, idAttr, converter) => ({
  create: create(collection, idAttr, converter),
  read: read(collection, converter),
  update: update(collection, idAttr),
  delete: deleteDoc(collection),
})
