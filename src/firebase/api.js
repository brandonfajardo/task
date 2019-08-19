import { COLLECTIONS } from '../constants'
import { firestore } from '../firebase'
import short from 'shortid'

export const taskCreate = (email, description, priority ) => {
    const id = short.generate()
    return firestore.collection(COLLECTIONS['task'])
        .doc(id)
        .set({
            _id: id,
            user: email,
            description,
            priority
        })
        .then(() => ({ data: id }))
        .catch(e => ({ error: e.message }))
}

export const fetchTask = email => {
    return firestore.collection(COLLECTIONS['task'])
        .where('user', `==`, email)
        .get()
        .then(snap => {
            let data = []
            snap.forEach((doc) => {
                data.push(doc.data())
            })
            return { data }
        })
        .catch(e => ({ error: e.message }))
}

export const updateTasks = (id, priority, description ) => {
    return firestore.collection(COLLECTIONS['task'])
        .doc(id)
        .update({
            priority,
            description,
        })
        .then(() => ({ data: true }))
        .catch(e => ({ error: e.message }))
}

export const deleteTasks = id => {
    return firestore.collection(COLLECTIONS['task'])
        .doc(id)
        .delete()
}