import { Container, Links, Content } from "./styles";
import { Button } from "../../Components/Button";
import { Header } from "../../Components/Header";
import { Section } from "../../Components/Section";
import { Tag } from "../../Components/Tag";
import { ButtonText } from "../../Components/ButtonText";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../services/api";

export function Details() {
  const [data, setData] = useState(null);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchNote() {
      const response = await api.get(`/notes/${params.id}`);
      setData(response.data);
    }

    fetchNote();
  }, []);


  function handleBack() {
    return navigate("/");
  }

  async function handleRemove() {
    const confirm = window.confirm("Você realmente deseja apagar esta nota?");

    if(confirm) {
      await api.delete(`/notes/${params.id}`);
      navigate("/");
    }
  }

  return (
    <Container>
      <Header />
      {
        data &&
        <main>
          <Content>
            <ButtonText title="Excluir nota" onClick={handleRemove} />

            <h1>
              { data.title }
            </h1>

            <p>
              { data.description }
            </p>


            {
              data.links &&
              <Section title="Links úteis">
                <Links>
                  {
                    data.links.map(link => (
                      <li key={String(link.id)}><a href={link.url} target="_blank">{link.url}</a></li>  
                    ))
                  }
                </Links>
              </Section>
            }

            {
              data.tags &&
              <Section title="Marcadores">
                {
                  data.tags.map(tag => (
                    <Tag key={String(tag.id)} title={tag.name} />
                  ))
                }
              </Section>
            }

            <Button title="Voltar" onClick={handleBack} />
          </Content>
        </main>
      }
    </Container>
  )
}
