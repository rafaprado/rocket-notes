import { Container, Form, Avatar } from "./styles";
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from "react-icons/fi";
import avatarPlaceholder from "../../assets/avatar.svg";

import { Input } from "../../Components/Input";
import { Button } from "../../Components/Button";

import { Link } from "react-router-dom";
import { useState } from "react";

import { useAuth } from "../../hooks/auth";
import { api } from "../../services/api";

export function Profile() {
  const { user, updateProfile } = useAuth();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();

  const avatarURL = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;
  const [avatar, setAvatar] = useState(avatarURL);
  const [avatarFile, setAvatarFile] = useState(null);


  async function handleUpdate() {
    const updated = {
      name,
      email,
      password: newPassword,
      old_password: oldPassword
    };

    const userUpdated = Object.assign(user, updated);

    await updateProfile({user: userUpdated, avatarFile});
    setData({user, token: data.token});
  }

  function handleChangeAvatar(event) {
    const file = event.target.files[0];
    setAvatarFile(file);

    const imagePreview = URL.createObjectURL(file);
    setAvatar(imagePreview);
  }

  return(
    <Container>
      <header>
        <Link to="/">
          <FiArrowLeft />
        </Link>
      </header>

      <Form>
        <Avatar>
          <img src={avatar} alt="" />

          <label htmlFor="avatar">
            <FiCamera />
            <input type="file" id="avatar" onChange={handleChangeAvatar} />
          </label>
        </Avatar>

        <Input placeholder="Nome" type="text" icon={FiUser} value={name} onChange={event => setName(event.target.value)} />
        <Input placeholder="E-mail" type="text" icon={FiMail} value={email} onChange={event => setEmail(event.target.value)} />
        <Input placeholder="Senha atual" type="password" icon={FiLock} onChange={event => setOldPassword(event.target.value)} />
        <Input placeholder="Nova senha" type="password" icon={FiLock} onChange={event => setNewPassword(event.target.value)} />

        <Button title="Salvar" onClick={handleUpdate} />
      </Form>
    </Container>
  )
}