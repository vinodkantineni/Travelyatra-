import React, { useState } from 'react';
import { API } from "../config";
import ModalVideo from 'react-modal-video';
import { Play } from 'lucide-react';
import './../../node_modules/react-modal-video/scss/modal-video.scss';

const getFallbackImage = (name) => {
    if (!name) return "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80";
    const q = name.toLowerCase();
    
    if (q.includes("auli")) return "https://images.unsplash.com/photo-1626830503206-6c768ee1d84a?auto=format&fit=crop&w=800&q=80";
    if (q.includes("taj mahal")) return "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80";
    if (q.includes("pahalgam") || q.includes("kashmir")) return "https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?auto=format&fit=crop&w=800&q=80";
    if (q.includes("goa")) return "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80";
    if (q.includes("mathura")) return "https://images.unsplash.com/photo-1627664813838-5699c4aa0cae?auto=format&fit=crop&w=800&q=80";
    if (q.includes("bodh gaya")) return "https://images.unsplash.com/photo-1609137144813-2dbe4889ed54?auto=format&fit=crop&w=800&q=80";
    if (q.includes("balloon") || q.includes("jaipur")) return "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=800&q=80";
    if (q.includes("scuba") || q.includes("havelock")) return "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80";
    if (q.includes("kerala") || q.includes("backwaters")) return "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80";
    if (q.includes("manali") || q.includes("trekking")) return "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80";
    if (q.includes("munnar") || q.includes("tea garden")) return "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80";
    if (q.includes("hampi")) return "https://images.unsplash.com/photo-1600100397608-f010e42ec9fb?auto=format&fit=crop&w=800&q=80";
    if (q.includes("rafting") || q.includes("rishikesh")) return "https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=800&q=80";
    if (q.includes("darjeeling")) return "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80";
    if (q.includes("varanasi") || q.includes("spiritual")) return "https://images.unsplash.com/photo-1561361062-856753540121?auto=format&fit=crop&w=800&q=80";
    if (q.includes("andaman") || q.includes("island resort")) return "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=800&q=80";
    if (q.includes("khyber") || q.includes("gulmarg")) return "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80";
    if (q.includes("lake palace")) return "https://images.unsplash.com/photo-1546412414-8035e1776c9a?auto=format&fit=crop&w=800&q=80";
    if (q.includes("leela") || q.includes("kovalam")) return "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80";
    if (q.includes("air india") || q.includes("del to goi")) return "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80";
    if (q.includes("indigo") || q.includes("bom to sxr")) return "https://images.unsplash.com/photo-1517999144091-3d9dca6d1e43?auto=format&fit=crop&w=800&q=80";
    if (q.includes("vistara") || q.includes("blr to jai")) return "https://images.unsplash.com/photo-1483450388369-9ed95738483c?auto=format&fit=crop&w=800&q=80";
    if (q.includes("vande bharat") || q.includes("varanasi")) return "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?auto=format&fit=crop&w=800&q=80";
    if (q.includes("palace on wheels")) return "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=800&q=80";
    if (q.includes("volvo") || q.includes("manali")) return "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80";
    if (q.includes("intercity") || q.includes("sleeper")) return "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80";
    if (q.includes("mahindra") || q.includes("xuv700")) return "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80";
    if (q.includes("mercedes") || q.includes("c-class")) return "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80";
    if (q.includes("rajasthan") || q.includes("heritage expedition")) return "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80";
    
    return "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80";
};

const ShowImage = ({ item, url, className = "" }) => { 
    const [isOpen, setOpen] = useState(false);
    const [imgSrc, setImgSrc] = useState(
        getFallbackImage(item.name)
    );

    const handleImageError = () => {
        setImgSrc("https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80");
    };

    return (
        <div className={`product-img-container ${className}`} style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            overflow: 'hidden'
        }}>
            <ModalVideo 
                channel='youtube' 
                autoplay 
                isOpen={isOpen} 
                videoId={item.youtubelink || "yZc2vP7Hw3c"}
                onClose={() => setOpen(false)} 
            />

            <img
                src={imgSrc}
                alt={item.name}
                onError={handleImageError}
                style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    cursor: 'pointer',
                    transition: 'transform 0.5s'
                }}
                className="premium-card-img"
            />

            {/* Video Play Badge overlay */}
            <div 
                onClick={() => setOpen(true)}
                style={{
                    position: 'absolute',
                    bottom: '1rem',
                    right: '1rem',
                    backgroundColor: 'rgba(15, 23, 42, 0.75)',
                    color: '#FFFFFF',
                    borderRadius: '50%',
                    width: '2.5rem',
                    height: '2.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    backdropFilter: 'blur(4px)',
                    zIndex: 5,
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
                className="play-badge flex-center"
            >
                <Play size={16} fill="#FFFFFF" />
            </div>
        </div>
    );
};

export default ShowImage;
