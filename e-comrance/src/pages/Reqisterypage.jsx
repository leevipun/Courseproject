import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';
import React from 'react';

import '../styles/registeryStyles.css';
import PersonalInfo from '../components/registery/personalInfo.jsx';
import AddressInfo from '../components/registery/addressInfo.jsx';
import AdditionalInfo from '../components/registery/additionalInfo.jsx';
import {useDispatch} from 'react-redux';
import {addNotification} from '../../reducer/notificationReducer';
import {Button} from 'antd';
import Spinner from '../components/LoadSpinner.jsx';
import {SpeedInsights} from '@vercel/speed-insights/react';
import {registery, updateStripeId} from '../services/userServices.js';

const Registerypage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastname] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phone, setPhone] = useState('');
  const [style, setStyle] = useState('buyer');
  const [selectedCountry, setSelectedCountry] = useState('FI');
  const [iban, setIban] = useState('');
  const [personalInfoForm, setPersonalInfoForm] = useState(true);
  const [addressInfoForm, setAddressInfoForm] = useState(false);
  const [additionalInfoFrom, setAdditionalInfoForm] = useState(false);
  const [dob, setDob] = useState('');
  const [loading, setLoading] = useState(false);
  const isReqistery = true;

  const spinTip = 'Creating account...';

  const handleRegistery = async (e) => {
    e.preventDefault();

    try {
      const id = uuidv4();
      const splitBirthday = dob.split('-');
      const formattedDate = `${splitBirthday[1]}/${splitBirthday[2]}/${splitBirthday[0]}`;
      const newObject = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password,
        style: style,
        country: selectedCountry,
        id: id,
        city: city,
        address: address,
        postalCode: postalCode,
        phone: phone,
        Dob: formattedDate,
        iban: iban,
      };
      setLoading(true);
      await registery(newObject);
      await updateStripeId(newObject);
      setLoading(false);
      navigate('/login');
      setEmail('');
      setFirstName('');
      setPassword('');
    } catch (error) {
      setLoading(false);
      console.error('Registration failed:', error.error);
      dispatch(addNotification(`${error.error} please check following, Age: over 13y, Country: Finland, Phonenumber: starts with +358...`));
    }
  };

  const handlePersonalInfoForm = () => {
    setPersonalInfoForm((prev) => !prev);
    setAddressInfoForm((prev) => !prev);
  };

  const handleCancel = () => {
    navigate('/login');
  };

  const handleAddressInfoForm = () => {
    setAddressInfoForm((prev) => !prev);
    setAdditionalInfoForm((prev) => !prev);
  };

  const personalProps = {
    firstName,
    setFirstName,
    lastName,
    setLastname,
    email,
    setEmail,
    password,
    setPassword,
    style,
    setStyle,
    handlePersonalInfoForm,
    isReqistery,
  };

  const addressProps = {
    city,
    setCity,
    address,
    setAddress,
    postalCode,
    setPostalCode,
    selectedCountry,
    setSelectedCountry,
    handleAddressInfoForm,
    handlePersonalInfoForm,
  };

  const additionalProps = {
    dob,
    setDob,
    setIban,
    iban,
    phone,
    setPhone,
    handleAddressInfoForm,
    handleRegistery,
    setStyle,
    style,
  };

  return (
    <div
      className='App'
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
      }}
    >
      <div>
        <h1>Register</h1>
        <form onSubmit={handleRegistery}>
          {personalInfoForm && (
            <div>
              <PersonalInfo props={personalProps} />
              <div id='NextBackButtonDiv'>
                <Button type='primary' onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type='primary' onClick={handlePersonalInfoForm}>
                  Next
                </Button>
              </div>
            </div>
          )}
          {addressInfoForm && (
            <div>
              <AddressInfo props={addressProps} />
              <div id='NextBackButtonDiv'>
                <Button type='primary' onClick={handlePersonalInfoForm}>
                  Back
                </Button>
                <Button type='primary' onClick={handleAddressInfoForm}>
                  Next
                </Button>
              </div>
            </div>
          )}
          {additionalInfoFrom && (
            <div>
              <AdditionalInfo props={additionalProps} />
              <div id='NextBackButtonDiv'>
                <Button type='primary' onClick={handleAddressInfoForm}>
                  Back
                </Button>
                <Button onClick={handleRegistery} type='primary'>
                  Submit
                </Button>
              </div>
            </div>
          )}
        </form>
        <Spinner loading={loading} spinTip={spinTip} />
        <SpeedInsights />
      </div>
    </div>
  );
};

export default Registerypage;
