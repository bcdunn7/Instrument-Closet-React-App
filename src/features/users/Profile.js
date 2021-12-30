import { useSelector } from 'react-redux';

const Profile = () => {
    const user = useSelector(state => state.user.userData);

    return (
        <div className='Profile'>
            <h3>Hey {user.username}! Welcome to your profile page.</h3>
            {/* form to edit user
                can edit firstName, lastName, email, phone.
                ^ That should probably be it.
            */}
        </div>
    )
}

export default Profile;