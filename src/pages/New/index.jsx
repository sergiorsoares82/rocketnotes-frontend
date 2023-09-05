import { Link, useNavigate } from 'react-router-dom';
import { Container, Form } from './styles';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { Textarea } from '../../components/Textarea';
import { Section } from '../../components/Section';
import { NoteItem } from '../../components/NoteItem';
import { Button } from '../../components/Button';
import { useState } from 'react';
import { api } from '../../services/api';
import { useAuth } from '../../hooks/auth';
import { ButtonText } from '../../components/ButtonText';

export function New() {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [newLink, setNewLink] = useState('');
  const [links, setLinks] = useState([]);

  const [newTag, setNewTag] = useState('');
  const [tags, setTags] = useState([]);

  const navigate = useNavigate();

  function handleAddLink() {
    setLinks((prev) => [...prev, newLink]);
    setNewLink('');
  }

  function handleRemoveLink(deleted) {
    setLinks((prev) => prev.filter((link) => link !== deleted));
  }

  function handleAddTag() {
    setTags((prev) => [...prev, newTag]);
    setNewTag('');
  }

  function handleRemoveTag(deleted) {
    setTags((prev) => prev.filter((tag) => tag !== deleted));
  }

  async function handleSaveNote() {
    if (!title) {
      alert('Digite um título para a nota');
    }

    if (newLink) {
      alert('O link não foi adicionado.');
    }

    if (newTag) {
      alert('A tag não foi adicionada.');
    }

    await api.post('/notes', {
      title,
      description,
      links,
      tags,
      user_id: user.id,
    });
    alert('Nota criada com sucesso.');
    navigate(-1);
  }

  function handleBackHome() {
    navigate(-1);
  }

  return (
    <Container>
      <Header />
      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>
            <ButtonText title='Voltar' onClick={handleBackHome} />
          </header>
          <Input
            placeholder='Título'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder='Observações'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Section title='Links úteis'>
            {links.map((link, index) => {
              return (
                <NoteItem
                  key={index}
                  value={link}
                  onClick={() => handleRemoveLink(link)}
                />
              );
            })}
            <NoteItem
              isNew
              placeholder='Novo link'
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              onClick={handleAddLink}
            />
          </Section>
          <Section title='Marcadores'>
            {tags.map((tag, index) => {
              return (
                <NoteItem
                  key={index}
                  value={tag}
                  onClick={() => handleRemoveTag(tag)}
                />
              );
            })}
            <div className='tags'>
              <NoteItem
                isNew
                placeholder='Nova tag'
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onClick={handleAddTag}
              />
            </div>
          </Section>

          <Button title='Salvar' onClick={handleSaveNote} />
        </Form>
      </main>
    </Container>
  );
}
