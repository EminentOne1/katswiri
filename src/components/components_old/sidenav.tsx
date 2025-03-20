import Divider from "./divider";

const SideNav: React.FC = () => {
  return (
    <div className="side-nav">
     <span style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",gap:"8px",fontWeight:"bold"}}> <img src="images/home.svg" alt="home" width={30} /> Home</span>
     <span style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",gap:"8px",fontSize:"11px"}}><img src="images/chart.svg" alt="chart" width={20} />Chart</span>
     <span style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",gap:"8px",fontSize:"11px"}}> <img src="images/like.svg" alt="likes" width={20} />Favourites</span>
     <span style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",gap:"8px",fontSize:"11px"}}> <img src="images/playlist.svg" alt="playlists" width={20} />Playlist</span>
      <span style={{width:"100px"}} className="line"></span>

      <div style={{border:"1px solid rgba(0,0,0,0.1)",padding:"10px"}}>
        <span style={{fontSize:"12px",fontFamily:"open sans"}}>Please <b>Login</b> for a more Personalized Experience</span>
      </div>
      <div className="footer">
        <p>Privacy Policy | Terms of Service | cookie usage | Distribution policy</p>
      </div>
    </div>
  );
};
export default SideNav;
