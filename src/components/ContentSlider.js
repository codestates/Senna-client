import React, { useState } from "react";
import styled, { css } from "styled-components";

import korea1 from '../img/korea1.jpeg';
import korea2 from '../img/korea2.jpeg';
import korea4 from '../img/korea4.jpeg';

export default function ContentSlider() {
  
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
  `;
  
  const StyledSlider = styled.div` //carousel
    display: flex;
    width: 100%;
    height: 100%;
    background: black;
    align-items: center;
    text-align: center;
    transform: translate3d(0, 0, 0); 
    transition: transform 0.2s;
  `;
  
  const Img = styled.img`
    width: 500px;
    text-align: center;
  `;

  const SliderBtn = styled.button`
    display: flex;
    width: 2.2rem;
    height: 5rem;
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
  const carousel = document.getElementsByClassName('carousel'); 

  //  이전 버튼
  const onPrev = () => {
    if (index === 0) return; 
    index -= 1; 
    carousel[0].style['transform'] = `translate3d(-${500 * index}px, 0, 0)`; 
  }
  // 다음 버튼
  const onNext = () => {
    if (index === 2) return; 
    index += 1; 
    carousel[0].style['transform'] = `translate3d(-${500 * index}px, 0, 0)`; 
  } 

  const list = [ korea4,korea2,korea1 ];
  const photoList = list.map(e =>
    <Img src={e} loading="lazy" />
  )

  return (
    <>
      <Container>
        <SliderBtn onClick={() => onPrev()}>{`<`}</SliderBtn>
        <Wrapper>
          <StyledSlider className='carousel'>
            {photoList}
          </StyledSlider>
        </Wrapper>
        <SliderBtn onClick={() => onNext()}>{`>`}</SliderBtn>
      </Container>
    </>
  );
}
