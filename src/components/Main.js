import React, { useState, useEffect } from 'react';
//import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import '../style/main.css';
import Slider from "./Slider"
import LoginModal from './LoginModal';
import ContentModal from './ContentModal';
import Nav from '../components/Nav';
import Album from './Album';
import axios from "axios";
//import { loginUser } from '../modules/auth';

function Main() {

  //const dispatch = useDispatch();
  //const history = useHistory();

  const [scrollTop, setScrollTop] = useState(0); 
  const [modal, setModal] = useState(false);
  const [ctModal, setCtModal] = useState(false);
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [accessToken , setAccessToken] = useState('');
  const [loading, setLoading] = useState(null);

  const changeId = (e) => {
    setUserId(e.target.value);
  }
  const changePwd = (e) => {
    setPassword(e.target.value);
  }
  // scrollTop 상태값 감지
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, [scrollTop]);

  // top 버튼 함수
  const handleTop = () => {  
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    setScrollTop(0); 
  }
  // 스크롤 감지 함수
  const handleScroll = () => {
    const scroll = document.body.scrollTop || document.documentElement.scrollTop;
    const { scrollHeight, clientHeight } = document.documentElement;
    const scrollTop = scroll / (scrollHeight - clientHeight);
    setScrollTop(scrollTop);
  };
  // modal 열기
  const openModal = () => {
    setModal(true);
  }
  // 로그인 서밋 후 모달 닫기
  const onConfirm = async(e) => {
    setLoading(true);
    await axios.post('http://54.180.151.176/user/login', 
    { userId, password },
    { 'Content-Type':'application/json', withCredentials: true })
    .then(res => {
      if(res.status === 200) {
        let acTokenPath = res.data.data.accessToken;
        setAccessToken(`Bearer ${acTokenPath}`);
        setIsLogin(true);
        setTimeout(()=> {
          setLoading(false);
          setModal(false);
        },2000)
      }
    }).catch(err => {
      alert('로그인 정보가 유효하지 않습니다.')
      setLoading(null)
      console.log(err)
    })
  }
  // modal 취소 후 닫기
  const onCancle = () => {
    console.log('취소')
    setModal(false);
  }
  // 로그인 모달 외부 클릭 시 닫기
  const handleModalOff = (e) => {
    const clicked = e.target.closest('.modal');
    if (clicked) return;
    else {
      setModal(false);
    }
  };
  // 콘텐츠 모달 외부 클릭 시 닫기
  const handleCtModalOff = (e) => {
    const clicked = e.target.closest('.ctModal');
    if (clicked) return;
    else {
      setCtModal(false);
    }
  };
  // content modal 열기
  const openCtModal = (e) => {
    setCtModal(true);
  }

  return (
    <>
    <Nav openModal={openModal} scrollTop={scrollTop} isLogin={isLogin} loading={loading}/>
      <Slider />
      <div className='topBtnWrapper'>
        <button 
        className='topBtn' 
        style={{display: scrollTop > 0.2 ? 'block' : 'none'}}
        onClick={() => handleTop()}>Top</button>
      </div> 
      <LoginModal
        loading={loading}
        changePwd={changePwd}
        changeId={changeId}
        userId={userId}
        password={password}
        handleModalOff={handleModalOff}
        visible={modal}
        onConfirm={onConfirm}
        onCancle={onCancle}>
        <input type='text'></input>  
      </LoginModal>
      <Album openCtModal={openCtModal}/>
      <ContentModal
        handleCtModalOff={handleCtModalOff}
        ctModal={ctModal}
        >
      </ContentModal>
    </>
  )
}

export default Main;

