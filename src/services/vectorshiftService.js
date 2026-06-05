import axios from 'axios';

const VECTORSHIFT_URL = import.meta.env.VITE_VECTORSHIFT_URL;

// En un entorno profesional, la API KEY vendría de: import.meta.env.VITE_VECTORSHIFT_API_KEY
const VECTORSHIFT_API_KEY = import.meta.env.VITE_VECTORSHIFT_API_KEY;

export const vectorshiftService = {
  /**
   * Envía una consulta al asistente inteligente RAG
   * consultaTexto - La pregunta realizada por el usuario
   * La respuesta redactada por la IA
   */
  async generarInformeAnalitico(consultaTexto) {
    try {
      const response = await axios.post(
        VECTORSHIFT_URL,
        {
          inputs: {
            pregunta_usuario: consultaTexto
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${VECTORSHIFT_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Retornamos directamente el string de la respuesta
      return response.data.outputs.respuesta_ia;
    } catch (error) {
      console.error('Error en el servicio de VectorShift:', error);
      throw new Error('No se pudo procesar el informe con la IA.');
    }
  }
};