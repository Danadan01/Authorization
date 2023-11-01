import "./registration.scss";
import useRegForm from "../../hooks/useRegForm";

const Registration = () => {
  const regForm = useRegForm();

  const handleRadioButtons = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.value) {
      regForm.values.gender = target.value;
      regForm.setFieldError("gender", "");
    }
  };

  return (
    <div className="registration-wrapper">
      <form onSubmit={regForm.handleSubmit} className="regForm">
        <label>Enter your first name:</label>
        <input
          type="text"
          name="firstName"
          onChange={regForm.handleChange}
          value={regForm.values.firstName}
        />
        <div className="errorDiv">
          {regForm.touched.firstName && regForm.errors.firstName}
        </div>
        <label>Enter your last name:</label>
        <input
          type="text"
          name="lastName"
          onChange={regForm.handleChange}
          value={regForm.values.lastName}
        />
        <div className="errorDiv">
          {regForm.touched.lastName && regForm.errors.lastName}
        </div>
        <label>Enter your date of birth:</label>
        <input
          type="date"
          name="dateOfBirth"
          onChange={regForm.handleChange}
          value={regForm.values.dateOfBirth}
        />
        <div className="errorDiv">
          {regForm.touched.dateOfBirth && regForm.errors.dateOfBirth}
        </div>
        <label>Enter your gender:</label>
        <div>
          <input
            type="radio"
            value="male"
            name="gender"
            onChange={(e) => handleRadioButtons(e)}
          />
          <label>Male</label>
          <input
            type="radio"
            value="female"
            name="gender"
            onChange={(e) => handleRadioButtons(e)}
          />
          <label>Female</label>
          <input
            type="radio"
            value="else"
            name="gender"
            onChange={(e) => handleRadioButtons(e)}
          />
          <label>Else</label>
        </div>
        <div className="errorDiv">
          {regForm.touched.gender && regForm.errors.gender}
        </div>
        <label>Enter your E-mail:</label>
        <input
          type="text"
          name="email"
          onChange={regForm.handleChange}
          value={regForm.values.email}
        />
        <div className="errorDiv">
          {regForm.touched.email && regForm.errors.email}
        </div>
        <label>Enter your password:</label>
        <input
          type="password"
          name="password"
          onChange={regForm.handleChange}
          value={regForm.values.password}
        />
        <div className="errorDiv">
          {regForm.touched.password && regForm.errors.password}
        </div>
        <label>Repeat your password:</label>
        <input
          type="password"
          name="copyPassword"
          onChange={regForm.handleChange}
          value={regForm.values.copyPassword}
        />
        <div className="errorDiv">
          {regForm.touched.copyPassword && regForm.errors.copyPassword}
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;
