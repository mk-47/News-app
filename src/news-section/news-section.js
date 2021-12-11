import React from 'react';
import { NewsCard } from '../news-card/news-card';


export const NewsSection = (props) => {
    return (
        <div className="news-section">
            {props.filteredData.map((item) => (
                <NewsCard key={item.ID} newsData={item} />
            ))}
        </div>
    )
}


