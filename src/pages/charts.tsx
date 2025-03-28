import { useState } from "react";

interface charts{


    title: string;
    type: string;
    songs?: { title: string; artist: string; duration: number }[];
  
}
const Charts : React.FC = () =>{
    
  const [charts, setCharts] = useState<charts>({
    title: "",
    type: "",
    songs: [],
  });

    return(
        <section className="charts">
           {charts && charts.songs && charts.songs.length > 0 ? (<></>):(<>No songs in the charts</>)}
            </section>
    )
}

export default Charts;