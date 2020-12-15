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

    const contactObj = {
      created: {
        timestamp: new Date().getTime(),
        creator: uid,
      },
      first_name: contact.first_name,
      last_name: contact.last_name,
      location: {
        address: contact.address,
        city: contact.city,
        zip: contact.zip,
      },
      contact: {
        email: contact.email ? contact.email : null,
        phone: contact.phone ? contact.phone : null,
      },
      insight: {
        trust: contact.trust ? contact.trust : 50,
        currentJob: contact.status ? contact.status : null,
        time: contact.time ? contact.time : null,
        cost: contact.cost ? contact.time : null,
      },
      company: contact.company,
      skills: {
        dexterior: contact.dexterior ? contact.dexterior : false,
        dinterior: contact.dinterior ? contact.dinterior : false,
        dmodelling: contact.dmodelling ? contact.dmodelling : false,
        sales: contact.sales ? contact.sales : false,
        affiliate: contact.affiliate ? contact.affiliate : false,
        postproduction: contact.postproduction ? contact.postproduction : false,
        filmplanning: contact.filmplanning ? contact.filmplanning : false,
        vfx: contact.vfx ? contact.vfx : false,
        cgi: contact.cgi ? contact.cgi : false,
        videoproduction: contact.videoproduction
          ? contact.videoproduction
          : false,
        webbackend: contact.webbackend ? contact.webbackend : false,
        webwordpress: contact.webwordpress ? contact.webwordpress : false,
        webfrontend: contact.webfrontend ? contact.webfrontend : false,
        graphicsdesign: contact.graphicsdesign ? contact.graphicsdesign : false,
        vector: contact.vector ? contact.vector : false,
        smposts: contact.smposts ? contact.smposts : false,
      },
      leadership: {
        autocratic: contact.autocratic ? contact.autocratic : false,
        democratic: contact.democratic ? contact.democratic : false,
        transformational: contact.transformational
          ? contact.transformational
          : false,
        laissezfaire: contact.laissezfaire ? contact.laissezfaire : false,
      },
    };

    if (uid && contactObj) {
      return firestore
        .collection("users")
        .add(contactObj)
        .then((res) => {
          console.log(res);
          return true;
        })
        .catch((err) => {
          console.error(err);
          return false;
        });
    } else {
      return false;
    }
  };
};

export const getContacts = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    // Get current user unique id
    const uid = firebase.auth().currentUser.uid;

    if (uid) {
      return firestore
        .collection("users")
        .get()
        .then((querySnapshot) => {
          let res = [];

          querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            res = [
              ...res,
              {
                id: doc.id,
                data: doc.data(),
              },
            ];
          });

          return res;
        })
        .catch((err) => {
          console.error(err);
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
