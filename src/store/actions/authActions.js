export const signIn = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({
          type: "LOGIN_SUCCESS",
        });
      })
      .catch((err) => {
        dispatch({
          type: "LOGIN_ERROR",
          err,
        });
      });
  };
};

export const signInAnonymous = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signInAnonymously()
      .then(() => {
        dispatch({
          type: "LOGIN_ANON_SUCCESS",
        });
      })
      .catch((err) => {
        dispatch({
          type: "LOGIN_ANON_ERROR",
          err,
        });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({
          type: "SIGNOUT_SUCCESS",
        });
      });
  };
};

export const createContact = (contact) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    // Get current user unique id
    const uid = firebase.auth().currentUser.uid;

    if (uid && contact) {
      return firestore
        .collection("users")
        .add(contact)
        .then(() => {
          return true;
        })
        .catch((err) => {
          return false;
        });
    } else {
      return false;
    }
  };
};

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Werbeagentur Christian Aichner
 */
