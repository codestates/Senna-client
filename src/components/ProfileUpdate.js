import React, {useState} from 'react';
import styled from 'styled-components';
import userImg from '../img/userImg.png';
import MypageNav from '../components/MypageNav';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { updateProfile , updateKakaoProfile} from "../modules/updateProfileReducer"
import { getUserInfo } from '../modules/loginReducer';
import { getKakaoUserInfo } from '../modules/kakaoReducer'

const UpdateUserBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  background-image: linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.5) ),url('https://images.unsplash.com/photo-1625153665957-4b9c0ec21166?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
`;
const UserNewImage = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 100px;
  overflow: hidden;
  margin-bottom: 1rem;
  box-shadow: 8px 8px 8px 8px rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  @media all and (max-width:767px) {
    width: 150px;
    height: 150px;
  }
`;
const AddNewFile = styled.input`
  margin-top: 1.5rem;
  padding: 0.7rem;
  max-width: 300px;
  width: 30%;
  color: #1b1b1b;
  background: #eeeeee;
  font-size: 13px;
  box-shadow: 10px 10px 10px 0 rgba(0, 0, 0, 0.8), 0 10px 10px 0 rgba(0, 0, 0, 0.8);
  &:hover{
    color: #fff;
    cursor: pointer;
    background: #494949;
  }
  @media all and (max-width:767px) {
    max-width: 500px;
    width: 60%;
  }
`; 
const ChangeNewPasswords = styled.input`
  margin: 0 auto;
  margin-top: 1rem;
  width: 30%;
  max-width: 300px;
  height: 40px;
  border: none;
  padding-left: 1rem;
  padding-right: 1rem;
  color: #1b1b1b;
  background: #eeeeee;
  box-shadow: 10px 10px 10px 0 rgba(0, 0, 0, 0.8), 0 10px 10px 0 rgba(0, 0, 0, 0.8);
  &:focus{
    outline: none;
  }
  @media all and (max-width:767px) {
    max-width: 500px;
    width: 60%;
  }
`;
const UpdateUserInfoComplete = styled.button`
  width: 100px;
  height: 37px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: #eeeeee;
  background-color: #00acc1;
  border: none;
  box-shadow: 0px 15px 20px rgba(0, 172, 193, 0.4);
  cursor: pointer;
  outline: none;
  margin-left: 1rem;
  margin-top: 3rem;
  &:hover{
    color: #1b1b1b;
    background-color: #eeeeee;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    border: none;
  }
`;

function ProfileUpdate () {

  const [previewURL, setPreviewURL] = useState('');
  const [img, setImg] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const id = useSelector(state => state.loginReducer.login.userKey)
  const accessToken = useSelector(state => state.loginReducer.login.accessToken)
  const isLogin = useSelector(state => state.loginReducer.login.isLogin)
  const kakaoIsLogin = useSelector(state => state.kakaoReducer.login.isLogin)
  const kakaoUserKey = useSelector(state => state.kakaoReducer.login.userKey)
  const kakaoAcToken = useSelector(state => state.kakaoReducer.login.accessToken);
 
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const updateProfileHandler = async() => {
      await dispatch(updateProfile(id,img,password))
      alert('???????????? ?????????????????????.')
      history.push('/mypage');
      await dispatch(getUserInfo(accessToken)); 
  };
  const updateKakaoUserProfileHandler = async() => {
    await dispatch(updateKakaoProfile(kakaoUserKey,img))
    alert('???????????? ?????????????????????.')
    history.push('/mypage');
    await dispatch(getKakaoUserInfo(kakaoAcToken));
  };
  const handleFileOnChange = async (event) => {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      setImg(file)
      setPreviewURL(reader.result);
    };
    reader.readAsDataURL(file)
  };

  let profile_preview = null;

  if(img !== ''){
    profile_preview = <img className='profile_preview' src={previewURL}></img>
  }else{
    profile_preview = <img className='profile_preview' src={userImg}></img>
  };
  
  return (
    <>
      <MypageNav />
      <UpdateUserBox>
         {(()=> {
              if(isLogin){
                return (
                  <>
                  <UserNewImage>
                 {profile_preview}
                 </UserNewImage>
                 <AddNewFile type='file' className='img' name='profileImg' accept='image/*' onChange={handleFileOnChange} />
                 <ChangeNewPasswords type='password' placeholder="??? ????????????" value={password} onChange={onChangePassword}/>
                 <ChangeNewPasswords type='password' placeholder="??? ???????????? ??????" />
                 <UpdateUserInfoComplete type='submit' onClick={updateProfileHandler}>Submit</UpdateUserInfoComplete>
                 </>
                )
              } else if (kakaoIsLogin){
                return (
                <>
                 <UserNewImage>
                 {profile_preview}
                 </UserNewImage>
                 <AddNewFile type='file' className='img' name='profileImg' accept='image/*' onChange={handleFileOnChange} />
                 <UpdateUserInfoComplete type='submit' onClick={updateKakaoUserProfileHandler}>Submit</UpdateUserInfoComplete>
                 </>
                )
              }
            })()}
        
      </UpdateUserBox>
    </> 
  )
         
}

export default ProfileUpdate;