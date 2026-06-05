const users = [
  {
    id: 1,
    name: 'Administrador',
    email: 'admin@test.com',
    password: '1234',
    role: 'admin'
  },
  {
    id: 2,
    name: 'Veterinario',
    email: 'vet@test.com',
    password: '1234',
    role: 'veterinario'
  }
]

export const authService = {
  login(email, password) {
    const user = users.find(
      (u) => u.email === email && u.password === password
    )

    if (!user) {
      throw new Error('Credenciales incorrectas')
    }

    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  },

  saveSession(user) {
    localStorage.setItem('user', JSON.stringify(user))
  },

  getSession() {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  },

  clearSession() {
    localStorage.removeItem('user')
  }
}