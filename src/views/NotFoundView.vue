<template>
  <div style="text-align: center; margin-top: 100px; font-family: sans-serif;">
    <h1 style="font-size: 72px; color: #42b983; margin-bottom: 10px;">404</h1>
    <h2>Página no encontrada</h2>
    <p style="color: #666; margin-bottom: 30px;">
      Lo sentimos, la ruta que estás buscando no existe.
    </p>
    <router-link 
      to="/dashboard" 
      style="padding: 10px 20px; background-color: #42b983; color: white; text-decoration: none; border-radius: 5px;"
    >
      Volver al Panel Principal
    </router-link>
  </div>
</template>