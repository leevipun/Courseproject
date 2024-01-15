import React, {useState} from 'react';
import {Button} from 'antd';
import Spinner from '../components/LoadSpinner.jsx';
import {
  deleteChat,
  getAllChats,
  getAllMessages,
} from '../services/chatServices.js';
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {addNotification} from '../../reducer/notificationReducer.js';
import {useDispatch} from 'react-redux';
import '../styles/ChatPageStyles.css';
import {useSelector} from 'react-redux';
import {clearMessage, setMessages} from '../../reducer/messageReducer.js';
import {
  initializeAdminChats,
  initializeChats,
  setChats,
} from '../../reducer/ChatsReducer.js';
import Navbar from '../components/navbar.jsx';
import MessagesCard from '../components/messagesCard.jsx';

const Chatpage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let messages = useSelector((state) => state.messages);
  const chats = useSelector((state) => state.chats);
  const [loading, setLoading] = useState(false);
  const [spinTip, setSpinTip] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  document.title = 'Chat';

  const handleRedirect = async (id) => {
    if (window.location.pathname.split('/')[2] === id) {
      dispatch(addNotification('You are already in this chat', 'error'));
      return;
    }
    const newMessages = await getAllMessages(id);
    dispatch(setMessages(newMessages.messages));
    console.log('messages', messages);
    navigate(`/chats/${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      setSpinTip('Loading user listings...');
      try {
        if (checkIfAdmin()) {
          setIsAdmin(true);
          dispatch(initializeAdminChats());
          const id = window.location.pathname.split('/')[3];
          if (id) {
            const response1 = await getAllMessages(id);
            dispatch(setMessages(response1.messages));
            console.log('response1', response1);
          }
        } else {
          console.log('not admin');
          setLoading(true);
          const id = window.location.pathname.split('/')[2];
          console.log('id', id);
          dispatch(clearMessage());
          if (id) {
            const response1 = await getAllMessages(id);
            dispatch(setMessages(response1.messages));
            console.log('response1', response1);
          }
          dispatch(initializeChats());
          setLoading(false);
        }
      } catch (error) {
        if (error.status === 401) {
          navigate('/login');
          dispatch(
            addNotification(
              'Please login first your session has expired so we can keep your favorites stored',
              'error'
            )
          );
        }
        setLoading(false);
        console.error('error', error);
      }
    };
    fetchData();
  }, []);

  const checkIfAdmin = () => {
    if (window.location.pathname.split('/')[1] === 'admin') {
      return true;
    } else {
      return false;
    }
  };

  const messageProps = {
    isAdmin,
  };

  const getMessages = async () => {
    let id;
    if (isAdmin) {
      id = window.location.pathname.split('/')[3];
    } else {
      id = window.location.pathname.split('/')[2];
    }
    const response = await getAllMessages(id);
    console.log('response', response);
    dispatch(setMessages(response.messages));
  };

  const getChats = async () => {
    const chats = await getAllChats();
    dispatch(setChats(chats));
    console.log('chats', chats);
  };

  const getAdminChats = async () => {
    try {
      dispatch(initializeAdminChats());
    } catch (error) {
      console.log('error', error);
      if (error.data.error === 'jwt expired') {
        dispatch(
          addNotification(
            'Your session has expired please login again',
            'error'
          )
        );
        navigate('/login');
      }
      console.error('Error getting admin chats:', error);
    }
  };

  const handleAdminRedirect = async (id) => {
    navigate(`/admin/chats/${id}`);
    getMessages();
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await deleteChat(id);
      if (isAdmin) {
        dispatch(initializeAdminChats());
        navigate('/admin/chats');
      } else {
        dispatch(initializeChats());
        navigate('/chats');
      }
      dispatch(addNotification('Chat deleted'));
    } catch (error) {
      console.error('Error sending message:', error);
      dispatch(addNotification('Error deleting chat', 'error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='App'>
      <Spinner loading={loading} tip={spinTip} />
      <Navbar />
      <div style={{display: 'flex'}}>
        <div id='chat-bar'>
          <div id='chat'>
            <h1>Chats</h1>
            {isAdmin ? (
              <Button type='primary' onClick={() => getAdminChats()}>
                Refresh A
              </Button>
            ) : (
              <Button type='primary' onClick={() => getChats()}>
                Refresh N
              </Button>
            )}
          </div>
          <div>
            <div>
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  className='message-container'
                  style={{cursor: 'pointer'}}
                  onClick={
                    isAdmin
                      ? () => handleAdminRedirect(chat.id)
                      : () => handleRedirect(chat.id)
                  }
                >
                  <p className='chat-content'>{`${chat.userNames[0]} + ${chat.userNames[1]}`}</p>
                  <p className='chat-date'>{chat.lastMessage}</p>

                  <Button onClick={() => handleDelete(chat.id)}>Delete</Button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <MessagesCard props={messageProps} />
      </div>
    </div>
  );
};

export default Chatpage;
