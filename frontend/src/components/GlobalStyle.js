import { createGlobalStyle } from 'styled-components';
 
const GlobalStyle = createGlobalStyle`
  body{
    margin: 0;
    padding: 0;
    font-family: 'Quicksand', sans-serif;}

#brand{
    position: absolute;
    bottom: 0;
    left: 100px;
    width: 40%;
    height: auto;
}


.slide{
    height: 100vh;
    width: 100vw;
    scroll-snap-align: start;
}

.wrapper {
    display: flex;
    flex-direction: row;
    width: 600vw;
    transform:rotate(90deg) translateY(-100vh);
    transform-origin: top left;
    scroll-snap-type: x mandatory;
    scroll-snap-points-x: repeat(1000px);
}

.one {
    position: relative;
    background-image: url("./images/tierra.jpeg");
    background-size: cover;
    transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
    background-size: 90%;
    background-repeat: no-repeat;
    background-position: center -2vh;
    background-color: #FFF;
}

.two{
    position: relative;
    background-image: url("./images/clayhands.jpeg");
    background-size: 80%;
    background-repeat: no-repeat;
    background-position: 25vw -13vh;
    background-color:white;
    overflow: hidden;
    
}
.three{
    position: relative;
    background-image: url("./images/roots.jpeg");
    background-size: 85%;
    background-repeat: no-repeat;
    background-position: center center;
    background-color:white;
}

.four{
    position: relative;
    background-image: url("./images/lapacho.jpeg");
    background-size: 80%;
    background-repeat: no-repeat;
    background-position: center center;
    background-color:white;
}


.outer-wrapper{
    width: 100vh;
    height: 100vw;
    transform: rotate(-90deg) translateX(-100vh);
    transform-origin: top left;
    overflow-y:scroll;
    overflow-x: hidden;
    position: absolute;
    scrollbar-width: none;
    -ms-overflow-style: none;
}

::-webkit-scrollbar{
    display: none;
}

.rotate{
    -webkit-transform:rotate(270deg);
    -moz-transform:rotate(270deg);
    -o-transform:rotate(270deg);
    writing-mode:lr-tb;
}

a {
  text-decoration:none;
  color: black;
}
li {
  list-style:none;
  font-size: 12px;
}
ul {
  padding:0;
  margin:0;
}




#about .side-div {
  display: flex;
  justify-content: flex-end;
  position:absolute;
  height:100%;
  width:30%;
  background:rgba(218, 110, 22, 0.445);
  transform: skewX(-5deg) translateX(-50px);
  transition: 1s all ease-in-out;
  -webkit-transition: 1s all ease-in-out;
}

#about .content {
  position:relative;
  padding:200px 0 0 200px;
  color:#000;
  z-index:10;
  height:300px;
}

.btn {
  outline:none;
  border:none;
  text-decoration:none;
  text-transform:uppercase;
  background:#202020;
  color:#eaeaea;
  box-sizing:border-box;
  margin-top:20px;
  padding:10px 40px;
}

.anim-trans {
  transform: skewX(3deg) translateX(0)!important;
  width:100vw!important;
  z-index:11; 
  box-shadow: 10px 10px 5px #eaeaea;
  }

.transition .about-info {
  transform: skewX(-3deg);
  opacity: 0;
  width: 30%;
  margin: 50px;
  padding: 50px;
  background-color: rgba(255, 255, 255, .5);
  text-align: justify;
  transition: all .5s ease;
}

#portfolios {
  position: relative;
  display: flex;
  justify-content: flex-end;
}

#portfolios .side-div {
  position:absolute;
  height:100%;
  width:30%;
  background:rgba(218, 110, 22, 0.445);
  transform: skewX(5deg) translateX(100px);
}

#portfolios .content {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  color:#000;
  z-index:10;
  padding: 100px;
  text-align: right;
}
`
 
export default GlobalStyle;