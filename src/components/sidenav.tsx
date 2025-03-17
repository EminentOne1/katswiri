const SideNav: React.FC = () => {
  return (
    <div className="side-nav">
      <img src="images/home.svg" alt="home" width={30} />
      <img src="images/chart.svg" alt="chart" width={20} />
      <img src="images/like.svg" alt="likes" width={20} />
      <img src="images/playlist.svg" alt="playlists" width={20} />

      <div className="footer">
        <p>Privacy Policy | Terms of Service | cookie usage | Distribution policy</p>
      </div>
    </div>
  );
};
export default SideNav;
