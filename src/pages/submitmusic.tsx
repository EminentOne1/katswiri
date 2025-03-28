
import { useNavigate } from "react-router-dom";
const Submitmusic: React.FC = () => {

    const navigate = useNavigate();
    const handleSingleClick = () => {
        navigate("/submit-single");
    }
    const handleAlbumClick = () => {
        navigate("/submit-album");
    }
    return (

        <div className="submit-music">
            <div className="single" onClick={() =>handleSingleClick()}> 
                <span>Single</span>
            </div>
            <div className="album" onClick={() =>handleAlbumClick()}>
                <span>Album</span>
            </div>
        </div>
    )

}

export default Submitmusic;