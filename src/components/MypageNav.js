import styled from 'styled-components';
import logo from '../img/SennaLogo.png';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

const MyPageNavWrapper = styled.div`
  position: relative;
`;
const Logo = styled.img`
  position: absolute;
  height: 5rem;
  display: block;
  margin-left: 3rem;
  margin-top: 1rem;
  &:hover {
    cursor: pointer;
  }
  @media all and (max-width:767px) {
    height: 2.5rem;
    margin-left: 1rem;
    margin-right: 0rem;
  }
`;
const NavButton = styled.button`
  right: 0;
  position: absolute;
  background: none;
  border: none;
  font-size: 15px;
  margin-right: 2rem;
  margin-top: 2rem;
  &:hover {
    cursor: pointer;
  }
  @media all and (max-width:767px) {
    font-size: 13px;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
  }
`;

export default function MypageNav({logout, kakaoLogoutHandler}) {

  const isLogin = useSelector(state => state.loginReducer.login.isLogin)
  const kakaoIsLogin = useSelector(state => state.kakaoReducer.login.isLogin)

  const clickLogo = () => {
    window.location.replace("/")
  }

  return (
    <MyPageNavWrapper>
      <Link to='./'>
        <Logo src={logo} onClick={clickLogo}/>
      </Link>
        {(()=> {
          if(isLogin){
            return (
              <NavButton onClick={() => logout()}>Logout </NavButton>

            )
          } else if (kakaoIsLogin){
            return (
              <NavButton onClick={() => kakaoLogoutHandler()}>Logout </NavButton>
            )
          }
        })()}
      
    </MyPageNavWrapper>
  )
}