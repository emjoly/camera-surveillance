import React, { useEffect, useState } from "react";
import { obtenir, observer } from "../code/video-modele"; // Importez les fonctions du modèle
import "./AfficherVideos.scss";

export default function AfficherVideos() {
  const [videos, setVideos] = useState([]); // Liste des vidéos

  // Récupérer les vidéos lors du premier rendu
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videoData = await obtenir();  // Récupère toutes les vidéos
        setVideos(videoData);  // Met à jour l'état avec les vidéos récupérées
      } catch (error) {
        console.error("Erreur lors de la récupération des vidéos :", error);
      }
    };

    fetchVideos();  // Appelle la fonction pour récupérer les vidéos

    // Observation en temps réel (si nécessaire)
    const unsubscribe = observer(setVideos);  // Mets à jour l'état toutes les 10 secondes

    // Nettoyage lorsque le composant est démonté
    //return () => unsubscribe();
  }, []);

  return (
    <div className="AfficherVideos">
      <div className="liste_videos">
        {/* Affichage de la liste de toutes les vidéos */}
        {videos.map((video, index) => (
          <div key={index} className="video_item">
            <video src={video.url} />
            <h3>{video.name || "Vidéo sans titre"}</h3>
            <p>Chemin du fichier : {video.path}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
