import { useEffect } from "react";
import "./profileForm.scss";
import useProfileForm from "../../hooks/useProfileForm";

interface ProfileFormProps {
  setState: (arg: boolean) => void;
}

const ProfileForm = ({ setState }: ProfileFormProps) => {
  const { profileForm, isActive, setIsActive, emptyValuesArr } =
    useProfileForm();

  useEffect(() => {
    setState(isActive);
  }, [isActive]);

  const handleRadioButtons = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.value) {
      profileForm.values.gender = target.value;
    }
  };

  return (
    <div>
      {isActive && (
        <form onSubmit={profileForm.handleSubmit} className="profileForm">
          <div>Add more information about yourself</div>
          {emptyValuesArr.includes("age") && (
            <div className="ageInputDiv">
              <input
                id="age"
                type="text"
                name="age"
                placeholder="Enter your age..."
                onChange={profileForm.handleChange}
                value={profileForm.values.age}
              />

              <div className="errorDiv">
                {profileForm.touched.age && profileForm.errors.age}
              </div>
            </div>
          )}

          {emptyValuesArr.includes("gender") && (
            <div className="genderInputDiv">
              <label>Choose your gender:</label>
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
            </div>
          )}
          <div className="formButtonBox">
            <button type="submit" className="submitButton">
              Save Changes
            </button>
            <button onClick={() => setIsActive(false)} className="cancelButton">
              Cancel
            </button>
          </div>
        </form>
      )}
      {emptyValuesArr[0] && !isActive && (
        <button className="addInfoButton" onClick={() => setIsActive(true)}>
          ▼
        </button>
      )}
    </div>
  );
};

export default ProfileForm;
