import { useEffect } from "react";
import "./profileForm.css";
import { isElementInArr } from "../../helpers/isElementInArr";
import useProfileForm from "../../hooks/useProfileForm";

interface ProfileFormProps {
  setState: (arg: boolean) => void; // do I have to pass it at all?
}

const ProfileForm = ({ setState }: ProfileFormProps) => {
  const { profileForm, isActive, setIsActive, emptyValuesArr } = useProfileForm();


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
          {isElementInArr("age", emptyValuesArr) && (
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
                {profileForm.errors.age &&
                  profileForm.touched.age &&
                  profileForm.errors.age}
              </div>
            </div>
          )}

          {isElementInArr("gender", emptyValuesArr) && (
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
