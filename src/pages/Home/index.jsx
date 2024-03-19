import { FiPlus, FiSearch } from "react-icons/fi";
import { Container, Brand, Menu, Search, Content, NewNote } from "./styles.js";
import { Header } from "../../Components/Header/index.jsx";
import { ButtonText } from "../../Components/ButtonText";
import { Input } from "../../Components/Input";
import { Section } from "../../Components/Section";
import { Note } from "../../Components/Note";
import { useEffect, useState } from "react";
import { api } from "../../services/api.js";
import { useNavigate } from "react-router-dom";

export function Home() {
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [notes, setNotes] = useState([]);

  const navigate = useNavigate();

  function handleSelectedTag(tagName) {
    if(tagName === "all") {
      return setSelectedTags([]);
    }

    const alreadySelected = selectedTags.includes(tagName);

    if(alreadySelected) {
      const filteredTags = selectedTags.filter(tag => tag !== tagName);
      setSelectedTags(filteredTags);

      return;
    }

    setSelectedTags(prevState => [...prevState, tagName]);
  }

  function handleDetails(id) {
    navigate(`/details/${id}`);
  }

  useEffect(() => {
    async function fetchTags() {
      const response = await api.get("/tags");
      setTags(response.data);
    }

    fetchTags();
  }, []);

  useEffect(() => {
    async function fetchSearch() {
      const response = await api.get(`/notes?title=${search}&tags=${selectedTags}`);
      setNotes(response.data);
    }

    fetchSearch();

  }, [selectedTags, search]);

  return (
    <Container>
      <Brand>
        <h1>Rocketnotes</h1>
      </Brand>

      <Header />

      <Menu>
        <li>
          <ButtonText title="Todos" 
            isActive={selectedTags.length === 0}
            onClick={() => handleSelectedTag("all")} />
          </li>
        { 
          tags && tags.map((tag, index) => (
            <li key={index}><ButtonText title={tag.name} isActive={selectedTags.includes(tag.name)} onClick={() => handleSelectedTag(tag.name)}/></li>
          ))
        }
      </Menu>

      <Search>
        <Input type="text" placeholder="Pesquisar pelo título" icon={FiSearch} onChange={event => setSearch(event.target.value)} />
      </Search>

      <Content>
        <Section title="Minhas notas">
          {
            notes.map(note => (
              <Note key={String(note.id)} data={note} onClick={() => handleDetails(note.id)} />
            ))
          }
        </Section>
      </Content>

      <NewNote to="/new">
        <FiPlus />
        Criar nota
      </NewNote>
    </Container>
  );
}