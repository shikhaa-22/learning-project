import { defineStore } from 'pinia'

export type User = {
  username: string
  password?: string
  fullName: string
  email: string
  phone: string
  designation: 'admin' | 'user'
  userId?: number
}

const initialUsers: User[] = [
  {
    username: 'admin',
    password: 'admin123',
    fullName: 'Admin',
    email: 'admin@gmail.com',
    phone: '9876543210',
    designation: 'admin'
  },
  {
    username: 'shikhaa',
    password: 'shikhaa123',
    fullName: 'Shikhaa Prabhudesai',
    email: 'shikhaa@gmail.com',
    phone: '9999999999',
    designation: 'user',
    userId: 101
  }
]

export const useUserStore = defineStore('userStore', {
  state: () => ({
    users: ((): User[] => {
      try {
        const raw = localStorage.getItem('users')
        if (raw) {
          return JSON.parse(raw) as User[]
        }
      } catch {
        // ignore
      }
      return initialUsers.slice()
    })(),
    currentUser: null as User | null
  }),

  actions: {
    setCurrentUser(user: User): void {
      this.currentUser = user
    },

    logout(): void {
      this.currentUser = null
    },

    addUser(user: User): void {
      this.users.push(user)
      try {
        localStorage.setItem('users', JSON.stringify(this.users))
      } catch {
        // ignore
      }
    },

    deleteUser(username: string): void {
      this.users = this.users.filter(user => user.username !== username)

      if (this.currentUser?.username === username) {
        this.currentUser = null
      }

      try {
        localStorage.setItem('users', JSON.stringify(this.users))
      } catch {
        // ignore
      }
    },

    resetUsers(): void {
      this.users = initialUsers.slice()
      this.currentUser = null
      try {
        localStorage.removeItem('users')
      } catch {
        // ignore
      }
    },

    clearLocalStorage(): void {
      try {
        localStorage.clear()
      } catch {
        // ignore
      }
    }
  }
})
