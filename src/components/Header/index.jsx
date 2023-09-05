import { api } from '../../services/api';
import { useAuth } from '../../hooks/auth';
import { Container, Logout, Profile } from './style';
import { RiShutDownLine } from 'react-icons/ri';
import avatarPlaceholder from '../../assets/avatar_placeholder.svg';
import { useNavigate } from 'react-router-dom';

export function Header() {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  function handleSignOut() {
    signOut();
    navigate('/');
  }

  const avatarURL = user.avatar
    ? `${api.defaults.baseURL}/files/${user.avatar}`
    : avatarPlaceholder;

  return (
    <Container>
      <Profile to='/profile'>
        <img src={avatarURL} alt='Foto do usuário' />
        <div>
          <span>Bem vindo</span>
          <strong>{user.name}</strong>
        </div>
      </Profile>
      <Logout onClick={handleSignOut}>
        <RiShutDownLine />
      </Logout>
    </Container>
  );
}
