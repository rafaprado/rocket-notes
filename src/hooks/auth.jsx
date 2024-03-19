import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/api"

export const AuthContext = createContext({});
AuthContext.displayName = "Auth";

export function AuthProvider({ children }) {
  const [data, setData] = useState({});

  function signOut() {
    localStorage.removeItem("@rocketnotes:user");
    localStorage.removeItem("@rocketnotes:token");

    setData({});
  }

  async function signIn({ email, password }) {
    try {
      const response = await api.post("/sessions", {email, password});
      const { user, token } = response.data;

      localStorage.setItem("@rocketnotes:user", JSON.stringify(user));
      localStorage.setItem("@rocketnotes:token", token);


      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setData({user, token});

    } catch (error) {
      if(error.response) {
        alert(error.response.data.message);
      } else {
        alert("Não foi possível entrar");
      }
    }
  }

  async function updateProfile({ user, avatarFile }) {
    try {
      if(avatarFile) {
        const form = new FormData();
        form.append("avatar", avatarFile);

        const response = await api.patch("/users/avatar", form);
        user.avatar = response.data.avatar; 
      }

      console.log(user);
      return;

      await api.put("/users", user);
      localStorage.setItem("@rocketnotes:user", JSON.stringify(user));

      setData({user, token: data.token});
      alert("Perfil atualizado!");

    } catch (error) {
      if(error.response) {
        alert(error.response.data.message);
      } else {
        alert("Não foi possível atualizar o usuário.");
      }
    }
  }

  useEffect(() => {
    const user = localStorage.getItem("@rocketnotes:user");
    const token = localStorage.getItem("@rocketnotes:token");
  
    if(user && token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
      setData({
        token,
        user: JSON.parse(user)
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{signIn, signOut, updateProfile, user: data.user}}>
      { children }
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}