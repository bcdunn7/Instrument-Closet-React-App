import { useSelector } from 'react-redux';
import DeleteUserBtn from './DeleteUserBtn';
import EditUserForm from './EditUserForm';
import './Profile.css';

const Profile = () => {
    const userData = useSelector(state => state.user.userData);

    return (
        <div className='Profile'>
            <h3 className='Profile-heading'>Hey {userData.username}! Edit Your Personal Details Here</h3>
            
            <EditUserForm userData={userData}/>
            <DeleteUserBtn/>
        </div>
    )
}

export default Profile;