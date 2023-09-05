import { useEffect, useState } from 'react';
import { Button } from '../../components/Button/';
import { ButtonText } from '../../components/ButtonText';
import { Header } from '../../components/Header';
import { Section } from '../../components/Section';
import { Tag } from '../../components/Tags';
import { Container, Content, Links } from './styles.js';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../services/api';

export function Details() {
  const [data, setData] = useState();
  const params = useParams();
  const navigate = useNavigate();

  function handleBackHome() {
    navigate(-1);
  }

  async function handleRemoveNote() {
    const confirm = window.confirm('Deseja realmente excluir a nota?');

    if (confirm) {
      await api.delete(`/notes/${params.id}`);
      navigate(-1);
    }
  }

  useEffect(() => {
    async function fetchNote() {
      const response = await api.get(`/notes/${params.id}`);
      setData(response.data);
    }

    fetchNote();
  }, []);

  return (
    <Container>
      <Header />

      {data && (
        <main>
          <Content>
            <ButtonText title='Excluir nota' onClick={handleRemoveNote} />

            <h1>{data.title}</h1>
            <p>{data.description}</p>

            {data.links && (
              <Section title='Links úteis'>
                <Links>
                  {data.links.map((link) => (
                    <li key={link.id}>
                      <a href={link.url} target='_blank'>
                        {link.url}
                      </a>
                    </li>
                  ))}
                </Links>
              </Section>
            )}
            {data.tags && (
              <Section title='Marcadores'>
                {data.tags.map((tag) => (
                  <Tag key={tag.id} title={tag.name} />
                ))}
              </Section>
            )}
            <Button title='Voltar' onClick={handleBackHome} />
          </Content>
        </main>
      )}
    </Container>
  );
}
