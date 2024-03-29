import { useState } from "react";
import { Container, Form, Background } from "./styles";
import { Input } from "../../Components/Input";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import { Button } from "../../Components/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { api } from "../../services/api";

export function SignUp() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  function handleSignUp() {
    if(!name || !email || !password) {
      return alert("Preencha todos os campos!");
    }

    api.post("/users", {name, email, password})
    .then(() => {
      alert("Usuário cadastrado com sucesso!");
      return navigate("/");
    })
    .catch(error => {
      if(error.response) {
        alert(error.response.data.message);
      } else {
        alert("Não foi possível cadastrar!");
      }
    });

    return;
  }

  return (
    <Container>
      <Background />

      <Form>
        <h1>Rocketnotes</h1>

        <p>Aplicação para gerenciar e salvar seus links úteis.</p>

        <h2>Crie sua conta</h2>

        <Input placeholder="Nome" type="text" icon={FiUser} onChange={event => setName(event.target.value)} />
        <Input placeholder="E-mail" type="text" icon={FiMail} onChange={event => setEmail(event.target.value)} />
        <Input placeholder="Senha" type="password" icon={FiLock} onChange={event => setPassword(event.target.value)} />

        <Button title="Cadastrar" onClick={handleSignUp} />

        <Link to="/">Voltar para o login</Link>
        
      </Form>
    </Container>
  )
}