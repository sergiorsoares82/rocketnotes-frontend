import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.header`
  grid-area: header;

  height: 10.5rem;
  width: 100%;

  border-bottom: 1px solid ${({ theme }) => theme.COLORS.BACKGROUND_700};

  display: flex;
  justify-content: space-between;

  padding: 0 8rem;
`;

export const Profile = styled(Link)`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.COLORS.WHITE};

  > img {
    height: 5.6rem;
    width: 5.6rem;
    border-radius: 50%;
  }

  > div {
    display: flex;
    flex-direction: column;

    margin-left: 1.6rem;
    line-height: 2.4rem;
  }
`;

export const Logout = styled.button`
  border: none;
  background: none;

  > svg {
    color: ${({ theme }) => theme.COLORS.GRAY_100};
    font-size: 2.4rem;
  }
`;
