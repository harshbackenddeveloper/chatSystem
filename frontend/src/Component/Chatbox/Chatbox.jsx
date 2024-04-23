import React, { useEffect, useMemo, useState } from 'react'
import './Chatbox.css'
import { io } from "socket.io-client";
import { makeApi } from '../helper/MakeApi';
import { userlocalStorageData } from '../helper/localStorage';
import { toast } from 'react-toastify';
const Chatbox = () => {
  const UserId = userlocalStorageData()
  const socket = useMemo(() => io("http://localhost:8000"), []);
  const [userData, setUserData] = useState([])
  const [sendMessage, setSendMessage] = useState("");
  const [userSoketId, setUserSoketId] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null);
  const [recieverSocketId, setRecieverSocketId] = useState(null)

  //get register user list here 
  const getUserList = async () => {
    try {
      const userList = await makeApi('get', '/getAllUserDetails');
      const filterList = userList.response.filter((item) => item.id !== UserId)
      setUserData(filterList);
    } catch (error) {
      console.log(error);
    }
  }

  //user details by id 

  const GetUserDetails = async (id) => {
    try {
      const findUser = await makeApi('get', `/getUserDetailsById/${id}`)
      // setSeprateDetails(findUser)
      // setReciverId(findUser._id)
      // setReciverSokcetId(findUser.socketId)
      console.log('findUser', findUser);
    } catch (error) {
      console.log(error);
    }
  }

  //function to update socket.id of login user 
  const updateSocket = async () => {
    try {
      const dataa = { socket: userSoketId, userid: UserId }
      const updateId = await makeApi('put', '/updateSocketId', dataa)
      // console.log("updateData", updateId);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  }

  //function to select user from user list 
  const handleUserClick = async (id) => {
    try {
      const findUser = await makeApi('get', `/getUserDetailsById/${id}`)
      console.log('findUser', findUser.response.socket_id    );
      setRecieverSocketId(findUser.response.socket_id)
      setSelectedUser(findUser.response);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("selectedUser", selectedUser);

  //function to send message at onclick
  const handleSendMessage = async (e) => {
    e.preventDefault();

    socket.emit('user_message', { message: sendMessage, socketId: recieverSocketId })
    setSendMessage('')
  }

  useEffect(() => {
    getUserList()
    socket.on('connect', () => {
      setUserSoketId(socket.id)
      console.log('connected', socket.id);
    })

    socket.on('botMessage', async (data) => {
      console.log("PersonallyMessage", data);
      // setPersonallyMessage((userMessage) => [...userMessage, data])
    })
  }, [])


  useEffect(() => {
    updateSocket()
  }, [userSoketId])



  return (
    <>
      <div className="container-fluid main-chatbox">
        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-3  col-12 chatleftbox border p-0 pt-3" >
            <div className='topchats '>
              <div className="row">
                <div className="col-6 p-2">
                  <h4 className='fw-bold mb-0'>Chats</h4>
                </div>
                <div className="col-6 p-2 d-flex justify-content-end">
                  <div className="pulsicon">
                    <i className="fa-solid fa-plus"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className='inputsearch '>
              <input type="text" placeholder='search chat' />
              <i className="fa-brands fa-searchengin"></i>
            </div>

            {/* here we are showing user list  */}
            <div className='listchats'>
              {
                userData.map((item) => (
                  <div className='listchats-under' key={item.id} onClick={() => handleUserClick(item.id)}>
                    <div className='listchatsudr-data'>
                      <div className="" data-bs-toggle="tooltip" data-bs-placement="right" title="Tooltip on top">
                        <img src='https://img.freepik.com/premium-vector/brunette-man-avatar-portrait-young-guy-vector-illustration-face_217290-1549.jpg?w=740' alt="" data-toggle="tooltip" data-placement="top" title="Tooltip on top" />
                      </div>
                      <div>
                        <div className='d-flex gap-1'>
                          <h1 className='chlstname'>{item.firstName + " " + item.lastName} </h1>
                        </div>
                        <p className='chlstmessage'>Hello</p>
                      </div>
                    </div>
                    <div className='d-flex flex-column justify-content-center'>
                      {/* <p className='chlsttime'>10 minits go</p> */}
                      <span className='ltchnotifi'>2</span>
                    </div>
                  </div>
                ))
              }
            </div>

          </div>
          <div className="col-lg-9 col-md-9 col-sm-9 col-12 pt-2 pb-3 h-100 chatrightbox border">
            {selectedUser ? (
              <div className="row">
                <div className="col-12 border-bottom pb-3 pt-2">
                  <div className="d-flex justify-content-between flex-wrap">
                    <div className="d-flex justify-content-start flex-wrap gap-2">
                      <div>
                        <img src='https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg?w=740' alt="" />
                      </div>
                      <div>
                        <h1 className='m-0 mt-2 ms-0 fw-bold' style={{ fontSize: "14px" }}>{selectedUser && selectedUser.firstName + " " + selectedUser.lastName}</h1>
                        <p className='m-0 ms-0 text-success' style={{ fontSize: "14px" }}>Last seen 2 min ago</p>
                      </div>
                    </div>
                    <div className="d-flex justify-content-end align-items-center gap-4">
                      <i className="fa-solid fa-circle-plus"></i>
                      <i className="fa-solid fa-video"></i>
                      <i className="fa-solid fa-expand me-3"></i>
                    </div>
                  </div>
                </div>

                <div className="col-12 mt-3 p-0">

                  <div className="message-container">
                    <div className='d-flex flex-column'>
                      <div className='d-flex align-items-center gap-3'>
                        <img src='https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg?w=740' alt="" className='ms-2' />
                        <div className='message'>
                          <p className='m-0' style={{ fontSize: "14px" }}>In publishing and graphic design, Lorem ipsum is aplaceholder text commonly used </p>
                        </div>
                        <i className="fa-solid fa-ellipsis pb-2"></i>
                      </div>
                    </div>

                    <div className='d-flex flex-column me-2'>
                      <div className='d-flex align-items-center justify-content-end gap-3'>
                        <i className="fa-solid fa-ellipsis ms-2 pb-2"></i>
                        <div className='tokmessage'>
                          <p className='m-0' style={{ fontSize: "14px" }}>In publishing and graphic design, Lorem ipsum</p>
                        </div>
                        <i className="fa-solid fa-check-double pb-2"></i>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 border-top m-0">
                    <form onSubmit={handleSendMessage}>
                      <div className='sendmessage border-0 mt-3 d-flex align-items-center justify-content-between  '>
                        <div className='d-flex gap-2 ms-3'>
                          <div className="pulsicon">
                            <i className="fa-solid fa-plus"></i>
                          </div>
                          <input type="text" placeholder='Type a message here' className='' value={sendMessage} onChange={(e) => setSendMessage(e.target.value)} />
                        </div>

                        <div className='d-flex gap-3 align-items-center me-3'>
                          <i className="fa-regular fa-face-smile"></i>
                          <div className="pulsicon">
                            <button type='submit' className='submitBtn'><i className="fa-solid fa-paper-plane"></i></button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            ) : (
              <div className="d-flex align-items-center justify-content-center h-100">
                <p className="text-muted">Select a user to start chatting</p>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  )
}

export default Chatbox  