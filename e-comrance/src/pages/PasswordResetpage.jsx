import {useEffect} from 'react';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {addNotification} from '../../reducer/notificationReducer';
import PasswordChange from '../components/PasswordChangeCard';
import Spinner from '../components/LoadSpinner';
import {validateResetPasswordToken} from '../services/emailServices';
import {useNavigate} from 'react-router-dom';

const PasswordResetpage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [spinTip, setSpinTip] = useState('');
  const url = window.location.href;
  useEffect(() => {
    const fetchPasswordReset = async () => {
      try {
        console.log('url', url);
        const urlSearchParams = new URLSearchParams(new URL(url).search);
        const email = window.location.pathname.split('/')[2];
        const token = urlSearchParams.get('token');
        setLoading(true);
        setSpinTip('Validating URL...');
        const response = await validateResetPasswordToken(email, token);
        console.log('response', response);
        if (response === 'Valid reset password link') {
          setLoading(false);
          dispatch(addNotification('Password reset link is valid'));
        }
      } catch (error) {
        setLoading(false);
        navigate('/login');
        dispatch(addNotification(error.error));
      }
    };
    fetchPasswordReset();
  }, []);

  return (
    <div
      className='App'
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <PasswordChange />
      <Spinner loading={loading} tip={spinTip} />
    </div>
  );
};

export default PasswordResetpage;
