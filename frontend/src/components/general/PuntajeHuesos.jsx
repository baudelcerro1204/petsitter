import React from "react";
import HuesoLleno from "../../assets/huesoLleno.svg";
import HuesoVacio from "../../assets/huesoVacio.svg";

export const PuntajeHuesos = ({ puntaje }) => {
  const totalHuesos = 5; // Total de huesos a mostrar
  const huesosLlenos = puntaje; // Número de huesos llenos basado en el puntaje
  const huesosVacios = totalHuesos - puntaje; // Número de huesos vacíos

  return (
    <div className="puntaje">
      {[...Array(huesosLlenos)].map((_, index) => (
        <img
          key={`lleno-${index}`}
          src={HuesoLleno}
          alt="Hueso Lleno"
          style={{
            marginRight:
              index === huesosLlenos - 1 && huesosVacios > 0
                ? "3px"
                : index === huesosLlenos - 1
                ? 0
                : "3px",
          }}
        />
      ))}
      {[...Array(huesosVacios)].map((_, index) => (
        <img
          key={`vacio-${index}`}
          src={HuesoVacio}
          alt="Hueso Vacío"
          style={{ marginRight: index === huesosVacios - 1 ? 0 : "3px" }}
        />
      ))}
    </div>
  );
};
