import React, { useState, useEffect } from "react";
import { obtenerNotasTalento as getNotes } from "../services/api";

function TalentNotes({ talentId }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!talentId) return;

    setLoading(true);
    setError(null);
    getNotes(talentId)
      .then((response) => {
        setNotes(response.data); // Ajusta según el formato de tu backend
        setLoading(false);
      })
      .catch((err) => {
        setError("Error al cargar las notas");
        setLoading(false);
      });
  }, [talentId]);

  if (!talentId) {
    return <p>Selecciona un talento para ver sus notas.</p>;
  }

  if (loading) {
    return <p>Cargando notas...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h3>Notas del Talento</h3>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default TalentNotes;
