import { useEffect, useState } from 'react';
import { FiPlus, FiSearch } from 'react-icons/fi';
import { api } from '../../services/api';
import { ButtonText } from '../../components/ButtonText';
import { Header } from '../../components/Header';
import { Container, Brand, Menu, Search, Content, NewNote } from './styles';
import { Input } from '../../components/Input';
import { Section } from '../../components/Section';
import { Note } from '../../components/Note';
import { useNavigate } from 'react-router-dom';

export function Home() {
  const [search, setSearch] = useState('');
  const [notes, setNotes] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const navigate = useNavigate();

  function handleSelectedTags(tagName) {
    if (tagName == 'all') {
      return setSelectedTags([]);
    }
    const isIncludedTagName = selectedTags.includes(tagName);
    if (isIncludedTagName) {
      setSelectedTags((prev) => prev.filter((tag) => tag !== tagName));
    } else {
      setSelectedTags((prev) => [...prev, tagName]);
    }
  }

  function handleViewNoteDetails(noteId) {
    navigate(`/details/${noteId}`);
  }

  useEffect(() => {
    async function fetchTags() {
      const response = await api.get('/tags');
      setTags(response.data);
    }
    fetchTags();
  }, []);

  useEffect(() => {
    async function fetchNotes() {
      const response = await api.get(
        `/notes?title=${search}&tags=${selectedTags}`
      );
      setNotes(response.data);
    }
    fetchNotes();
  }, [search, selectedTags]);

  return (
    <Container>
      <Brand>
        <h1>Rocketnotes</h1>
      </Brand>
      <Header />
      <Menu>
        <li>
          <ButtonText
            title='Todos'
            isActive={selectedTags.length === 0}
            onClick={() => handleSelectedTags('all')}
          />
        </li>
        {tags &&
          tags.map((tag, index) => {
            return (
              <li key={index}>
                <ButtonText
                  title={tag.name}
                  isActive={selectedTags.includes(tag.name)}
                  onClick={() => handleSelectedTags(tag.name)}
                />
              </li>
            );
          })}
      </Menu>
      <Search>
        <Input
          placeholder='Pesquisar pelo título'
          icon={FiSearch}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Search>
      <Content>
        <Section title='Minhas notas'>
          {notes &&
            notes.map((note) => {
              return (
                <Note
                  key={note.id}
                  data={note}
                  onClick={() => {
                    handleViewNoteDetails(note.id);
                  }}
                />
              );
            })}
        </Section>
      </Content>
      <NewNote to='/new'>
        <FiPlus />
        Criar nota
      </NewNote>
    </Container>
  );
}
