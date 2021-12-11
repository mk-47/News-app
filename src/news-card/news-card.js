import React from "react";
import "./styles.css";
import moment from 'moment';


export const NewsCard = (props) => {
    const [newsData, setNewsData] = React.useState({});

    React.useEffect(() => {
        setNewsData(props.newsData);
    }, [props]);

    return (
        <div className="card-container">
            <div className="news-title">{newsData.TITLE}</div>
            <div className="news-publisher">
                <span className="badge bg-info text-dark">{newsData.PUBLISHER}</span>
                <div>
                    <span className="me-md-3">Category</span>
                    <span className="badge bg-success">{newsData.CATEGORY}</span>
                </div>
            </div>
            <div className="hostname">{newsData.HOSTNAME}</div>
            <div>{moment(newsData.TIMESTAMP).format('DD/MM/YYYY')}</div>
        </div>
    );
};
