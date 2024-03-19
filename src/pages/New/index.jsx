import { Header } from "../../Components/Header";
import { Container, Form } from "./styles";
import { Input } from "../../Components/Input";
import { Textarea } from "../../Components/Textarea";
import { NoteItem } from "../../Components/NoteItem";
import { Section } from "../../Components/Section";
import { Button } from "../../Components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../../services/api";

export function New() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState("");

  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  function handleAddLink() {
    setLinks(prevState => [...prevState, newLink]);
    setNewLink("");
  }

  function handleAddTag() {
    setTags(prevState => [...prevState, newTag]);
    setNewTag("");
  }

  function handleRemoveLink(deleted) {
    setLinks(prevState => prevState.filter(link => link !== deleted))
  }

  function handleRemoveTag(deleted) {
    setTags(prevState => prevState.filter(tag => tag !== deleted))
  }

  const navigate = useNavigate();

  async function handleNewNote() {
    if(!title) {
      return alert("É necessário adicionar um título.")
    }

    if(newLink) {
      return alert("Você preencheu um link mas não adicionou, apague ou clique para adicionar.");
    }

    if(newTag) {
      return alert("Você preencheu uma tag mas não adicionou, apague ou clique para adicionar.");
    }

    await api.post("/notes", {
      title,
      description,
      tags,
      links
    });

    alert("Nota criada com sucesso!");
    return navigate("/");
  }

  return (
    <Container>
      <Header />

      <main>
        <Form>
          <header>
            <h1>Criar conta</h1>
            <Link to="/">Voltar</Link>
          </header>
          
          <Input placeholder="Título" onChange={event => setTitle(event.target.value)} />

          <Textarea placeholder="Observações" onChange={event => setDescription(event.target.value)} />

          <Section title="Links úteis">
            {
              links.map((link, index) => (
                <NoteItem
                  key={String(index)}
                  value={link}  
                  onClick={() => handleRemoveLink(link)} 
                />
              ))
            }
            {/* <NoteItem value="https://rocketseat.com.br"/> */}
            <NoteItem 
              $isnew="true" 
              placeholder="Adicionar novo link" 
              value={newLink} 
              onChange={event => setNewLink(event.target.value)} 
              onClick={handleAddLink} 
            />
          </Section>

          <Section title="Marcadores">
            <div className="tags">
              {/* <NoteItem value="React"/> */}
              {
                tags.map((tag, index) => (
                  <NoteItem
                    key={String(index)}
                    value={tag}
                    onClick={() => handleRemoveTag(tag)}
                  />
                ))
              }

              <NoteItem 
                $isnew="true" 
                placeholder="Nova tag"
                onChange={event => setNewTag(event.target.value)}
                value={newTag}
                onClick={handleAddTag}
              />
            </div>
          </Section>

          <Button title="Salvar" onClick={handleNewNote} />
        </Form>
      </main>
    </Container>
  )
}