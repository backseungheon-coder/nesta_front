import React, { useState } from 'react';
import axios from 'axios';
import './scss/style.scss' 
import {
    Link,
    BrowserRouter,
    Routes,
    Route,
  }from "react-router-dom";


function Login(props) {
    const [inputId, setInputId] = useState('')
    const [inputE, setInputE] = useState('')
    const [inputPw, setInputPw] = useState('')
    
	// input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
    const handleInputId = (e) => {
        setInputId(e.target.value)
        console.log(e.target.value)
    }
 
    const handleInputPw = (e) => {
        setInputPw(e.target.value)
        console.log(e.target.value)
    }
    
    const handleInputE = (e) => {
        setInputE(e.target.value)
    }

    const onClickLogin = async () => { 
          
            await fetch('https://api.nestatest.shop/rest-auth/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        "username": inputId,
                        "email": "",
                        "password": inputPw,
                    }
                )
              })
              .then(response => response.json())
              .catch((error) =>alert(error))
              
              .then(response => {
                if (response.key != null){
                    
                    window.sessionStorage.setItem("loggeduser", inputId);
                    window.sessionStorage.setItem("key", response.key);
                    props.setlogined('logged')
                }
                axios
                    .post("https://api.nestatest.shop/manager/agency/", {
                                mode:'get_log',
                                username:inputId,
                            })
                            .then(function (response) {
                                console.log(response.data)
                                window.sessionStorage.setItem("id", response.data.id);
                                window.sessionStorage.setItem("level", response.data.level);
                                window.location.reload();
                            })
                            .catch(function (error) {
                                console.log(error);
                            })
                 })
    }
    return(
                 <>

                <h2>로그인하기</h2>

                <div action="">
                    <div className="inputBox">
                        <input type="text" name="username" id="uEmail" autoComplete="off" required value={inputId} onChange={handleInputId}/>
                        <label >
                            <span>이메일</span>
                            
                        </label>
                    </div>

                    <div className="inputBox">
                        <input type="password" name="password" id="uPassword" className="pw" autoComplete="off" required value={inputPw} onChange={handleInputPw}/>
                        <label >
                            <span>비밀번호</span>
                        </label>
                        <button type="button">show</button>
                        <button type="button" className="passwordEye">hide</button>
                    </div>

                    <input onClick={onClickLogin} type="submit" name="uSubmit" id="uSubmit" value="로그인" />
                    
                    <div className="clearfix">
                        <div className="inputCheck">
                            <input type="checkbox" name="uCheckbox" id="uCheckbox"/>
                            <label >
                                <span>로그인 유지</span>
                            </label>
                        </div>
                        <div className="forgot"><a href="#">비밀번호 찾기</a></div>
                    </div>
                    
                </div>

                <div>아직 계정이 없으신가요?<Link to="/Sign_up">회원가입</Link></div>





    </>               
    )
}
export default Login;