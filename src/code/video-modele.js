import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { stockage } from "./init";  // Assurez-vous d'avoir correctement initialisé le stockage

/**
 * Obtenir les vidéos depuis Firebase Storage.
 * @returns {Promise<Array>} Tableau contenant les URLs des vidéos.
 */
export async function obtenir() {
  try {
    const storageRef = ref(stockage, "data/");  // "data/" est le dossier où se trouvent les vidéos
    const result = await listAll(storageRef);  // Liste tous les fichiers dans le dossier "data"

    // Récupérer l'URL de chaque vidéo et les ajouter au tableau
    const videoUrls = await Promise.all(result.items.map(async (itemRef) => {
      const url = await getDownloadURL(itemRef);  // Récupère l'URL de téléchargement de la vidéo
      return {
        url: url,
        name: itemRef.name,  // Nom du fichier (optionnel)
        path: itemRef.fullPath, // Chemin complet du fichier dans Storage (optionnel)
      };
    }));

    return videoUrls;  // Retourne le tableau contenant les vidéos avec leurs URLs
  } catch (error) {
    console.error("Erreur lors de la récupération des vidéos :", error);
    throw error; // Propagation de l'erreur pour une gestion plus haut niveau
  }
}

/**
 * Observer les vidéos en temps réel depuis Firebase Storage.
 * @param {function} mutateur Fonction de mise à jour de l'état des vidéos.
 * @returns {function} Fonction de nettoyage pour arrêter l'observation.
 */
export function observer(mutateur) {
  // Notez que Firebase Storage ne permet pas l'observation en temps réel comme Firestore.
  // Si vous avez besoin de récupérer régulièrement les vidéos, vous pouvez utiliser un intervalle de temps.
  const interval = setInterval(async () => {
    try {
      const videos = await obtenir();  // Récupère les vidéos à chaque intervalle
      mutateur(videos);  // Met à jour l'état avec les vidéos récupérées
    } catch (error) {
      console.error("Erreur lors de la récupération des vidéos :", error);
    }
  }, 10000);  // Met à jour les vidéos toutes les 10 secondes (ajustez le temps selon vos besoins)

  // Retourne la fonction de nettoyage pour arrêter l'observation lorsque nécessaire
  return () => clearInterval(interval);
}
