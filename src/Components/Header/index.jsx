import { Container, Profile, Logout } from "./styles";
import { RiShutDownLine } from "react-icons/ri";
import { useAuth } from "../../hooks/auth";
import { api } from "../../services/api";
import avatarPlaceholder from "../../assets/avatar.svg";
import { useNavigate } from "react-router-dom";

export function Header () {
  const navigate = useNavigate();

  const { user, signOut } = useAuth();
  const avatar = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;

  function handleSignOut() {
    navigate("/");
    return signOut();
  }

  return (
    <Container>
      <Profile to="/profile">
        <img src={avatar} alt={`Imagem de ${user.name}`} />

        <div>
          <span>Bem-vindo</span>
          <strong>{user.name}</strong>
        </div>
      </Profile>

      <Logout onClick={handleSignOut}>
        <RiShutDownLine />
      </Logout>

    </Container>
  )
}