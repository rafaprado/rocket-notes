import { Container, Form, Background } from "./styles";
import { Input } from "../../Components/Input";
import { FiMail, FiLock } from "react-icons/fi";
import { Button } from "../../Components/Button";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import { useState } from "react";

export function SignIn() {
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  
  function handleSignIn() {
    signIn({ email, password });
  }

  return (
    <Container>
      <Form>
        <h1>Rocketnotes</h1>

        <p>Aplicação para gerenciar e salvar seus links úteis.</p>

        <h2>Faça seu login</h2>

        <Input placeholder="E-mail" type="text" icon={FiMail} onChange={event => setEmail(event.target.value)} />
        <Input placeholder="Senha" type="password" icon={FiLock} onChange={event => setPassword(event.target.value)} />

        <Button title="Entrar" onClick={handleSignIn} />

        <Link to="/register">Criar conta</Link>
        
      </Form>

      <Background />
    </Container>
  )
}