
import Store_list from "./Store_list.js"

import React, { useState  } from 'react';
import Box from '@mui/material/Box';
import Create_store from "./Create_store.js";
import './Store.css';
import axios from 'axios';
import {Form,InputGroup,Collapse } from 'react-bootstrap';
// import S_buttons from './S_buttons.js';

import Cal_create_modal from './modals/Cal_create_modal.js'
import fileDownload from 'react-file-download';
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search';
import {FileExcel2} from '@styled-icons/remix-line/FileExcel2';
import Date_picker from './Date_picker.js'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {useSelector} from 'react-redux';



const Ex_Button = styled.button`
background-color:transparent;
display: flex;
width:120px;
height:35px;
justifyContent: center;
align-items: center;
border:2px solid #0C9B00;
border-radius: 6px;
color: #0C9B00;

&:hover {
  color: white;
  background-color: #0C9B00;
}
`

const Icon_FileExcel2 = styled(FileExcel2)`
width:30px;
height:30px;
margin-left:10px;
margin-right:5px;
`

const Open_button = styled.button`
border:none;
width:48px;
box-shadow: rgb(100 100 111 / 20%) 0px 7px 29px 0px;
height:50px;
background-color: rgb(255, 255, 255);
border-radius: 50px 0px 0px 50px;
`



function Main_table(){
    const [change, setchange] = useState('changed')
    const [startDate, setStartDatestart] = useState(new Date());
    const [startDateend, setStartDateend] = useState(new Date());
    const [load,setLoad] = useState('needload');
    const [a_data, seta_data] = useState([]);
    const [checked, setChecked] = useState([]);
    const [open, setOpen] = useState(true);

    const [searched_change, setsearched_change] = useState('unsearched')
    const [loadstate, setloadstate] = useState('loaded');
    const [s_rows,sets_rows] = useState([])
    const [rows, setrows] = useState([])
    const [totalcount, setTotalcount] = useState();



    const [search_name,setsearch_name] = useState('');
    const [agency_id,setagency_id] = useState('');
    const [submit_date,setsubmit_date] = useState('');
    const [now_cate,setnow_cate] = useState('');
    const [cal_cate,setcal_cate] = useState('');

    const goturl = useSelector((state) => state);

    if(loadstate==='loaded'){
      axios.get(`${goturl}/store/`)
      .then((response) => {
        setrows([...response.data])
        setloadstate('needload')
        setTotalcount([...response.data].length)
          
        })  
    }

    // const ExampleCustomInput = ({ value, onClick }) => (
    //     <Button variant="outline-secondary"className="example-custom-input" style={{margin:0,width:130}} onClick={onClick}>{value}</Button>
    // );
    
    if(load === 'needload'){
        axios.get(`${goturl}/agency/`)
        .then((response) => {
        seta_data([...response.data])
        setLoad('laoded')        
      })
    }

    if(open == false){
      var element =(
        <><KeyboardArrowDownIcon sx={{ fontSize: 30 }}/></>
      )
    }
    else{
      var element =(
    
        <><KeyboardArrowUpIcon sx={{ fontSize: 30 }}/></>
      )

    }
    
    return(
        <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            m:2,
            height:'auto',
        }}
      >
              <Box sx={{display: 'flex',justifyContent: 'space-between', marginTop:2, alignItems: 'center'}}>
                
                  <Box>
                      <Ex_Button 

                      onClick={() => {
                      
                            const url =`${goturl}/create/excel/`;
                            const formData = new FormData();
                            var counter = 0;
                            for(var i = 0; i < checked.length; i++) {
                              formData.append("id"+i,checked[i])
                              counter=counter+1;
                            }
                            formData.append('counter',counter)
                            formData.append('mode','create')
                            
                        axios({
                            method: "POST",
                            url: url,
                            data: formData,
                            headers:{
                                "Content-Type":"application/json",
                                }
                        }).then(function(response){
                          var url_local = `https://api.nestatest.shop`
                          var media = response.data
                          var donw = url_local+media
                          fetch(donw)
                          .then( console.log(donw))
                          .then(res => res.blob()) // Gets the response and returns it as a blob
                          .then(blob => {
                              fileDownload(blob, '가맹점_리스트.xlsx');
                          })
                          .then(function(e){
                            const del_url =`${goturl}/create/excel/`;
                            const del_formData = new FormData();
                            del_formData.append("mode",'del')

                            axios({
                                method: "POST",
                                url: del_url,
                                data: del_formData,
                                headers:{
                                    "Content-Type":"application/json",
                                }
                              })
                         })
                         })
                      }}
                      ><Icon_FileExcel2/>다운로드</Ex_Button>{' '}
                  </Box>
                  <Box>
                    <InputGroup className="mb-3" style={{width:'500px'}}>

                          <Open_button
                            onClick={() => setOpen(!open)}
                            // aria-expanded={open}
                          >
                            {element}
                          </Open_button>
                      
                          <Form.Control
                          
                          onChange={(e)=>{
                            setsearch_name(e.target.value);
                          }}

                          aria-label="Recipient's username"
                          aria-describedby="basic-addon2"
                          style={{border:'none',boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',height:'50px'}}
                          value={search_name}
                          />

                          
                          
                          <Open_button

                            onClick={()=>{
                              axios
                              .post(`${goturl}/store_search/`, {
                                        search_name:search_name,
                                        agency_id:agency_id,
                                        submit_date:submit_date,
                                        now_cate:now_cate,
                                        cal_cate:cal_cate,

                                      })
                                      .then(function (response) {
                                          console.log(response.data);
                                          setrows([...response.data]);


                                      })
                                      .catch(function (error) {
                                          console.log(error);
                                      });
                            }
                            }

                          style={{border:'none',backgroundColor:'#fff',boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',borderRadius:'0px 50px 50px 0px',height:'50px'}}><SearchIcon sx={{color:'#A9A9A9'}}/></Open_button>
                      </InputGroup>
                  </Box>
                  <Box sx={{display: 'flex'}}>
                      <Cal_create_modal checked={checked} setChecked={setChecked}/>
                      <Create_store val='store_create' setchange={setchange} />
                  </Box>

              </Box>

 

              <Box  sx={{display: 'flex',justifyContent: 'center',minHeight:38,marginTop:'20px'}}>
              <Collapse in={open} >
            
                  <div id="example-collapse-text" >
                        <div style={{display: 'flex',marginLeft:'20px'}}>
                          <Form.Select aria-label="Default select example" style={{width:130,borderRadius:'0px',marginLeft:'10px',marginRight:'10px'}}
                                                    onChange={(e)=>{
                                                      setagency_id(e.target.value);
                                                    }}
                          >
                              <option value={null}>대리점</option>
                              {a_data.map((event,idx)=>(
                                  <option value={event.id} key={idx}>{event.agency_name}</option>
                              ))}
                          </Form.Select>

                          
                          <Date_picker name={'등록일'} submit_date={submit_date}/>

                          {/* <Date_picker name={'설치일'}/> */}

                          <Form.Select aria-label="Default select example" style={{width:130,borderRadius:'0px',marginLeft:'10px',marginRight:'10px'}}
                          onChange={(e)=>{
                            setnow_cate(e.target.value);
                          }}
                          >
                              <option>검토현황</option>
                              <option value="대기">대기</option>
                              <option value="승인">승인</option>
                              <option value="반려">반려</option>
                              <option value="보완완료">보완완료</option>
                          </Form.Select>
{/* 
                          <Form.Select aria-label="Default select example" style={{width:130,borderRadius:'0px',marginLeft:'10px',marginRight:'10px'}}>
                              <option>설치현황</option>
                              <option value="대기">대기</option>
                              <option value="승인">승인</option>
                              <option value="반려">반려</option>
                              <option value="보완완료">보완완료</option>
                          </Form.Select> */}

                          {/* <Form.Select aria-label="Default select example" style={{width:130,borderRadius:'0px',marginLeft:'10px',marginRight:'10px'}}>
                              <option>매장현황</option>
                              <option value="대기">대기</option>
                              <option value="승인">승인</option>
                              <option value="반려">반려</option>
                              <option value="보완완료">보완완료</option>
                          </Form.Select> */}

                          <Form.Select aria-label="Default select example" style={{width:130,borderRadius:'0px',marginLeft:'10px',marginRight:'10px'}}
                                                                              onChange={(e)=>{
                                                                                setcal_cate(e.target.value);
                                                                              }}
                          >
                              <option>정산</option>
                              <option value="대기">대기</option>
                              <option value="승인">승인</option>
                              {/* <option value="반려">반려</option>
                              <option value="보완완료">보완완료</option> */}
                          </Form.Select>

                          {/* <Form.Select aria-label="Default select example" style={{width:130,borderRadius:'0px',marginLeft:'10px',marginRight:'10px'}}>
                              <option>월별정산</option>
                              <option value="대기">대기</option>
                              <option value="승인">승인</option>
                              <option value="반려">반려</option>
                              <option value="보완완료">보완완료</option>
                          </Form.Select> */}

                          {/* <Form.Select aria-label="Default select example" style={{width:130,borderRadius:'0px',marginLeft:'10px',marginRight:'10px'}}>
                              <option>가맹점명</option>
                              <option value="대기">대기</option>
                              <option value="승인">승인</option>
                              <option value="반려">반려</option>
                              <option value="보완완료">보완완료</option>
                          </Form.Select> */}

                         
                        </div>
                      </div>
            
              </Collapse>
              </Box>

              <Box sx={{marginBottom:5}}>
                <Store_list setTotalcount={setTotalcount} rows={rows} totalcount={totalcount} setsearched_change={setsearched_change} searched_change={searched_change} s_rows={s_rows} checked={checked} setChecked={setChecked} change={change} setchange={setchange} />
              </Box>          
      </Box>
    )
}





export default function ContainPaper() {

   
        
        return (
        <Box sx={{margin:5}}>
            <Main_table />
        </Box>
        );
    
  
}
