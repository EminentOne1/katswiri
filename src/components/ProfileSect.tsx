import Divider from "./divider";

interface profilesect {
  isloggedin?: boolean;
}
const ProfileSect: React.FC<profilesect> = ({isloggedin}) => {
  return (
    <>
      <div className="profile-sect">
        {isloggedin ? (<></>) : 
        (<div className="loggedout">

           <img src="/images/light.svg" alt="light"/>
        
           <button className="button-signin">Sign in</button>
           <button className="button-login">login</button>
        </div>)}
      </div>
    </>
  );
};

export default ProfileSect;
