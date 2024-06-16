// Inny plik w Twojej aplikacji, gdzie używasz TeacherComponent
import React from 'react';
import Nauczyciel from "./Naczyciel"; // Importujemy nasz komponent

const NauczycielView = () => {
  return (
    <div>
      <h1>Dodaj Ocene</h1>
      <Nauczyciel />
    </div>
  );
};

export default NauczycielView;