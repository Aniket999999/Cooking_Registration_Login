import React, { useState } from 'react';

function Registration() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [errors, setErrors] = useState({});
  const [selectedCuisine, setSelectedCuisine] = useState([]);
  const [cuisineOptions] = useState([
    'Italian', 'Indian', 'Chinese', 'Thai', 'French'
  ]);

  const validateForm = () => {
    const newErrors = {};

    if (!name) newErrors.name = 'Name is required';
    if (!email) newErrors.email = 'Email is required';
    if (!dob || calculateAge(dob) < 18)
      newErrors.dob = 'Age must be at least 18';
    if (selectedCuisine.length === 0)
      newErrors.specialties = 'Select at least one cuisine';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();

    if (
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const handleSpecialtyChange = (e) => {
    const selectedOption = e.target.value;

    if (!selectedCuisine.includes(selectedOption)) {
      setSelectedCuisine([...selectedCuisine, selectedOption]);
    }
  };

  const removeSpecialty = (specialty) => {
    setSelectedCuisine(selectedCuisine.filter((item) => item !== specialty));
  };

  const handleRegistration = (event) => {
    event.preventDefault();
    if (validateForm()) {
      alert('Registration successful!');
    }
  };

  return (
    <div>
      <h2>Registration</h2>
      <form className='form-container-in'>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <input type="date" placeholder="Date of Birth" value={dob} onChange={(e) => setDob(e.target.value)} />
          <select className='dropDown' value={''} onChange={handleSpecialtyChange}>
            <option value="" disabled hidden>
              Select a Cuisine
            </option>
            {cuisineOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <ul>
          {selectedCuisine.map((specialty) => (
            <li key={specialty}>
              {specialty}
              <button className='submit-button' style={{ padding: "5px", fontWeight: "100", margin: "5px" }} onClick={() => removeSpecialty(specialty)}>Remove</button>
            </li>
          ))}
        </ul>
        {errors.name && <div className="error">{errors.name}</div>}
        {errors.specialties && <div className="error">{errors.specialties}</div>}
        {errors.email && <div className="error">{errors.email}</div>}
        {errors.dob && <div className="error">{errors.dob}</div>}
        <button className='submit-button' onClick={handleRegistration}>Register</button>
      </form>
    </div>
  );
}

export default Registration;
