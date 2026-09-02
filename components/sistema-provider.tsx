"use client"

import { createContext, useContext, useMemo, useState, type ReactNode } from "react"

export type Usuario = {
  id: number
  nombre: string
  correo: string
  rol: string
}

const USUARIOS_INICIALES: Usuario[] = [
  { id: 1, nombre: "Administrador", correo: "admin@sistema.com", rol: "Administrador" },
  { id: 2, nombre: "María González", correo: "maria@sistema.com", rol: "Usuario" },
  { id: 3, nombre: "Carlos Ramírez", correo: "carlos@sistema.com", rol: "Usuario" },
  { id: 4, nombre: "Lucía Fernández", correo: "lucia@sistema.com", rol: "Editor" },
  { id: 5, nombre: "Jorge Martínez", correo: "jorge@sistema.com", rol: "Usuario" },
  { id: 6, nombre: "Ana Torres", correo: "ana@sistema.com", rol: "Editor" },
  { id: 7, nombre: "Pedro Sánchez", correo: "pedro@sistema.com", rol: "Usuario" },
  { id: 8, nombre: "Sofía Díaz", correo: "sofia@sistema.com", rol: "Usuario" },
  { id: 9, nombre: "Miguel Rojas", correo: "miguel@sistema.com", rol: "Usuario" },
  { id: 10, nombre: "Valentina Cruz", correo: "valentina@sistema.com", rol: "Editor" },
]

type SistemaContextValue = {
  autenticado: boolean
  usuarioActual: string | null
  usuarios: Usuario[]
  iniciarSesion: (correo: string, contrasena: string) => boolean
  cerrarSesion: () => void
  crearUsuario: (datos: Omit<Usuario, "id">) => void
  eliminarUsuario: (id: number) => void
}

const SistemaContext = createContext<SistemaContextValue | null>(null)

export function SistemaProvider({ children }: { children: ReactNode }) {
  const [autenticado, setAutenticado] = useState(false)
  const [usuarioActual, setUsuarioActual] = useState<string | null>(null)
  const [usuarios, setUsuarios] = useState<Usuario[]>(USUARIOS_INICIALES)

  const value = useMemo<SistemaContextValue>(
    () => ({
      autenticado,
      usuarioActual,
      usuarios,
      iniciarSesion: (correo, contrasena) => {
        // Demo: cualquier correo válido con contraseña ingresada inicia como Administrador.
        if (correo.trim() !== "" && contrasena.trim() !== "") {
          setAutenticado(true)
          setUsuarioActual("Administrador")
          return true
        }
        return false
      },
      cerrarSesion: () => {
        setAutenticado(false)
        setUsuarioActual(null)
      },
      crearUsuario: (datos) => {
        setUsuarios((prev) => {
          const nuevoId = prev.length ? Math.max(...prev.map((u) => u.id)) + 1 : 1
          return [...prev, { id: nuevoId, ...datos }]
        })
      },
      eliminarUsuario: (id) => {
        setUsuarios((prev) => prev.filter((u) => u.id !== id))
      },
    }),
    [autenticado, usuarioActual, usuarios],
  )

  return <SistemaContext.Provider value={value}>{children}</SistemaContext.Provider>
}

export function useSistema() {
  const ctx = useContext(SistemaContext)
  if (!ctx) throw new Error("useSistema debe usarse dentro de SistemaProvider")
  return ctx
}
