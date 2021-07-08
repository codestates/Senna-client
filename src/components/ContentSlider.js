import React from "react";
import styled from "styled-components";

const ContentSlider = (({image}) => {
  
  const Container = styled.div`
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    width: 65%;
  `;
  
  const Wrapper = styled.div`//carousel-wrapper
    display: flex;
    width: 500px; 
    height: 100%;
    overflow: hidden;
    background: black;
  `;
  
  const StyledSlider = styled.div` //carousel
    display: flex;
    width: 100%;
    height: 100%;
    background: black;
    align-items: center;
    text-align: center;
    transform: translate3d(0, 0, 0); 
    transition: transform 0.7s;
  `;
  
  const Img = styled.img`
    width: 500px;
    text-align: center;
  `;

  const SliderBtn = styled.button`
    display: flex;
    width: 2.2rem;
    height: 100%;
    color: #cfcfcf;
    font-size: 50px;
    align-items: center;
    background: transparent;
    border: none;
    &:hover{
      color: #757575;
      cursor: pointer;
    }
  `;

  let index = 0;
  const modalcarousel = document.getElementsByClassName('modalcarousel'); 

  //  이전 버튼
  const onPrev = () => {
    if (index === 0) return; 
    index -= 1; 
    modalcarousel[0].style['transform'] = `translate3d(-${500 * index}px, 0, 0)`; 
  }
  // 다음 버튼
  const onNext = () => {
    if(image.length === 1) {
      if (index === 0) return; 
    }else if(image.length === 2){
      if (index === 1) return; 
    }else if(image.length === 3){
      if (index === 2) return; 
    }else if(image.length === 4){
      if (index === 3) return; 
    }else if(image.length === 5){
      if (index === 4) return; 
    }
    index += 1; 
    modalcarousel[0].style['transform'] = `translate3d(-${500 * index}px, 0, 0)`; 
  } 

  const photoList = image.map((e,index) =>
    <Img src={e} key={index} loading="lazy" />
  )

  return (
    <>
      <Container>
        <SliderBtn onClick={() => onPrev()}></SliderBtn>
        <Wrapper>
          <StyledSlider className='modalcarousel'>
            {photoList}
          </StyledSlider>
        </Wrapper>
        <SliderBtn onClick={() => onNext()}></SliderBtn>
      </Container>
    </>
  );
})
export default ContentSlider;