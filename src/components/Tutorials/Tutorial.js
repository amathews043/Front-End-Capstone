import ReactPlayer from 'react-player';
import "./Tutorial.css";

export const Tutorial = () => {
    return(
        <article> 
            <div className="columns ">
                <div className="column is-half">
                    <div className='video'> 
                        <h2 className='header'> Slip Knot</h2>
                            <div className='card-image'> 
                                <ReactPlayer url="https://www.youtube.com/watch?v=w9wEcSD-V3M"/>
                             </div>
                    </div>
                    <div className='video'> 
                        <h2 className='header'> Double Crochet</h2>
                            <div className='card-image'> 
                                <ReactPlayer url="https://www.youtube.com/watch?v=5xKssKskNzo"/>
                             </div>
                    </div>
                    <div className='video'> 
                        <h2 className='header'> Weaving in Ends</h2>
                            <div className='card-image'> 
                                <ReactPlayer url="https://www.youtube.com/watch?v=kP7aXKvD9Mc"/>
                             </div>
                    </div>
                </div>
                <div className="column is-half">
                    <div className='video'> 
                        <h2 className='header'> Foundation Chain</h2>
                            <div className='card-image'> 
                                <ReactPlayer url="https://www.youtube.com/watch?v=GjoVWbYhWuc"/>
                             </div>
                    </div>
                    <div className='video'> 
                        <h2 className='header'> Single Crochet</h2>
                            <div className='card-image'> 
                                <ReactPlayer url="https://www.youtube.com/watch?v=wgVOkQcf5qw"/>
                             </div>
                    </div>
                    <div className='video'> 
                        <h2 className='header'> How to Finish a Project</h2>
                            <div className='card-image'> 
                                <ReactPlayer url="https://www.youtube.com/watch?v=09SMKeliM9w"/>
                             </div>
                    </div>
                </div>
            </div>
        </article>
    )
}

