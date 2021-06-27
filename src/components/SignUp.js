import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components';
import userImg from '../img/userImg.png';
import photo from '../img/signPhoto2.jpeg';

const Wrapper = styled.div`
  display: flex;
`
const SignupContainer = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  align-items: center;
  width: 100%;
`;

const Title = styled.h1`
  margin-bottom: 4rem;
`
// 이미지 wrapper
const ProfileCircle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 100px;
  overflow: hidden;
  margin-bottom: 20px;
  box-shadow: 8px 8px 8px 8px rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FileWrapper = styled.label`
  display: flex;
  width: 150px;
  height: 25px;
  font-size: 11px;
  text-align: center;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: #000;
  background-color: #fff;
  border: none;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  margin-bottom: 3rem;
  &:hover{
    color: #fff;
    transform: translateY(-7px);
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
const ProfileInput = styled.input`
  position: absolute; 
  width: 1px; 
  height: 1px; 
  padding: 0; 
  margin: -1px; 
  overflow: hidden; 
  clip:rect(0,0,0,0); 
  border: 0;
`;

const SignupInput = styled.input`
  max-width: 300px;
  min-width: 210px;
  margin-top: 15px;
  width: 30%;
  height: 35px;
  border: none;
  padding-left: 10px;
  box-shadow: 8px 8px 8px 5px rgba(0,0,0,0.6);
  color: #1b1b1b;
  &:focus{
    outline: none;
  }
`;

const PhotoSection = styled.div`
  height: 100vh;
`;
const Photo = styled.img`
  max-height: 100%;
  width: auto;

`;
const ButtonGroup = styled.section`
  width: 100%;
  text-align: right;
  display: flex;
  justify-content: center;
  margin-top: 4rem;
`;
const CancleBtn = styled.button`
  width: 100px;
  height: 37px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: #000;
  background-color: #bdbdbd;
  border: none;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  margin-right: 1rem;
  &:hover{
    background-color: #8d8d8d;
    box-shadow: 0px 15px 20px rgba(141, 141, 141, 0.4);
    color: #fff;
    transform: translateY(-7px);
  }
`;
const SubmitBtn = styled.button`
  width: 100px;
  height: 37px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: #000;
  background-color: #fff;
  border: none;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  margin-left: 1rem;
  &:hover{
    background-color: #00acc1;
    box-shadow: 0px 15px 20px rgba(0, 172, 193, 0.4);
    color: #fff;
    transform: translateY(-7px);
  }
`;

export default function SignUp() {

  const [file, setFile] = useState('');
  const [previewURL, setPreviewURL] = useState('');
  
  // 유저 이미지 적용 함수
  const handleFileOnChange = (event) => {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    console.log(file)
    reader.onload = (function(file) {
      setFile(file)
      setPreviewURL(reader.result);
    })(file);
    reader.readAsDataURL(file)
  }
  
  // 유저 이미지 적용 조건문
  let profile_preview = null;
  if(file !== ''){
    profile_preview = <img className='profile_preview' src={previewURL}></img>
  }else{
    profile_preview = <img className='profile_preview' src={userImg}></img>
  }

  // 캔슬 버튼 누를 시 새로고침을 위한 함수
  const cancle = () => {
    window.location.replace("/")
  }

  return (
    <>
    <Wrapper> 
      <PhotoSection>
        <Photo src={photo} />
      </PhotoSection>
      <SignupContainer>
        <Title>Join Free</Title>
        <ProfileCircle>
          {profile_preview}
        </ProfileCircle>
        <FileWrapper htmlFor='ex_filename'>Image Upload</FileWrapper>
        <ProfileInput id='ex_filename' type='file' name='profile_img' accept='image/*' onChange={handleFileOnChange}/>
        <SignupInput type='text' placeholder='Write your ID' />
        <SignupInput type='password' placeholder='Write your Password' />
        <SignupInput type='password' placeholder='One more check Password' />
        <ButtonGroup>
          <Link to='./'>
            <CancleBtn onClick={() => cancle()}>Cancle</CancleBtn>
          </Link>
          <SubmitBtn>Join</SubmitBtn>
        </ButtonGroup>
      </SignupContainer>
    </Wrapper>
    </>
  )
}
