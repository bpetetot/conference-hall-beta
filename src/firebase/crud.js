import firebase from 'firebase/compat/app'
import omit from 'lodash/omit'

/**
 * create document in the collection
 * @param {String} collection collection name
 * @param {String} idAttr attribute name of the id
 */
const create = (collection, idAttr) => (data) => {
  const id = data[idAttr]
  if (id) {
    // create a document with the given ID
    return firebase
      .firestore()
      .collection(collection)
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
const read = (collection) => (id) => firebase.firestore().collection(collection).doc(id).get()

/**
 * update the document in the collection
 * @param {String} collection collection name
 * @param {String} idAttr attribute name of the id
 */
const update = (collection, idAttr) => (data) =>
  firebase
    .firestore()
    .collection(collection)
    .doc(data[idAttr])
    .update({
      ...omit(data, 'createTimestamp'),
      updateTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })

/**
 * delete document in the collection
 * @param {String} collection collection name
 */
const deleteDoc = (collection) => (id) =>
  firebase.firestore().collection(collection).doc(id).delete()

export default (collection, idAttr) => ({
  create: create(collection, idAttr),
  read: read(collection),
  update: update(collection, idAttr),
  delete: deleteDoc(collection),
})
