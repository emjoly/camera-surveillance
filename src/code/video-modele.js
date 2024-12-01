import { connectStorageEmulator } from "firebase/storage";
import { bd, collBandes } from "./init";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

/**
 * Obtenir les videos.
 * @param {string} idVideo Chaîne indiquant l'identifiant de la bande quotidienne
 * @returns {Promise<Array>} Tableau contenant les videos.
 **/

export async function obtenir(idVideo) {
  // Pour chercher des documents dans Firestore getDocs.
  const lesComs = await getDocs(
    query(collection(bd, collVideos, idVideo), orderBy("texte", "desc"))
  );
  // On les maps dans un objet pour ne pas utiliser la function de Firestore si jamais on change de base de donnée.
  // Pour chaque document on retourne un objet avec l'id et les données du document.
  return lesComs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export function observer(idVideo, mutateur) {
  return onSnapshot(
    query(collection(bd, collVideos, idVideo), orderBy("texte", "desc"))
  );
}
